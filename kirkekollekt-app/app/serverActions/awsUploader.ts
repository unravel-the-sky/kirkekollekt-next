'use server'

import S3 from 'aws-sdk/clients/s3';
import axios from 'axios';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

const s3Client = new S3({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
    signatureVersion: 'v4'
});

export const getAwsUploadUrl = async ({file_key, type}:{file_key: string, type: string}) => {
    try {
        const fileParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: file_key,
            Expires: 600,
            ContentType: type
        }

        const url = await s3Client.getSignedUrlPromise('putObject', fileParams);

        return { 
            success: true,
            url: url
        }
    } catch (err){
        console.error('error happened while uploading: ', err)
        return {
            success: false,
        }
    }
}

export const getAwsDownloadUrl = async ({file_key}:{file_key: string}) => {
    try {
        const fileParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: file_key,
            Expires: 600,
        }

        const url = await s3Client.getSignedUrlPromise('getObject', fileParams);

        return { 
            success: true,
            url: url
        }
    } catch (err){
        console.error('error happened while downloading file: ', err)
        return {
            success: false,
        }
    }
}

type SubmittedFormData = {
    orgName: FormDataEntryValue | null;
    orgDesc: FormDataEntryValue | null;
    orgLogo: string;
    orgEmail: FormDataEntryValue | null;
}

export const submitForm = async (formData: FormData): Promise<SubmittedFormData> => {
    const rawFormData: SubmittedFormData = {
        orgName: formData.get("orgName"),
        orgDesc: formData.get('orgDesc'),
        orgLogo: '',
        orgEmail: formData.get('orgEmail')
    };

    console.log("org formData: ", formData);
    console.log("before:", rawFormData);

    const orgLogoRaw = formData.get('orgLogo'); 

    // now upload the image to s3 and get the download url
    const image = orgLogoRaw as File;
    const uploadedFileKey = await uploadFile(image, rawFormData.orgName as string);
    if (uploadedFileKey) {
        const url = await getFileUrl(uploadedFileKey) // file name here
        console.log('url for the uploaded file is: ', url);
        if (url) rawFormData.orgLogo = url;
    }

    console.log("after process:  ", rawFormData);

    return rawFormData;
};

export const uploadFile = async (file: File, orgName: string) => {
    const formattedDate = format(new Date(), "yyyy-M-dd");
  
    //   const fileKey = `myDate/date=${formattedDate}/${formatString(file.name)}`;
    const fileKey = `logo/${orgName}-${uuidv4()}`;
    const fileType = file.type;
  
    const { success, url } = await getAwsUploadUrl({
      file_key: fileKey,
      type: fileType,
    });
  
    if (success && url) {
      const uploadUrl = url;

      const orgLogo = new Blob([file])
  
      try {
        const res = await axios.put(uploadUrl, orgLogo, {
          headers: {
            "Content-Type": fileType,
            "Access-Control-Allow-Origin": "*",
          },
        });
  
        console.log("result is ", res);
  
        return fileKey;
      } catch (err) {
        console.warn("error happened: ", err);
      }
    }
  };
  
  export const getFileUrl = async (fileKey: string) => {
    try {
      const res = await getAwsDownloadUrl({ file_key: fileKey });
      const value = res.url;
      return value;
    } catch (err) {
      console.warn("error happened while downloading: ", err);
    }
  };
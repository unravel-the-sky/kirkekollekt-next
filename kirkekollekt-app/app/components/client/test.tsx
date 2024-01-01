"use client";

import {
  getAwsDownloadUrl,
  getAwsUploadUrl,
  submitForm,
} from "@/app/serverActions/awsUploader";
import axios from "axios";
import { format } from "date-fns";
import Image from "next/image";
import { useState } from "react";

export default function TestUploader() {
  const [awsFileUrl, setAwsFileUrl] = useState("");

  const handleFormSubmit = async (formData: FormData) => {
    const res = await submitForm(formData);
    console.log("data geldi: ", res);
    if (res.orgLogo) setAwsFileUrl(res.orgLogo);
  };

  return (
    <div className="flex w-full p-4 justify-start flex-col">
      <p>Add new organisation zamazingosu</p>
      <form action={handleFormSubmit}>
        <div className="flex w-[400px] flex-col p-4 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Navn til organisajon
            </label>
            <input
              type="text"
              name="orgName"
              id="org-name"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
              htmlFor="file_input"
            >
              Last opp logo
            </label>
            <input
              type="file"
              id="file_input"
              name="orgLogo"
              required
              className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded-lg border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Beskrivelse til organisajon
            </label>
            <input
              type="text"
              id="org-desc"
              name="orgDesc"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Kontakt email til organisajon
            </label>
            <input
              type="email"
              id="org-email"
              name="orgEmail"
              required
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          {awsFileUrl && (
            <div className="flex p-4 border-red-200">
              <Image
                src={awsFileUrl}
                alt="aws image here"
                width={300}
                height={300}
              />
            </div>
          )}
          <button
            type="submit"
            className="text-gray-900 mt-4 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Last opp
          </button>
        </div>
      </form>
    </div>
  );
}

import Image from "next/image";
import TestUploader from "./components/client/test";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TestUploader />
    </main>
  );
}

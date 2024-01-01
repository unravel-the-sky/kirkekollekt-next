"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("status is: ", status);
    console.log("session is: ", session);
    if (status === "unauthenticated") {
      console.log("user not authenticated!!");
      signIn("google");
    }
  }, [session, status]);

  return status === "loading" ? <div>loading..</div> : <>{children}</>;
}

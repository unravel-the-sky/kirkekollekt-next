import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  NextAuthProvider,
  NextAuthProviderOld,
} from "./components/client/session/nextAuthProvider";
import Providers from "./components/client/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <Providers>{children}</Providers>
        </NextAuthProvider>
      </body>
    </html>
  );
}

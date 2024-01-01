import NextAuth, { User } from "next-auth";
import { JWT } from "next-auth/jwt";

// declare module "next-auth" {
//   interface Session {
//     user: User;
//   }
// }

// declare module "next-auth/jwt" {
//   type JWT = User;
// }

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    error: RefreshAccessTokenError;
    access_token?: string;
    id_token?: string;
    user: User;
  }

  interface Account {
    ext_expires_in: number;
  }
  interface User {
    role: Role;
  }
}

export type UserRole = "admin" | "user" | "owner";

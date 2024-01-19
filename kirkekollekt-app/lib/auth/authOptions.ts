import { AuthOptions } from "next-auth";
import { UserRole } from "@/lib/types";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      profile(profile) {
        return {
          id: profile.sub,
          name: `${profile.given_name}`,
          email: profile.email,
          role: profile.role ? profile.role : "unknown",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  logger: {
    error(code, metadata) {
      console.error("logger has an ERROR");
      console.error(code, metadata);
    },
    warn(code) {
      console.error("logger has a WARNING");
      console.warn(code);
    },
    debug(code, metadata) {
      console.error("logger has a DEBUG");
      console.debug(code, metadata);
    },
  },
  callbacks: {
    async jwt({ token, user, account }) {
      console.log("token is: ", token);
      console.log("user is: ", user);
      return { ...token, ...user };
    },
    session({ session, token }) {
      if (token) {
        session.user.role = token?.role as UserRole;
        console.log("session is: ", session);
      }

      return session;
    },
  },
};

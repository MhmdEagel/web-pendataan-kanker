// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role?: "USER" | "ADMIN";
      fullname?: string;
    };
  }

  interface User {
    role?: "USER" | "ADMIN";
    fullname?: string;
  }

}

import { JWT } from "next-auth/jwt"
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    role?: "USER" | "ADMIN";
    fullname?: string;
  }
}


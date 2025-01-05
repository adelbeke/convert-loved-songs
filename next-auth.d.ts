import { DefaultSession, Account as NextAuthAccount } from "next-auth";
import { JWT as NextAuthJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session extends DefaultSession {
    token: {
      access_token: string;
      user: Session["user"];
    };
  }
  interface Account extends NextAuthAccount {
    expires_at: number;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends NextAuthJWT {
    access_token?: string;
    refresh_token?: string;
    access_token_expires?: number;
    error?: string;
    user?: Session["user"];
  }
}

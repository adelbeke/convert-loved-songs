import NextAuth from "next-auth/next";
import { type NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { refreshAccessToken } from "@/lib/provider/actions";

const providers: NextAuthOptions["providers"] = [
  SpotifyProvider({
    authorization:
      "https://accounts.spotify.com/authorize?scope=" +
      "playlist-modify-public,user-library-read",
    clientId: process.env.SPOTIFY_CLIENT_ID ?? "",
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? "",
  }),
];

const callbacks: NextAuthOptions["callbacks"] = {
  async jwt({ token, account, user }) {
    if (account && user) {
      return {
        access_token: account.access_token,
        refresh_token: account.refresh_token,
        access_token_expires: account.expires_at * 1000,
        user,
      };
    }

    if (
      token.access_token_expires &&
      Date.now() < (token.access_token_expires as number)
    ) {
      return token;
    }

    return await refreshAccessToken({
      token,
    });
  },
  async session({ session, token }) {
    return {
      ...session,
      token,
    };
  },
};

const handler = NextAuth({
  providers,
  callbacks,
});

export { handler as GET, handler as POST };

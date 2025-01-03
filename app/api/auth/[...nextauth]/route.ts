import NextAuth from "next-auth/next";
import { type NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const providers: NextAuthOptions["providers"] = [
  SpotifyProvider({
    authorization:
      "https://accounts.spotify.com/authorize?scope=user-read-email,playlist-read-private,playlist-modify-private,playlist-modify-public,user-library-read",
    clientId: process.env.SPOTIFY_CLIENT_ID ?? "",
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? "",
  }),
];

const callbacks: NextAuthOptions["callbacks"] = {
  async jwt({ token, account }) {
    if (account) {
      token.access_token = account.access_token;
    }
    return token;
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

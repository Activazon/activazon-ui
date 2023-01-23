import { authSignIn } from "lib/api-v2";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials;
        const response = await authSignIn(username, password);

        if (response.error || !response.pk || !response.access) {
          return null;
        }

        return response;
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      return {
        ...token,
        id: token.id || user.pk,
        refresh_token: token.refresh_token || user.refresh.token,
        access_token: token.access_token || user.access.token,
        user: token.user || user,
      };
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
export default NextAuth(authOptions);

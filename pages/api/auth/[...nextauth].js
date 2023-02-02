import moment from "moment";
import { authSignIn, authSignUp } from "lib/api-v2";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      id: "signin",
      name: "signin",
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
    CredentialsProvider({
      id: "signup",
      name: "signup",
      credentials: {
        username: { label: "username", type: "text" },
        usernameVerify: { label: "Verify Username", type: "text" },
        password: { label: "Password", type: "password" },
        locale: { label: "Locale", type: "text" },
        firstName: { label: "First Name", type: "text" },
        lastName: { label: "Last Name", type: "text" },
      },
      async authorize(credentials, req) {
        const {
          username,
          password,
          usernameVerify,
          locale,
          firstName,
          lastName,
        } = credentials;
        const response = await authSignUp({
          username,
          usernameVerify,
          password,
          locale,
          firstName,
          lastName,
        });

        if (response.error || !response.pk || !response.access) {
          throw new Error(response.error || "UNKNOWN_ERROR");
        }

        return response;
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      session.token = token;
      session.user = user;
      return session;
    },
    async jwt({ token, user }) {
      // just logged in (form jwt)
      if (user) {
        return {
          id: user.pk,
          username: user.username,
          email: user.email,
          refresh_token: user.refresh.token,
          access_token: user.access.token,
          exp: user.access.payload.exp,
          iat: user.access.payload.iat,
          jti: user.access.payload.jti,
        };
      }

      const exp = token.exp;

      // user is logged in and token should be valid, do nothing
      if (moment.utc().unix() < exp) {
        return token;
      }

      // TODO: refresh token, right now we are just logging out
      return null;
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

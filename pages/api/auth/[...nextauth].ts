import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import VkProvider from "next-auth/providers/vk";
import DiscordProvider from "next-auth/providers/discord";
import jwt from "jsonwebtoken";

export default NextAuth({
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/register",
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize({ email: identifier, password, remember }: any) {
        const { user, jwt: _ } = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`,
          {
            method: "POST",
            body: JSON.stringify({
              identifier,
              password,
              remember,
            }),
          }
        ).then((response) => response.json());

        return user
          ? {
              ...user,
              name: user.username,
            }
          : null;
      },
    }),
    GoogleProvider({
      clientId: String(process.env.GOOGLE_ID),
      clientSecret: String(process.env.GOOGLE_SECRET),
    }),
    VkProvider({
      clientId: String(process.env.VK_CLIENT_ID),
      clientSecret: String(process.env.VK_CLIENT_SECRET),
    }),
    DiscordProvider({
      clientId: String(process.env.DISCORD_CLIENT_ID),
      clientSecret: String(process.env.DISCORD_CLIENT_SECRET),
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, user, token: { id, iat, exp } }) {
      session.id = id;
      session.accessToken = jwt.sign(
        { id, iat, exp },
        String(process.env.JWT_SECRET)
      );
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user && account) {
        token.id =
          account.provider === "credentials"
            ? user.id
            : await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/auth/${account.provider}/callback?access_token=${account.access_token}`
              )
                .then((response) => response.json())
                .then(({ user }) => user.id);
      }

      return token;
    },
  },
});

import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }
        // You need to provide your own logic here that takes the credentials
        const userFound = await prisma.user.findFirst({
          where: {
            email: credentials?.email,
          },
        });
        console.log("User found:", userFound);
        if (!userFound) {
          console.log("User not found");
          return null;
        }
        const isValid = await bcrypt.compare(
          credentials.password,
          userFound.password,
        );
        console.log("Password valid:", isValid);
        if (!isValid) {
          console.log("Invalid password");
          return null;
        }
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        return {
          id: userFound.id.toString(),
          email: userFound.email,
          name: userFound.name ?? "",
        };
        // If no error and we have user data, return it
        // Return null if user data could not be retrieved
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
});

export const GET = handler;
export const POST = handler;

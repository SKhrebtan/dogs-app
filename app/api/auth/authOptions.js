import { NextAuthOptions } from "next-auth";
import { Account, User as AuthUser } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { setAuthHeader } from "../httprequests";

const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await fetch("https://nest-postgres-dogs.onrender.com/auth/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              })
            }
          ).then((response) => response.json());
          if(user.statusCode === 401) throw new Error('User or password is incorrect');
              setAuthHeader(user.token)
          // await localStorage.setItem('token', user.token)  
          return user
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "credentials") {
        
        return true;
      }
    }, 
    async jwt({ token, user }) {
     if (user?.id) token.id = user.id;
     if (user?.token) token.token = user.token
    return token
  },
    async session({ session, token, user }) {
    setAuthHeader(token.token)
      if (token?.id) session.user.id = token.id
      if (token?.token) session.user.token = token.token
      return session
    },
     async logout() {
      if (account?.provider === "credentials") {
       setAuthHeader('')
      }
    }, 
  strategy: "jwt",
  },
};

export default authOptions;

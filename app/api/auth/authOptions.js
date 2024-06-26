import CredentialsProvider from "next-auth/providers/credentials";

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
          const user = await fetch(
            "https://nest-postgres-dogs.onrender.com/auth/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          ).then((response) => response.json());
          if (user.statusCode === 401)
            throw new Error("User or password is incorrect");
          return user;
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, session }) {
      if (account?.provider === "credentials") {
        return user;
      }
    },
    async jwt({ token, user }) {
      if (user?.id) token.id = user.id;
      if (user?.token) token.token = user.token;
      if (user?.role) token.role = user.role;
      if (user?.avatar) token.avatar = user.avatar;

      return token;
    },
    async session({ session, token, user }) {
      if (token?.id) session.user.id = token.id;
      if (token?.token) session.user.token = token.token;
      if (token?.role) session.user.role = token.role;
      if (token?.avatar) session.user.avatar = token.avatar;
      return session;
    },
    async logout() {
      if (account?.provider === "credentials") {
      }
    },
    pages: {
      signIn: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
    strategy: "jwt",
    basePath: "/auth",
  },
};

export default authOptions;

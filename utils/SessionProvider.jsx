"use client";

import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ session, children }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default AuthProvider;

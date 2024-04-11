import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Inter } from "next/font/google";
import "../globals.css";
import { MatchMediaWrapper } from "../components/MatchMediaWrapper";
import AuthProvider from "../../utils/SessionProvider";
import { getServerSession } from "next-auth";
import initTranslations from "../i18n";
import TranslationsProvider from "@/langSwitcher/TranslationProvider";
import ReduxProvider from "../store/storeProvider";
import authOptions from "../api/auth/authOptions";
const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { t, resources } = await initTranslations(locale, ["common"]);
  const session = await getServerSession(authOptions);

  return (
    <>
      <html lang={locale} className="p-0 m-0">
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <body
          className={`${inter.className} dark:bg-slate-500 dark:text-white`}
        >
          <ReduxProvider>
            <AuthProvider session={session}>
              <TranslationsProvider
                resources={resources}
                locale={locale}
                namespaces={["common"]}
              >
                <MatchMediaWrapper />
                {children}
              </TranslationsProvider>
            </AuthProvider>
          </ReduxProvider>
        </body>
      </html>
    </>
  );
}

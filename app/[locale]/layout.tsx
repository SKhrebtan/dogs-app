import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { MatchMediaWrapper } from "../components/MatchMediaWrapper";
import AuthProvider from "../../utils/SessionProvider";
import { getServerSession } from "next-auth";
import initTranslations from "../i18n";
import TranslationsProvider from "@/langSwitcher/TranslationProvider";
import ReduxProvider from '../store/storeProvider'
import authOptions from "../api/auth/authOptions";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dog App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,params:{locale}
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const { t,resources } = await initTranslations(locale, ['common']) 
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>        
        <TranslationsProvider resources={resources} locale={locale} namespaces={['common']}>
         <ReduxProvider>
        <AuthProvider session={session}>
            <MatchMediaWrapper />             
          {children}
            </AuthProvider>
            </ReduxProvider>
          </TranslationsProvider>
      </body>
     
    </html>
  );
}

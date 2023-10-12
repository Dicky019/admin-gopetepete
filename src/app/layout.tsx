import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

import { headers } from "next/headers";

import { getServerAuthSession } from "@/server/auth";
import { AuthProvider } from "@/components/providers/session-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { TRPCReactProvider } from "@/components/providers/trpc-provider";
import { siteConfig } from "@/config/site";
import { Toaster } from "sonner";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon?v=4"],
    shortcut: ["/apple-touch-icon"],
  },
  manifest: "/site.webmanifest",
};

export default async function Layout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={["font-sans", fontSans.variable].join(" ")}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider session={await getServerAuthSession()}>
            <TRPCReactProvider headers={headers()}>
              {props.children}
            </TRPCReactProvider>
          </AuthProvider>
        </ThemeProvider>
        
        <Toaster />
      </body>
    </html>
  );
}

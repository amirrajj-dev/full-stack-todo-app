import type { Metadata } from "next";
import { Geist, Geist_Mono , Roboto } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const RobotoF = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight : ['100' ,'300' , '500' , '700' , '900']
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${RobotoF.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster  />
        </ThemeProvider>
      </body>
    </html>
  );
}

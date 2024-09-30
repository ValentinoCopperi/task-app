import type { Metadata } from "next";
import './globals.css'
import AuthProvider from "@/libs/auth/SessionProvider";

export const metadata: Metadata = {
  title: "TaskAPP",
  description: "Share your tasks with friends and relatives",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
  );
}

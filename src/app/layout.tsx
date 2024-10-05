import type { Metadata } from "next";
import './globals.css'

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
        <body className="h-full text-white bg-gray-950">
          {children}
        </body>
      </html>
  );
}

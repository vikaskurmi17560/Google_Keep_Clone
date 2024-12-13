import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";



export const metadata: Metadata = {
  title: "Google Keep ",
  description: "Clone of Google Keep",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >
        
        <main className="flex w-full min-h-[calc(100vh-55px)] ">
          
        {children}

        </main>
      </body>
    </html>
  );
}
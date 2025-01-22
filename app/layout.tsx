import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const font = Figtree({
  
  subsets: ["latin"],
});



export const metadata: Metadata = {
  title: "VegaMuze",
  description: "Best music up here",
};
  
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased`}
      >
        <Sidebar>
        {children}
        </Sidebar>
       
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProviders";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToastProvider from "@/providers/ToasterProvider";

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
        <ToastProvider/>
        <SupabaseProvider>
          <UserProvider>
          <ModalProvider />
        <Sidebar>
        {children}
        </Sidebar>
        </UserProvider>
        </SupabaseProvider>
       
      </body>
    </html>
  );
}

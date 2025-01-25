import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProviders";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToastProvider from "@/providers/ToasterProvider";
import getSongsByUserId from "@/actions/getSongsByUserId";
import Player from "@/components/Player";

const font = Figtree({
  
  subsets: ["latin"],
});

export const revalidate = 0;

export const metadata: Metadata = {
  title: "VegaMuze",
  description: "Best music up here",
};
  
export default  async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userSongs = await getSongsByUserId();

  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased`}
      >
        <ToastProvider/>
        <SupabaseProvider>
          <UserProvider>
          <ModalProvider />
        <Sidebar songs={userSongs}>
        {children}
        </Sidebar>
        <Player />
        </UserProvider>
        </SupabaseProvider>
       
      </body>
    </html>
  );
}

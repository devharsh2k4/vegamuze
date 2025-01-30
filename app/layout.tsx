import ProfileHeader from "@/components/ProfileHeader";
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
import getActiveProductWithPrices from "@/actions/getActiveProductsWithPrices";
import Library from "@/components/Library";
import SecondSidebar from "@/components/SecondSidebar";

const font = Figtree({
  subsets: ["latin"],
});

export const revalidate = 0;

export const metadata: Metadata = {
  title: "VegaMuze",
  description: "Best music up here",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userSongs = await getSongsByUserId();
  const products = await getActiveProductWithPrices();

  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <ToastProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products} />
            <div className="flex flex-col md:flex-row">
              <Sidebar songs={userSongs} className="w-64">
                <main className="flex-1">{children}</main>
              </Sidebar>
              <div className="flex flex-col flex-1 md:w-64">
                <ProfileHeader />
                <Library songs={userSongs} title="Recently Played" />
                <Library songs={userSongs} title="My Playlist" />
              </div>
            </div>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}

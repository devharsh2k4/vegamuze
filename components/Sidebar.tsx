"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiDownload, HiHome } from "react-icons/hi";
import { BiCompass, BiFile, BiLike, BiMusic, BiSearch } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import Box from "./Box";
import SidebarItem from "./SidebarItem";
import Library from "./Library";
import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import SecondSidebar from "./SecondSidebar";


interface SidebarProps {
    children: React.ReactNode;
    songs: Song[];
}

const Sidebar: React.FC<SidebarProps> = ({
    children,
    songs
}) => {
    const player = usePlayer();
    const pathname = usePathname();
    const routes = useMemo(() => [
        {
            icon: HiHome,
            label: "Home",
            active: pathname === "/",
            href: "/"
        },
        {
            icon:BiSearch,
            label: "Search",
            active: pathname === "/search",
            href: "/search"
        },
        {
            icon: BiCompass,
            label: "Discover",
            active: pathname === "/discover",
            href: "/discover"
        },
        {
            icon: BiMusic,
            label: "Collections",
            active: pathname === "/collections",
            href: "/collections"
        }
    ], [pathname]);

        const Secondroutes = useMemo(() => [
            {
                icon: HiDownload,
                label: "Download",
                active: pathname === "/downloads",
                href: "/downloads"
            },
            {
                icon:BiLike,
                label: "Favourites",
                active: pathname === "/favourites",
                href: "/favourites"
            },
            {
                icon: BiFile,
                label: "Local Files",
                active: pathname === "/files",
                href: "/files"
            },
           
        ], [pathname]);


    return (
        <div className={twMerge("flex h-full", player.activeId && "h-[calc(100%-80px)]")}> 
            <div className="hidden md:flex flex-col bg-black h-full w-[280px] p-4">
                <div className="text-purple-400 text-2xl font-bold px-5">W</div>
                <div className="flex flex-col gap-y-6 mt-8 px-5">
                    <p className="text-gray-400 text-sm">FEATURES</p>
                    {routes.map((item) => (
                        <SidebarItem
                            key={item.label}
                            {...item}
                        />
                    ))}
                    <p className="text-gray-400 text-sm">LIBRARY</p>
                    {Secondroutes.map((item) => (
                        <SidebarItem
                            key={item.label}
                            {...item}
                        />
                    ))}
                </div>
                
            </div>
            
              
          
                 
               
                
          
            <main className="h-full flex-1 overflow-y-auto py-2">
                {children}
            </main>
        </div>
    );
}
 
export default Sidebar;

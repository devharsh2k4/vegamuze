"use client";

import Header from "@/components/Header";
import SearchInput from "@/components/SeachInput";
import SearchContent from "./components/SearchContent";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const Search = () => {
  const [songs, setSongs] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const title = searchParams.get("title") || "";

  useEffect(() => {
    const fetchSongs = async () => {
      const response = await fetch(`/api/songsByTitle?title=${title}`);
      const fetchedSongs = await response.json();
      setSongs(fetchedSongs);
    };

    fetchSongs();
  }, [title]);

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex flex-col gap-y-6">
          <h1 className="text-white text-3xl font-semibold">Search</h1>
          <SearchInput />
        </div>
      </Header>
      <SearchContent songs={songs} />
    </div>
  );
};

export default Search;

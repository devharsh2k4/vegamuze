import getSongs from "@/actions/getSongs";
import Header from "@/components/Header";
import PageContent from "@/app/(site)/components/PageContent";
import Image from "next/image";

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();
  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
      <Header>
        <div className="mb-2 h-full">
      
          <div className="relative bg-pink-500 p-6 rounded-lg flex items-center w-full overflow-hidden">
            <div className="flex-1">
              <p className="text-white text-sm font-light">New Album</p>
              <h2 className="text-white text-3xl font-bold leading-tight">
                THE SECOND STEP:
                <br />
                CHAPTER ONE
              </h2>
              <p className="text-black text-sm font-semibold mt-2">TREASURE</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                LISTEN NOW
              </button>
            </div>
           
            <div className="flex-shrink-0">
              <Image
                src="/images/kpop.png"
                alt="Treasure Album"
                width={400}
                height={200}
                className="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">Hello, Harsh</h1>
        </div>
        <div>
          <PageContent songs={songs} />
          <h1 className="text-white mt-8 text-2xl font-semibold">
            Newest Songs
          </h1>
          <PageContent songs={songs} />
        </div>
      </div>
    </div>
  );
}

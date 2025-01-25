"use client";

import { Song } from "@/types";
import MediaItem from "./MediaItem";
import LikeButton from "./LikeButton";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { IoRepeat, IoShuffle } from "react-icons/io5";
import Slider from "./Slider";
import usePlayer from "@/hooks/usePlayer";
import { useEffect, useState } from "react";
import useSound from "use-sound";

interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const toggleShuffle = () => setIsShuffling((prev) => !prev);
  const toggleRepeat = () => setIsRepeating((prev) => !prev);

  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = isShuffling
      ? player.ids[Math.floor(Math.random() * player.ids.length)]
      : player.ids[currentIndex + 1];

    if (!nextSong) {
      const nextId = isRepeating ? player.activeId : player.ids[0];
      if (nextId) {
        return player.setId(nextId);
      }
    }

    player.setId(nextSong);
  };

  const [play, { pause, sound }] = useSound(songUrl, {
    volume: volume,
    onPlay: () => setIsPlaying(true),
    onEnd: () => {
      setIsPlaying(false);
      onPlayNext();
    },
    onPause: () => setIsPlaying(false),
    format: ["mp3"],
  });

  useEffect(() => {
    if (isPlaying) {
      play();
    } else {
      pause();
    }
  }, [isPlaying, play, pause]);

  useEffect(() => {
    sound?.play();
    return () => {
      sound?.unload();
    };
  }, [sound]);

  const handlePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full items-center bg-black text-white px-4 py-2">
      
      <div className="flex items-center gap-x-4">
        <MediaItem data={song} />
        <LikeButton songId={song.id} />
      </div>

   
      <div className="flex justify-center items-center col-span-2 md:col-auto gap-x-4">
        <IoShuffle
          onClick={toggleShuffle}
          size={24}
          className={`cursor-pointer ${isShuffling ? "text-white" : "text-neutral-400"} transition`}
        />
        <AiFillStepBackward
          onClick={() => {}}
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
        <div
          onClick={handlePlay}
          className="h-10 w-10 mx-4 flex items-center justify-center rounded-full bg-white cursor-pointer"
        >
          <Icon size={30} className="text-black" />
        </div>
        <AiFillStepForward
          onClick={onPlayNext}
          size={30}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
        <IoRepeat
          onClick={toggleRepeat}
          size={24}
          className={`cursor-pointer ${isRepeating ? "text-white" : "text-neutral-400"} transition`}
        />
      </div>

     
      <div className="hidden md:flex justify-end items-center gap-x-2 w-full">
        <VolumeIcon
          onClick={toggleMute}
          size={34}
          className="cursor-pointer"
        />
        <Slider value={volume} onChange={(value) => setVolume(value)} />
      </div>
    </div>
  );
};

export default PlayerContent;

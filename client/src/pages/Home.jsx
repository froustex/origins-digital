import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import Carousel from "../components/Carousel";

export async function getVideos() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/videos`);
  if (!res.ok) {
    throw new Error("Failed to fetch videos");
  }
  const data = await res.json();
  return data;
}

export function loader() {
  return getVideos();
}

export default function Home() {
  const [currentVideo, setCurrentVideo] = useState(0);

  const videos = useLoaderData();

  const handleNext = () => {
    setCurrentVideo(currentVideo === videos.length - 1 ? 0 : currentVideo + 1);
  };

  const handlePrevious = () => {
    setCurrentVideo(currentVideo === 0 ? videos.length - 1 : currentVideo - 1);
  };

  return (
    <div className="relative bg-zinc-900">
      <div className="w-full h-[500px] flex justify-center overflow-x-hidden">
        <button
          type="button"
          onClick={handlePrevious}
          className="absolute z-50 text-white -translate-y-1/2 left-2 top-1/2"
        >
          {" "}
          &lt;{" "}
        </button>
        {videos && videos.length
          ? videos.map((video, id) => (
              <div key={video.id} className="relative pb-9/16">
                <video
                  controls
                  className={
                    currentVideo === id ? `block h-full w-screen` : `hidden`
                  }
                  key={video.id}
                >
                  <source src={video.source} />
                </video>
              </div>
            ))
          : null}
        <button
          type="button"
          onClick={handleNext}
          className="absolute z-50 text-white -translate-y-1/2 right-2 top-1/2"
        >
          &gt;
        </button>
      </div>
      <div className="flex justify-center w-full">
        <h1 className="text-xl text-cyan-500">Suggested Videos</h1>
        <Carousel videos={videos} />
      </div>
    </div>
  );
}

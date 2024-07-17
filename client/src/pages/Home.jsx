import { useLoaderData } from "react-router-dom";
import { useState } from "react";

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
      <div className="h-[500px] flex overflow-x-hidden">
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
              <video
                controls
                className={currentVideo === id ? `block` : `hidden`}
                key={video.id}
              >
                <source src={video.source} />
              </video>
            ))
          : null}
        <button
          type="button"
          onClick={handleNext}
          className="absolute z-50 text-white -translate-y-1/2 right-2 top-1/2"
        >
          {" "}
          &gt;{" "}
        </button>
      </div>
    </div>
  );
}

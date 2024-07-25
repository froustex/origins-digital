import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import ProfilVideoBanner from "../components/ProfilVideoBanner";

export async function getFavVideos() {
  try {
    const { id } = JSON.parse(localStorage.getItem("username")).id;
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/users/${id}/favorites`
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error("");
    }
    return data;
  } catch (err) {
    return console.error(err);
  }
}

export function loader() {
  return getFavVideos();
}

export default function Profil() {
  const [videoIndex, setVideoIndex] = useState(0);

  const handleClick = (selectedVideo) => {
    setVideoIndex(selectedVideo);
  };
  const videos = useLoaderData();
  const currentVideo = videos[videoIndex];

  return (
    <div className="flex items-center justify-between h-full mt-20">
      {videos.length !== 0 ? (
        <section className="flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-start w-full mb-2 h-14 bg-primary">
            <h1 className="pl-8 text-white">Favorites </h1>
          </div>
          <div className="absolute flex justify-center w-full gap-6 transform top-32">
            {videos.map((video, index) => (
              <div key={video.id}>
                <img
                  role="presentation"
                  onClick={() => {
                    handleClick(index);
                  }}
                  className="border rounded cursor-pointer h-36"
                  src={video.thumbnail}
                  alt=" "
                />
              </div>
            ))}
          </div>
          <article className="w-1/2 mt-20 mb-3 max-h-1/3">
            <ProfilVideoBanner
              title={currentVideo.title}
              source={currentVideo.source}
              description={currentVideo.description}
              id={currentVideo.id}
            />
          </article>
        </section>
      ) : (
        <div className="flex items-center justify-center grow min-h-">
          <p className="text-center text-white">
            Oupppss! <br />
            You don't have any favorite video to show in your favorites
          </p>
        </div>
      )}
    </div>
  );
}

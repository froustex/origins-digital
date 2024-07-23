import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import edit from "../assets/images/profil-edit-icon.svg";
import ProfilVideoBanner from "../components/ProfilVideoBanner";

const settings = {
  slidesToShow: 4,
  slidesToScroll: 1,
};

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

export default function Profil() {
  const [videoIndex, setVideoIndex] = useState(0);

  const handleClick = (selectedVideo) => {
    setVideoIndex(selectedVideo);
  };
  const videos = useLoaderData();

  const { title, source, description } = videos[videoIndex];

  return (
    <main>
      <section className="flex items-center justify-end w-full gap-2 pr-6 min-h-12 bg-sky-600 ">
        <p className="text-2xl text-white">juliette@mail.com</p>
        <img src={edit} alt="icon" />
      </section>
      <section className="flex flex-col items-center justify-center w-full mt-6 m-h-1/2">
        <article className="w-1/2 max-h-1/3">
          <ProfilVideoBanner
            className="self-center"
            title={title}
            source={source}
            description={description}
          />
        </article>
        <div className="flex justify-center w-full mt-4 mb-4 max-h-26">
          <Slider
            slidesToShow={settings.slidesToShow}
            slidesToScroll={settings.slidesToScroll}
            className="w-3/4 p-6"
          >
            {videos.map((video, index) => (
              <div key={video.id} className="flex flex-col rounded ">
                <img src={video.thumbnail} alt=" " />
                <FontAwesomeIcon
                  className="text-white "
                  onClick={() => {
                    handleClick(index);
                  }}
                  icon={faPlay}
                />
                <p className="font-semibold text-white text-l">{video.title}</p>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </main>
  );
}

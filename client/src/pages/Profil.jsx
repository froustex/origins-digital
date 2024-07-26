import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import Slider from "react-slick";
import ProfilVideoBanner from "../components/ProfilVideoBanner";

export async function getFavVideos() {
  try {
    const { id } = JSON.parse(localStorage.getItem("username"));
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

  const renderVideos = videos.map((video, index) => (
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
  ));

  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  return (
    <div className="flex items-center justify-between w-full h-full overflow-x-hidden lg:mt-24">
      {videos.length !== 0 ? (
        <section className="flex flex-col items-center justify-center w-full h-full">
          <div className="relative flex items-center justify-start w-full mb-2 h-14 bg-primary">
            <h1 className="pl-8 text-white">Favorites </h1>
          </div>
          {videos.length >= 4 ? (
            <div className="flex justify-center gap-6 lg:w-2/3 lg:absolute lg:top-20 sm-mr-2.5 sm:ml-2.5  items-center mt-5 flex-row w-full">
              <Slider
                className="flex justify-center gap-6 lg:w-2/3 lg:absolute sm-mr-2.5 sm:ml-2.5 items-center mt-5 sm:flex-row w-2/3"
                slidesToShow={settings.slidesToShow}
                slidesToScroll={settings.slidesToScroll}
                responsive={settings.responsive}
              >
                {renderVideos}
              </Slider>
            </div>
          ) : (
            <div className="flex justify-center gap-6 lg:w-2/3 lg:absolute sm-mr-2.5 sm:ml-2.5 flex-wrap items-center mt-5 lg:top-28 sm:flex-row">
              {renderVideos}
            </div>
          )}
          <article
            className={
              videos.length >= 4
                ? `h-auto mt-5 lg:mt-20 lg:w-full xl:w-1/2 sm:w-full md:w-full min-h-60`
                : `h-auto mt-5 lg:mt-60 xl:mt-20 lg:w-full xl:w-1/2 sm:w-full md:w-full min-h-60`
            }
          >
            <ProfilVideoBanner
              title={currentVideo.title}
              source={currentVideo.source}
              description={currentVideo.description}
              videoId={currentVideo.videoId}
            />
          </article>
        </section>
      ) : (
        <div className="flex items-center justify-center grow min-h-36">
          <p className="text-center text-white">
            Oupppss! <br />
            You don't have any favorite video to show in your favorites
          </p>
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  faAngleLeft,
  faAngleRight,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "process";

export default function BannerCarousel({ videos }) {
  const [currentVideo, setCurrentVideo] = useState(0);

  const navigate = useNavigate();

  const handleNext = () => {
    setCurrentVideo(currentVideo === videos.length - 1 ? 0 : currentVideo + 1);
  };

  const handlePrevious = () => {
    setCurrentVideo(currentVideo === 0 ? videos.length - 1 : currentVideo - 1);
  };

  return (
    <div className="relative w-full h-[20rem] sm:h-[30rem] flex justify-center overflow-x-hidden rounded-lg mb-4 sm:mb-8">
      <button
        type="button"
        onClick={handlePrevious}
        className="absolute left-0 z-40 text-white -translate-y-1/2 sm:left-2 top-1/2"
        aria-label="previous"
      >
        <FontAwesomeIcon className="text-2xl" icon={faAngleLeft} />
      </button>

      {videos && videos.length
        ? videos.map((video, id) => (
            <div
              key={video.id}
              className={
                currentVideo === id
                  ? `block h-full w-screen overflow-hidden cursor-pointer overflow-y-scroll ease-in-out`
                  : `hidden`
              }
              onClick={() =>
                navigate(`/dashboard/videos/${video.id}`, { state: video })
              }
              role="presentation"
            >
              <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full gap-6 px-6 sm:gap-0 sm:justify-around bg-black/60 sm:px-0">
                <div className="max-w-[65%] sm:max-w-[50%] self-center text-white">
                  <h1 className="mb-6 text-base md:text-6xl">{video.title}</h1>
                  <p className="mb-6 text-xs sm:text-2xl">
                    {video.description}
                  </p>
                </div>
                <FontAwesomeIcon
                  className="self-center text-4xl sm:text-6xl text-primary"
                  icon={faPlay}
                />
              </div>

              <video
                className="object-cover w-full h-full"
                src={video.source}
                muted
              />
            </div>
          ))
        : null}
      <button
        type="button"
        onClick={handleNext}
        className="absolute right-0 z-40 text-white -translate-y-1/2 top-1/2 sm:right-2"
        aria-label="next"
      >
        <FontAwesomeIcon className="text-2xl" icon={faAngleRight} />
      </button>
    </div>
  );
}

BannerCarousel.propTypes = {
  videos: PropTypes.arrayOf({
    created_at: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    isPrivate: PropTypes.number,
    source: PropTypes.string,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

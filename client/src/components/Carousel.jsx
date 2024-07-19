import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  autoplay: true,
  autoplaySpeed: 4000,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  focusOnSelect: true,
  useTransform: true,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 3,
      },
    },
  ],
};

export default function Carousel({ videos, autoplaying }) {
  const navigate = useNavigate();

  return (
    <div className="w-full px-10">
      <Slider
        autoplay={autoplaying}
        autoplaySpeed={settings.autoplaySpeed}
        infinite={settings.infinite}
        slidesToShow={settings.slidesToShow}
        slidesToScroll={settings.slidesToScroll}
        responsive={settings.responsive}
        useTransform={settings.useTransform}
        cssEase={settings.cssEase}
        className="px-6"
      >
        {videos.map((video) => (
          <div
            key={video.id}
            id={video.id}
            className="relative shadow-lg rounded-xl h-[10rem] w-full sm:min-w-[16rem] overflow-hidden cursor-pointer overflow-y-scroll mr-[100px] box-border inline-block sm:mx-4"
            onClick={() => navigate(`/videos/${video.id}`, { state: video })}
            role="presentation"
          >
            {video.isPrivate ? (
              <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black/70">
                <FontAwesomeIcon className="text-white" icon={faLock} />
              </div>
            ) : null}
            <video className="object-cover w-full h-full" src={video.source} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

import Slider from "react-slick";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  // autoplay: true,
  // autoplaySpeed: 10,
  speed: 500,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  // pauseOnHover: true,
  // focusOnSelect: true,
  // adaptiveHeight: true,
  // useTransform: true,
  // cssEase: "linear",
};

export default function Carousel({ videos }) {
  const navigate = useNavigate();

  return (
    <div className="w-full px-10">
      <Slider
        speed={settings.speed}
        infinite={settings.infinite}
        slidesToShow={settings.slidesToShow}
        slidesToScroll={settings.slidesToScroll}
        className="px-6"
      >
        {videos.map((video) => (
          <div
            key={video.id}
            id={video.id}
            className="relative shadow-lg rounded-xl h-[10rem] w-full sm:min-w-[16rem] overflow-hidden cursor-pointer overflow-y-scroll mx-8"
            onClick={() => navigate(`/videos/${video.id}`, { state: video })}
            style={{ marginRight: "40px" }}
            role="presentation"
          >
            {video.isPrivate ? (
              <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black/70">
                <FontAwesomeIcon className="text-white" icon={faLock} />
              </div>
            ) : null}
            <video
              className="object-cover w-full h-full"
              src={video.source}
              muted
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

Carousel.propTypes = {
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

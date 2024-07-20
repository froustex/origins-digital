import PropTypes from "prop-types";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export default function VideoCard({ video }) {
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/dashboard/videos/${video.id}`, { state: video });
    }
  };

  return (
    <div
      className="relative shadow-lg rounded-xl h-[10rem] w-full sm:w-[16rem] overflow-hidden cursor-pointer overflow-y-scroll"
      onClick={() =>
        navigate(`/dashboard/videos/${video.id}`, { state: video })
      }
      onKeyDown={handleKeyDown}
      role="presentation"
    >
      {video?.isPrivate ? (
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black/50">
          <FontAwesomeIcon className="text-gray-900" icon={faLock} />
        </div>
      ) : null}
      <video className="object-cover w-full h-full" src={video.source} muted />
    </div>
  );
}

VideoCard.propTypes = {
  video: PropTypes.shape({
    created_at: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number,
    isPrivate: PropTypes.number,
    source: PropTypes.string,
    thumbnail: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

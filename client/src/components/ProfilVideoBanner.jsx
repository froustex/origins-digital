import { useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../hooks/useAuth";

function ProfilVideoBanner({ title, source, description, id, videoId }) {
  const auth = useAuth();
  const userId = auth.auth.id;
  const navigate = useNavigate();

  const videoRef = useRef();

  useEffect(() => {
    videoRef.current?.load();
  }, [source]);

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${userId}/favorites/${id}`,
        {
          method: "DELETE",
        }
      );
      if (res.status !== 204) {
        throw new Error("A problem occurred while loading the videos.");
      } else {
        navigate(0);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col">
      <video className="relative w-full" ref={videoRef} controls>
        <source src={source} />
      </video>
      <div className="absolute p-4">
        <Link to={`/videos/${videoId}`}>
          <h2 className="text-xs text-white md:text-2xl">{title}</h2>
        </Link>
        <p className="w-3/5 mt-2 text-xs text-white sm:text-sm md:text-base">
          {description}
        </p>
        <button
          type="button"
          className="mt-0"
          aria-label="delete"
          onClick={handleDelete}
        >
          <FontAwesomeIcon
            className="p-2 text-base text-white rounded-full cursor-pointer sm:text-3xl hover:bg-gray-200 hover:text-primary"
            icon={faTrash}
          />
        </button>
      </div>
    </div>
  );
}

export default ProfilVideoBanner;

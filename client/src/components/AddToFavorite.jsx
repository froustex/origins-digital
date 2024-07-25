import { useState } from "react";
import { faHeart, faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";

export default function AddToFavorite({ videoId }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const { auth } = useAuth();

  const handleFavorite = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/videos/${videoId}/favorites`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: auth?.id,
          }),
        }
      );

      if (res.status !== 201) {
        return toast.error("Error while adding to favorite", {
          position: "bottom-right",
        });
      }
      setIsFavorite(true);
      return toast.success("Video added successfully", {
        position: "bottom-right",
      });
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return (
    <div className="flex justify-end">
      {isFavorite ? (
        <FontAwesomeIcon
          className="p-2 text-xs text-gray-700 rounded-full cursor-pointer sm:text-base md:text-xl hover:bg-gray-200 hover:text-primary"
          icon={faHeartCrack}
          title="remove from favorite"
        />
      ) : (
        <FontAwesomeIcon
          className="p-2 text-xs text-gray-700 rounded-full cursor-pointer sm:text-base md:text-xl hover:bg-gray-200 hover:text-red-600"
          icon={faHeart}
          title="add to favorite"
          onClick={handleFavorite}
        />
      )}
    </div>
  );
}

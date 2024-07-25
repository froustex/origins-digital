import { useEffect, useState } from "react";
import { faHeart, faHeartCrack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function AddToFavorite({ videoId }) {
  const [isFav, setIsFav] = useState(false);
  const [favList, setFavList] = useState();

  const { auth } = useAuth();

  useEffect(() => {
    const getFavs = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/${auth.id}/favorites`
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error("Error while getting favorites");
        }
        setFavList(data);
      } catch (error) {
        console.error(error);
      }
    };
    getFavs();
    console.log(favList);
  }, [isFav]);

  const handleAddFavorite = async () => {
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
      setIsFav(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFavorite = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${auth?.id}/favorites/${videoId}`,
        {
          method: "delete",
          credentials: "include",
        }
      );
      if (res.status !== 204) {
        return toast.error("Error while removing from favorite", {
          position: "bottom-right",
        });
      }
      setIsFav(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-end">
      {favList && favList.some((fav) => fav.videoId === videoId) ? (
        <FontAwesomeIcon
          className="p-2 text-xs text-gray-700 rounded-full cursor-pointer sm:text-base md:text-xl hover:bg-gray-200 hover:text-primary"
          icon={faHeartCrack}
          title="remove from favorite"
          onClick={handleRemoveFavorite}
        />
      ) : (
        <FontAwesomeIcon
          className="p-2 text-xs text-red-600 rounded-full cursor-pointer sm:text-base md:text-xl hover:bg-gray-200 hover:text-red-600"
          icon={faHeart}
          title="add to favorite"
          onClick={handleAddFavorite}
        />
      )}
    </div>
  );
}

import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";

export default function AddToFavorite({ videoId }) {
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
      <FontAwesomeIcon
        className="p-2 text-xs text-gray-700 rounded-full cursor-pointer sm:text-base md:text-xl hover:bg-gray-200 hover:text-primary"
        icon={faBookmark}
        title="add to favorite"
        onClick={handleFavorite}
      />
    </div>
  );
}

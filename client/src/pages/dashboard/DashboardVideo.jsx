import { useEffect, useState } from "react";
import { useNavigate, useLoaderData, useRevalidator } from "react-router-dom";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Comments from "../../components/Comments";

export const loader = async ({ params }) => {
  try {
    const [videoData, commentsData, avgRateData] = await Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/api/videos/${params.id}`, {
        credentials: "include",
      }),
      fetch(
        `${import.meta.env.VITE_API_URL}/api/videos/${params.id}/comments`,
        { credentials: "include" }
      ),
      fetch(`${import.meta.env.VITE_API_URL}/api/videos/${params.id}/avgrate`, {
        credentials: "include",
      }),
    ]);
    if (!videoData.ok || !commentsData.ok || !avgRateData.ok) {
      throw new Error("Error while fetching dashboard video data");
    }
    const [video, comments, avgRate] = await Promise.all([
      videoData.json(),
      commentsData.json(),
      avgRateData.json(),
    ]);
    return { video, comments, avgRate };
  } catch (error) {
    throw new Error(error);
  }
};

export default function DashboardVideo() {
  const [formatedDate, setFormatedDate] = useState();

  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();
  const revalidator = useRevalidator();

  const { video, comments, avgRate } = useLoaderData();
  const rate = Object.values(avgRate)[0];

  const [newVideo, setNewVideo] = useState({
    title: video.title,
    description: video.description,
  });

  useEffect(() => {
    const date = new Date(video.created_at);
    setFormatedDate(date.toDateString());
  }, []);

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/videos/${video.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      if (res.status !== 204) {
        throw new Error("Probleme while deleting a video");
      } else {
        navigate("/dashboard/videos", 0);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/videos/${video.id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newVideo),
        }
      );
      if (!res.ok) {
        throw new Error("Error updating video");
      }
      const updatedVideo = res.status !== 204 ? await res.json() : newVideo;
      setNewVideo(updatedVideo);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
    }
    return revalidator.revalidate();
  };

  return isEditing ? (
    <form onSubmit={handleUpdate} className="flex flex-col w-full gap-8 mt-8">
      <div>
        <label htmlFor="title">Title</label>
        <input
          className="px-2 py-2 rounded-lg"
          type="text"
          id="title"
          value={newVideo.title}
          onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          className="px-2 py-2 resize-none min-h-[8rem]"
          id="description"
          value={newVideo.description}
          onChange={(e) =>
            setNewVideo({ ...newVideo, description: e.target.value })
          }
        />
      </div>
      <button
        className="bg-gray-300 button"
        type="button"
        onClick={handleEditToggle}
      >
        Cancel
      </button>
      <button className="bg-gray-300 button" type="submit">
        Update Video
      </button>
    </form>
  ) : (
    <section className="page">
      <div>
        <h1 className="mb-4 sm:mb-8">{newVideo.title}</h1>
        <div className="w-full mb-2 rounded-lg overflow-hidden sm:mb-4">
          <video className="min-w-full max-h-[25rem] rounded-lg" controls>
            <track kind={newVideo.description} />
            <source src={video.source} />
          </video>
        </div>
        <div className="flex justify-end mb-4">
          <FontAwesomeIcon
            className="p-2 text-xs text-gray-700 rounded-full cursor-pointer sm:text-base hover:bg-gray-200 hover:text-primary"
            icon={faPen}
            onClick={handleEditToggle}
          />
          <FontAwesomeIcon
            className="p-2 text-xs text-gray-700 rounded-full cursor-pointer sm:text-base hover:bg-gray-200 hover:text-primary"
            icon={faTrash}
            onClick={handleDelete}
          />
        </div>
        <section className="flex flex-col p-4 mb-2 bg-gray-200 rounded-lg sm:mb-4 md:mb-6">
          <h2 className="mb-2 text-sm font-semibold sm:text-lg">Description</h2>
          <p className="text-sm sm:text-base">{video.description}</p>
          <p className="mt-4 text-sm text-gray-500 sm:mt-6 sm:text-base">
            {formatedDate}
          </p>
          <p className="text-sm sm:text-base">Average User Rating : {rate}</p>
        </section>
      </div>
      <Comments comments={comments} />
    </section>
  );
}

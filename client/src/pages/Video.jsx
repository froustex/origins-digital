import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AddToFavorite from "../components/AddToFavorite";
import { useAuth } from "../hooks/useAuth";

export const loader = async ({ params }) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/videos/${params.id}`
    );
    if (!res.ok) {
      throw new Error("Error while fetching videos");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default function Video() {
  const [formatedDate, setFormatedDate] = useState();

  const { auth } = useAuth();
  const video = useLoaderData();

  useEffect(() => {
    const date = new Date(video.created_at);
    setFormatedDate(date.toDateString());
  }, []);

  return (
    <section className="page">
      <h1 className="mb-4 sm:mb-8">{video.title}</h1>
      {video.isPrivate && !auth ? (
        <div className="w-full flex items-center justify-center bg-black/70 mb-2 rounded-lg min-h-[200px]  sm:min-h-[400px] verflow-hidden sm:mb-4">
          <FontAwesomeIcon
            className="text-xl text-white sm:text-4xl"
            icon={faLock}
          />
        </div>
      ) : (
        <div className="w-full mb-2 rounded-lg verflow-hidden">
          <video className="min-w-full max-h-[25rem] rounded-lg" controls>
            <track kind={video.description} />
            <source src={video.source} />
          </video>
        </div>
      )}
      {video.isPrivate && !auth ? (
        <section className="flex items-center pb-4 border-b border-gray-300">
          <FontAwesomeIcon
            className="text-xl text-gray-400 sm:text-2xl"
            icon={faLock}
          />
          <h2 className="ml-4 text-sm text-gray-400 md:text-base">
            Content is Private log in to see all the videos
          </h2>
        </section>
      ) : null}
      {auth ? <AddToFavorite videoId={video.id} /> : null}
      <section className="flex flex-col p-4 mb-2 bg-gray-200 rounded-lg sm:mb-4 md:mb-6">
        <h2 className="mb-2 text-sm font-semibold sm:text-lg">Description</h2>
        <p className="text-sm sm:text-base">{video.description}</p>
        <p className="mt-4 text-sm text-gray-500 sm:mt-6 sm:text-base">
          {formatedDate}
        </p>
      </section>
      <ToastContainer />
    </section>
  );
}

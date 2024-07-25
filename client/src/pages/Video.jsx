import { useState, useEffect } from "react";
import { useLocation, useLoaderData } from "react-router-dom";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../hooks/useAuth";

export const loader = async ({ params }) => {
  try {
    const [avgData, commentsData] = await Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/api/videos/${params.id}/avgrate`),
      fetch(`${import.meta.env.VITE_API_URL}/api/videos/${params.id}/comments`),
    ]);
    if (!avgData.ok || !commentsData.ok) {
      throw new Error("Failed to fetch data!");
    }
    const [avg, comments] = await Promise.all([
      avgData.json(),
      commentsData.json(),
    ]);
    return { avg, comments };
  } catch (error) {
    console.error("Error loading data: ", error);
    throw error;
  }
};

export default function Video() {
  const [formatedDate, setFormatedDate] = useState();

  const { auth } = useAuth();
  const { state } = useLocation();

  const { avg, comments } = useLoaderData();
  const avgData = Object.values(avg);

  useEffect(() => {
    const date = new Date(state.created_at);
    setFormatedDate(date.toDateString());
  }, []);

  return (
    <section className="page">
      <h1 className="mb-4 sm:mb-8">{state.title}</h1>
      {state.isPrivate && !auth ? (
        <div className="w-full flex items-center justify-center bg-black/70 mb-2 rounded-lg min-h-[200px]  sm:min-h-[400px] verflow-hidden sm:mb-4">
          <FontAwesomeIcon
            className="text-xl text-white sm:text-4xl"
            icon={faLock}
          />
        </div>
      ) : (
        <div className="w-full mb-2 rounded-lg verflow-hidden sm:mb-4">
          <video className="min-w-full max-h-[25rem] rounded-lg" controls>
            <track kind={state.description} />
            <source src={state.source} />
          </video>
        </div>
      )}
      {state.isPrivate && !auth ? (
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
      <section className="flex flex-col p-4 mb-2 bg-gray-200 rounded-lg sm:mb-4 md:mb-6">
        <h2 className="mb-2 text-sm font-semibold sm:text-lg">Description</h2>
        <p className="text-sm sm:text-base">{state.description}</p>
        <p className="mt-4 text-sm text-gray-500 sm:mt-6 sm:text-base">
          {formatedDate}
        </p>
        <p className="text-sm sm:text-base">Average User Rating : {avgData}</p>
      </section>
      {comments[0].map((comment) => (
        <div key={comment.id}>
          <p>{comment.comment}</p>
          <p>{comment.username}</p>
          <p>{new Date(comment.created_at).toDateString()}</p>
        </div>
      ))}
    </section>
  );
}

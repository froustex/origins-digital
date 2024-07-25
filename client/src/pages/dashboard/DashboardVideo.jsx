import { useEffect, useState } from "react";
import { useLocation, useNavigate, useLoaderData } from "react-router-dom";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DashboardVideo() {
  const [formatedDate, setFormatedDate] = useState();

  const { state } = useLocation();
  const navigate = useNavigate();

  const data = useLoaderData();
  const comments = data.comments[0];
  const avgRate = Object.values(data.avg);

  useEffect(() => {
    const date = new Date(state.created_at);
    setFormatedDate(date.toDateString());
  }, []);

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/videos/${state.id}`,
        {
          method: "DELETE",
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

  return (
    <section className="page">
      <div>
        <h1 className="mb-4 sm:mb-8">{state.title}</h1>
        <div className="w-full mb-2 rounded-lg verflow-hidden sm:mb-4">
          <video className="min-w-full max-h-[25rem] rounded-lg" controls>
            <track kind={state.description} />
            <source src={state.source} />
          </video>
        </div>
        <div className="flex justify-end mb-4">
          <FontAwesomeIcon
            className="p-2 text-xs text-gray-700 rounded-full cursor-pointer sm:text-base hover:bg-gray-200 hover:text-primary"
            icon={faPen}
          />
          <FontAwesomeIcon
            className="p-2 text-xs text-gray-700 rounded-full cursor-pointer sm:text-base hover:bg-gray-200 hover:text-primary"
            icon={faTrash}
            onClick={handleDelete}
          />
        </div>
        <section className="flex flex-col p-4 mb-2 bg-gray-200 rounded-lg sm:mb-4 md:mb-6">
          <h2 className="mb-2 text-sm font-semibold sm:text-lg">Description</h2>
          <p className="text-sm sm:text-base">{state.description}</p>
          <p className="mt-4 text-sm text-gray-500 sm:mt-6 sm:text-base">
            {formatedDate}
          </p>
          <p className="text-sm sm:text-base">
            Average User Rating : {avgRate}
          </p>
        </section>
      </div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.comment}</p>
          <p>{comment.username}</p>
          <p>{new Date(comment.created_at).toDateString()}</p>
        </div>
      ))}
    </section>
  );
}

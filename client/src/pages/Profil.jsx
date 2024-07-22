import { useLoaderData } from "react-router-dom";
import photo from "../assets/images/profil-photo.png";
import edit from "../assets/images/profil-edit-icon.svg";

export async function getVideos() {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/videos`);
  if (!res.ok) {
    throw new Error("Failed to fetch videos");
  }
  const data = await res.json();
  return data;
}

export function loader() {
  return getVideos();
}

export default function Profil() {
  const videos = useLoaderData();

  return (
    <main>
      <section className="flex items-center justify-center w-full gap-4 h-60 bg-zinc-900">
        <div className="">
          <img src={photo} alt="profil" />
        </div>
        <div>
          <h1 className="text-white">Juliette</h1>
          <div className="flex gap-2">
            <p className="text-white">juliett@mail.com</p>
            <img src={edit} alt="" />
          </div>
        </div>
      </section>
      <section className="w-full">
        <div className="flex flex-wrap gap-2 w-96 h-96">
          {videos.map((video) => (
            <div key={video.id} className="rounded">
              <div className="flex flex-col items-start justify-center h-56 rounded">
                <video className="rounded max-h-64 w-80" controls>
                  <source src={video.source} />
                </video>
                <p className="font-semibold text-black text-l">{video.title}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="w-2/4 h-2/4" />
      </section>
    </main>
  );
}

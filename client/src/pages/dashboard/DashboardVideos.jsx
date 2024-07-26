import { useLoaderData } from "react-router-dom";
import VideoCard from "../../components/VideoCard";

export const loader = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/videos`);
    const data = await res.json();
    if (res.status !== 200) {
      throw new Error("Problem while fetching videos");
    }
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export default function DashboardVideos() {
  const videos = useLoaderData();
  return (
    <div className="page">
      <select
        className="p-2 border-2 border-gray-200 rounded-lg h-fit w-fit"
        name="filter"
      >
        <option value="">category</option>
      </select>
      <div className="flex flex-wrap w-full gap-4 h-fit">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}

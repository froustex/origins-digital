import VideoCard from "../../components/dashboard/VideoCard";

export default function DashboardVideos() {
  return (
    <div className="page">
      <select
        className="p-2 border-2 border-gray-200 rounded-lg h-fit w-fit"
        name="filter"
      >
        <option value="">category</option>
      </select>
      <div className="flex flex-wrap w-full gap-8 h-fit">
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
      </div>
    </div>
  );
}

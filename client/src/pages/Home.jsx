import { useLoaderData } from "react-router-dom";
import Carousel from "../components/Carousel";
import BannerCarousel from "../components/BannerCarousel";

export const loader = async () => {
  try {
    const [videosData, bestVideosData] = await Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/api/videos`, {
        credentials: "include",
      }),
      fetch(`${import.meta.env.VITE_API_URL}/api/videos/best`, {
        credentials: "include",
      }),
    ]);
    if (!videosData.ok || !bestVideosData.ok) {
      throw new Error("Error while fetching dashboard video data");
    }
    const [videos, bestVideos] = await Promise.all([
      videosData.json(),
      bestVideosData.json(),
    ]);
    return { videos, bestVideos };
  } catch (error) {
    throw new Error(error);
  }
};

export default function Home() {
  const { videos, bestVideos } = useLoaderData();
  const lastAddedVideos = videos.slice(0, 5);

  return (
    <div className="relative px-6 py-6 bg-zinc-900 sm:py-8">
      <BannerCarousel videos={bestVideos} />
      <section className="w-full mb-8 sm:mb-12">
        <h2 className="mb-4 text-xl text-white sm:mb-6">Last added videos</h2>
        <Carousel videos={lastAddedVideos} autoplaying />
      </section>
      <section className="w-full">
        <select
          className="p-1 mb-4 border-2 border-gray-200 rounded-lg h-fit w-fit"
          name="filter"
        >
          <option value="">category</option>
        </select>
        <h2 className="mb-4 text-xl text-white sm:mb-6">Filtered Category</h2>
        <Carousel videos={videos} autoplaying={false} />
      </section>
    </div>
  );
}

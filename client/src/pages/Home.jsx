import { useLoaderData } from "react-router-dom";
import Carousel from "../components/Carousel";
import BannerCarousel from "../components/BannerCarousel";

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

export default function Home() {
  const videos = useLoaderData();

  return (
    <div className="relative px-6 py-6 bg-zinc-900 sm:py-8">
      <BannerCarousel videos={videos} />
      <section className="w-full mb-8 sm:mb-12">
        <h2 className="mb-4 text-xl text-white sm:mb-6">Last added videos</h2>
        <Carousel videos={videos} autoplaying />
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

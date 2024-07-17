import { Carousel } from "react-responsive-carousel";
import ReactPlayer from "react-player";
import { useLoaderData } from "react-router-dom";
import HeroCarousel from "../components/HeroCarousel";

export default function Home() {
  const videos = useLoaderData();

  return (
    <main className="bg-zinc-900">
      <div>
        <HeroCarousel videos={videos} />
      </div>
      <container className="bg-zinc-900">
        <h2 className="text-cyan-400">Category A</h2>
        <div>
          <Carousel
            className="flex w-40"
            showStatus={false}
            centerMode
            centerSlidePercentage={25}
          >
            {videos.map((video) => (
              <ReactPlayer key={video.id} url={video.source} controls />
            ))}
          </Carousel>
        </div>
      </container>
    </main>
  );
}

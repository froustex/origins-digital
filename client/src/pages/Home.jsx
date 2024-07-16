import { Carousel } from "react-responsive-carousel";
import ReactPlayer from "react-player";
import HeroCarousel from "../components/HeroCarousel";
import videos from "../components/videos";

export default function Home() {
  return (
    <main className="bg-zinc-900">
      <div>
        <HeroCarousel />
      </div>
      <div className="bg-zinc-900">
        <h2 className="text-cyan-400">Recently Added</h2>
        <div className="gap-2.5">
          <Carousel showStatus={false} centerMode centerSlidePercentage={25}>
            {videos.map((video) => (
              <ReactPlayer key={video.id} url={video.source} controls />
            ))}
          </Carousel>
        </div>
      </div>
    </main>
  );
}

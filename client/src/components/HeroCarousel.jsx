import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import ReactPlayer from "react-player";
import { Carousel } from "react-responsive-carousel";
import videos from "./videos";

export default function Slider() {
  return (
    <main>
      <Carousel
        interval={6000}
        showIndicators={false}
        showStatus={false}
        infiniteLoop
      >
        {videos.map((slide) => (
          <div key={slide.id}>
            <ReactPlayer
              light
              playing
              width="100%"
              url={slide.source}
              pip={false}
              controls
              muted
            />
            {/* <div className={styles.heroText}>
                <h3>{slide.title}</h3>
                <p>{slide.description}</p>
              </div> */}
          </div>
        ))}
      </Carousel>
    </main>
  );
}

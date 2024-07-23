import { useEffect, useRef } from "react";

function ProfilVideoBanner({ title, source, description }) {
  const videoRef = useRef();

  useEffect(() => {
    videoRef.current?.load();
  }, [source]);

  return (
    <div className="flex flex-col">
      <video className="relative" ref={videoRef} controls>
        <source src={source} />
      </video>
      <h2 className="absolute text-xl text-primary">{title}</h2>
      <p className="absolute text-white">{description}</p>
    </div>
  );
}

export default ProfilVideoBanner;

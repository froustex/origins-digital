import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function VideoCard() {
  return (
    <div className="relative shadow-lg rounded-xl h-[10rem] w-full sm:w-[16rem] overflow-hidden">
      <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black/50">
        <FontAwesomeIcon className="text-gray-900" icon={faLock} />
      </div>
      <video className="object-cover w-full h-full" muted />
    </div>
  );
}

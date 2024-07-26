import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function AddRates({ stars }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  function handleClick(getCurrentIndex) {
    setRating(getCurrentIndex);
  }

  function handleMouseEnter(getCurrentIndex) {
    setHover(getCurrentIndex);
  }

  function handleMouseLeave() {
    setHover(rating);
  }

  return (
    <div className="flex items-center gap-4">
      {[...Array(stars)].map((_, id) => {
        const star = id + 1;

        return (
          <FontAwesomeIcon
            icon={faStar}
            key={star}
            className={
              star <= (hover || rating)
                ? `text-yellow-600 text-xl`
                : `text-xl text-black`
            }
            onClick={() => handleClick(star)}
            onMouseMove={() => handleMouseEnter(star)}
            onMouseLeave={() => handleMouseLeave()}
            size={40}
          />
        );
      })}
    </div>
  );
}

export default AddRates;

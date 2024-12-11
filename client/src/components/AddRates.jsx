import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function AddRates({ stars }) {
  const { auth } = useAuth();
  const userId = auth.id;
  const { id } = useParams();
  const [rate, setRate] = useState();
  const [hover, setHover] = useState(0);

  async function refreshRate() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${userId}/videos/${id}/rate`,
        { credentials: "include" }
      );
      const newRate = await response.json();
      if (!response.ok) {
        throw new Error("Failing fetching data");
      } else {
        return setRate(newRate.rating);
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async function handleClick(e, getCurrentIndex) {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/videos/rates`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            rating: getCurrentIndex,
            userId,
            id,
          }),
          credentials: "include",
        }
      );
      if (response.status !== 201) {
        throw new Error("error while sending rate");
      }
    } catch (err) {
      console.error(err);
    }
  }
  refreshRate();

  function handleMouseEnter(getCurrentIndex) {
    setHover(getCurrentIndex);
  }

  function handleMouseLeave() {
    setHover(rate);
  }

  return (
    <div className="flex items-center gap-4">
      {[...Array(stars)].map((_, index) => {
        const star = index + 1;

        return (
          <FontAwesomeIcon
            icon={faStar}
            key={star}
            className={
              star <= (hover || rate)
                ? `text-yellow-600 text-xl`
                : `text-xl text-black`
            }
            onClick={(e) => handleClick(e, star)}
            onMouseMove={() => handleMouseEnter(star)}
            onMouseLeave={() => handleMouseLeave()}
            size={40}
            value={rate}
          />
        );
      })}
    </div>
  );
}

export default AddRates;

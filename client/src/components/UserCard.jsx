import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserCard({ user }) {
  const [formatedDate, setFormatedDate] = useState();

  useEffect(() => {
    const date = new Date(user.created_at);
    setFormatedDate(date.toDateString());
  }, []);

  return (
    <div className="flex justify-between w-full gap-4 px-4 py-2 shadow-lg rounded-xl h-fit sm:w-fit">
      <div className="flex items-center">
        <img
          className="w-8 h-8 rounded-full bg-primary"
          src={user.avatar}
          alt="avatar"
        />
        <div className="ml-2">
          <p>{user.username}</p>
          <p>{user.email}</p>
          <p>{formatedDate}</p>
        </div>
      </div>
      <div>
        <button type="button">
          <FontAwesomeIcon
            className="hover:text-primary"
            aria-label="edit"
            icon={faPen}
          />
        </button>
        <button type="button">
          <FontAwesomeIcon
            className="hover:text-primary"
            aria-label="delete"
            icon={faTrash}
          />
        </button>
      </div>
    </div>
  );
}

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.string,
    created_at: PropTypes.string,
  }).isRequired,
};

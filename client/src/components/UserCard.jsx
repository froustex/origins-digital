import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/images/avatar.png";

export default function UserCard({ user }) {
  const [formatedDate, setFormatedDate] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const date = new Date(user.created_at);
    setFormatedDate(date.toDateString());
  }, []);

  const handleDelete = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/${user.id}`,
        {
          method: "DELETE",
        }
      );
      if (res.status === 204) {
        navigate(0);
      }
    } catch (err) {
      throw new Error("error while trying to delete user");
    }
  };

  return (
    <div className="flex justify-between w-full gap-4 px-4 py-2 shadow-lg rounded-xl h-fit sm:w-fit sm:min-w-[18.75rem]">
      <div className="flex items-center">
        <img
          className="w-8 h-8 rounded-full bg-primary"
          src={avatar}
          alt="avatar"
        />
        <div className="ml-2">
          <p>{user.username}</p>
          <p>{user.email}</p>
          <p>{formatedDate}</p>
        </div>
      </div>
      <div>
        <button type="button" onClick={handleDelete}>
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

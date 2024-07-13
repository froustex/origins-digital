import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UserCard() {
  return (
    <div className="flex justify-between px-4 py-2 shadow-lg rounded-xl h-fit">
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full bg-primary" />
        <div className="ml-2">
          <p>user1</p>
          <p>user@mail.com</p>
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

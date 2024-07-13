import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NavModal({ openNavModal, setOpenNavModal }) {
  return (
    <div
      className={
        openNavModal
          ? `absolute top-0 left-0 z-50 flex flex-col items-center justify-center w-screen h-screen py-4 text-2xl bg-background`
          : `hidden`
      }
    >
      <FontAwesomeIcon
        className="absolute text-white cursor-pointer top-5 right-5 hover:text-primary"
        icon={faXmark}
        onClick={() => setOpenNavModal(false)}
      />
      <ul className="flex flex-col items-center justify-center w-full gap-12 text-white">
        <li>
          <NavLink
            className="hover:text-primary"
            to="/dashboard"
            onClick={() => setOpenNavModal(false)}
          >
            Users
          </NavLink>
        </li>
        <li>
          <NavLink
            className="hover:text-primary"
            to="/dashboard/videos"
            onClick={() => setOpenNavModal(false)}
          >
            Videos
          </NavLink>
        </li>
        <li>
          <NavLink
            className="hover:text-primary"
            to="/dashboard/addVideo"
            onClick={() => setOpenNavModal(false)}
          >
            Add video
          </NavLink>
        </li>
      </ul>
      <button
        className="inline-block mt-8 text-2xl text-white hover:text-black"
        type="button"
      >
        Logout
      </button>
    </div>
  );
}

NavModal.propTypes = {
  openNavModal: PropTypes.bool.isRequired,
  setOpenNavModal: PropTypes.func.isRequired,
};

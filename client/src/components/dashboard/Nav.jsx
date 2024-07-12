import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

export default function Nav({ setOpenNavModal, title }) {
  return (
    <nav className="flex items-center justify-between p-4">
      <FontAwesomeIcon
        className="text-xl cursor-pointer"
        icon={faBars}
        onClick={() => setOpenNavModal(true)}
      />
      <p>{title}</p>
      <div className="w-8 h-8 rounded-full bg-primary" />
    </nav>
  );
}

Nav.propTypes = {
  setOpenNavModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

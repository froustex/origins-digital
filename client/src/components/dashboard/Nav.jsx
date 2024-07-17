import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Nav({ setOpenNavModal }) {
  const [title, setTitle] = useState();

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/dashboard") {
      setTitle("users");
    } else {
      setTitle(location.pathname.slice(11));
    }
  }, [location.pathname]);

  return (
    <nav className="flex items-center justify-between h-full p-4">
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
};

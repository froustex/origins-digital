import PropTypes from "prop-types";
import Nav from "./Nav";

export default function Header({ openNavModal, setOpenNavModal }) {
  return (
    <header className="block sm:hidden">
      <Nav openNavModal={openNavModal} setOpenNavModal={setOpenNavModal} />
    </header>
  );
}

Header.propTypes = {
  openNavModal: PropTypes.bool.isRequired,
  setOpenNavModal: PropTypes.func.isRequired,
};

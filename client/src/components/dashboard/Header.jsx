import PropTypes from "prop-types";
import Nav from "./Nav";

export default function Header({ openNavModal, setOpenNavModal, title }) {
  return (
    <header className="block sm:hidden">
      <Nav
        openNavModal={openNavModal}
        setOpenNavModal={setOpenNavModal}
        title={title}
      />
    </header>
  );
}

Header.propTypes = {
  openNavModal: PropTypes.bool.isRequired,
  setOpenNavModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

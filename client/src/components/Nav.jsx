import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/origins-digital-logo.png";
import avatar from "../assets/images/avatar.png";
import NavModal from "./NavModal";
import { useAuth } from "../hooks/useAuth";

export default function Nav() {
  const [showModal, setShowModal] = useState(false);

  const { auth } = useAuth();

  useEffect(() => {}, [auth]);

  return (
    <>
      <NavModal showModal={showModal} setShowModal={setShowModal} />
      <nav className="flex items-center justify-between px-5 py-5 text-white bg-black/80 backdro-blur-sm">
        <img className="w-24" src={logo} alt="origins-digital-logo" />
        <div className="hidden smallScreen:flex smallScreen:items-center smallScreen:gap-12">
          <input
            className="hidden text-white md:block sm:h-fit sm:self-center sm:p-1 sm:px-4 sm:placeholder-white sm:rounded-lg sm:bg-primary"
            type="text"
            placeholder="Search"
          />
          <ul className="flex items-center gap-5">
            <li>
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/videos">
                Videos
              </NavLink>
            </li>
            <li>
              <NavLink className="nav-link" to="/about">
                About Us
              </NavLink>
            </li>
          </ul>
        </div>
        {auth ? (
          <div className="hidden smallScreen:flex smallScreen:items-center">
            <NavLink className="mr-4 nav-link" to="/profil">
              {auth?.username}
            </NavLink>
            <img className="w-10 h-10" src={avatar} alt="profil avatar" />
          </div>
        ) : (
          <div className="hidden smallScreen:flex smallScreen:items-center">
            <NavLink className="mr-4 nav-link" to="/login">
              Login
            </NavLink>
            <NavLink className="mr-4 nav-link" to="/register">
              Register
            </NavLink>
          </div>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          className="cursor-pointer smallScreen:hidden"
          onClick={() => setShowModal(true)}
        >
          <path
            fill="currentColor"
            d="M4 18q-.425 0-.712-.288T3 17t.288-.712T4 16h16q.425 0 .713.288T21 17t-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12t.288-.712T4 11h16q.425 0 .713.288T21 12t-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z"
          />
        </svg>
      </nav>
    </>
  );
}

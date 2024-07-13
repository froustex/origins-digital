import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import {
  faArrowUpFromBracket,
  faRightFromBracket,
  faTv,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../../components/dashboard/Header";
import NavModal from "../../components/dashboard/NavModal";
import logo from "../../assets/images/origins-digital-logo.png";

export default function Dashboard() {
  const [openNavModal, setOpenNavModal] = useState(false);

  return (
    <>
      <NavModal openNavModal={openNavModal} setOpenNavModal={setOpenNavModal} />
      <Header openNavModal={openNavModal} setOpenNavModal={setOpenNavModal} />
      <main className="flex h-screen pb-16 overflow-y-scroll sm:pb-0">
        <aside className="hidden sm:w-[15%] sm:py-6 sm:px-4 sm:flex sm:flex-col sm:justify-between sm:h-full sm:bg-background">
          <div className="flex flex-col items-start justify-center">
            <div className="mb-16 ">
              <img src={logo} alt="log" />
            </div>
            <ul className="flex flex-col justify-center gap-8 text-sm font-semibold text-white">
              <li>
                <NavLink className="hover:text-primary/60" to="/dashboard">
                  <FontAwesomeIcon className="mr-4 text-xl" icon={faUser} />
                  <span className="hidden sm:inline">Users</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="hover:text-primary/60"
                  to="/dashboard/videos"
                >
                  <FontAwesomeIcon className="mr-4 text-xl" icon={faTv} />
                  <span className="hidden sm:inline">Videos</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="hover:text-primary/60"
                  to="/dashboard/addVideo"
                >
                  <FontAwesomeIcon
                    className="mr-4 text-xl"
                    icon={faArrowUpFromBracket}
                  />
                  <span className="hidden sm:inline">Add video</span>
                </NavLink>
              </li>
            </ul>
          </div>
          <button
            className="p-0 text-base text-white hover:text-black text-start"
            type="button"
          >
            <FontAwesomeIcon
              className="mr-4 text-xl"
              icon={faRightFromBracket}
            />
            Log out
          </button>
        </aside>
        <Outlet />
      </main>
    </>
  );
}

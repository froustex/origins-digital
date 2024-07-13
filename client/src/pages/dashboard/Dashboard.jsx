import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import Header from "../../components/dashboard/Header";
import NavModal from "../../components/dashboard/NavModal";

export default function Dashboard() {
  const [openNavModal, setOpenNavModal] = useState(false);

  return (
    <>
      <NavModal openNavModal={openNavModal} setOpenNavModal={setOpenNavModal} />
      <Header openNavModal={openNavModal} setOpenNavModal={setOpenNavModal} />
      <main className="flex h-screen">
        <aside className="hidden sm:w-[15%] sm:p-4 sm:py-6 sm:flex sm:flex-col sm:justify-between sm:h-full sm:bg-background">
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center mb-16">
              <div className="w-12 h-12 mb-4 rounded-full bg-primary" />
              <p className="text-primary">Username</p>
            </div>
            <ul className="flex flex-col items-center justify-center gap-8 text-sm text-white md:text-lg">
              <li>
                <NavLink className="hover:text-primary">Users</NavLink>
              </li>
              <li>
                <NavLink className="hover:text-primary">Videos</NavLink>
              </li>
              <li>
                <NavLink className="hover:text-primary">Add video</NavLink>
              </li>
            </ul>
          </div>
          <button className="text-white hover:text-black" type="button">
            Log out
          </button>
        </aside>
        <Outlet />
      </main>
    </>
  );
}

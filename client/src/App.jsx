import { Outlet, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  const { pathname } = useLocation();

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Header />
      <main
        className={
          pathname === "/"
            ? `min-h-full overflow-scroll sm:block`
            : `flex grow min-h-full overflow-scroll sm:block`
        }
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;

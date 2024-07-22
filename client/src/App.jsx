import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <div className="flex flex-col justify-between min-h-screen sm:block">
      <Header />
      <main className="min-h-full overflow-y-scroll ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;

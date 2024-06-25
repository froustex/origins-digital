import { NavLink } from "react-router-dom";
import logo from "../assets/images/origins-digital-logo.png";

export default function Nav() {
  return (
    <nav>
      <div>
        <img src={logo} alt="origins-digital-logo" />
        <div>
          <input type="text" placeholder="Search" />
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/videos">Videos</NavLink>
            </li>
            <li>
              <NavLink to="/about">About Us</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

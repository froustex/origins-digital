import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/videos",
      },
      {
        path: "/about",
      },
      {
        path: "/profil",
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    action: async ({ request }) => {
      const formData = await request.formData();
      const email = formData.get("email");
      const password = formData.get("password");
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
          console.error(response);
        }
      } catch (err) {
        console.error(err);
      }
      return redirect("/");
    },
  },
  {
    path: "/register",
    element: <Register />,
    action: async ({ request }) => {
      const formData = await request.formData();
      const username = formData.get("username");
      const email = formData.get("email");
      const password = formData.get("password");

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username,
              email,
              password,
              isAdmin: false,
              avatar:
                "https://www.flaticon.com/free-icon/panda_1326377?term=avatar&page=1&position=25&origin=search&related_id=1326377",
            }),
          }
        );
        if (!response.ok) {
          console.error(response);
        }
      } catch (err) {
        console.error(err);
      }
      return redirect("/login");
    },
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

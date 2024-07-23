import { useEffect, useRef } from "react";
import {
  Link,
  Form,
  useNavigate,
  useActionData,
  useNavigation,
} from "react-router-dom";
import logo from "../assets/images/origins-digital-logo.png";
import { useAuth } from "../hooks/useAuth";

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      console.error(response);
    }
    const data = await response.json();
    const userData = {
      id: data?.user?.id,
      username: data?.user?.username,
      isAdmin: data?.user?.is_admin,
      avatar: data?.user?.avatar,
    };
    localStorage.setItem("username", JSON.stringify(userData));
    return userData;
  } catch (err) {
    console.error(err);
    return null;
  }
}

function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const actionData = useActionData();

  const actionData = useActionData();
  const emailRef = useRef();
  const navigation = useNavigation();
  const isSbumitting = navigation.state === "submitting";

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    if (actionData) {
      setAuth(actionData);
      navigate("/", { replace: true });
    }
  }, [actionData, setAuth, navigate]);

  return (
    <main className="relative flex flex-col items-center justify-center h-screen overflow-hidden bg-black lg:flex-row">
      <Link to="/" className="mt-16">
        <img
          src={logo}
          className="block h-auto mt-4 lg:hidden w-36 smallScreen:w-44"
          alt="origin digital logo"
        />
      </Link>
      <section className="h-full w-full md:mt-4 lg:w-[45%] min-h-[400px] flex flex-col justify-center items-center p-4 px-8 md:px-16 lg:pl-16 bg-black">
        <Form
          method="POST"
          className="flex flex-col w-full max-w-[650px] pb-4 max-h-[800px]"
        >
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              className="formInput"
              name="email"
              type="email"
              id="email"
              ref={emailRef}
              autoComplete="off"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              className="formInput"
              name="password"
              type="password"
              id="password"
              required
            />
          </div>

          <button
            type="submit"
            className={isSbumitting ? `bg-gray-300` : `bg-primary`}
            disabled={isSbumitting}
          >
            {isSbumitting ? "Logging in..." : "Login"}
          </button>
        </Form>
        <p className="text-white">
          Don't you have an accout ?{" "}
          <Link className="text-primary" to="/register">
            Register
          </Link>
        </p>
      </section>
      <div className="img-container">
        <div className="absolute right-[260px] top-[100px] w-[200px]">
          <img src={logo} alt="origin digital logo" />
          <span className="inline-block mt-8 text-4xl font-bold text-primary">
            Ready <br />
            To Watch
          </span>
        </div>
      </div>
    </main>
  );
}

export default Login;

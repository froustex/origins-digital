import { useEffect, useRef } from "react";
import { Link, Form } from "react-router-dom";
import logo from "../assets/images/origins-digital-logo.png";

function Login() {
  const emailRef = useRef();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

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

          <button type="submit">Login</button>
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

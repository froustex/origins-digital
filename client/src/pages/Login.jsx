import { useEffect, useRef } from "react";
import { Link, Form } from "react-router-dom";
import logo from "../assets/images/origins-digital-logo.png";

function Login() {
  const emailRef = useRef();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <main className="flex flex-col relative items-center justify-center lg:flex-row h-screen bg-black overflow-hidden">
      <Link to="/" className="mt-16">
        <img
          src={logo}
          className="block lg:hidden h-auto  w-36 smallScreen:w-44 mt-4"
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
          <Link className="text-primary" to="/login">
            Sign Up
          </Link>
        </p>
      </section>
      <div className="img-container">
        <div className="absolute right-[260px] top-[100px] w-[200px]">
          <img src={logo} alt="origin digital logo" />
          <span className="inline-block text-primary text-4xl font-bold mt-8">
            Ready <br />
            To Watch
          </span>
        </div>
      </div>
    </main>
  );
}

export default Login;

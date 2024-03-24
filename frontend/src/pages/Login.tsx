import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  return (
    <div className="flex justify-center items-center w-full h-full absolute top-0 bottom-0">
      <div className="flex flex-col justify-center items-center w-[400px] sm:w-[500px] h-fit mx-auto px-5 my-auto py-10 border border-gray-300 shadow-lg rounded relative">
        <h1 className="absolute top-2 left-2 font-semibold">Welcome</h1>
        <h1 className="text-2xl font-bold my-3">Login</h1>
        <form className="flex flex-col space-y-3 mt-5 max-h-full">
          <input
            type="email"
            className="p-2 w-72 border border-gray-300 rounded focus:outline-none focus:border-cyan-500 transition-all duration-200 shadow-md"
            required
            value={user.email}
            placeholder="Email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          {/* {errors.username && touched.username && (
            <p className="text-red-500 text-xs">{errors.username}</p>
          )} */}
          <input
            type="password"
            className="p-2 w-72 border border-gray-300 rounded focus:outline-none focus:border-cyan-500 transition-all duration-200 shadow-md"
            required
            value={user.password}
            placeholder="Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          {/* {errors.confirmPassword && touched.confirmPassword && (
            <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
          )} */}

          <button className="p-2 bg-green-500 text-white rounded transition-all duration-200 hover:scale-105 font-bold w-full">
            Login
          </button>

          <p className="text-xs text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-cyan-500 hover:underline hover:font-bold transition-all duration-200"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

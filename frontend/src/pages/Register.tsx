import { useState } from "react";
import validateForm from "../utils/validator";
import { Link } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [touched, setTouched] = useState({
    username: false,
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });
  const errors = validateForm(user);

  const handleBlur = (field: string) => () => {
    setTouched({ ...touched, [field]: true });
  };

  return (
    <div className="flex justify-center items-center w-full max-h-screen overflow-auto h-full absolute top-0 bottom-0">
      <div className="flex flex-col justify-start items-center w-[400px] sm:w-[500px] h-fit mx-auto px-5 my-auto py-10 border border-gray-300 shadow-lg rounded relative">
        <h1 className="absolute top-2 left-2 font-semibold">Join now</h1>
        <h1 className="text-2xl font-bold my-3">Register</h1>
        <form className="flex flex-col space-y-2 max-h-full">
          <input
            type="text"
            className={`${
              errors.username && touched.username ? "border-red-500" : ""
            } p-2 w-72 border border-gray-300 rounded focus:outline-none focus:border-cyan-500 transition-all duration-200 shadow-md`}
            required
            value={user.username}
            placeholder="Username"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            onBlur={handleBlur("username")}
          />
          {errors.username && touched.username && (
            <p className="text-red-500 text-xs">{errors.username}</p>
          )}
          <input
            type="text"
            placeholder="First name"
            className={`${
              errors.firstName && touched.firstName ? "border-red-500" : ""
            } p-2 border border-gray-300 rounded focus:outline-none focus:border-cyan-500 transition-all duration-200 shadow-md`}
            required
            value={user.firstName}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            onBlur={handleBlur("firstName")}
          />
          {errors.firstName && touched.firstName && (
            <p className="text-red-500 text-xs">{errors.firstName}</p>
          )}
          <input
            type="text"
            placeholder="Last name"
            className={`${
              errors.lastName && touched.lastName ? "border-red-500" : ""
            } p-2 border border-gray-300 rounded focus:outline-none focus:border-cyan-500 transition-all duration-200 shadow-md`}
            required
            value={user.lastName}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            onBlur={handleBlur("lastName")}
          />
          {errors.lastName && touched.lastName && (
            <p className="text-red-500 text-xs">{errors.lastName}</p>
          )}
          <input
            type="email"
            placeholder="Email"
            className={`${
              errors.email && touched.email ? "border-red-500" : ""
            } p-2 border border-gray-300 rounded focus:outline-none focus:border-cyan-500 transition-all duration-200 shadow-md`}
            required
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            onBlur={handleBlur("email")}
          />
          {errors.email && touched.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
          <input
            type="tel"
            placeholder="Phone"
            className={`${
              errors.phone && touched.phone ? "border-red-500" : ""
            } p-2 border border-gray-300 rounded focus:outline-none focus:border-cyan-500 transition-all duration-200 shadow-md`}
            required
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
            onBlur={handleBlur("phone")}
          />
          {errors.phone && touched.phone && (
            <p className="text-red-500 text-xs">{errors.phone}</p>
          )}
          <input
            type="password"
            placeholder="Password"
            className={`${
              errors.password && touched.password ? "border-red-500" : ""
            } p-2 border border-gray-300 rounded focus:outline-none focus:border-cyan-500 transition-all duration-200 shadow-md`}
            required
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            onBlur={handleBlur("password")}
          />
          {errors.password && touched.password && (
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}
          <input
            type="password"
            placeholder="Confirm Password"
            className={`${
              errors.confirmPassword && touched.confirmPassword
                ? "border-red-500"
                : ""
            } p-2 border border-gray-300 rounded focus:outline-none focus:border-cyan-500 transition-all duration-200 shadow-md`}
            required
            value={user.confirmPassword}
            onChange={(e) =>
              setUser({ ...user, confirmPassword: e.target.value })
            }
            onBlur={handleBlur("confirmPassword")}
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
          )}
          <button className="p-2 bg-cyan-500 text-white rounded transition-all duration-200 hover:scale-105 font-bold w-full">
            Register
          </button>

          <p className="text-xs text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-cyan-500 hover:underline hover:font-bold transition-all duration-200"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

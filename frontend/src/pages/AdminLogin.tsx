import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../redux/auth/authActions";
import { RootState } from "../redux/rootReducer";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state ? location.state.from : "/";

  const [userData, setUserData] = useState({
    email: location.state ? location.state.email : "",
    password: location.state ? location.state.password : "",
  });

  const { user, error, loading } = useSelector(
    (state: RootState) => state.auth
  );

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      dispatch(loginUser(userData));
      if (!user && loading && !error) {
        return (
          <div className="flex justify-center items-center fixed w-full h-full top-0 bottom-0 right-0 left-0 inset-0 bg-black/30">
            <Loader />
          </div>
        );
      }
      if (user && !loading && !error) {
        !error && toast.success("User login successful");
        navigate(from);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!user || (user && !user?.is_admin)) {
      navigate("/admin/login");
    } else if (user && user?.is_admin) {
      navigate("/admin/users");
    }
  }, [navigate, user, error]);

  return (
    <div className="flex justify-center items-center w-full h-full absolute top-0 bottom-0">
      <div className="flex flex-col justify-center items-center w-[400px] sm:w-[500px] h-fit mx-auto px-5 my-auto py-10 border border-gray-300 shadow-lg rounded relative">
        <h1 className="absolute top-2 left-2 font-semibold underline">
          Welcome to Admin login
        </h1>
        <h1 className="text-2xl font-bold my-3">Login</h1>
        <form
          onSubmit={handleLogin}
          className="flex flex-col space-y-3 mt-5 max-h-full"
        >
          <input
            type="email"
            className="p-2 w-72 border border-gray-300 rounded focus:outline-none focus:border-cyan-500 transition-all duration-200 shadow-md"
            required
            value={userData.email}
            placeholder="Email"
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />

          <input
            type="password"
            className="p-2 w-72 border border-gray-300 rounded focus:outline-none focus:border-cyan-500 transition-all duration-200 shadow-md"
            required
            value={userData.password}
            placeholder="Password"
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
          />

          {error && <p className="text-red-500 text-center text-xs">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="p-2 bg-green-500 text-white rounded transition-all duration-200 hover:scale-105 font-bold w-full"
          >
            {loading ? "Please wait" : "Login"}
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

          <p className="text-xs text-gray-500">
            <Link
              to="/login"
              className="text-cyan-500 hover:underline hover:font-bold transition-all duration-200"
            >
              Client login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

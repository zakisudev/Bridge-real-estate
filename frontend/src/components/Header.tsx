import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { LogoutOutlined } from "@ant-design/icons";
import { logoutUser } from "../redux/auth/authActions";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    dispatch(logoutUser());
    navigate("/login", { replace: true });
  };

  return (
    <nav className="flex top-0 sticky justify-between gap-5 px-10 h-18 items-center w-full bg-gray-200 shadow-md">
      <Link to="/">
        <img src={Logo} alt="logo" className="w-14 h-14 rounded-full" />
      </Link>
      {user ? (
        <div className="flex gap-3 justify-center font-semibold py-1">
          <Link
            to="/latest"
            className="px-3 p-1 rounded-xl border border-gray-300 bg-teal-500 text-white"
          >
            New Posts
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center px-3 rounded-xl border border-gray-400"
          >
            <LogoutOutlined />
          </button>
        </div>
      ) : (
        <div className="flex gap-3 justify-center font-semibold py-1">
          <Link
            to="/login"
            className="flex items-center px-3 rounded-xl border border-gray-400"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-3 p-1 rounded-xl border border-gray-300 bg-teal-500 text-white"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;

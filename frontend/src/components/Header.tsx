import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { LogoutOutlined } from "@ant-design/icons";
import { logout } from "../services/api";
import { useState } from "react";
import { logoutUser } from "../redux/auth/authActions";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dropDown, setDropDown] = useState(false);
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    const res = await logout();
    if (res) {
      dispatch(logoutUser());
      navigate("/login", { replace: true });
    } else {
      console.error(res);
    }
  };

  const handleDropDown = () => {
    setDropDown(!dropDown);
  };

  return (
    <nav className="flex top-0 sticky justify-between gap-5 px-10 h-18 items-center w-full bg-gray-200 shadow-md">
      <Link to="/">
        <img src={Logo} alt="logo" className="w-14 h-14 rounded-full" />
      </Link>
      {user ? (
        <div className="flex gap-3 justify-center font-semibold py-1 relative dropDown">
          <button
            onClick={handleDropDown}
            className="px-3 p-1 rounded-xl border border-gray-300 bg-teal-500 text-white"
          >
            {user.firstName?.charAt(0).toUpperCase()}.
            {user.lastName?.toUpperCase()}
          </button>
          {user?.is_admin && (
            <Link
              to="/admin/users"
              className="px-3 p-1 rounded-xl border border-gray-300 bg-blue-500 text-white"
            >
              Dashboard
            </Link>
          )}

          {dropDown && (
            <div className="absolute top-12 right-0 bg-white shadow-md rounded-xl px-3 py-1 z-[999]">
              <Link
                to="/create"
                className="text-center rounded block px-3 py-1 hover:bg-gray-200 my-2"
              >
                Post
              </Link>
              <Link
                to="/profile"
                className="text-center rounded block px-3 py-1 hover:bg-gray-200 my-2"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center px-3 py-1 rounded-xl border my-2 border-gray-400 w-full"
              >
                <LogoutOutlined />
              </button>
            </div>
          )}
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

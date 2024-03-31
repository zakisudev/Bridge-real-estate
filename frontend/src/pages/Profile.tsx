import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../redux/rootReducer";
import { deleteUser } from "../services/api";
import { updateUser } from "../services/api";
import { AuthResponse } from "../redux/interfaces/authInterface";
import Header from "../components/Header";
import Loader from "../components/Loader";
import { logoutUser } from "../redux/auth/authActions";
import { registerUser as LOGOUT } from "../redux/auth/authReducer";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, error, loading } = useSelector(
    (state: RootState) => state.auth
  );
  const [formData, setFormData] = useState<AuthResponse>({
    id: user?.id,
    username: user?.username,
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    phone: user?.phone,
    password: "",
    confirmPassword: "",
    is_admin: user?.is_admin,
    name: "",
  });

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user && user?.id) {
      try {
        if (formData?.password !== formData?.confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }

        if (formData?.password) {
          dispatch(LOGOUT());
          const res = await updateUser(formData);
          if (loading && !error) {
            return (
              <div className="flex justify-center items-center fixed w-full h-full top-0 bottom-0 right-0 left-0 inset-0 bg-black/30">
                <Loader />
              </div>
            );
          } else if (!loading && error) {
            toast.success(error);
            return;
          } else if (res.success) {
            toast.success("Profile updated successfully");
            dispatch(logoutUser());
            navigate("/login");
          }
        } else {
          dispatch(LOGOUT());
          const res = await updateUser({
            id: user?.id,
            username: formData?.username,
            firstName: formData?.firstName,
            lastName: formData?.lastName,
            email: formData?.email,
            phone: formData?.phone,
            is_admin: user?.is_admin,
            name: formData?.firstName + " " + formData?.lastName,
          });
          if (loading && !error) {
            return (
              <div className="flex justify-center items-center fixed w-full h-full top-0 bottom-0 right-0 left-0 inset-0 bg-black/30">
                <Loader />
              </div>
            );
          } else if (!loading && error) {
            toast.success(error);
            dispatch(logoutUser());
            return;
          } else if (res.success) {
            toast.success("Profile updated successfully");
            dispatch(logoutUser());
            navigate("/login");
          }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error) {
          toast.error(error);
        }
        toast.error("Something went wrong");
      }
    } else {
      toast.error("User or user ID is undefined");
    }
  };

  const handleDeleteProfile = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action is irreversible"
      )
    ) {
      return;
    }
    if (user && user.id) {
      try {
        dispatch(LOGOUT());
        const res = await deleteUser(user.id);
        if (res?.success && !loading && !error) {
          dispatch(logoutUser());
          toast.success("Account deleted successfully");
          navigate("/login");
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error) {
          toast.error(error);
        }
        toast.error("Something went wrong");
      }
    } else {
      toast.error("User or user ID is undefined");
    }
  };

  return (
    <>
      {loading && (
        <div className="flex justify-center items-center fixed w-full h-full top-0 bottom-0 right-0 left-0 inset-0 bg-black/30">
          <Loader />
        </div>
      )}

      <Header />
      <div className="w-full sm:w-[90%] min-h-full px-3 flex flex-col justify-center items-center mx-auto">
        <div className="h-full flex gap-5 flex-col w-[90%] sm:flex-row sm:max-h-[500px]">
          <div className="flex flex-col w-full h-full flex-1">
            <h1 className="text-3xl font-semibold text-center my-3">Profile</h1>

            <form
              onSubmit={handleProfileUpdate}
              className="flex flex-col gap-3 w-full justify-center mx-auto"
            >
              <div className="flex justify-between items-center gap-2">
                <label htmlFor="username" className="font-bold uppercase">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData?.username || user?.username}
                  className="border border-gray-400 rounded-md px-2 py-1 text-lg"
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </div>

              <div className="flex justify-between items-center gap-2">
                <label htmlFor="firstName" className="font-bold uppercase">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={formData?.firstName || user?.firstName}
                  className="border border-gray-400 rounded-md px-2 py-1 text-lg"
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>

              <div className="flex justify-between items-center gap-2">
                <label htmlFor="lastName" className="font-bold uppercase">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={formData?.lastName || user?.lastName}
                  className="border border-gray-400 rounded-md px-2 py-1 text-lg"
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>

              <div className="flex justify-between items-center gap-2">
                <label htmlFor="email" className="font-bold uppercase">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData?.email || user?.email}
                  className="border border-gray-400 rounded-md px-2 py-1 text-lg"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="flex justify-between items-center gap-2">
                <label htmlFor="phone" className="font-bold uppercase">
                  Phone
                </label>
                <input
                  type="phone"
                  name="phone"
                  id="phone"
                  value={formData?.phone || user?.phone}
                  className="border border-gray-400 rounded-md px-2 py-1 text-lg"
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              <div className="flex justify-between items-center gap-2">
                <label htmlFor="password" className="font-bold uppercase">
                  New Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData?.password}
                  className="border border-gray-400 rounded-md px-2 py-1 text-lg"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target?.value })
                  }
                />
              </div>

              <div className="flex justify-between items-center gap-2">
                <label
                  htmlFor="confirmPassword"
                  className="font-bold uppercase"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData?.confirmPassword}
                  className="border border-gray-400 rounded-md px-2 py-1 text-lg"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target?.value,
                    })
                  }
                />
              </div>

              {error && <p className="text-red-500 text-center">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-700 text-white rounded-md p-2 mt-2 uppercase hover:bg-blue-900 transition-colors font-bold"
              >
                {loading ? "Please wait..." : "Update"}
              </button>
            </form>
            <h1 className="font-semibold text-red-700 text-center my-3">
              updating profile will log you out
            </h1>
          </div>
        </div>

        <div className="flex justify-end w-full mt-5 mr-2">
          <button
            disabled={loading}
            onClick={handleDeleteProfile}
            className="bg-red-700 text-white rounded-md px-2 py-1 uppercase hover:bg-red-900 transition-colors font-bold text-sm"
          >
            {loading ? "Please wait..." : "Delete account"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;

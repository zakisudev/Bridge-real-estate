import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import Loader from "../components/Loader";
import Header from "../components/Header";
import { getUsers } from "../redux/users/userActions";

const Users = () => {
  const dispatch = useDispatch();
  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toDateString();
  };
  const { users, loading, error } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center fixed w-full h-full top-0 bottom-0 right-0 left-0 inset-0 bg-black/30">
          <Loader />
        </div>
      )}

      <Header />
      {/* Error */}
      {error && (
        <div className="flex justify-center">
          <h1 className="text-xl text-center text-white font-semibold px-5 py-2 mt-3 rounded bg-red-700">
            {error}, Please reload
          </h1>
        </div>
      )}
      <div className="flex flex-1 gap-3 w-full pl-5">
        <Link
          to="/"
          className="text-white rounded-md bg-gray-700 max-w-[360px] font-semibold px-2 py-1 my-3"
        >
          Go Home
        </Link>
        <Link
          to="/admin/users-properties"
          className="text-white rounded-md bg-blue-700 max-w-[360px] font-semibold px-2 py-1 my-3"
        >
          All Properties
        </Link>
      </div>
      <div className="w-[90%] flex flex-col mx-auto">
        <h1 className="text-2xl font-semibold mt-5">All Users</h1>
        <table className="w-full border-collapse border border-gray-300 mt-5">
          <thead>
            <tr>
              <th className="border border-gray-300">ID</th>
              <th className="border border-gray-300">First Name</th>
              <th className="border border-gray-300">Last Name</th>
              <th className="border border-gray-300">Username</th>
              <th className="border border-gray-300">Email</th>
              <th className="border border-gray-300">Register date</th>
              <th className="border border-gray-300">Is Admin</th>
              <th className="border border-gray-300 w-32"></th>
            </tr>
          </thead>
          <tbody>
            {users && users?.length > 0 ? (
              users?.map((user) => (
                <tr key={user?.id}>
                  <td className="border border-gray-300 py-2 text-center">
                    {user?.id}
                  </td>
                  <td className="border border-gray-300 py-2 text-left pl-3">
                    {user?.firstName}
                  </td>
                  <td className="border border-gray-300 py-2 text-left pl-3">
                    {user?.lastName}
                  </td>
                  <td className="border border-gray-300 py-2 text-center">
                    {user?.username}
                  </td>
                  <td className="border border-gray-300 py-2 text-center">
                    {user?.email}
                  </td>
                  <td className="border border-gray-300 py-2 text-center">
                    {formatDate(user?.createdAt || "")}
                  </td>
                  <td className="border border-gray-300 py-2 text-center">
                    {user?.is_admin ? "Yes" : "No"}
                  </td>
                  <td className="border border-gray-300 py-2 text-center">
                    <Link
                      to={`/admin/users/${user.id}`}
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="border border-gray-300 text-center py-2"
                  colSpan={7}
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Users;

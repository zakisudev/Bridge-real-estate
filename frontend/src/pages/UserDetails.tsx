/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../redux/users/userActions";
import { RootState } from "../redux/rootReducer";
import Loader from "../components/Loader";
import { Property } from "../redux/interfaces/propertyInterface";
import Header from "../components/Header";
import { fetchAllProperties } from "../services/api";
import PropertyCard from "../components/PropertyCard";

const UserDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const { id } = useParams<{ id: string | undefined }>();

  const { user, loading, error } = useSelector(
    (state: RootState) => state.user
  );
  const formatDate = (date: string | undefined) => {
    const d = new Date(date ? date : "");
    return d.toDateString();
  };

  useEffect(() => {
    if (!id) return;
    dispatch(getUser(id));
    const fetchProperties = async () => {
      const res = await fetchAllProperties();
      if (!res.success) {
        setProperties(res);
        return;
      } else {
        setProperties([]);
        return;
      }
    };

    fetchProperties();
  }, [dispatch, id]);

  return (
    <>
      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center fixed w-full h-full top-0 bottom-0 right-0 left-0 inset-0 bg-black/30">
          <Loader />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex">
          <h1 className="text-xl text-center text-white font-semibold px-5 py-2 mt-3 rounded bg-red-700">
            {error}, Please reload
          </h1>
        </div>
      )}

      <Header />
      {user && !loading && (
        <div className="w-[90%] flex flex-col mx-auto">
          <div className="flex w-full mt-3">
            <button
              onClick={() => navigate(-1)}
              className="text-white rounded-md bg-gray-700 max-w-[360px] font-semibold px-2 py-1 my-3"
            >
              Go Back
            </button>
          </div>
          <h1 className="text-2xl mt-10 font-semibold">
            {user?.firstName} {user?.lastName}
          </h1>
          <div className="mt-5 flex gap-16 bg-gray-200 p-3">
            <div className="flex flex-col">
              <h2 className="text-lg">
                Username:{" "}
                <span className="font-semibold">{user?.username}</span>
              </h2>
              <h2 className="text-lg">
                Email: <span className="font-semibold">{user?.email}</span>
              </h2>
            </div>
            <div className="flex flex-col">
              <h2 className="text-lg">
                Created At:{" "}
                <span className="font-semibold">
                  {formatDate(user?.createdAt)}
                </span>
              </h2>
              <h2 className="text-lg">
                Updated At:{" "}
                <span className="font-semibold">
                  {formatDate(user?.updatedAt)}
                </span>
              </h2>
            </div>

            <h2 className="text-lg">
              Admin:{" "}
              <span className="font-semibold">
                {user?.is_admin ? "Yes" : "No"}
              </span>
            </h2>
          </div>
          <h2 className="text-2xl mt-10 font-semibold mb-5">Properties </h2>
          {properties &&
          properties?.filter((prop: any) => prop.user_id === parseInt(id || ""))
            ?.length > 0 ? (
            properties
              ?.filter((prop: any) => prop.user_id === parseInt(id || ""))
              ?.map((property: Property) => (
                <PropertyCard key={property.id} property={property} />
              ))
          ) : (
            <h2 className="text-lg text-center mt-5">No properties found</h2>
          )}
        </div>
      )}
    </>
  );
};

export default UserDetails;

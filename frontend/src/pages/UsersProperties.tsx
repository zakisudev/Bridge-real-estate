import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import { fetchProperties } from "../redux/properties/propertyActions";
import Header from "../components/Header";
import PropertyCard from "../components/PropertyCard";

const UserPropertiesList = () => {
  const dispatch = useDispatch();
  const { properties, loading, error, pagination } = useSelector(
    (state: RootState) => state.property
  );

  const handlePageChange = (page: number | null) => {
    dispatch(fetchProperties(`?page=${page}`));
  };

  return (
    <>
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

      <div className="w-full px-10 py-5">
        {loading ? (
          <div className="flex justify-center items-center w-full h-full">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <div className="flex justify-center">
            <h1 className="text-xl text-center text-white font-semibold px-5 py-2 mt-3 rounded bg-red-700">
              {error}, Please reload
            </h1>
          </div>
        ) : properties && properties?.length > 0 ? (
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold my-2 bg-gray-200 py-1 pl-3">
              All Users Properties
            </h1>
            <div className="grid grid-cols-1 gap-3 ">
              {properties &&
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                properties?.map((prop: any) => (
                  <Link
                    to={`/prop/${prop?.id}`}
                    key={prop?.id}
                    className="flex flex-wrap gap-4 bg-white rounded-lg shadow-lg overflow-hidden"
                  >
                    <PropertyCard key={prop?.id} property={prop} />
                  </Link>
                ))}
            </div>
            <Pagination
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </div>
        ) : (
          <h1 className="text-xl font-semibold mt-2">No property found</h1>
        )}
      </div>
    </>
  );
};

export default UserPropertiesList;

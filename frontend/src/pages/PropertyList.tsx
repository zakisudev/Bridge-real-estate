import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { Link } from "react-router-dom";
import { DownOutlined } from "@ant-design/icons";
import Pagination from "../components/Pagination";
import { fetchProperties } from "../redux/properties/propertyActions";
import Header from "../components/Header";

const PropertyList = () => {
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
      <div className="w-full px-10 py-5">
        {loading ? (
          <div className="flex justify-center items-center w-full h-full">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        ) : error ? (
          <h1 className="text-xl font-semibold mt-2">{error}</h1>
        ) : properties && properties?.length > 0 ? (
          <div className="flex flex-col">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {properties &&
                properties?.map((props) => (
                  <Link
                    to={`/prop/${props.id}`}
                    key={props.id}
                    className="flex flex-wrap gap-4 bg-white rounded-lg shadow-lg overflow-hidden w-[360px]"
                  >
                    <img
                      src={props.imageUrls[0]}
                      alt={props.title}
                      className="w-full h-48 object-cover hover:scale-105 transition-all duration-300"
                    />
                    <div className="flex flex-col gap-1 p-3">
                      <h1 className="text-lg font-semibold">{props.title}</h1>
                      <p className="flex gap-1 items-center  text-green-700">
                        <DownOutlined />
                        <span className="text-gray-700">{props?.address}</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        {props.description.substring(0, 100)}...
                      </p>
                      <div className="flex justify-between items-center">
                        <h1 className="text-lg font-semibold">
                          ${props.regularPrice.toLocaleString("en-US")}
                          {props?.type === "rent" ? " / mo" : ""}
                        </h1>
                      </div>
                    </div>
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

export default PropertyList;

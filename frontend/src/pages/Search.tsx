import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { DownOutlined } from "@ant-design/icons";
import Header from "../components/Header";
import { Property } from "../redux/interfaces/propertyInterface";
import { fetchAllProperties } from "../services/api";

const Search = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchParams =
    new URLSearchParams(location.search).get("offer") ||
    new URLSearchParams(location.search).get("type") ||
    "";

  useEffect(() => {
    setLoading(true);
    try {
      const fetchProperties = async () => {
        const data = await fetchAllProperties();
        if (data?.success) {
          setProperties(data?.properties);
        }
        setProperties(data);
        setLoading(false);
      };

      fetchProperties();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    }
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className="flex flex-col md:flex-row gap-3 p-2">
        <div className="w-full sm:max-w-2/3">
          <div className="flex w-full">
            <button
              onClick={() => navigate(-1)}
              className="text-white rounded-md bg-gray-700 max-w-[360px] font-semibold px-2 py-1 my-3 ml-5"
            >
              Back
            </button>
          </div>
          <h1 className="text-xl font-semibold my-2">Filtered results:</h1>
          {loading ? (
            <div className="flex justify-center items-center w-full h-full">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
          ) : error ? (
            <h1 className="text-xl font-semibold mt-2">{error}</h1>
          ) : properties && properties?.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-[90%]">
                {properties &&
                  properties
                    ?.filter(
                      (prop) =>
                        prop.type === searchParams ||
                        prop.offer.toString() === searchParams
                    )
                    ?.map((props) => (
                      <Link
                        to={`/props/${props.id}`}
                        key={props.id}
                        className="flex flex-wrap gap-4 bg-white rounded-lg shadow-lg overflow-hidden w-[360px]"
                      >
                        <img
                          src={props.imageUrls[0]}
                          alt={props.title}
                          className="w-full h-48 object-cover hover:scale-105 transition-all duration-300"
                        />
                        <div className="flex flex-col gap-1 p-3">
                          <h1 className="text-lg font-semibold">
                            {props.title}
                          </h1>
                          <p className="flex gap-1 items-center  text-green-700">
                            <DownOutlined />
                            <span className="text-gray-700">
                              {props?.address}
                            </span>
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
            </>
          ) : (
            <h1 className="text-xl font-semibold mt-2">No results found</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;

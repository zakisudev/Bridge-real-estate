/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DownOutlined } from "@ant-design/icons";
import Header from "../components/Header";
import { fetchProperties } from "../redux/properties/propertyActions";
import { RootState } from "../redux/rootReducer";
import Pagination from "./../components/Pagination";

const Search = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  urlParams.set("search", urlParams.get("search") || "");
  urlParams.set(
    "type",
    urlParams.get("type") === "all" ? "" : urlParams.get("type") || ""
  );
  urlParams.set(
    "offer",
    String(urlParams.get("offer") === "true" ? true : false)
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { properties, loading, pagination } = useSelector(
    (state: RootState) => state.property
  );
  const [error, setError] = useState("");
  const [searchData, setSearchData] = useState({
    search: urlParams.get("search") || "",
    type: urlParams.get("type") === "all" ? "" : urlParams.get("type"),
    offer: urlParams.get("offer") || false,
    page: 1,
  });
  const searchQuery = urlParams.toString();

  const handlePageChange = (page: number | null) => {
    dispatch(
      fetchProperties(
        `search=${searchData.search}&type=${searchData.type}&offer=${searchData.offer}&page=${page}`
      )
    );
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(searchQuery);
    try {
      dispatch(
        fetchProperties(
          `search=${searchData.search}&type=${searchData.type}&offer=${searchData.offer}&page=${searchData.page}`
        )
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    dispatch(
      fetchProperties(
        `search=${searchData.search}&type=${searchData.type}&offer=${searchData.offer}&page=${searchData.page}`
      )
    );
  }, [dispatch, searchData]);

  return (
    <>
      <Header />
      <div className="w-full overflow-hidden flex flex-col md:flex-row gap-3 p-2">
        <div className="w-full sm:w-1/4">
          <form onSubmit={handleSearch} className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2 border-b-2 pb-2">
              <label
                htmlFor="search"
                className="font-semibold whitespace-nowrap"
              >
                Search for:
              </label>
              <input
                type="text"
                value={searchData.search}
                onChange={(e) =>
                  setSearchData({ ...searchData, search: e.target.value })
                }
                id="search"
                placeholder="Search..."
                className="border border-gray-400 rounded-lg px-2 py-1 flex"
              />
            </div>
            <div className="flex items-center gap-3 pb-2">
              <label htmlFor="category" className="font-semibold w-full">
                Type:
              </label>
              <div className="flex">
                <input
                  type="checkbox"
                  checked={searchData.type === ""}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSearchData({ ...searchData, type: "" });
                    } else {
                      setSearchData({ ...searchData, type: "" });
                    }
                  }}
                  id="all"
                  className="w-5 mr-1"
                />
                <label htmlFor="all">All</label>
              </div>
              <div className="flex">
                <input
                  type="checkbox"
                  id="rent"
                  checked={searchData.type === "rent"}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSearchData({ ...searchData, type: "rent" });
                    } else {
                      setSearchData({ ...searchData, type: "" });
                    }
                  }}
                  className="w-5 mr-1"
                />
                <label htmlFor="rent">Rent</label>
              </div>
              <div className="flex">
                <input
                  type="checkbox"
                  id="sale"
                  checked={searchData.type === "sale"}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSearchData({ ...searchData, type: "sale" });
                    } else {
                      setSearchData({ ...searchData, type: "" });
                    }
                  }}
                  className="w-5 mr-1"
                />
                <label htmlFor="sale">Sale</label>
              </div>
              <div className="flex">
                <input
                  type="checkbox"
                  id="offer"
                  checked={searchData.offer.toString() === "true"}
                  onChange={(e) =>
                    setSearchData({ ...searchData, offer: e.target.checked })
                  }
                  className="w-5 mr-1"
                />
                <label htmlFor="offer">Offer</label>
              </div>
            </div>
            <button className="bg-slate-700 rounded-lg px-2 py-1 w-full sm:max-w-[400px] sm:w-64 justify-center items-center text-white font-semibold hover:bg-slate-900 transition-all duration-200 my-2 mx-auto uppercase">
              Search
            </button>
          </form>
        </div>

        <div className="w-full sm:w-3/4">
          <div className="flex w-full">
            <button
              onClick={() => navigate(-1)}
              className="text-white rounded-md bg-gray-700 max-w-[360px] font-semibold px-2 py-1 my-3 ml-5"
            >
              Back
            </button>
          </div>
          {loading ? (
            <div className="flex justify-center items-center w-full h-full">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
          ) : error ? (
            <h1 className="text-xl font-semibold mt-2">{error}</h1>
          ) : properties && properties?.length > 0 ? (
            <div className="w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
                {properties &&
                  properties?.map((props: any) => (
                    <Link
                      to={`/prop/${props.id}`}
                      key={props.id}
                      className="flex flex-wrap gap-4 bg-white rounded-lg shadow-lg overflow-hidden w-[360px]"
                    >
                      <img
                        src={props.imageUrls[0]}
                        alt={props.title}
                        className="w-[80%] h-48 object-cover hover:scale-105 transition-all duration-300"
                      />
                      <div className="flex flex-col gap-1 p-3">
                        <h1 className="text-lg font-semibold">{props.title}</h1>
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
              <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            </div>
          ) : (
            <h1 className="text-xl text-center font-semibold mt-2">
              No results found
            </h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { useEffect } from "react";
import { fetchProperties } from "../redux/properties/propertyActions";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import location from "../assets/location.svg";
import Loader from "../components/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const { properties, loading, error } = useSelector(
    (state: RootState) => state.property
  );

  useEffect(() => {
    dispatch(fetchProperties(""));
  }, [dispatch]);

  return (
    <div className="flex flex-col justify-center items-center">
      <Header />
      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center fixed w-full h-full top-0 bottom-0 right-0 left-0 inset-0 bg-black/30">
          <Loader />
        </div>
      )}

      <div className="flex flex-col p-1 md:p-10  gap-5 w-full">
        {/* Top */}
        <div className="flex flex-col gap-5 p-5">
          <h1 className="text-3xl sm:text-6xl font-semibold">
            Find your next <span className="text-teal-500">dream</span> <br />{" "}
            place with ease
          </h1>
          <p className="text-gray-500">
            We bring you the best of properties{" "}
            <span className="text-teal-500 font-bold">Ethiopia</span> has to
            offer.
          </p>
          <div className="flex gap-5 items-start">
            <Link to="/prop" className="max-w-fit">
              <button className="bg-teal-700 rounded border border-teal-900 text-white px-5 py-1 transition-all duration-200 font-semibold ">
                Let&apos;s Explore..
              </button>
            </Link>
            <Link to="/create" className="max-w-fit">
              <button className="rounded px-5 py-1 border border-gray-500 transition-all duration-200 font-semibold ">
                Post my place
              </button>
            </Link>
          </div>
        </div>

        {/* Error */}
        {error && <h1 className="text-xl font-semibold mt-2">{error}</h1>}

        {/* Listings */}
        <div className="flex flex-col gap-5 w-full">
          {/* Offer */}
          <div className="p-0 md:p-5 flex flex-col w-full">
            {properties &&
              properties?.filter((props: any) => props?.offer).length > 0 && (
                <div>
                  <div className="my-2">
                    <h2 className="text-2xl font-semibold text-gray-700 px-2 py-2 bg-gray-200">
                      Recent offers
                    </h2>
                    <Link
                      to="/search?offer=true"
                      className="text-blue-600 hover:underline text-sm text-semibold"
                    >
                      Show more offers
                    </Link>
                  </div>
                  <div className="grid grid-cols-4 gap-3 w-full">
                    {properties?.slice(0, 4)?.map((props: any) => (
                      <Link
                        to={`/prop/${props?.id}`}
                        key={props?.id}
                        className="flex flex-wrap gap-4 bg-white rounded-lg shadow-lg overflow-hidden w-[300px]"
                      >
                        <img
                          src={props?.imageUrls[0]}
                          alt={props?.title}
                          className="w-full h-48 object-cover hover:scale-105 transition-all duration-300"
                        />
                        <div className="flex flex-col gap-1 p-3">
                          <h1 className="text-lg font-semibold">
                            {props?.title}
                          </h1>
                          <p className="flex gap-1 items-center  text-green-700">
                            <img src={location} className="w-5 h-5" />
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
                </div>
              )}
          </div>

          {/* Sale */}
          {properties &&
            properties?.filter((props: any) => props?.type === "sale").length >
              0 && (
              <div className="p-0 md:p-5 flex flex-col w-full">
                <div>
                  <div className="my-2">
                    <h2 className="text-2xl font-semibold text-gray-700 px-2 py-2 bg-gray-200">
                      Recent places for SALE
                    </h2>
                    <Link
                      to="/search?type=sale"
                      className="text-blue-600 hover:underline text-sm text-semibold"
                    >
                      Show more places for SALE
                    </Link>
                  </div>
                  <div className="grid grid-cols-4 gap-3 w-full">
                    {properties &&
                      properties

                        ?.filter((props: any) => props?.type === "sale")
                        ?.slice(0, 4)

                        .map((props: any) => (
                          <Link
                            to={`/prop/${props?.id}`}
                            key={props?.id}
                            className="flex flex-wrap gap-4 bg-white rounded-lg shadow-lg overflow-hidden w-[300px]"
                          >
                            <img
                              src={props?.imageUrls[0]}
                              alt={props?.title}
                              className="w-full h-48 object-cover hover:scale-105 transition-all duration-300"
                            />
                            <div className="flex flex-col gap-1 p-3">
                              <h1 className="text-lg font-semibold">
                                {props?.title}
                              </h1>
                              <p className="flex gap-1 items-center  text-green-700">
                                <img src={location} className="w-5 h-5" />
                                <span className="text-gray-700">
                                  {props?.address}
                                </span>
                              </p>
                              <p className="text-sm text-gray-500">
                                {props?.description.substring(0, 100)}...
                              </p>
                              <div className="flex justify-between items-center">
                                <h1 className="text-lg font-semibold">
                                  ${props?.regularPrice.toLocaleString("en-US")}
                                  {props?.type === "rent" ? " / mo" : ""}
                                </h1>
                              </div>
                            </div>
                          </Link>
                        ))}
                  </div>
                </div>
              </div>
            )}

          {/* Rent */}
          <div className="p-0 md:p-5 flex flex-col w-full">
            {properties &&
              properties?.filter((props: any) => props.type === "rent").length >
                0 && (
                <div className="">
                  <div className="my-2">
                    <h2 className="text-2xl font-semibold text-gray-700 px-2 py-2 bg-gray-200">
                      Recent places for RENT
                    </h2>
                    <Link
                      to="/search?type=rent"
                      className="text-blue-600 hover:underline text-sm text-semibold"
                    >
                      Show more places for RENT
                    </Link>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {properties &&
                      properties

                        ?.filter((props: any) => props?.type === "rent")
                        ?.slice(0, 4)

                        ?.map((props: any) => (
                          <Link
                            to={`/prop/${props?.id}`}
                            key={props?.id}
                            className="flex flex-wrap gap-4 bg-white rounded-lg shadow-lg overflow-hidden w-[300px]"
                          >
                            <img
                              src={props?.imageUrls[0]}
                              alt={props?.title}
                              className="w-full h-48 object-cover hover:scale-105 transition-all duration-300"
                            />
                            <div className="flex flex-col gap-1 p-3">
                              <h1 className="text-lg font-semibold">
                                {props?.title}
                              </h1>
                              <p className="flex gap-1 items-center  text-green-700">
                                <img src={location} className="w-5 h-5" />
                                <span className="text-gray-700">
                                  {props?.address}
                                </span>
                              </p>
                              <p className="text-sm text-gray-500">
                                {props?.description.substring(0, 100)}...
                              </p>
                              <div className="flex justify-between items-center">
                                <h1 className="text-lg font-semibold">
                                  ${props?.regularPrice.toLocaleString("en-US")}
                                  {props?.type === "rent" ? " / mo" : ""}
                                </h1>
                              </div>
                            </div>
                          </Link>
                        ))}
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

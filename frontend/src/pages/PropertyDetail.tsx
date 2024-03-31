/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import bathroom from "../assets/bathroom.svg";
import parking from "../assets/parking.svg";
import location from "../assets/location.svg";
import bedroom from "../assets/bedroom.svg";
import furniture from "../assets/furniture.svg";
import { RootState } from "../redux/rootReducer";
import {
  deleteProperty,
  fetchProperty,
} from "../redux/properties/propertyActions";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import ContactForm from "./../components/ContactForm";
import Loader from "../components/Loader";
import Header from "../components/Header";

const PropertyDetail = () => {
  SwiperCore.use([Navigation]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const { id } = useParams();
  const { property, loading, error } = useSelector(
    (state: RootState) => state.property
  );

  const [contact, setContact] = useState(false);

  const handlePropertyDelete = () => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      dispatch(deleteProperty(parseInt(id ?? "")));
      navigate(-1);
    }
  };

  useEffect(() => {
    dispatch(fetchProperty(id?.toString()));
  }, [id, dispatch]);

  return (
    <main className="z-0">
      <Header />

      <div className="flex w-full">
        <button
          onClick={() => navigate(-1)}
          className="text-white rounded-md bg-gray-700 max-w-[360px] font-semibold px-2 py-1 my-3 ml-5"
        >
          Back
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center items-center absolute w-full h-full top-0 bottom-0 right-0 left-0 inset-0 bg-black/30">
          <Loader />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex justify-center">
          <h1 className="text-xl text-center text-white font-semibold px-5 py-2 mt-3 rounded bg-red-700">
            {error}, Please reload
          </h1>
        </div>
      )}

      {property && !loading && !error && (
        <div className="relative z-10">
          <Swiper navigation spaceBetween={50} slidesPerView={1}>
            {property?.imageUrls?.map((image: any, index: any) => (
              <SwiperSlide key={index}>
                <div
                  className="h-[400px]"
                  style={{
                    background: `url(${image}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex flex-col p-5 mb-10">
            <div className="flex justify-between gap-3">
              <div className="text-3xl font-semibold">
                {property?.title} - $
                {property?.regularPrice?.toLocaleString("en-US")}{" "}
                {property?.type === "rent" ? "/ mo" : ""}
              </div>
              <div className="flex gap-3 items-center">
                {user && property?.user_id === user?.id && (
                  <div className="flex flex-col gap-2 mt-5">
                    <button
                      onClick={() => navigate(`/prop/${property?.id}/update`)}
                      className="uppercase text-white rounded-md bg-blue-700 max-w-[360px] font-semibold px-3"
                    >
                      Edit Property
                    </button>
                  </div>
                )}
                {user && property?.user_id === user?.id && (
                  <div className="flex flex-col gap-2 mt-5">
                    <button
                      onClick={handlePropertyDelete}
                      className="uppercase text-white rounded-md bg-red-700 max-w-[360px] font-semibold px-3"
                    >
                      Delete Property
                    </button>
                  </div>
                )}
              </div>
            </div>
            <p className="flex items-center my-3 gap-2 text-slate-600">
              <img src={location} className="w-5 h-5 text-green-500" />
              {property?.address}
            </p>
            <div className="flex items-center gap-2">
              <p className="bg-red-700 w-full max-w-[150px] text-white text-center rounded-md font-semibold">
                {property?.type === "rent" ? "For Rent" : "For Sale"}
              </p>
              {property?.offer && (
                <p className="bg-green-700 w-full max-w-[150px] text-white text-center rounded-md font-semibold">
                  $
                  {(
                    +property?.regularPrice - +property?.discountedPrice
                  )?.toLocaleString("en-US")}{" "}
                  OFF
                </p>
              )}
            </div>

            <ul className="flex gap-2 sm:gap-6 mt-3 justify-around text-green-900 font-semibold text-sm max-w-[400px]">
              <li className="flex items-center gap-1 whitespace-nowrap">
                <img src={bedroom} className="text-lg w-7" />
                {property?.bedrooms} {property?.bedrooms > 1 ? "beds" : "bed"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <img src={bathroom} className="text-lg w-7" />
                {property?.bathrooms}{" "}
                {property?.bathrooms > 1 ? "baths" : "bath"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <img src={parking} className="text-lg w-7" />
                {property?.parking}{" "}
                {property?.parking ? "Parking" : "no parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <img src={furniture} className="text-lg w-7" />
                {property?.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>

            <p className="mt-5 text-gray-600">
              <span className="text-xl font-semibold text-black">
                Description:{" "}
              </span>
              {property?.description}
            </p>

            {user && parseInt(property?.user?.id) !== user?.id && !contact && (
              <div className="flex flex-col gap-2 mt-5">
                <button
                  onClick={() => setContact(true)}
                  className="uppercase text-white rounded-md bg-gray-700 max-w-[360px] font-semibold"
                >
                  Contact {property?.type === "rent" ? "Leaser" : "Seller"}
                </button>
              </div>
            )}

            {contact && <ContactForm property={property} />}
          </div>
        </div>
      )}
    </main>
  );
};

export default PropertyDetail;

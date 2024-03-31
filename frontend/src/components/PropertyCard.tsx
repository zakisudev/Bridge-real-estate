import { Property } from "../redux/interfaces/propertyInterface";
import bedroom from "../assets/bedroom.svg";
import bathroom from "../assets/bathroom.svg";
import parking from "../assets/parking.svg";
import furniture from "../assets/furniture.svg";
import { deleteProperty } from "../services/api";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deletePropertySuccess } from "../redux/properties/propertyReducer";

const PropertyCard = (data: { key: string; property: Property }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toDateString();
  };

  const handleDeleteProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (!data?.property?.id) return;
    if (!window.confirm("Are you sure you want to delete this property?")) {
      setLoading(false);
      return;
    }
    try {
      const res = await deleteProperty(parseInt(data?.property?.id));
      if (res?.success) {
        dispatch(deletePropertySuccess(parseInt(res?.id)));
        toast.success("Property deleted successfully");
        return;
      } else {
        setLoading(false);
        setError(res?.message);
        toast.error(error);
        return;
      }
    } catch (err) {
      toast.error("An error occurred, please try again");
      return;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[90%] flex flex-col my-2">
      <div className="flex w-full gap-3">
        <div className="flex w-32 h-18">
          <img
            src={data?.property?.imageUrls[0]}
            alt="property image"
            className="rounded object-cover"
          />
        </div>

        <div className="flex flex-col flex-1 w-full">
          <div className="flex gap-3 justify-between">
            <h2 className="text-xl font-semibold">
              {data?.property?.title} -{" "}
              {data?.property?.discountedPrice
                ? data?.property?.discountedPrice
                : data?.property?.regularPrice}
              <p className="text-xs text-gray-400">{data?.property?.address}</p>
            </h2>
            <div className="flex items-center">
              <button
                disabled={loading}
                onClick={handleDeleteProperty}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                {loading ? "..." : "Delete"}
              </button>
            </div>
          </div>
          <h2 className="text-sm">{data?.property?.description}</h2>
          <div className="flex items-center justify-between">
            <ul className="flex gap-2 sm:gap-6 mt-3 justify-around text-green-900 font-semibold text-sm max-w-[400px]">
              <li className="flex items-center gap-1 whitespace-nowrap">
                <img src={bedroom} className="text-lg w-4" />
                {data?.property?.bedrooms}{" "}
                {data?.property?.bedrooms > 1 ? "beds" : "bed"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <img src={bathroom} className="text-lg w-4" />
                {data?.property?.bathrooms}{" "}
                {data?.property?.bathrooms > 1 ? "baths" : "bath"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <img src={parking} className="text-lg w-4" />
                {data?.property?.parking}{" "}
                {data?.property?.parking ? "Parking" : "no parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <img src={furniture} className="text-lg w-4" />
                {data?.property?.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>
            <p className="text-gray-400">
              {data?.property?.createdAt
                ? formatDate(data?.property?.createdAt)
                : ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;

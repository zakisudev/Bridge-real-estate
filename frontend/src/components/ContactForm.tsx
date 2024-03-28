import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Property,
  PropertyResponse,
} from "../redux/interfaces/propertyInterface";

const ContactForm = ({ property }: { property: Property }) => {
  const [landlord, setLandlord] = useState<PropertyResponse["user"] | null>(
    null
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (property) {
      setLandlord(property?.user);
    }
  }, [property, landlord]);

  return (
    <div className="flex flex-col gap-2 w-full my-5 max-w-[400px]">
      <p>
        Contact for <strong>{property?.title}</strong> property
      </p>
      <textarea
        name="message"
        id="message"
        rows={2}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="p-1 max-h-20 h-20 rounded-md outline-none border-2 border-gray-400"
        placeholder="Enter your message here..."
      />
      <Link
        to={`mailto:${landlord?.email}?subject=Regarding ${property?.title}&body=${message}`}
        className="text-lg uppercase bg-gray-700 text-white rounded-md font-semibold text-center"
      >
        Send Message
      </Link>
    </div>
  );
};

export default ContactForm;

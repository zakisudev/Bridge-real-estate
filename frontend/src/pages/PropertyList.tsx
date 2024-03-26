import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/rootReducer";

const PropertyList = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const { properties } = useSelector((state: RootState) => state.property);

  useEffect(() => {
    if (!user) {
      navigate("/login", {
        state: {
          message: "You must login first!",
          from: "/dashboard",
        },
      });
    }
  }, [user, navigate]);

  useEffect(() => {}, []);

  console.log(properties);

  return <div>PropertyList</div>;
};
export default PropertyList;

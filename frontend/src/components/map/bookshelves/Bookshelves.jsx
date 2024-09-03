import { useContext, useEffect, useState } from "react";
import MapSettings from "../mapSettings/MapSettings";
import axios from "axios";
import { API } from "../../../utils/security/secreteKey";
import { toast } from "react-toastify";
import { UserLocationContext } from "../../../context/userLocation/UserLocationProvider";

const Bookshelves = () => {
  // Global state variables
  const { userLocation } = useContext(UserLocationContext);

  const [bookshelves, setBookshelves] = useState([]);

  useEffect(() => {
    // Fetch all bookshelves
    const fetchBookshelves = async () => {
      try {
        const response = await axios.get(`${API}/bookshelves`);
        setBookshelves(response.data.result);
      } catch (error) {
        toast.error("Error fetching bookshelves");
      }
    };
    fetchBookshelves();
  }, []);


  return (
    <div className="md:w-12/12 mt-5">
      <MapSettings bookshelves={bookshelves} userLocation={userLocation} />
    </div>
  );
};

export default Bookshelves;

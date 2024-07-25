import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../utils/security/secreteKey";
import { toast } from "react-toastify";
import Bookshelves from "../bookshelves/Bookshelves";

const UserCurrentLocation = () => {
  const [bookshelves, setBookshelves] = useState([]);
  const [center, setCenter] = useState([51.541574, 9.951122]); // Default center
  const [userLocation, setUserLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookshelves = async () => {
      try {
        const response = await axios.get(`${API}/bookshelves`);
        setBookshelves(response.data.result);
      } catch (err) {
        toast.error("Error fetching bookshelves");
      }
    };
    fetchBookshelves();
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setCenter([userCoords.latitude, userCoords.longitude]);
          setUserLocation([userCoords.latitude, userCoords.longitude]);
          setLoadingLocation(false);
        },
        (err) => {
          console.error("Error getting user location: ", err);
          setError(err);
          handleDefaultLocation();
        }
      );
    } else {
      const errorMsg = "Geolocation is not supported by this browser.";
      console.error(errorMsg);
      setError(new Error(errorMsg));
      handleDefaultLocation();
    }
  };

  /*
  The handleDefaultLocation function is relevant in scenarios where the geolocation feature is not supported by the browser or when an error occurs while fetching the user's location. It ensures that the application has a fallback to a default location, thereby providing a seamless user experience even if the user's location cannot be determined. This function enhances the robustness of the application.
  */
  const handleDefaultLocation = () => {
    const defaultCoords = { latitude: 51.541574, longitude: 9.951122 };
    setCenter([defaultCoords.latitude, defaultCoords.longitude]);
    setUserLocation([defaultCoords.latitude, defaultCoords.longitude]);
    setLoadingLocation(false);
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  if (loadingLocation) {
    return <div>Loading location...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Bookshelves
        bookshelves={bookshelves}
        center={center}
        setCenter={setCenter}
        userLocation={userLocation}
        destination={destination}
        setDestination={(loc) => {
          setDestination(loc);
          console.log("Destination set:", loc);
        }}
      />
    </div>
  );
};

export default UserCurrentLocation;

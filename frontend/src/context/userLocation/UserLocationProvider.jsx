// userLocationContext.jsx
import { createContext, useState, useEffect } from "react";

// Create a context for user location with a default value
export const UserLocationContext = createContext({
  userLocation: { latitude: null, longitude: null },
  isLoading: true,
  error: null,
});

const UserLocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user location using the Geolocation API
  useEffect(() => {
    const fetchUserLocation = async () => {
      if (navigator.geolocation) {
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        } catch (error) {
          setError(
            error.message || "An error occurred while fetching user location"
          );
        } finally {
          setIsLoading(false);
        }
      } else {
        const errorMessage = "Geolocation is not supported by this browser.";
        console.error(errorMessage);
        setError(errorMessage);
        setIsLoading(false);
      }
    };

    fetchUserLocation();
  }, []);

  return (
    <UserLocationContext.Provider value={{ userLocation, isLoading, error }}>
      {children}
    </UserLocationContext.Provider>
  );
};

export default UserLocationProvider;

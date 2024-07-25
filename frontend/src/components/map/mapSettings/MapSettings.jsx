import { useRef, useEffect, useState, useContext } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import LocationMarker from "../locationMarker/LocationMarker";
import MiniMapSettings from "../miniMapSettings/MiniMapSettings";
import UserStartAndDestination from "../userStartAndDestination/UserStartAndDestination";

import axios from "axios";
import { API } from "../../../utils/security/secreteKey";
import { toast } from "react-toastify";
import { UserLocationContext } from "../../../context/userLocation/UserLocationProvider";

// the custom icon
const customIcon = new L.Icon({
  iconUrl: "https://img.icons8.com/?size=100&id=13800&format=png&color=000000",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MapSettings = () => {
  // Global state variables
  const { userLocation } = useContext(UserLocationContext);
  console.log("user location=", userLocation);

  const [bookshelves, setBookshelves] = useState([]);
  const center = [51.541574, 9.951122];
  const [destination, setDestination] = useState(null);
  const [mapReady, setMapReady] = useState(false);

  // map user ref hook
  const mapRef = useRef(null);

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

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.TileLayer || layer instanceof L.Marker) {
          layer.remove();
        }
      });

      mapRef.current.setView(userLocation, 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);

      bookshelves.forEach((shelf) => {
        console.log("Checking coordinates:", shelf.location.coordinates);
        if (shelf.location.coordinates) {
          L.marker(shelf.location.coordinates)
            .addTo(mapRef.current)
            .bindPopup(`<b>${shelf.name}</b><br>${shelf.street}`);
        }
      });

      if (userLocation) {
        const userIcon = L.icon({
          iconUrl: "path_to_custom_user_icon.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        });

        L.marker(userLocation, { icon: userIcon })
          .addTo(mapRef.current)
          .bindPopup("Your Location")
          .openPopup();
      }

      if (destination) {
        L.marker(destination)
          .addTo(mapRef.current)
          .bindPopup("Destination")
          .openPopup();
      }

      setMapReady(true);
    }
  }, [bookshelves, center, userLocation, destination]);

  return (
    <div className="px-2">
      <MapContainer
        center={center}
        zoom={5}
        scrollWheelZoom={true}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
          console.log("Map instance created:", mapRef.current);
        }}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {bookshelves?.map((shelf) => (
          <Marker
            key={shelf._id}
            position={shelf?.location?.coordinates}
            icon={customIcon}
          >
            <Popup>
              <div style={{ maxWidth: "200px" }}>
                <h3>{shelf?.name}</h3>
                <p>{shelf?.street}</p>
                {shelf?.image && (
                  <img
                    src={shelf?.image}
                    alt={shelf?.name}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "5px",
                    }}
                  />
                )}
                <button
                  onClick={() => setDestination(shelf?.location?.coordinates)}
                  style={{ marginTop: "10px" }}
                >
                  Go Here
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
        <LocationMarker />
        {userLocation && destination && (
          <UserStartAndDestination start={userLocation} end={destination} />
        )}
        {mapReady && <MiniMapSettings position="topright" zoom={0} />}
      </MapContainer>
    </div>
  );
};

export default MapSettings;

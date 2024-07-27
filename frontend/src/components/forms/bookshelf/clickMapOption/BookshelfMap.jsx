import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
// import { useRef, useState } from "react";

// the custom icon
const customIcon = new L.Icon({
  iconUrl: "https://img.icons8.com/?size=100&id=13800&format=png&color=000000",
  iconSize: [25, 25],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const HoverMarker = ({ setMarkerPosition, setClickPosition }) => {
  useMapEvents({
    mousemove(e) {
      setMarkerPosition([e.latlng.lat, e.latlng.lng]);
    },
    click(e) {
      setClickPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

const BookshelfMap = ({
  mapRef,
  markerPosition,
  setMarkerPosition,
  clickPosition,
  setClickPosition,
}) => {
  const center = [51.541574, 9.951122];

  return (
    <div>
      <MapContainer
        center={center}
        zoom={5}
        scrollWheelZoom={true}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <HoverMarker
          setMarkerPosition={setMarkerPosition}
          setClickPosition={setClickPosition}
        />
        {markerPosition && (
          <Marker position={markerPosition} icon={customIcon} />
        )}
      </MapContainer>
      {clickPosition && (
        <div>
          <p>
            Clicked at latitude: {clickPosition[0]}, longitude:{" "}
            {clickPosition[1]}
          </p>
        </div>
      )}
    </div>
  );
};

export default BookshelfMap;


/** 
 * geocoding and reverse geocoding
  - there are several other open and free geocoding and reverse geocoding services.

  1. OpenCage Geocoding API
     - Website: https://opencagedata.com/
     - It Provides both forward and reverse geocoding. Offers a free tier with a limited number of requests per day.
     - Free Tier: Up to 2,500 requests per day.
     - API Documentation: OpenCage API Documentation
  2. Mapbox Geocoding API
    - Website: https://www.mapbox.com/
    - If offers forward and reverse geocoding services with a generous free tier. The free tier includes access to the Mapbox Maps and APIs.
    - Free Tier: Up to 100,000 requests per month.
    - API Documentation: Mapbox Geocoding API Documentation

  3. Google Maps Geocoding API
    - Website: Google Maps
    - It provides comprehensive geocoding and reverse geocoding. Google offers a free tier with a limited number of requests.
    - Free Tier: $200 free usage every month.
    - API Documentation: Google Maps Geocoding API Documentation

   4. Here Geocoding API
    - Website: https://developer.here.com/
    - It provides robust geocoding services including forward and reverse geocoding. They offer a free tier suitable for small projects.
    - Free Tier: 250,000 requests per month.
    - API Documentation: Here Geocoding API Documentation

   5. Geocodio
    - Website: https://www.geocod.io/
    - Description: Provides geocoding and reverse geocoding with a generous free tier. The free tier includes a limited number of requests per month.
    - Free Tier: Up to 2,500 requests per day.
    - API Documentation: Geocodio API Documentation

   6. 
*/

/** 
import { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import { myApiKey } from "../../../../utils/security/secreteKey";

// Custom icon
const customIcon = new L.Icon({
  iconUrl: "https://img.icons8.com/?size=100&id=13800&format=png&color=000000",
  iconSize: [25, 25],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// HoverMarker component
const HoverMarker = ({ setMarkerPosition, setHoverData }) => {
  useMapEvents({
    mousemove(e) {
      setMarkerPosition([e.latlng.lat, e.latlng.lng]);
      fetchAddress(e.latlng.lat, e.latlng.lng, setHoverData);
    },
    click(e) {
      setMarkerPosition([e.latlng.lat, e.latlng.lng]);
      fetchAddress(e.latlng.lat, e.latlng.lng, setHoverData);
    },
  });
  return null;
};

// Fetch address function
const fetchAddress = async (lat, lng, setHoverData) => {
  try {
    const response = await axios.get(
      "https://api.opencagedata.com/geocode/v1/json",
      {
        params: {
          q: `${lat},${lng}`,
          key: `${myApiKey}`, // Replace with your OpenCage API key
        },
      }
    );
    const result = response.data.results[0];
    const components = result.components;
    setHoverData({
      lat,
      lng,
      continent: components.continent,
      country: components.country,
      state: components.state,
      city: components.city || components.town || components.village,
      zip: components.postcode,
      street: components.road,
    });
  } catch (error) {
    console.error("Error fetching address:", error);
    setHoverData({});
  }
};

// Main map component
const BookshelfMap = () => {
  const mapRef = useRef(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [hoverData, setHoverData] = useState({});

  const center = [51.541574, 9.951122];

  return (
    <div>
      <MapContainer
        center={center}
        zoom={5}
        scrollWheelZoom={true}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <HoverMarker
          setMarkerPosition={setMarkerPosition}
          setHoverData={setHoverData}
        />
        {markerPosition && (
          <Marker position={markerPosition} icon={customIcon} />
        )}
      </MapContainer>
      {hoverData.lat !== undefined && hoverData.lng !== undefined && (
        <div style={{ marginTop: "20px" }}>
          <h3>Hovered Location Details:</h3>
          <p>Latitude: {hoverData.lat}</p>
          <p>Longitude: {hoverData.lng}</p>
          <p>Continent: {hoverData.continent || "N/A"}</p>
          <p>Country: {hoverData.country || "N/A"}</p>
          <p>State: {hoverData.state || "N/A"}</p>
          <p>City: {hoverData.city || "N/A"}</p>
          <p>Zip Code: {hoverData.zip || "N/A"}</p>
          <p>Street: {hoverData.street || "N/A"}</p>
        </div>
      )}
    </div>
  );
};

export default BookshelfMap;

*/


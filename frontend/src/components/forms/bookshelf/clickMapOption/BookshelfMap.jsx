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

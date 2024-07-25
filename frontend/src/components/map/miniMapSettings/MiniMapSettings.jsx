import { useCallback, useMemo, useState, useEffect } from "react";
import {
  MapContainer,
  Rectangle,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEventHandlers } from "@react-leaflet/core";

const POSITION_CLASSES = {
  bottomleft: "leaflet-bottom leaflet-left",
  bottomright: "leaflet-bottom leaflet-right",
  topleft: "leaflet-top leaflet-left",
  topright: "leaflet-top leaflet-right",
};

const BOUNDS_STYLE = { weight: 1 };

const MinimapBounds = ({ parentMap, zoom }) => {
  const minimap = useMap();

  const onClick = useCallback(
    (e) => {
      parentMap.setView(e.latlng, parentMap.getZoom());
    },
    [parentMap]
  );
  useMapEvent("click", onClick);

  const [bounds, setBounds] = useState(parentMap.getBounds());

  const onChange = useCallback(() => {
    setBounds(parentMap.getBounds());
    minimap.setView(parentMap.getCenter(), zoom);
  }, [minimap, parentMap, zoom]);

  const handlers = useMemo(
    () => ({ move: onChange, zoom: onChange }),
    [onChange]
  );
  useEventHandlers({ instance: parentMap }, handlers);

  return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />;
};

const MiniMapSettings = ({ position, zoom }) => {
  const parentMap = useMap();
  const mapZoom = zoom || 0;

  const [parentMapCenter, setParentMapCenter] = useState(null);

  useEffect(() => {
    if (parentMap) {
      setParentMapCenter(parentMap.getCenter());
    }
  }, [parentMap]);

  const minimap = useMemo(() => {
    if (!parentMapCenter) return null;

    return (
      <MapContainer
        style={{ height: 80, width: 80 }}
        center={parentMapCenter}
        zoom={mapZoom}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
      </MapContainer>
    );
  }, [parentMapCenter, parentMap, mapZoom]);

  const positionClass =
    (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;

  return (
    <div className={positionClass}>
      <div className="leaflet-control leaflet-bar">{minimap}</div>
    </div>
  );
};

export default MiniMapSettings;

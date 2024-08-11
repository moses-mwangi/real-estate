"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import { Card } from "@/components/ui/card";
import { usePathname, useRouter } from "next/navigation";

interface MapProps {
  latitude: number;
  longitude: number;
  address: string;
}

function Map({ latitude, longitude, address }: MapProps) {
  const position: [number, number] = [latitude, longitude];

  const roouter = useRouter();

  const DefaultIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  return (
    <div className="px-8">
      <Card className="bg-card border-none py-8 px-8 -z-50">
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "440px", width: "100%" }}
          className=" rounded-md"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
          <Marker position={position} draggable={false}>
            <Popup>{address}</Popup>
          </Marker>

          <ChangeCenter position={position} />
          <DetectClick />
        </MapContainer>
      </Card>
    </div>
  );
}

function DetectClick() {
  const router = useRouter();
  const pathname = usePathname();

  useMapEvents({
    click: (e) => {
      const url = `${pathname}?lat=${e.latlng.lat}&lng=${e.latlng.lng}`;
      router.replace(url, undefined);
    },
  });

  return null;
}

interface ChangeCenterProps {
  position: [number, number];
}

const ChangeCenter = function ChangeCenter({ position }: ChangeCenterProps) {
  const map = useMap();
  map.setView(position);

  return null;
};

export default Map;

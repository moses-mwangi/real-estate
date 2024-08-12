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
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface MapProps {
  latitude: number;
  longitude: number;
  address: string;
}

function Map({ latitude, longitude, address }: MapProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState<any>([latitude, longitude]);
  const [error, setError] = useState("");

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        setIsLoading(false);
      },

      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

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
      <Card className="bg-card relative border-none py-8 px-8">
        <Button
          onClick={getPosition}
          className="absolute z-30 right-[40%] bottom-10 font-semibold text-slate-800 bg-green-500 hover:bg-green-600 uppercase"
        >
          {isLoading ? "loading..." : "Get your current position"}
        </Button>
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: "440px", width: "100%" }}
          className=" rounded-md z-10"
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

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
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

interface MapProps {
  address: string | undefined;
  location: number[] | undefined;
  image: (string | StaticImport)[] | undefined;
}

function Map({ address, location, image }: MapProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState<any>(location);
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
    <div className=" px-1 sm:px-6 md:px-8">
      <Card className="bg-card relative border-none py-5 px-5 sm:py-8 sm:px-8">
        <Button
          onClick={getPosition}
          className="absolute z-30 ml-2 sm:ml-0 sm:right-[40%] bottom-12 font-semibold text-slate-800 bg-green-500 hover:bg-green-600 uppercase"
        >
          {isLoading ? "loading..." : "Get your current position"}
        </Button>
        <MapContainer
          center={position}
          zoom={40}
          scrollWheelZoom={false}
          style={{ height: "440px", width: "100%" }}
          className=" rounded-md z-10"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
          <Marker position={position} draggable={false}>
            <Popup className=" p-0">
              <div className=" rounded-sm border-r-2 border-solid border-green-500">
                <h1>{address}</h1>
                {image?.at(0) && (
                  <Image
                    src={image?.at(0) as string | StaticImport}
                    width={50}
                    height={50}
                    alt="map"
                  />
                )}
              </div>
            </Popup>
          </Marker>
          {position && <ChangeCenter position={position} />}

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

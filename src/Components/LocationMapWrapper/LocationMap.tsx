"use client";
import { type FC } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { mdiTarget } from "@mdi/js";
import "leaflet/dist/leaflet.css";
import Icon from "@mdi/react";
import L from "leaflet";

export interface Props {
    latitude: number;
    longitude: number;
}

const RecenterButton: FC<Props> = ({ latitude, longitude }) => {
    const map = useMap();

    const handleClick = () => {
        map.setView([latitude, longitude], map.getZoom(), {
            animate: true,
        });
    };

    return (
        <button
            onClick={handleClick}
            className='h-10 w-10 absolute bottom-2.5 left-2.5 p-2 bg-black/50 border-none rounded-full text-sm cursor-pointer z-400'
        >
            <Icon path={mdiTarget} className='z-10' color={"white"} size={1} />
        </button>
    );
};

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const LocationMap: FC<Props> = ({ latitude, longitude }) => {
    return (
        <div className='h-50 md:h-92 w-full mt-5 relative rounded-lg overflow-hidden'>
            <MapContainer
                center={[latitude, longitude]}
                zoom={15}
                scrollWheelZoom={true}
                className='h-full z-9 w-full'
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <Marker position={[latitude, longitude]} />
                <RecenterButton latitude={latitude} longitude={longitude} />
            </MapContainer>
        </div>
    );
};

export default LocationMap;

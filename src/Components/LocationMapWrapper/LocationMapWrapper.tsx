"use client";

import dynamic from "next/dynamic";
import type { FC } from "react";
import type { Props } from "./LocationMap";

const LocationMap = dynamic(() => import("./LocationMap"), {
    ssr: false,
});

const LocationMapWrapper: FC<Props> = (props) => <LocationMap {...props} />;

export default LocationMapWrapper;

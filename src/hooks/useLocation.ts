import { useEffect, useState } from "react";

import type { UserLocationType } from "@/types/globals";

type LocationType = UserLocationType | null;
const useLocation = (): LocationType | undefined => {
    const [isReady, setIsReady] = useState<boolean>(false);
    const [location, setLocation] = useState<LocationType>(null);

    useEffect(() => {
        if (!navigator.geolocation) return setIsReady(true);
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                setLocation({
                    latitude,
                    longitude,
                });
                setIsReady(true);
            },
            () => setIsReady(true)
        );
    }, []);
    if (isReady) return location;
};

export default useLocation;

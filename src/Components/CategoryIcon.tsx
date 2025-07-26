import type { FC } from "react";
import Icon from "@mdi/react";
import {
    mdiFloorLamp,
    mdiCar,
    mdiCamera,
    mdiCards,
    mdiShoeHeel,
    mdiBasketball,
    mdiHeadphones,
    mdiBookOpenVariant,
    mdiApps,
    mdiApplication,
} from "@mdi/js";

import type { IconType } from "@/types/categories";

const iconMap: Record<IconType, string> = {
    application: mdiApplication,
    apps: mdiApps,
    basketball: mdiBasketball,
    "book-open-variant": mdiBookOpenVariant,
    camera: mdiCamera,
    car: mdiCar,
    cards: mdiCards,
    "floor-lamp": mdiFloorLamp,
    headphones: mdiHeadphones,
    "shoe-heel": mdiShoeHeel,
};

interface Props {
    icon: IconType | undefined;
    color: string;
    size?: number;
}
const CategoryIcon: FC<Props> = ({ icon, color, size = 1 }) => {
    if(!icon) return <span>❓</span>
    const path = iconMap[icon];
    if (!path) return <span>❓</span>;
    return <Icon path={path} size={size} color={color} />;
};

export default CategoryIcon;

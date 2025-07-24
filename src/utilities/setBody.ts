import type { AddListingType } from "@Types/listings";
import { nanoid } from "nanoid/non-secure";

const setBody = ({
    categoryId,
    description,
    images,
    price,
    title,
    latitude,
    longitude,
}: Omit<AddListingType, "setProgress">):FormData => {
    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("price", String(price));
    data.append("categoryId", String(categoryId));

    if (latitude) data.append("latitude", String(latitude));
    if (longitude) data.append("longitude", String(longitude));

    const imageList: any[] = images.map(({ uri, mimeType }) => ({
        name: nanoid() + ".jpg",
        type: mimeType || "image/jpeg",
        uri,
    }));

    imageList.forEach((image) => {
        data.append("images", image);
    });
    return data;
};
export default setBody;

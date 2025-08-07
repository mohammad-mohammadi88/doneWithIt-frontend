import type { AddListingType } from "@/types/listings";

const setBody = ({
    categoryId,
    description,
    images,
    price,
    title,
    latitude,
    longitude,
}: Omit<AddListingType, "setProgress">): FormData => {
    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("price", String(price));
    data.append("categoryId", String(categoryId));

    if (latitude) data.append("latitude", String(latitude));
    if (longitude) data.append("longitude", String(longitude));

    images.forEach((image) => {
        data.append("images", image);
    });
    return data;
};
export default setBody;

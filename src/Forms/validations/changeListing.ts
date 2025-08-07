import { array, number, object, string } from "yup";

import defaults from "@/constants/defaults";

export default object().shape({
    title: string().required().min(3).label("Title"),
    price: number().required().min(1).max(10000).label("Price"),
    description: string().label("Description"),
    category: number()
        .required()
        .min(1, "Category is a required field")
        .label("Category"),
    images: array()
        .min(1, "Please select at least one image")
        .max(
            defaults.maxImageCount,
            `You can upload at most ${defaults.maxImageCount} images`
        ),
});

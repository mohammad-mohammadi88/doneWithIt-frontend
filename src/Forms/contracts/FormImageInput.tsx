"use client";
import { ErrorMessage } from "formik";
import type { FC } from "react";

import { ImageInputList } from "@AppComponents";
import defaults from "@/constants/defaults";

interface Props {
    images: File[];
    setFieldValue: (name: "images", images: File[]) => void;
}

const FormImageInput: FC<Props> = ({ images, setFieldValue }) => {
    const onAdd = (image: File) => setFieldValue("images", [...images, image]);

    const onRemove = ({ name }: File) =>
        setFieldValue(
            "images",
            images.filter((e) => e.name !== name)
        );

    return (
        <div>
            <ImageInputList
                images={images}
                maxImageCount={defaults.maxImageCount}
                onAdd={onAdd}
                onRemove={onRemove}
            />
            <ErrorMessage
                name={"images"}
                component="div"
                className="text-red-600 text-base"
            />
        </div>
    );
};

export default FormImageInput;

"use client";
import { memo, useEffect, useRef, type FC } from "react";

import { ImageInput } from ".";

interface Props {
    images: File[];
    maxImageCount?: number;
    onAdd: (image: File) => void;
    onRemove: (image: File) => void;
}

const ImageInputList: FC<Props> = ({
    images,
    maxImageCount,
    onAdd,
    onRemove,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        containerRef.current?.scrollTo({ behavior: "smooth", left: 9000 });
    }, [images]);

    const imageCondition =
        (maxImageCount && maxImageCount > images.length) || !maxImageCount;
    return (
        <div
            ref={containerRef}
            className="flex overflow-x-scroll snap-x snap-mandatory scroll-container scrollbar-hide"
        >
            {images.map((file) => (
                <div key={file.name} className="mr-2.5">
                    <ImageInput onChangeImage={onRemove} image={file} />
                </div>
            ))}
            {imageCondition && <ImageInput onChangeImage={onAdd} />}
        </div>
    );
};

export default memo(ImageInputList);

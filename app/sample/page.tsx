"use client";

import { ImageInputList } from "@AppComponents";
import { useState, type FC } from "react";

const page: FC = () => {
    const [files, setFiles] = useState<File[]>([]);
    return (
        <div>
            <ImageInputList
                images={files}
                onAdd={(file) => setFiles((e) => [...e, file])}
                onRemove={({ name, size }) =>
                    setFiles((e) =>
                        e.filter((c) => c.name !== name && c.size !== size)
                    )
                }
                maxImageCount={3}
            />
        </div>
    );
};

export default page;

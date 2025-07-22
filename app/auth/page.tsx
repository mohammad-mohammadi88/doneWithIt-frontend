"use client";
import { ViewImageModal } from "@/Components";
import type { NextPage } from "next";
import { useState } from "react";

const page: NextPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const images = [
        "https://res.cloudinary.com/dnuaorrrl/image/upload/v1752581733/listings/swhemqkw1xyzdtvgqe54.jpg",
        "https://res.cloudinary.com/dnuaorrrl/image/upload/v1752580231/listings/gyg8wq6n33lhrpi9uzlq.jpg",
        "https://res.cloudinary.com/dnuaorrrl/image/upload/v1752580459/listings/ditkxst4xdvrioaob8od.jpg",
    ];
    return (
        <div>
            <button onClick={() => setIsOpen(true)}>click</button>
            <ViewImageModal
                isOpen={isOpen}
                images={images}
                onClose={() => setIsOpen(false)}
            />
        </div>
    );
};

export default page;

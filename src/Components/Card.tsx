import type { FC } from "react";
import Image from "next/image";

import { Link } from "./AppComponents";

interface Props {
    href: string;
    imageURL: string;
    isSold: boolean;
    subTitle: string;
    title: string;
}

const Card: FC<Props> = ({ title, subTitle, imageURL, isSold, href }) => (
    <div
        className='bg-white hover:bg-light-200 duration-200 border border-black rounded-2xl overflow-hidden select-none'
    >
        <Link href={href} >
            <Image
                src={imageURL}
                alt={title}
                width={150}
                height={100}
                className='w-full h-52'
                draggable={false}
            />
            <div className='p-5'>
                <h3 className='line-clamp-2 text-xl'>{title}</h3>
                <p className='text-primary text-xl font-semibold'>{subTitle}</p>
            </div>
        </Link>
    </div>
);

export default Card;

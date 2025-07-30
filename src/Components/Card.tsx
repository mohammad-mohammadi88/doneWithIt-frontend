import type { FC } from "react";
import Image from "next/image";

import { Link } from "./AppComponents";
import SoldOutMark from "./SoldOutMark";

interface Props {
    href: string;
    imageURL: string;
    isSold: boolean;
    subTitle: string;
    title: string;
}

const Card: FC<Props> = ({ title, subTitle, imageURL, isSold, href }) => (
    <div className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4'>
        <div className='bg-white relative hover:bg-light-200 duration-200 border border-black rounded-2xl overflow-hidden select-none'>
            <SoldOutMark isSold={isSold} />
            <Link href={href}>
                <Image
                    src={imageURL}
                    alt={title}
                    width={150}
                    height={100}
                    className='w-full h-52'
                    draggable={false}
                />
                <div className='p-5'>
                    <h3 className='line-clamp-2 sm:line-clamp-1 text-xl'>
                        {title}
                    </h3>
                    <p className='text-primary text-xl font-semibold'>
                        {subTitle}
                    </p>
                </div>
            </Link>
        </div>
    </div>
);

export default Card;

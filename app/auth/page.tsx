import type { NextPage } from "next";

import { Card } from "@/Components";

const page: NextPage = async () => {
    const A = () => (
        <div className="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
            <Card
                href='/'
                imageURL='https://res.cloudinary.com/dnuaorrrl/image/upload/v1752581733/listings/swhemqkw1xyzdtvgqe54.jpg'
                isSold
                subTitle='100$'
                title='red jacket'
            />
        </div>
    );
    return (
        <div className='bg-light-400 group'>
            <div className='container flex flex-wrap mx-auto'>
                <A />
                <A />
                <A />
                <A />
                <A />
                <A />
                <A />
                <A />
                <A />
                <A />
                <A />
                <A />
                <A />
                <A />
                <A />
                <A />
                <A />
                <A />
            </div>
        </div>
    );
};

export default page;

import type { ServerCategories } from "@/types/categories";
import type { FC } from "react";
import clsx from "clsx";

interface Props {
    categories: ServerCategories[];
}

const Footer: FC<Props> = ({ categories }) => (
    <footer className='container mx-auto px-4 my-4 relative bottom-0 lg:mb-0'>
        <div className='text-light-300 rounded-xl lg:rounded-b-none flex flex-wrap mx-auto p-3 bg-gray-500'>
            <div className='w-full md:w-1/2'>
                <h2 className='text-lg border-b font-bold pb-2 mb-3'>
                    Categories
                </h2>
                <ul className='px-3'>
                    {categories.map(({ name }) => (
                        <li key={name} className='list-disc'>
                            {name}
                        </li>
                    ))}
                </ul>
            </div>
            <div
                className={clsx(
                    "flex flex-col items-center justify-center",
                    "w-full mt-6 pt-3 border-t text-center",
                    "md:border-t-0 md:p-0 md:m-0 md:w-1/2"
                )}
            >
                <h1 className='text-xl font-bold mb-2'>Done With It</h1>
                <p>
                    Done with it is an online shopping application that you can
                    buy stuff you need from all over the world and sell stuff
                    you do not need to every body on world!
                </p>
            </div>
        </div>
    </footer>
);

export default Footer;

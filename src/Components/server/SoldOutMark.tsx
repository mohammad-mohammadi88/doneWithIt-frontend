import type { FC } from "react";

interface Props {
    isSold: boolean;
}

const SoldOutMark: FC<Props> = ({ isSold }) => isSold && (
    <div className='absolute flex z-1 justify-center items-center h-full w-full'>
        <div className='h-full w-full bg-black/20' />
        <div className='flex justify-center items-center absolute bg-red-600 w-38 p-5 -rotate-25 rounded-lg'>
            <p className='text-xl text-white'>SOLD OUT</p>
        </div>
    </div>
);

export default SoldOutMark;

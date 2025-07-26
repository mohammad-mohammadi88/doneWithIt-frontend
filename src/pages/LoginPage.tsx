import type { FC } from "react";
import Image from "next/image";

import LoginForm from "@/Forms/logic/LoginForm";
import { PageHeading } from "@/Components";

const LoginPage: FC = () => (
    <>
        <PageHeading title='Login' />
        <div className='flex flex-col w-full sm:-translate-y-5 items-center justify-center sm:h-screen pt-15'>
            <Image
                className='pb-5 mt-7 sm:mt-0'
                src={"/icon.png"}
                alt='Application Icon'
                width={100}
                height={100}
            />
            <div className='w-screen sm:w-auto'>
                <LoginForm />
            </div>
        </div>
    </>
);

export default LoginPage;

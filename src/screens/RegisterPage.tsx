import type { FC } from "react";
import Image from "next/image";

import RegisterForm from "@/Forms/logic/RegisterForm";
import { PageHeading } from "@/Components";

const RegisterPage: FC = () => (
    <>
        <PageHeading title='Register' />
        <div className='flex flex-col w-full sm:-translate-y-5 items-center justify-center sm:h-screen'>
            <Image
                className='pb-5 hidden sm:block'
                src={"/icon.png"}
                alt='Application Icon'
                width={100}
                height={100}
            />
            <div className='w-screen sm:w-auto'>
                <RegisterForm />
            </div>
        </div>
    </>
);

export default RegisterPage;

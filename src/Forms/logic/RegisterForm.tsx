import { Formik } from "formik";
import type { FC } from "react";
import clsx from "clsx";

import registerValidation from "../validations/register";
import { Input, Submit } from "../contracts";

const initialValues = {
    name: "",
    email: "",
    password: "",
};
const RegisterForm: FC = () => {
    return (
        <div className='relative h-screen w-screen'>
            <Formik
                initialValues={initialValues}
                onSubmit={console.log}
                validationSchema={registerValidation}
            >
                {({
                    values: { email, name, password },
                    handleChange,
                    handleSubmit,
                }) => (
                    <form
                        autoSave='false'
                        onSubmit={handleSubmit}
                        className={clsx(
                            "sm:-translate-y-1/2 -translate-x-1/2 left-1/2 sm:top-1/2",
                            "w-full absolute flex flex-col sm:w-120",
                            "sm:border border-black rounded-2xl p-5 space-y-5"
                        )}
                    >
                        <Input
                            label='Username'
                            inputType='text'
                            name='name'
                            onChange={handleChange}
                            value={name}
                        />
                        <Input
                            label='Email'
                            inputType='email'
                            name='email'
                            onChange={handleChange}
                            value={email}
                        />
                        <Input
                            inputType='password'
                            label='Password'
                            name='password'
                            onChange={handleChange}
                            value={password}
                        />
                        <Submit title='Register' />
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default RegisterForm;

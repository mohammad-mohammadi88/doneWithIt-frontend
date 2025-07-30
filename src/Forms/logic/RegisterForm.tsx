"use client"
import { ApiErrorResponse, ApiOkResponse } from "apisauce";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, type FC } from "react";
import Lottie from "lottie-react";
import { Formik } from "formik";
import clsx from "clsx";

import { ErrorMessage } from "@/Components/AppComponents";
import registerValidation from "../validations/register";
import type { RegisterInterface } from "@/types/Forms";
import loading2Data from "@/animations/loading2.json";
import { Input, Submit } from "../contracts";
import Overlay from "@/Components/Overlay";
import tokenApi from "@/APIs/token";
import authApi from "@/APIs/auth";

const initialValues = {
    name: "",
    email: "",
    password: "",
};
const RegisterForm: FC = () => {
    const { mutateAsync, isPending, data } = useMutation({
        mutationKey: ["register"],
        mutationFn: async (
            value: RegisterInterface
        ): Promise<
            ApiErrorResponse<{ error: string }> | ApiOkResponse<string>
        > => await authApi.register(value),
    });
    const router = useRouter();

    const handleSetToken = async () => {
        if (data?.data && typeof data.data === "string") {
            const token = data.data;
            const { ok } = await tokenApi.storeToken(token);
            if (ok) router.push("/feed");
        }
    };
    useEffect(() => {
        if (data?.ok) handleSetToken();
    }, [data?.ok]);

    return (
        <div className='relative'>
            <Overlay visible={isPending || typeof data?.data === "string"}>
                <Lottie
                    animationData={loading2Data}
                    className='h-92'
                    size={10}
                />
            </Overlay>
            {data?.ok === false && !isPending && (
                <ErrorMessage
                    className='text-left'
                    title={data?.data?.error || "unexpected error happend"}
                />
            )}
            <Formik
                initialValues={initialValues}
                onSubmit={async (value) => await mutateAsync(value)}
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
                            "w-full flex flex-col sm:w-120",
                            "sm:border border-black rounded-2xl p-2 sm:p-5 space-y-5"
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

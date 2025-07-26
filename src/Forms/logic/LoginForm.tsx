import type { ApiErrorResponse, ApiOkResponse } from "apisauce";
import { useMutation } from "@tanstack/react-query";
import Lottie from "lottie-react";
import { Formik } from "formik";
import { useEffect, type FC } from "react";
import clsx from "clsx";

import { ErrorMessage } from "@/Components/AppComponents";
import loading2Data from "@/animations/loading2.json";
import loginValidation from "../validations/login";
import { LoginInterface } from "@/types/Forms";
import { Input, Submit } from "../contracts";
import Overlay from "@/Components/Overlay";
import { authApi, tokenApi } from "@/APIs";
import { useRouter } from "next/navigation";

const initialValues = {
    email: "",
    password: "",
};
const LoginForm: FC = () => {
    const { mutateAsync, isPending, data, isSuccess } = useMutation({
        mutationKey: ["login"],
        mutationFn: async ({
            email,
            password,
        }: LoginInterface): Promise<
            ApiErrorResponse<{ error: string }> | ApiOkResponse<string>
        > => await authApi.login(email, password),
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
    const handleSubmit = async (values: LoginInterface) => {
        await mutateAsync(values);
    };
    return (
        <>
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
                onSubmit={handleSubmit}
                validationSchema={loginValidation}
            >
                {({
                    values: { email, password },
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
                        <Submit title='Login' />
                    </form>
                )}
            </Formik>
        </>
    );
};

export default LoginForm;

"use client";
import type { ApiErrorResponse, ApiOkResponse } from "apisauce";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, type FC } from "react";
import Lottie from "lottie-react";
import { Formik } from "formik";
import clsx from "clsx";

import { clientAuth, clientToken } from "@/APIs/client";
import loading2Data from "@/animations/loading2.json";
import loginValidation from "../validations/login";
import { LoginInterface } from "@/types/Forms";
import { ErrorMessage } from "@AppComponents";
import { Input, Submit } from "../contracts";
import { Overlay } from "@Client";

const initialValues = {
    email: "",
    password: "",
};
const LoginForm: FC = () => {
    const { mutateAsync, isPending, data } = useMutation({
        mutationKey: ["login"],
        mutationFn: async ({
            email,
            password,
        }: LoginInterface): Promise<
            ApiErrorResponse<{ error: string }> | ApiOkResponse<string>
        > => await clientAuth.login(email, password),
    });
    const router = useRouter();

    const handleSetToken = async () => {
        if (data?.data && typeof data.data === "string") {
            const token = data.data;
            const { ok } = await clientToken.storeToken(token);
            if (ok) router.push("/feed");
        }
    };
    useEffect(() => {
        if (data?.ok) handleSetToken();
    }, [data?.ok]);

    return (
        <>
            <Overlay visible={isPending || typeof data?.data === "string"}>
                <Lottie
                    animationData={loading2Data}
                    className="h-92"
                    size={10}
                />
            </Overlay>
            {data?.ok === false && !isPending && (
                <ErrorMessage
                    className="text-left pb-2"
                    title={data?.data?.error || "unexpected error happend"}
                />
            )}
            <Formik
                initialValues={initialValues}
                onSubmit={async (value) => await mutateAsync(value)}
                validationSchema={loginValidation}
            >
                {({
                    values: { email, password },
                    handleChange,
                    handleSubmit,
                }) => (
                    <form
                        autoSave="false"
                        onSubmit={handleSubmit}
                        className={clsx(
                            "w-full flex flex-col sm:w-120",
                            "sm:border border-black rounded-2xl p-2 sm:p-5 space-y-5"
                        )}
                    >
                        <Input
                            autoFocus
                            inputType="email"
                            label="Email"
                            name="email"
                            onChange={handleChange}
                            value={email}
                        />
                        <Input
                            inputType="password"
                            label="Password"
                            name="password"
                            onChange={handleChange}
                            value={password}
                        />
                        <Submit title="Login" />
                    </form>
                )}
            </Formik>
        </>
    );
};

export default LoginForm;

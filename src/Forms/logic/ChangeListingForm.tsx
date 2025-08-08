"use client";

import { useRouter } from "next/navigation";
import { useState, type FC } from "react";
import Lottie from "lottie-react";
import { Formik } from "formik";
import clsx from "clsx";

import { Category, FormImageInput, Input, Submit } from "../contracts";
import { ConfirmDialog, PageHeading, ProgressModal } from "@Client";
import type { AddListingType, ListingType } from "@/types/listings";
import changeListingValidation from "../validations/changeListing";
import type { ListingChangeInterface } from "@/types/Forms";
import Loading1Data from "@/animations/loading1.json";
import { useLocation, useProgress } from "@/hooks";
import { ApiResponse } from "apisauce";

interface Props {
    initialValues: ListingChangeInterface;
    pageHeading: string;
    request: (
        values: AddListingType
    ) => Promise<ApiResponse<ListingType, { error: string }>>;
}
const ChangeListingForm: FC<Props> = ({
    initialValues,
    pageHeading,
    request,
}) => {
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState<number>(0);
    const location = useLocation();
    const router = useRouter();

    const { clearProgress, startProgress } = useProgress(progress, setProgress);

    if (location === undefined)
        return (
            <div className="h-screen w-screen flex justify-center items-center">
                <Lottie
                    animationData={Loading1Data}
                    className="h-50 w-50 mx-auto md:h-72 md:w-72"
                    autoPlay
                />
            </div>
        );

    return (
        <>
            <ProgressModal
                visible={!!progress}
                progress={progress}
                onAnimationEnd={() => {
                    setProgress(0);
                    clearProgress();
                    router.push("/feed");
                }}
            />
            <ConfirmDialog
                isOpen={!!error}
                onClose={() => setError(null)}
                title="Error"
                description={error ?? ""}
                onConfirm={() => setError(null)}
            />
            <div className="sm:min-h-screen w-screen sm:flex pt-4 justify-center items-center">
                <PageHeading title={pageHeading} />
                <Formik
                    initialValues={initialValues}
                    onSubmit={async ({ category: categoryId, ...value }) => {
                        startProgress();
                        const { data, ok } = await request({
                            categoryId,
                            ...value,
                            ...location,
                        });
                        clearProgress();
                        setProgress(Number(ok));
                        const error = !ok
                            ? data?.error ?? "Unexpected Error happend"
                            : null;
                        setError(error);
                    }}
                    validationSchema={changeListingValidation}
                >
                    {({
                        values: { category, description, images, price, title },
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                    }) => (
                        <form
                            autoSave="false"
                            onSubmit={handleSubmit}
                            className={clsx(
                                "w-full flex flex-col sm:w-120",
                                "sm:border border-black rounded-2xl p-2 sm:p-5 space-y-5"
                            )}
                        >
                            <FormImageInput
                                images={images}
                                setFieldValue={setFieldValue}
                            />
                            <Input
                                autoFocus
                                inputType="text"
                                label="Title"
                                name="title"
                                onChange={handleChange}
                                value={title}
                            />
                            <Input
                                inputType="text"
                                label="Price"
                                name="price"
                                className="!w-28"
                                onChange={(e: InputEvent) => {
                                    // @ts-expect-error this will always return a value
                                    const text: string = e.target?.value;
                                    const regex = new RegExp(
                                        /^(?:\d+|\d+\.|\d+\.+\d|\d+\.+\d\d)?$/
                                    );
                                    if (regex.test(text))
                                        setFieldValue("price", text);
                                }}
                                value={String(price)}
                            />
                            <Category
                                value={category}
                                handleChange={(text) =>
                                    setFieldValue("category", text)
                                }
                            />
                            <Input
                                as="textarea"
                                rows="5"
                                inputType="text"
                                label="Description"
                                className="rounded-lg resize-none"
                                name="description"
                                onChange={handleChange}
                                value={description}
                            />
                            <Submit title="POST" />
                        </form>
                    )}
                </Formik>
            </div>
        </>
    );
};

export default ChangeListingForm;

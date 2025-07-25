import type { NextPage } from "next";
import clsx from "clsx";

import { Card, SearchByCategory, SearchListing } from "@/Components";
import { categoriesApi, listingsApi } from "@/APIs";
import type { ListingType } from "@/types/listings";
import { ServerCategories } from "@/types/categories";
import { FC } from "react";

const ErrorMessage: FC<{ title: string }> = ({ title }) => (
    <h2 className='text-secondary text-3xl text-center px-3 md:text-5xl'>{title}</h2>
);

const page: NextPage = async ({ searchParams }: any) => {
    const { q = "", category = "" }: { q: string; category: string } =
        (await searchParams) as any;

    const categories = await categoriesApi.getCategories();

    const { body, ok } = await listingsApi.getListings();
    if (!ok) {
        return (
            <div className='bg-light-400 min-h-screen flex justify-center items-center pt-8'>
                <ErrorMessage title={body.error} />
            </div>
        );
    }

    if (body.length === 0)
        return (
            <div className='bg-light-400 min-h-screen flex justify-center items-center pt-8'>
                <ErrorMessage title='There is no data on database!' />
            </div>
        );
    const filterByTitle = ({ title }: ListingType) =>
        !q || title.toLowerCase().includes(q.toLowerCase().trim());

    const filterByCategory = ({ categoryId }: ListingType) =>
        category.toLowerCase() === "all" ||
        category.toLowerCase() === "" ||
        (categories as ServerCategories[])
            .find(({ id }) => id === categoryId)
            ?.name.toLowerCase() === category.toLowerCase();

    const filteredListings = (body as ListingType[])
        .filter(filterByTitle)
        .filter(filterByCategory);

    return (
        <div className='bg-light-400 min-h-screen pt-8'>
            <div className='container mx-auto flex flex-1 flex-col sm:flex-row space-y-5 sm:space-y-0 p-4 sm:space-x-4 sm:items-center'>
                <SearchListing />
                <SearchByCategory categories={categories} selected={category} />
            </div>
            <div
                className={clsx(
                    "container flex flex-wrap mx-auto",
                    filteredListings.length === 0 &&
                        "absolute justify-center top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 bottom-0 items-center"
                )}
            >
                {filteredListings.length > 0 ? (
                    filteredListings.map(
                        ({ images, isSold, id, price, title }) => (
                            <Card
                                href={"/feed/" + id}
                                imageURL={images[0].url}
                                isSold={isSold}
                                key={id}
                                subTitle={price + "$"}
                                title={title}
                            />
                        )
                    )
                ) : (
                    <ErrorMessage title='There is no listing with this filters!' />
                )}
            </div>
        </div>
    );
};

export default page;

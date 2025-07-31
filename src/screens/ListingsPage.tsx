import { lazy, type FC } from "react";

import type { ServerCategories } from "@/types/categories";
import { SearchByCategory, SearchListing } from "@Client";
import type { TypedResponse } from "@/types/globals";
import type { ListingType } from "@/types/listings";
import { serverCategories } from "@/APIs/server";
import { ErrorMessage } from "@AppComponents";

interface Props {
    searchParams: Promise<{ q: string; category: string }>;
    getListingsRequest: () => Promise<TypedResponse<ListingType[]>>;
}
const ListingsPage: FC<Props> = async ({
    searchParams,
    getListingsRequest,
}) => {
    const errorClassName = "text-3xl md:text-5xl text-center";
    const { q = "", category = "" }: { q: string; category: string } =
        (await searchParams) as any;

    const Footer = lazy(() => import("@/Components/server/Footer"));
    const Card = lazy(() => import("@/Components/server/Card"));

    const categories: ServerCategories[] =
        await serverCategories.getCategories();

    const { body, ok } = await getListingsRequest();
    if (!ok) {
        return (
            <div className='bg-light-400 min-h-screen flex justify-center items-center pt-8'>
                <ErrorMessage
                    className={errorClassName}
                    title={body?.error ?? "Could not load listings"}
                />
            </div>
        );
    }

    if (body.length === 0)
        return (
            <div className='bg-light-400 min-h-screen flex justify-center items-center pt-8'>
                <ErrorMessage
                    className={errorClassName}
                    title='There is no data on database!'
                />
            </div>
        );

    const filterByTitle = ({ title }: ListingType) =>
        !q || title.toLowerCase().includes(q.toLowerCase().trim());

    const filterByCategory = ({ categoryId }: ListingType) =>
        category.toLowerCase() === "all" ||
        category.toLowerCase() === "" ||
        categories.find(({ id }) => id === categoryId)?.name.toLowerCase() ===
            category.toLowerCase();

    const filteredListings = (body as ListingType[])
        .filter(filterByTitle)
        .filter(filterByCategory);

    return (
        <div className='bg-light-400 min-h-screen flex flex-col justify-between pt-8'>
            <div className='flex flex-col'>
                <aside className='container mx-auto p-4 flex flex-1 flex-col sm:flex-row space-y-5 sm:space-y-0 sm:space-x-4 sm:items-center'>
                    <SearchListing />
                    <SearchByCategory
                        categories={categories}
                        selected={category}
                    />
                </aside>
                <main className='container flex flex-wrap mx-auto'>
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
                        <div className='mt-5 w-full text-center'>
                            <ErrorMessage
                                className={errorClassName}
                                title='There is no listing with this filters!'
                            />
                        </div>
                    )}
                </main>
            </div>
            <Footer categories={categories} />
        </div>
    );
};

export default ListingsPage;

import { lazy, type FC } from "react";

import { SearchByCategory, SearchListing } from "@/Components";
import type { ServerCategories } from "@/types/categories";
import { ErrorMessage } from "@/Components/AppComponents";
import type { ListingType } from "@/types/listings";
import { categoriesApi } from "@/APIs";

interface Props {
    searchParams: Promise<{ q: string; category: string }>;
    getListingsRequest: () => Promise<{
        body: { error: string } | ListingType[];
        ok: boolean;
    }>;
}
const ListingsPage: FC<Props> = async ({
    searchParams,
    getListingsRequest,
}) => {
    const errorClassName = "text-3xl md:text-5xl text-center"
    const { q = "", category = "" }: { q: string; category: string } =
        (await searchParams) as any;

    const Footer = lazy(() => import("@/Components/Footer"));
    const Card = lazy(() => import("@/Components/Card"));

    const categories: ServerCategories[] = await categoriesApi.getCategories();

    const { body, ok } = await getListingsRequest();
    if (!ok) {
        if (!Array.isArray(body))
            return (
                <div className='bg-light-400 min-h-screen flex justify-center items-center pt-8'>
                    <ErrorMessage className={errorClassName} title={body?.error} />
                </div>
            );
    }
    if (!Array.isArray(body)) return;

    if (body.length === 0)
        return (
            <div className='bg-light-400 min-h-screen flex justify-center items-center pt-8'>
                <ErrorMessage className={errorClassName} title='There is no data on database!' />
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
                <main className="container flex flex-wrap mx-auto">
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
                            <ErrorMessage className={errorClassName} title='There is no listing with this filters!' />
                        </div>
                    )}
                </main>
            </div>
            <Footer categories={categories} />
        </div>
    );
};

export default ListingsPage;

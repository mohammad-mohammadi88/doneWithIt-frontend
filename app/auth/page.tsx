import type { NextPage } from "next";

import SearchListing from "@/Components/SearchListing";
import { ListingType } from "@/types/listings";
import { listingsApi } from "@/APIs";
import { Card } from "@/Components";

const page: NextPage = async ({ searchParams }: any) => {
    const { q }: { q: string } = (await searchParams) as any;

    const { body, ok } = await listingsApi.getListings();
    if (!ok) {
        return (
            <div className='bg-light-400 min-h-screen pt-8'>
                <h2 className='text-secondary text-2xl'>{body.error}</h2>
            </div>
        );
    }

    const filterByTitle = ({ title }: ListingType) =>
        q ? title.toLowerCase().includes(q.toLowerCase().trim()) : true;

    return (
        <div className='bg-light-400 min-h-screen pt-8'>
            <div className='container mx-auto p-4'>
                <SearchListing />
            </div>
            <div className='container flex flex-wrap mx-auto'>
                {(body as ListingType[])
                    .filter(filterByTitle)
                    .map(({ images, isSold, id, price, title }) => (
                        <Card
                            href={"/feed/" + id}
                            imageURL={images[0].url}
                            isSold={isSold}
                            key={id}
                            subTitle={price + "$"}
                            title={title}
                        />
                    ))}
            </div>
        </div>
    );
};

export default page;

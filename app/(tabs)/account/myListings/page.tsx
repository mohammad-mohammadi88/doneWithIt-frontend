import type { Metadata, NextPage } from "next";

import ListingsPage from "@/screens/ListingsPage";
import { serverMy } from "@/APIs/server";
import { PageHeading } from "@Client";

export const metadata: Metadata = {
    title: "Your Listings Page",
    description: "View listings that you added",
};

const page: NextPage = async ({ searchParams }: any) => (
    <>
        <div className='!pb-15'>
            <PageHeading title='My Listings' />
        </div>
        <ListingsPage
            searchParams={searchParams}
            getListingsRequest={serverMy.getMyListings}
        />
    </>
);

export default page;

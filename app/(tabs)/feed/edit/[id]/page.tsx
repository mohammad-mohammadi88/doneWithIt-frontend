import type { Metadata, NextPage } from "next";

import { serverListing } from "@/APIs/server";
import { redirect } from "next/navigation";
import { ListingChangeInterface } from "@/types/Forms";

import ListingEditPage from "@/screens/ListingEditPage";

interface Props {
    params: Promise<{ id: string }>;
}

export const generateMetadata = async ({
    params,
}: Props): Promise<Metadata> => {
    const { id } = await params;
    const { body, ok } = await serverListing.getListing(id);
    if (!ok)
        return {
            title: body?.error ?? "Could not load listing info!",
        };

    return { title: body.title };
};

const page: NextPage<Props> = async ({ params }) => {
    const { id } = await params;
    const { body, ok } = await serverListing.getListing(id);
    if (!ok || body.isSold) redirect("/feed");

    const { title, description, price, categoryId: category, images } = body;

    const initialValue = {
        title,
        description,
        images,
        category,
        price,
    };
    return <ListingEditPage listingId={id} initialValues={initialValue} />;
};

export default page;

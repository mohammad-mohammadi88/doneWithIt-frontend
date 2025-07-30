import type { Metadata, NextPage } from "next";

import ListingDetailPage from "@/screens/ListingDetailPage";
import listingApi from "@/APIs/listing";

interface Props {
    params: Promise<{ id: string }>;
}

export const generateMetadata = async ({
    params,
}: Props): Promise<Metadata> => {
    const listingId = (await params).id;
    const { body, ok } = await listingApi.getListing(listingId);
    if (!ok)
        return {
            title: body?.error ?? "Could not load listing info!",
        };

    const title = body.title;
    const description =
        body?.description?.slice(0, 120) ??
        "This listing doesn't have descripiton";
    return {
        title,
        description,
    };
};
const page: NextPage<Props> = (props) => <ListingDetailPage {...props} />;

export default page;

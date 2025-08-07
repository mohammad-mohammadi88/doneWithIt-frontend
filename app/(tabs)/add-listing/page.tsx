import ListingAddPage from "@/screens/ListingAddPage";
import type { Metadata, NextPage } from "next";

export const metadata: Metadata = {
    title: "Add Listing Page",
};
const page: NextPage = () => <ListingAddPage />;

export default page;

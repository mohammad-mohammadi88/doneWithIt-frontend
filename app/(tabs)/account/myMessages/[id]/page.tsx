import MessageDetailPage from "@/screens/MessageDetailPage";
import type { NextPage } from "next";

interface Props {
    params: Promise<{ id: string }>;
}
const page: NextPage<Props> = async (props) => <MessageDetailPage {...props} />;

export default page;

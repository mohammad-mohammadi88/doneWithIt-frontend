import LoginPage from "@/screens/LoginPage";
import type { Metadata, NextPage } from 'next';

export const metadata:Metadata = {
    title: "Login Page"
}
const page: NextPage = async () => <LoginPage />;

export default page;

import RegisterPage from "@/screens/RegisterPage";
import type { Metadata, NextPage } from 'next';

export const metadata:Metadata = {
    title: "Register Page"
}
const page: NextPage = async () => <RegisterPage />;

export default page;

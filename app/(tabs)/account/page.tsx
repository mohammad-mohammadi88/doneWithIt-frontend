import AccountPage from '@/screens/AccountPage';
import type { Metadata, NextPage } from 'next';

export const metadata:Metadata = {
    title: "Account Page"
}

const page:NextPage = async () => <AccountPage />

export default page
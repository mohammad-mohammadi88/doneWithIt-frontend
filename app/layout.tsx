import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";

import getUserOnServer from "@/utilities/getUserOnServer";
import "@/globals.css";
import {
    HistoryTracker,
    NavigationProgress,
    QueryProvider,
    UserHandler,
} from "@/Components";

import Provider from "@/Context/Provider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Done with it",
    description: "Sell everything you are done with",
    icons: { icon: "/icon.png" },
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const token = await getUserOnServer();
    return (
        <html lang='en'>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden relative`}
            >
                <HistoryTracker />
                <NavigationProgress />
                <QueryProvider>
                    <Provider>
                        {token && <UserHandler token={token} />}
                        {children}
                    </Provider>
                </QueryProvider>
            </body>
        </html>
    );
}

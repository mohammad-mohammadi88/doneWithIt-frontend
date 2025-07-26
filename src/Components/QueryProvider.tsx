"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { FC, ReactNode } from "react";

interface Props {
    children: ReactNode;
}
export const client = new QueryClient();

const QueryProvider: FC<Props> = ({ children }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
);

export default QueryProvider;

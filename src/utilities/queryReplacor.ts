import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { ReadonlyURLSearchParams } from "next/navigation";

interface Props {
    queryName: string;
    searchParams: ReadonlyURLSearchParams | null;
    router: AppRouterInstance;
    pathname: null | string;
}
const queryReplacor = (e: Props) => (text: string) => {
    const newSearchParams = new URLSearchParams(e.searchParams?.toString());
    newSearchParams.set(e.queryName, text);
    e.router.replace(`${e.pathname}?${newSearchParams.toString()}`);
};

export default queryReplacor;

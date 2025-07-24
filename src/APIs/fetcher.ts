import defaults from "@/constants/defaults";

const serverFetcher = async (url: string, init?: RequestInit) =>
    (await fetch(defaults.serverUrl + url, init));

export default serverFetcher;

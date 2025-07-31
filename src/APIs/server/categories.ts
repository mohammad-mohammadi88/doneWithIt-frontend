import serverFetcher from "./fetcher";

const endpoint = "categories";

const getCategories = () => serverFetcher(endpoint).then(e=>e.json());

const categoriesApi = {
    getCategories,
};

export default categoriesApi
import defaults from "@/constants/defaults";

const endpoint = "categories";

const getCategories = () =>
    fetch(defaults.serverUrl + endpoint).then((e) => e.json());

const categoriesApi = {
    getCategories,
};

export default categoriesApi;

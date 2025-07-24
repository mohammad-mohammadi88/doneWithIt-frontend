export default {
    serverUrl:
        process.env.NODE_ENV === "production"
            ? "https://donewithit-backend-qymu.onrender.com/"
            : "http://localhost:9000/",
    nextServerUrl: process.env.__NEXT_PRIVATE_ORIGIN + "/",
    maxImageCount: 3,
    tokenLife:2,
    minPasswordLength: 5,
    minNameLength: 2
};

export default {
    serverUrl:
        process.env.NODE_ENV === "production"
            ? "https://donewithit-backend-qymu.onrender.com/"
            : "http://localhost:9000/",
    nextServerUrl: process.env.__NEXT_PRIVATE_ORIGIN + "/",
    maxImageCount: 3,
    minPasswordLength: 5
};

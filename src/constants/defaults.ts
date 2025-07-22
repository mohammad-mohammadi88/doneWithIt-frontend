export default {
    serverUrl:
        process.env.NODE_ENV === "production"
            ? "http://localhost:9000/"
            : "https://donewithit-backend-qymu.onrender.com/",
    nextServerUrl: process.env.__NEXT_PRIVATE_ORIGIN+"/"
};

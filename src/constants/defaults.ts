export default {
    serverUrl:
        process.env.NODE_ENV === "production"
            ? "https://donewithit-backend-qymu.onrender.com/"
            : "http://localhost:9000/",
    nextServerUrl:
        typeof window !== "undefined"
            ? window.location.origin + "/"
            : undefined,
    maxImageCount: 3,
    tokenLife: 2,
    minPasswordLength: 5,
    minNameLength: 2,
};

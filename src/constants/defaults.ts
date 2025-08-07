export default {
    serverUrl:
        process.env.NODE_ENV === "production"
            ? "https://donewithit-backend-qymu.onrender.com/"
            : "http://192.168.1.116:9000/",
    nextServerUrl:
        typeof window !== "undefined"
            ? window.location.origin + "/"
            : undefined,
    maxImageCount: 3,
    tokenLife: 2,
    minPasswordLength: 5,
    minNameLength: 2,
};

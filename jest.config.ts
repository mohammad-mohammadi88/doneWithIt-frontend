import nextJest from "next/jest.js";
import type { Config } from "jest";

const createJestConfig = nextJest({
    dir: "./",
});

const customJestConfig: Config = {
    setupFilesAfterEnv: ["<rootDir>/src/testSetup.js"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1",
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    },
    testEnvironment: "jest-environment-jsdom",
};

export default createJestConfig(customJestConfig);

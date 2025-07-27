import "@testing-library/jest-dom";
import { mockAnimationsApi } from "jsdom-testing-mocks";

mockAnimationsApi();

global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
};

jest.mock("next/navigation", () => ({
    usePathname: jest.fn().mockImplementation(() => "/auth/feed"),
    useRouter: jest
        .fn()
        .mockImplementation(() => ({ push: jest.fn(), replace: jest.fn() })),
    useSearchParams: jest
        .fn()
        .mockImplementation(() => new URLSearchParams("sort=asc")),
}));

jest.mock("nprogress", () => ({
    start: jest.fn(),
    done: jest.fn(),
}));

jest.mock("./src/utilities", () => ({
    ...jest.requireActual("./src/utilities"),
    hasInternalBack: jest.fn().mockImplementation(() => true),
    queryReplacor: jest.fn(() => jest.fn()),
}));

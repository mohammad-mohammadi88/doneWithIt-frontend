import HistoryTracker from "@/Components/HistoryTracker";
import { render } from "@testing-library/react";
import { usePathname } from "next/navigation";

describe("HistoryTracker", () => {
    beforeEach(() => {
        sessionStorage.clear();
        jest.clearAllMocks();
    });

    it("adds the current pathname to sessionStorage if not duplicate", () => {
        (usePathname as jest.Mock).mockReturnValue("/about");

        render(<HistoryTracker />);

        const history = JSON.parse(sessionStorage.getItem("history") || "[]");
        expect(history).toEqual(["/about"]);
    });

    it("does not add the same pathname twice in a row", () => {
        sessionStorage.setItem("history", JSON.stringify(["/about"]));
        (usePathname as jest.Mock).mockReturnValue("/about");

        render(<HistoryTracker />);

        const history = JSON.parse(sessionStorage.getItem("history") || "[]");
        expect(history).toEqual(["/about"]); // بدون تکرار
    });

    it("adds new pathname to sessionStorage", () => {
        sessionStorage.setItem("history", JSON.stringify(["/about"]));
        (usePathname as jest.Mock).mockReturnValue("/contact");

        render(<HistoryTracker />);

        const history = JSON.parse(sessionStorage.getItem("history") || "[]");
        expect(history).toEqual(["/about", "/contact"]);
    });
});

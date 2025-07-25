import { render, screen } from "@testing-library/react";

import { toBeInDom } from "@Tests/helpers.test";
import { NavLink } from "@/Components";
import { usePathname } from "next/navigation";

describe("NavLink tests", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("should have active className", () => {
        render(<NavLink href='/feed'>feed</NavLink>);
        
        const link = screen.getByText("feed");
        toBeInDom(link);
        expect(link).toHaveClass(
            "w-full text-base text-light-600 flex flex-col items-center text-red-500"
        );
    });
    it("should not have active className", () => {
        (usePathname as jest.Mock).mockImplementation(() => "auth/account")
        render(<NavLink href='/feed'>feed</NavLink>);
        
        const link = screen.getByText("feed");
        expect(link).not.toHaveClass(
            "w-full text-base text-light-600 flex flex-col items-center text-red-500"
        );
    });
});

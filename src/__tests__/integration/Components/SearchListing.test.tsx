jest.unmock("../../../utilities")

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SearchListing } from "@Client";


describe("SearchListing", () => {
    let replace: jest.Mock;

    beforeEach(() => {
        replace = jest.fn();

        (useRouter as jest.Mock).mockReturnValue({ replace });
        (usePathname as jest.Mock).mockReturnValue("/listings");
        (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
    });

    it("renders input element", () => {
        // arrange
        render(<SearchListing />);

        // assert
        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
    });

    it("updates input value when user types",async () => {
        // arrange
        render(<SearchListing />);
        const input = screen.getByRole("textbox");

        // act
        await userEvent.type(input,"laptop");

        // assert
        expect(input).toHaveValue("laptop");
    });

    it("updates the URL with debounced query param", async () => {
        // arrange
        render(<SearchListing />);
        const input = screen.getByRole("textbox");

        // act
        await userEvent.type(input,"react");

        // assert
        await waitFor(
            () => {
                expect(replace).toHaveBeenCalledWith("/listings?q=react");
            },
            { timeout: 1000 }
        );
    });
});

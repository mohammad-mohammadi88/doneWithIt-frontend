import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SearchListing } from "@/Components";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import userEvent from "@testing-library/user-event";


describe("SearchListing", () => {
    let replace: jest.Mock;

    beforeEach(() => {
        replace = jest.fn();

        (useRouter as jest.Mock).mockReturnValue({ replace });
        (usePathname as jest.Mock).mockReturnValue("/listings");
        (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
    });

    it("renders input element", () => {
        render(<SearchListing />);
        const input = screen.getByRole("textbox");
        expect(input).toBeInTheDocument();
    });

    it("updates input value when user types",async () => {
        render(<SearchListing />);
        const input = screen.getByRole("textbox");

        await userEvent.type(input,"laptop");
        expect(input).toHaveValue("laptop");
    });

    it("updates the URL with debounced query param", async () => {
        render(<SearchListing />);
        const input = screen.getByRole("textbox");

        await userEvent.type(input,"react");

        await waitFor(
            () => {
                expect(replace).toHaveBeenCalledWith("/listings?q=react");
            },
            { timeout: 1000 }
        );
    });
});

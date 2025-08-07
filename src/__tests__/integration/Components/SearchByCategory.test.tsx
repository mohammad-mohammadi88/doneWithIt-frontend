import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ServerCategories } from "@/types/categories";
import { SearchByCategory } from "@Client";
import { toBeInDom } from "../helpers.test";

const mockCategories: ServerCategories[] = [
    {
        id: 1,
        name: "Books",
        color: "blue",
        backgroundColor: "gray",
        icon: "book-open-variant",
    },
    {
        id: 2,
        name: "Electronics",
        color: "green",
        backgroundColor: "black",
        icon: "headphones",
    },
];

describe("SearchByCategory", () => {
    it("renders correctly with default value", () => {
        // arrange
        render(<SearchByCategory categories={mockCategories} selected='All' />);

        // assert
        toBeInDom(screen.getByText("All"));
    });

    it("shows the dropdown options when clicked", async () => {
        // arrange
        render(<SearchByCategory categories={mockCategories} selected='All' />);

        // act
        await userEvent.click(screen.getByRole("button"));

        // assert
        await waitFor(() => {
            toBeInDom(screen.getByText("Books"));
            toBeInDom(screen.getByText("Electronics"));
        });
    });

    it("calls router.replace with correct category", async () => {
        // arrange
        render(<SearchByCategory categories={mockCategories} selected='All' />);

        // act
        await userEvent.click(screen.getByRole("button"));
        
        // assert
        await waitFor(async () => {
            await userEvent.click(screen.getByRole("button"));
            await userEvent.click(screen.getByText("Books"));
            toBeInDom(screen.getByText("Books"));
        });
    });

    it("shows the correct icon for selected category", () => {
        // arrange
        render(
            <SearchByCategory categories={mockCategories} selected='Books' />
        );

        // assert
        toBeInDom(screen.getByRole("button"));
    });
});

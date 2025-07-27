import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";

import PageHeading from "@/Components/PageHeading";
import { hasInternalBack } from "@/utilities";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

describe("PageHeading", () => {
    const mockBack = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useRouter as jest.Mock).mockReturnValue({ back: mockBack });
    });

    it("should show back button if hasInternalBack returns true", () => {
        // arrange
        (hasInternalBack as jest.Mock).mockImplementation(() => true);
        render(<PageHeading title='My Page' />);

        // assert
        expect(screen.getByRole("button")).toBeInTheDocument();
        expect(screen.getByText("My Page")).toBeInTheDocument();
    });

    it("should not show back button if hasInternalBack returns false", () => {
        // arrange
        (hasInternalBack as jest.Mock).mockReturnValue(false);
        render(<PageHeading title='My Page' />);

        // assert
        expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("should call router.back when back button is clicked",async  () => {
        // arrange
        (hasInternalBack as jest.Mock).mockImplementation(() => true);
        render(<PageHeading title='Test Page' />);

        // act
        await userEvent.click(screen.getByRole("button"));

        // assert
        expect(mockBack).toHaveBeenCalled();
    });
});

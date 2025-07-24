import { ViewImageModal } from "@/Components";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { toBeInDom, toBeNotInDom } from "@Tests/helpers.test";

// Before Each
const onClose = jest.fn();
const Component = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const images = ["/welcomeDesktop.png", "/welcomeMobile.png"];
    return (
        <>
            <button onClick={() => setIsOpen(true)}>openModal</button>
            <ViewImageModal
                images={images}
                isOpen={isOpen}
                onClose={() => {
                    onClose();
                    setIsOpen(false);
                }}
            />
        </>
    );
};
beforeEach(() => {
    jest.clearAllMocks();
    Element.prototype.scrollTo = jest.fn();
    render(<Component />);
});

describe("ViewImageModal tests", () => {
    const openModal = async () =>
        await userEvent.click(
            screen.getByRole("button", { name: "openModal" })
        );

    it("should display modal be clicking openModal button", async () => {
        // assert
        toBeNotInDom(screen.queryByLabelText("view image modal"));

        // act
        await openModal();

        // assert
        toBeInDom(screen.getByLabelText("view image modal"));
    });
    it("should switch images", async () => {
        // act
        await openModal();

        const prev = screen.getByLabelText("prev image");
        const next = screen.getByLabelText("next image");
        const imageContainer = screen.getByLabelText("image container");
        Object.defineProperty(imageContainer, "clientWidth", {
            configurable: true,
            value: 500,
        });
        
        // act
        await userEvent.click(next);

        // assert
        expect(imageContainer.scrollTo).toHaveBeenCalledWith({
            left: 500,
            behavior: "smooth",
        });

        // act
        await userEvent.click(prev);

        // assert
        expect(imageContainer.scrollTo).toHaveBeenCalledWith({
            left: 0,
            behavior: "smooth",
        });
    });
});

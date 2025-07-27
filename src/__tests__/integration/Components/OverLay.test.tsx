import { render, screen } from "@testing-library/react";
import Overlay from "@/Components/Overlay";

describe("Overlay", () => {
    it("should not render anything when visible is false", () => {
        // arrange
        const { container } = render(
            <Overlay visible={false}>
                <div>Overlay Content</div>
            </Overlay>
        );

        // assert
        expect(container.firstChild).toBeNull();
    });

    it("should render children when visible is true", () => {
        // arrange
        render(
            <Overlay visible={true}>
                <div>Overlay Content</div>
            </Overlay>
        );

        // assert
        expect(screen.getByText("Overlay Content")).toBeInTheDocument();
    });
});

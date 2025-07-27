import { render, screen } from "@testing-library/react";
import { FC, useState } from "react";

import AppInput from "@/Components/AppComponents/AppInput";
import { toBeInDom } from "@Tests/helpers.test";
import userEvent from "@testing-library/user-event";

// Before Each
const Component: FC = () => {
    const [name, setName] = useState<string>("");
    return (
        <AppInput icon='label icon' id='name' value={name} setValue={setName} />
    );
};
beforeEach(() => {
    render(<Component />);
});

describe("AppInput tests", () => {
    test("initial props", () => {
        const label = screen.getByText("label icon");
        const input = screen.getByLabelText("label icon");
        const XIcon = screen.getByLabelText("xIconForCleanUp");
        toBeInDom(label);
        expect(label).toHaveProperty("htmlFor", "name");
        toBeInDom(input);
        toBeInDom(XIcon);
    });
    it("should test onInput handler for input", async () => {
        const input = screen.getByLabelText("label icon");

        // act
        await userEvent.type(input, "test text");

        // assert
        expect(input).toHaveValue("test text");
    });
    it("should test onClick handler for XIcon", async () => {
        const input = screen.getByLabelText("label icon");
        const XIcon = screen.getByLabelText("xIconForCleanUp");
        // act
        await userEvent.type(input, "test text");
        await userEvent.click(XIcon);

        // assert
        expect(input).toHaveValue("");
    });
});

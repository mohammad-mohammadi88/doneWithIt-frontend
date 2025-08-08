import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import RegisterForm from "@/Forms/logic/RegisterForm";
import { toBeInDom } from "@Tests/helpers.test";

// Before Each
beforeEach(() => {
    render(<RegisterForm />);
});

const fillForm = async (element: Element, text: string) => {
    if (text) await userEvent.type(element, text);
    await userEvent.click(screen.getByRole("button", { name: /Register/ }));
};
interface Validate {
    expectedError: string;
    input: string;
    inputLabelText: "Email" | "Password" | "Username";
}
const validate: Validate[] = [
    {
        expectedError: "Username is a required field",
        input: "",
        inputLabelText: "Username",
    },
    {
        expectedError: "Username must be at least 2 characters",
        input: "a",
        inputLabelText: "Username",
    },
    {
        expectedError: "Email is a required field",
        input: "",
        inputLabelText: "Email",
    },
    {
        expectedError: "Email must be a valid email",
        input: "invalid email",
        inputLabelText: "Email",
    },
    {
        expectedError: "Password is a required field",
        input: "",
        inputLabelText: "Password",
    },
    {
        expectedError: "Password must be at least 5 characters",
        input: "pass",
        inputLabelText: "Password",
    },
];

describe.each(validate)(
    "Validate Register from",
    ({ expectedError, input, inputLabelText }) => {
        it(expectedError, async () => {
            // act
            await fillForm(screen.getByLabelText(inputLabelText), input);

            // assert
            await waitFor(() => {
                toBeInDom(screen.getByText(expectedError));
            });
        });
    }
);

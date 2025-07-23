import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import LoginForm from "@/Forms/logic/LoginForm";
import { toBeInDom } from "@Tests/helpers.test";

// Before Each
beforeEach(() => {
    render(<LoginForm />);
});

const fillForm = async (element: Element, text: string) => {
    text && (await userEvent.type(element, text));
    await userEvent.click(screen.getByRole("button", { name: /Login/ }));
};
interface Validate {
    expectedError: string;
    input: string;
    inputLabelText: "Email" | "Password";
}
const validate: Validate[] = [
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
    "Validate Login from",
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

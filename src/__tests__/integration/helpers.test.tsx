import { render } from "@testing-library/react";

export const toBeInDom = (element: Element) => expect(element).toBeInTheDocument();
export const toBeNotInDom = (element: Element | null) =>
    expect(element).not.toBeInTheDocument();

it("should test functions",() => {
    // arrange
    const {getByText,queryByText} = render(<p>hello world</p>);

    // assert
    toBeInDom(getByText("hello world"))
    toBeNotInDom(queryByText("bye world"))
})
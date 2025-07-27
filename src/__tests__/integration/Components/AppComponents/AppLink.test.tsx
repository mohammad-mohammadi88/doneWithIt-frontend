import AppLink from "@/Components/AppComponents/AppLink";
import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { usePathname, useRouter } from "next/navigation";
import nProgress from "nprogress";

const mockPush = jest.fn();
// Before Each
beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
        push: mockPush,
    });
});

describe("AppLink tests", () => {
    it("should call NProgress.start on click event", async () => {
        const { getByText } = render(<AppLink href='/feed'>feed link</AppLink>);
        const link = getByText("feed link");
        const NProgressStartSpy = jest.spyOn(nProgress, "start");

        // act
        await userEvent.click(link);

        // assert
        await waitFor(() => {
            expect(NProgressStartSpy).toHaveBeenCalled();
            expect(mockPush).toHaveBeenCalled();
        });
    });
    it("should not call NProgress.start on click event if pathname and href are same", async () => {
        (usePathname as jest.Mock).mockImplementation(() => "/feed")
        const { getByText } = render(<AppLink href='/feed'>feed link</AppLink>);
        const link = getByText("feed link");
        const NProgressStartSpy = jest.spyOn(nProgress, "start");

        // act
        await userEvent.click(link);

        // assert
        await waitFor(() => {
            expect(NProgressStartSpy).not.toHaveBeenCalled();
            expect(mockPush).not.toHaveBeenCalled();
        });
    });
});

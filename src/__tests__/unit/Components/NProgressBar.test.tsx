import NavigationProgress from "@/Components/client/NProgressBar";
import { render } from "@testing-library/react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";

describe("NavigationProgress", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should not call NProgress.start on first render but call NProgress.done", () => {
        (usePathname as jest.Mock).mockReturnValue("/initial");

        render(<NavigationProgress />);

        expect(NProgress.start).not.toHaveBeenCalled();
        expect(NProgress.done).toHaveBeenCalledTimes(1);
    });

    it("should call NProgress.start and NProgress.done on pathname change (not first render)", () => {
        (usePathname as jest.Mock).mockReturnValue("/page1");
        const { rerender } = render(<NavigationProgress />); // first render

        (usePathname as jest.Mock).mockReturnValue("/page2");
        rerender(<NavigationProgress />); // simulate pathname change

        expect(NProgress.start).toHaveBeenCalledTimes(1); // only on second render
        expect(NProgress.done).toHaveBeenCalledTimes(2); // once per render
    });

    it("should call NProgress.start when popstate is triggered", () => {
        (usePathname as jest.Mock).mockReturnValue("/pop");

        render(<NavigationProgress />);

        const popStateEvent = new PopStateEvent("popstate");
        window.dispatchEvent(popStateEvent);

        expect(NProgress.start).toHaveBeenCalledTimes(1);
    });
});

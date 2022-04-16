import "@testing-library/jest-dom/extend-expect";
import { toHaveNoViolations } from "jest-axe";
import "whatwg-fetch";
expect.extend(toHaveNoViolations);
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    };
  },
}));

import { render } from "@testing-library/react";
import AddBlogModal from "./AddBlogModal";
import { axe } from "jest-axe";
import { AuthContext } from "../../state/context";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const user = {};

const setShowDialog = jest.fn();

describe("Checks accessibility", () => {
  it("is accessible", async () => {
    const { container } = render(
      <AuthContext.Provider value={{ user }}>
        <QueryClientProvider client={queryClient}>
          <AddBlogModal setShowDialog={setShowDialog} />
        </QueryClientProvider>
      </AuthContext.Provider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

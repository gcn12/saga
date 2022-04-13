import DeleteAccountModal from "./DeleteAccountModal";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { AuthContext } from "../../state/context";
import { QueryClient, QueryClientProvider } from "react-query";

const setShowDeleteAccountModal = jest.fn();

const user = { name: "gareth" };

const queryClient = new QueryClient();

describe("Is accessible", () => {
  it("is accessible", async () => {
    const { container } = render(
      <AuthContext.Provider value={{ user }}>
        <QueryClientProvider client={queryClient}>
          <DeleteAccountModal
            setShowDeleteAccountModal={setShowDeleteAccountModal}
          />
        </QueryClientProvider>
      </AuthContext.Provider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

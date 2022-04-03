import DeleteAccountModal from "./DeleteAccountModal";
import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { AuthContext } from "../../jotai/state";

const setShowDeleteAccountModal = jest.fn();

const user = { name: "gareth" };

describe("Is accessible", () => {
  it("is accessible", async () => {
    const { container } = render(
      <AuthContext.Provider value={{ user }}>
        <DeleteAccountModal
          setShowDeleteAccountModal={setShowDeleteAccountModal}
        />
      </AuthContext.Provider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

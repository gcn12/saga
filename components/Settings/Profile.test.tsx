import { render } from "@testing-library/react";
import Profile from "./Profile";
import { axe } from "jest-axe";
import { AuthContext } from "../../state/context";

const user = {
  name: "Gareth",
};

describe("Checks accessibility", () => {
  it("is accessible", async () => {
    const { container } = render(
      <AuthContext.Provider value={{ user }}>
        <Profile />
      </AuthContext.Provider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

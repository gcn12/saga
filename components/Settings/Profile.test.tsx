import { fireEvent, render, screen } from "@testing-library/react";
import Profile from "./Profile";
import { axe } from "jest-axe";
import { AuthContext } from "../../state/context";
import { rest } from "msw";
import { setupServer } from "msw/node";

const server = setupServer(
  rest.post("http://localhost:3001/account/save-profile", (req, res, ctx) => {
    return res(
      ctx.json({
        career: "Writer",
        location: "NYC",
        videoIntroduction: "vimeo.com",
        userID: "abc",
      })
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

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

describe("Can save profile settings", () => {
  it("Correct user flow", async () => {
    process.env.NEXT_PUBLIC_BACKEND_URL = "http://localhost:3001";
    render(
      <AuthContext.Provider value={{ user }}>
        <Profile />
      </AuthContext.Provider>
    );

    const submitButton = screen.getByRole("button", { name: /save/i });
    expect(submitButton).toHaveTextContent(/save/i);
    fireEvent.click(submitButton);
  });
});

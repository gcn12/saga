import Experiences from "./Experiences";
import { render, screen, waitFor } from "@testing-library/react";
import { AuthContext } from "../../state/context";
import { QueryClient, QueryClientProvider } from "react-query";

import { setupServer } from "msw/node";
import { rest } from "msw";

const clientQuery = new QueryClient();

const user = {
  name: "Gareth",
  id: "3ff092b5-4cb3-4027-a125-5a26af02491d",
};

const server = setupServer(
  rest.get(
    "http://localhost:3001/experience/experiences/3ff092b5-4cb3-4027-a125-5a26af02491d",
    (req, res, ctx) => {
      return res(
        ctx.json([
          {
            id: "700fb775-9126-4bf2-96e4-3cbf068d6af7",
            role: "Hi",
            company: "Hello",
            description: "<p>rifj</p>",
            isCurrentExperience: true,
            startDate: "2022-01-01T05:00:00.000Z",
            endDate: "2022-01-01T05:00:00.000Z",
            userID: "3ff092b5-4cb3-4027-a125-5a26af02491d",
          },
        ])
      );
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Fetches data", () => {
  it("Fetches experiences", async () => {
    process.env.NEXT_PUBLIC_BACKEND_URL = "http://localhost:3001";
    render(
      <QueryClientProvider client={clientQuery}>
        <AuthContext.Provider value={{ user }}>
          <Experiences />
        </AuthContext.Provider>
      </QueryClientProvider>
    );
    await waitFor(() =>
      expect(screen.queryByText(/hello/i)).toBeInTheDocument()
    );
  });
});

describe("Add button is conditionally rendered", () => {
  process.env.NEXT_PUBLIC_BACKEND_URL = "http://localhost:3001";
  render(
    <QueryClientProvider client={clientQuery}>
      <AuthContext.Provider value={{ user }}>
        <Experiences />
      </AuthContext.Provider>
    </QueryClientProvider>
  );
  it("The add button is not rendered by default", () => {
    expect(screen.queryByText(/add new/i)).not.toBeInTheDocument();
  });
});

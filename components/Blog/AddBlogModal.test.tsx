import { render } from "@testing-library/react";
import AddBlogModal from "./AddBlogModal";
import { axe } from "jest-axe";
import { BlogPreview } from "../../types/types";
import { AuthContext } from "../../state/context";
import { useContext } from "react";
const blogPreviews: BlogPreview[] = [
  {
    title: "e",
    id: "e",
    date: "",
  },
];

const user = {};

const setBlogPreviews = jest.fn();

const setShowDialog = jest.fn();

describe("Checks accessibility", () => {
  it("is accessible", async () => {
    const { container } = render(
      <AuthContext.Provider value={{ user }}>
        <AddBlogModal
          blogPreviews={blogPreviews}
          setBlogPreviews={setBlogPreviews}
          setShowDialog={setShowDialog}
        />
      </AuthContext.Provider>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

import { render } from "@testing-library/react";
import AddBlogModal from "./AddBlogModal";
import { axe } from "jest-axe";
import { Blog } from "../../types/types";
const blogPreviews: Blog[] = [
  {
    title: "e",
    id: "e",
    content: "e",
    key: 3,
    type: "header",
  },
];

const setBlogPreviews = jest.fn();

const setShowDialog = jest.fn();

describe("Checks accessibility", () => {
  it("is accessible", async () => {
    const { container } = render(
      <AddBlogModal
        blogPreviews={blogPreviews}
        setBlogPreviews={setBlogPreviews}
        setShowDialog={setShowDialog}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

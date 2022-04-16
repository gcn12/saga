import Experience from "./Experience";
import { render, screen } from "@testing-library/react";
import { Experience as ExperienceType } from "../../types/types";

const experience: ExperienceType = {
  company: "Apple",
  description: "Wrote articles",
  endDate: new Date(),
  startDate: new Date(),
  id: "abc",
  isCurrentExperience: false,
  role: "Writer",
};

describe("Displays correct content", () => {
  it("Description is in the document", () => {
    render(<Experience experience={experience} />);
    expect(screen.queryByText("Wrote articles")).toBeInTheDocument();
  });
});

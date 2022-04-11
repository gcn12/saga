import { Tab as TabType } from "../../types/types";
import Education from "../../components/Education/Education";
import Skills from "../../components/Skills";
import Contact from "../../components/Contact/Contact";
import Experiences from "../../components/Experiences/Experiences";
import BlogPosts from "../../components/Blog/BlogPreviews";
import ProjectPreviews from "../../components/Portfolio/ProjectPreviews";

interface TabProps {
  selectedTab: TabType;
}

export default function Tab({ selectedTab }: TabProps) {
  return (
    <div className="fade">
      {selectedTab.type === "contact" && <Contact />}
      {selectedTab.type === "education" && <Education />}
      {selectedTab.type === "skills" && <Skills />}
      {selectedTab.type === "experience" && <Experiences />}
      {selectedTab.type === "blog" && <BlogPosts />}
      {selectedTab.type === "portfolio" && <ProjectPreviews />}
    </div>
  );
}

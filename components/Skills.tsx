import styled from "styled-components";

export default function Skills() {
  return (
    <Container>
      {skills.map((skill) => {
        return (
          <Skill key={skill.category}>
            <Category>{skill.category}</Category>
            <Description>{skill.skills}</Description>
          </Skill>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: left;
`;

const Skill = styled.div`
  margin-bottom: 25px;
  max-width: 90%;
`;

const Category = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: var(--accent);
`;

const Description = styled.p`
  font-size: 1.2rem;
`;

const skills = [
  {
    category: "Graphic Design",
    skills: "Figma, Canva, Adobe Photoshop",
  },
  {
    category: "Productivity",
    skills: "Notion, Asana, Plan, Slack",
  },
  {
    category: "Microsoft Office",
    skills: "Word, Excel",
  },
  {
    category: "Google Suite",
    skills: "Docs, Sheets, Slides, Chat",
  },
  {
    category: "Screenwriting",
    skills: "Script coverage, Arc Studio Pro, Final Draft",
  },
  {
    category: "Podcast Creation",
    skills: "Descript, Sounder, Zencastr",
  },
  {
    category: "Social Media",
    skills:
      "Buffer, Hootsuite, Twitter, Instagram, Facebook, LinkedIn, Tumblr, Discord, MailChimp",
  },
];

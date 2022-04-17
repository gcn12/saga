import styled from "styled-components";

const educationProps = {
  school: "University of Southern California",
  date: "Aug 2018 - Dec 2021",
  description: `<div>
    <p>Applied and Computational Mathematics, B.A. (3.86)</p>
    <p>Screenwriting, Minor</p>
    </div>`,
};

type educationType = {
  school: string;
  date: string;
  description: string;
};

export default function Education({
  education = educationProps,
}: {
  education?: educationType;
}) {
  return (
    <Container>
      <Header>
        <School>{education.school}</School>
        <p>{education.date}</p>
      </Header>
      <div
        dangerouslySetInnerHTML={{
          __html: education.description || "",
        }}
      />
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

const School = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-title);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-between;
`;

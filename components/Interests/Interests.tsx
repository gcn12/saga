import styled from "styled-components";

export default function Interests() {
  return (
    <Container>
      {data.map((item) => {
        return (
          <div>
            <Category>{item.category}</Category>
            {item.interests.map((interest) => {
              return interest.url ? (
                <InterestLink as="a" href={interest.url}>
                  {interest.name}
                </InterestLink>
              ) : (
                <Interest>{interest.name}</Interest>
              );
            })}
          </div>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 32px;
`;

const Category = styled.p`
  font-size: 1rem;
  font-weight: 700;
  color: var(--accent);
`;

const Interest = styled.p`
  font-size: 1.3rem;
`;

const InterestLink = styled(Interest)`
  display: block;
  width: max-content;
  border-bottom: 3px solid transparent;
  &:hover {
    border-bottom: 3px solid var(--accent);
  }
`;

const data = [
  {
    category: "Learning",
    interests: [
      { name: "Storybook", url: "https://storybook.js.org/" },
      { name: "React Query", url: "https://react-query.tanstack.com/" },
    ],
  },
  {
    category: "Reading",
    interests: [
      {
        name: "The Immortal King Rao",
        url: "https://www.amazon.com/dp/0393541754?linkCode=ogi&tag=esquire_auto-append-20&ascsubtag=[artid|10054.g.39651154",
      },
      {
        name: "Companion Piece",
        url: "https://www.amazon.com/dp/0593316371?linkCode=ogi&tag=esquire_auto-append-20&ascsubtag=[artid|10054.g.39651154[src|[ch|[lt|",
      },
    ],
  },
  {
    category: "Cooking",
    interests: [
      {
        name: "Green Curry Bowl",
        url: "",
      },
      {
        name: "Grilled Cheese",
        url: "",
      },
    ],
  },
];

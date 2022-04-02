import styled from "styled-components";
import { TimelineItem as TimelineItemType } from "../../Types/types";

interface TimelineItemProps {
  item: TimelineItemType;
}

export default function TimelineItem({ item }: TimelineItemProps) {
  return (
    <Container>
      <Decoration>
        <Line />
        <Dot />
        <Line />
      </Decoration>
      <URL href={item.link} target="_blank" rel="nonreferrer">
        <DateText>{item.date}</DateText>
        <Title>{item.title}</Title>
      </URL>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const URL = styled.a``;

const DateText = styled.p`
  font-size: 2.25rem;
  text-align: left;
`;

const Title = styled.p`
  font-size: 3rem;
  font-weight: 600;
`;

const Decoration = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 60px;
`;

const Dot = styled.span`
  height: 30px;
  width: 30px;
  display: inline-flex;
  background-color: var(--accent);
  border-radius: 50%;
  margin: 20px 0;
`;

const Line = styled.div`
  height: 120px;
  border-left: 4px solid #bdbdbd;
`;
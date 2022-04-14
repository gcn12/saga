import React from "react";
import styled from "styled-components";
import Spacer from "../Shared/Spacer";

export default function Bio() {
  return (
    <Container>
      {data.map((item, index) => {
        return (
          <React.Fragment key={index}>
            {item.type === "photo" && <Image src={item.src} alt="" />}
            {item.type === "paragraph" && <Paragraph>{item.content}</Paragraph>}
            {item.type === "title" && <Title>{item.content}</Title>}
            <Spacer size={item.type === "title" ? 8 : 24} axis="y" />
          </React.Fragment>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  height: auto;
  border-radius: 12px;
`;

const Paragraph = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.6;
  color: #6e6e6e;
`;

const Title = styled.p`
  font-weight: 600;
  font-size: 1.3rem;
  align-self: flex-start;
`;

const data = [
  {
    type: "title",
    content: "My life",
  },
  {
    type: "paragraph",
    content:
      "Guy is a non-player character (NPC) in Free City, a massively multiplayer online role-playing video game (MMORPG) developed by Soonami Studio. Free City’s players are distinguished from NPCs by the sunglasses they wear, and spend their time robbing banks, murdering NPCs or each other, and overall causing mass mayhem. Unaware that the world they live in is a video game, Guy and the other NPCs are mostly oblivious to the chaos caused by players while living out their scripted lives.",
  },
  {
    type: "paragraph",
    content:
      "In the real world, game developers Millie Rusk and Walter 'Keys' McKey previously created a concept game called Life Itself using a novel artificial intelligence technique for its NPCs. Now unemployed, Millie spends her time playing Free City in hopes of finding hard evidence that Soonami founder/CEO Antwan Hovachelik stole Life Itself's source code after buying the game’s rights from her. Keys (who is now employed by Soonami) is sympathetic, but declines to help because of his NDA.",
  },
  {
    type: "photo",
    src: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGZ1bnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  },
];

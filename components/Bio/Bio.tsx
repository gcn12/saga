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
            <Spacer size={32} axis="y" />
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
  width: 75%;
  height: auto;
  border-radius: 12px;
`;

const Paragraph = styled.p`
  /* width: 75%; */
  font-size: 0.9rem;
`;

const data = [
  {
    type: "paragraph",
    content:
      "Leo urna molestie at elementum eu facilisis sed. Dictum at tempor commodo ullamcorper a lacus. Adipiscing commodo elit at imperdiet dui accumsan. Mauris pellentesque pulvinar pellentesque habitant morbi. Aliquam malesuada bibendum arcu vitae. Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar. Libero id faucibus nisl tincidunt. Eu tincidunt tortor aliquam nulla facilisi.",
  },
  {
    type: "photo",
    src: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGZ1bnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
  },
];

import styled from "styled-components";
import { Contacts } from "../../types/types";
import Instagram from "../Icons/Contact/Instagram";
import Facebook from "../Icons/Contact/Facebook";
import Twitter from "../Icons/Contact/Twitter";
import Email from "../Icons/Contact/Email";
import Spacer from "../Shared/Spacer";
import React, { useState } from "react";

const contacts: Contacts[] = [
  { type: "instagram", value: "gareth.ng" },
  { type: "email", value: "garethcng@gmail.com" },
  { type: "facebook", value: "garethcng@gmail.com" },
  { type: "twitter", value: "garethcng" },
];

const logosMap = {
  instagram: Instagram,
  email: Email,
  twitter: Twitter,
  facebook: Facebook,
};

export default function Contact() {
  return (
    <Container>
      {contacts.map((contact) => {
        const Component = logosMap[contact.type];
        return (
          <LinkComponent
            key={contact.value}
            contact={contact}
            Component={Component}
          />
        );
      })}
    </Container>
  );
}

interface LinkComponentProps {
  contact: Contacts;
  Component: any;
}

const LinkComponent = ({ Component, contact }: LinkComponentProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <LinkContainer
      onMouseLeave={() => setIsHovered(false)}
      onMouseEnter={() => setIsHovered(true)}
      href="https://google.com"
      key={contact.value}
      target="_blank"
      rel="noopener noreferrer"
    >
      <LinkText>
        <Logo>
          <Component isHovered={isHovered} />
        </Logo>{" "}
        <Spacer size={8} axis="x" /> <Text>{contact.value}</Text>
      </LinkText>
    </LinkContainer>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const Text = styled.p`
  font-weight: 600;
  color: initial;
  transition: color 0.3s ease-in-out;
`;

const LinkContainer = styled.a`
  width: 100%;
  background-color: #ededed;
  padding: 16px;
  display: flex;
  justify-content: center;
  border-radius: 8px;
  transition: background-color 0.4s ease-in-out;
  &:hover {
    background-color: var(--accent);
  }
  &:hover ${Text} {
    transition: color 0.4s ease-in-out;
    color: white;
  }
`;

const LinkText = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  transform: scale(0.8);
`;

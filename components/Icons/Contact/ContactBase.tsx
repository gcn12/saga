import React from "react";
import styled from "styled-components";

export default function ContactBase({
  isHovered,
  children,
}: {
  isHovered: boolean;
  children: React.ReactNode;
}) {
  return (
    <SVG
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      isHovered={isHovered}
    >
      {children}
    </SVG>
  );
}

interface SVGProps {
  isHovered: boolean;
}

const SVG = styled.svg<SVGProps>`
  fill: ${(props) => (props.isHovered ? "white" : "black")};
  transition: fill 0.3s ease-in-out;
`;

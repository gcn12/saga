import styled from "styled-components";

interface SpacerProps {
  size: number;
  axis?: "x" | "y";
}

export default function Spacer({ axis, size }: SpacerProps) {
  let width = size;
  let height = size;
  if (axis === "x") {
    height = 0;
  } else if (axis === "y") {
    width = 0;
  }
  return <SpacerStyle height={height} width={width} />;
}

interface SpacerStyleProps {
  height: number;
  width: number;
}

const SpacerStyle = styled.span<SpacerStyleProps>`
  display: block;
  min-width: ${(props) => props.width}px;
  width: ${(props) => props.width}px;
  min-height: ${(props) => props.height}px;
  height: ${(props) => props.height}px;
`;

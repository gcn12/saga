import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ColoredButton } from "../Shared/Buttons";
import {
  AccentColorsType,
  accentColors,
  BackgroundColorsType,
  backgroundColors,
} from "../../colors";

export default function Colors() {
  const [accentColor, setAccentColor] = useState<AccentColorsType>(
    accentColors[0]
  );
  const [backgroundColor, setBackgroundColor] = useState<BackgroundColorsType>(
    backgroundColors[0]
  );
  useEffect(() => {
    setBackgroundColor(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--background"
      ) as BackgroundColorsType
    );

    setAccentColor(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--accent"
      ) as AccentColorsType
    );
  }, []);
  const changeBackgroundColor = (color: BackgroundColorsType) => {
    document.documentElement.style.setProperty("--background", color);
    setBackgroundColor(color);
  };

  const changeAccentColor = (color: AccentColorsType) => {
    document.documentElement.style.setProperty("--accent", color);
    setAccentColor(color);
  };
  const saveSettings = async (e: React.FormEvent<HTMLFormElement>) => {
    if (typeof window === "undefined") return;
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/save-colors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accentColor,
        backgroundColor,
        userID: localStorage.getItem("userID"),
      }),
    });
  };
  return (
    <Container onSubmit={(e) => saveSettings(e)}>
      <ColorContainer>
        <p>Accent color:</p>
        {accentColors.map((colorHex) => {
          return (
            <ColorButton
              type="button"
              key={colorHex}
              onClick={() => changeAccentColor(colorHex)}
              isSelected={colorHex === accentColor}
              hex={colorHex}
              aria-label="color"
            />
          );
        })}
      </ColorContainer>
      <ColorContainer>
        <p>Background color:</p>
        {backgroundColors.map((colorHex) => {
          return (
            <ColorButton
              type="button"
              key={colorHex}
              onClick={() => changeBackgroundColor(colorHex)}
              isSelected={colorHex === backgroundColor}
              hex={colorHex}
              aria-label="color"
            />
          );
        })}
      </ColorContainer>
      <ColoredButton style={{ width: "100%" }} type="submit">
        Save
      </ColoredButton>
    </Container>
  );
}

const Container = styled.form``;

const ColorContainer = styled.div`
  margin-bottom: 24px;
`;

type ColorButtonProps = {
  hex: AccentColorsType | BackgroundColorsType;
  isSelected: boolean;
};

const ColorButton = styled.button<ColorButtonProps>`
  height: 40px;
  width: 40px;
  background-color: ${(props) => props.hex};
  border-radius: 50%;
  border: 6px solid ${(props) => (props.isSelected ? "#9e9e9e" : "#ededed")};
  margin-right: 8px;
`;

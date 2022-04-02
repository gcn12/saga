import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  AccentColorsType,
  accentColors,
  BackgroundColorsType,
  backgroundColors,
} from "../../colors";

export default function Settings() {
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
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/save-settings`, {
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
    <Container>
      <Form onSubmit={(e) => saveSettings(e)}>
        <div>
          <p>Accent color:</p>
          {accentColors.map((colorHex) => {
            return (
              <ColorButton
                type="button"
                key={colorHex}
                onClick={() => changeAccentColor(colorHex)}
                isSelected={colorHex === accentColor}
                hex={colorHex}
              />
            );
          })}

          <p>Background color:</p>
          {backgroundColors.map((colorHex) => {
            return (
              <ColorButton
                type="button"
                key={colorHex}
                onClick={() => changeBackgroundColor(colorHex)}
                isSelected={colorHex === backgroundColor}
                hex={colorHex}
              />
            );
          })}
        </div>
        <button type="submit" className="colored-button">
          Save
        </button>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  background-color: white;
  border-radius: 12px;
  width: 400px;
  padding: 30px 35px;
  height: 300px;
  position: sticky;
  top: 30px;
  box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.03), 0 2px 2px hsl(0deg 0% 0% / 0.03),
    0 4px 4px hsl(0deg 0% 0% / 0.03), 0 8px 8px hsl(0deg 0% 0% / 0.03),
    0 16px 16px hsl(0deg 0% 0% / 0.03);
`;

const Form = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

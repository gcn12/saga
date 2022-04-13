import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SubmitButton, SubmitButtonStatus } from "../Shared/Buttons";
import toastError from "../Shared/Toast";
import {
  AccentColorsType,
  accentColors,
  BackgroundColorsType,
  backgroundColors,
} from "../../colors";
import { getErrorMessage } from "../../utils/utils";

export default function Colors() {
  const [status, setStatus] = useState<SubmitButtonStatus>("idle");
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

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const saveSettings = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    await delay(250);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/account/save-colors`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accentColor,
            backgroundColor,
            userID: localStorage.getItem("userID"),
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`Something went wrong. Response: ${res.status}`);
      }
    } catch (err) {
      toastError(getErrorMessage(err));
    }
    await delay(250);
    setStatus("success");
  };

  return (
    <form onSubmit={(e) => saveSettings(e)}>
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
      <SubmitButton
        disabled={status === "submitting" || status === "success"}
        status={status}
        style={{ width: "100%" }}
        type="submit"
      />
    </form>
  );
}

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

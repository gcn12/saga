import styled from "styled-components";

export const ColoredButton = styled.button`
  color: white;
  background-color: var(--accent);
  padding: 8px 16px;
  border-radius: 6px;
  margin: 0 5px 5px 0;
  font-weight: 600;
  transition: 0.3s filter ease-in-out, 0.2s background-color ease-in-out;
  cursor: pointer;

  &:hover {
    &:enabled {
      filter: brightness(118%);
    }
  }
`;

export type SubmitButtonStatus = "idle" | "success" | "submitting";

type ColoredButtonProps = {
  submitting: boolean;
};

const ColoredSubmitButton = styled(ColoredButton)<ColoredButtonProps>`
  border: ${(props) => (props.submitting ? "1px solid var(--accent)" : "none")};
  color: ${(props) => (props.submitting ? "var(--accent)" : "white")};
  background-color: ${(props) =>
    props.submitting ? "white" : "var(--accent)"};
`;

type SubmitButtonText = {
  idleText: string;
  submittingText: string;
  successText: string;
};

type SubmitButtonTypes = SubmitButtonText & {
  status: SubmitButtonStatus;
};

function ButtonWithStates({
  idleText,
  submittingText,
  successText,
  status,
  ...props
}: SubmitButtonTypes) {
  return (
    <ColoredSubmitButton submitting={status === "submitting"} {...props}>
      {status === "idle" && idleText}
      {status === "success" && successText}
      {status === "submitting" && submittingText}
    </ColoredSubmitButton>
  );
}

type SubmitButtonProps = {
  status: SubmitButtonStatus;
  [x: string]: any;
};

export function SubmitButton({ status, ...props }: SubmitButtonProps) {
  return (
    <ButtonWithStates
      {...props}
      status={status}
      idleText="Save"
      successText="Success!"
      submittingText="Saving..."
    />
  );
}

export const SecondaryButton = styled.button`
  color: var(--accent);
  background-color: transparent;
  padding: 8px 16px;
  border-radius: 6px;
  margin: 0 5px 5px 0;
  font-weight: 600;
  transition: 0.35s background-color ease-in-out, 0.35s color ease-in-out;
  border: 1px solid var(--accent);
  cursor: pointer;

  &:hover {
    border: 1px solid transparent;
    background-color: var(--accent);
    color: white;
  }
`;

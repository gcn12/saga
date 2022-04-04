import styled from "styled-components";

export const ColoredButton = styled.button`
  color: white;
  background-color: var(--accent);
  padding: 8px 16px;
  border-radius: 6px;
  margin: 0 5px 5px 0;
  font-weight: 600;
  transition: 0.3s filter ease-in-out;
  cursor: pointer;

  &:hover {
    filter: brightness(92%);
  }
`;

type SubmitButtonText = {
  idleText: string;
  submittingText: string;
  successText: string;
};

export type SubmitButtonStatus = "idle" | "success" | "submitting";

type SubmitButtonTypes = SubmitButtonText & {
  status: SubmitButtonStatus;
};

export function ButtonWithStates({
  idleText,
  submittingText,
  successText,
  status,

  ...props
}: SubmitButtonTypes) {
  return (
    <ColoredButton {...props}>
      {status === "idle" && idleText}
      {status === "success" && successText}
      {status === "submitting" && submittingText}
    </ColoredButton>
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

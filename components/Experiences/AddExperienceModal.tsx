import { DialogContent, DialogOverlay } from "@reach/dialog";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useState } from "react";
import { useQueryClient } from "react-query";

import TipTap from "../TipTap";
import { Label, Input } from "../Shared/Forms";
import { ColoredButton } from "../Shared/Buttons";
import toastError from "../Shared/Toast";
import Spacer from "../Shared/Spacer";
import {
  getErrorMessage,
  motionFormContentSettings,
  motionOverlaySettings,
} from "../../utils/utils";
import useAddExperience from "./hooks/useAddExperience";

interface AddExperienceModalProps {
  setShowAddExperience: (value: boolean) => void;
}

export default function AddExperienceModal({
  setShowAddExperience,
}: AddExperienceModalProps) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [startMonth, setStartMonth] = useState(months[0]);
  const [startYear, setStartYear] = useState(years[0]);
  const [endMonth, setEndMonth] = useState(months[0]);
  const [endYear, setEndYear] = useState(years[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCurrentExperience, setIsCurrentExperience] = useState(true);

  const queryClient = useQueryClient();

  const formItems = [
    { label: "Company", name: "company", setState: setCompany, value: company },
    { label: "Role", name: "role", setState: setRole, value: role },
  ];

  const mutation = useAddExperience(
    company,
    role,
    description,
    localStorage.getItem("userID"),
    formatDate(startMonth, startYear),
    formatDate(endMonth, endYear),
    isCurrentExperience,
    queryClient
  );

  const addExperience = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await mutation.mutateAsync();
      if (!res.ok) {
        throw new Error(`Something went wrong. Response: ${res.status}`);
      }
      setShowAddExperience(false);
    } catch (err) {
      toastError(getErrorMessage(err));
      console.log(err);
    }
  };

  return (
    <MotionDialogOverlay
      aria-label="blog post"
      onDismiss={() => setShowAddExperience(false)}
      isOpen={true}
      {...motionOverlaySettings}
    >
      <MotionDialogContent
        aria-label="blog post"
        {...motionFormContentSettings(isSubmitting)}
      >
        <button
          onClick={() => setShowAddExperience(false)}
          style={{ padding: "0 5%" }}
        >
          X
        </button>
        <div style={{ width: "80%", margin: "0 auto" }}>
          <Container method="post" onSubmit={addExperience}>
            {formItems.map((formItem) => {
              const { label, setState, value, name } = formItem;
              return (
                <InputLabelContainer key={label}>
                  <Label htmlFor={label}>{label}</Label>
                  <Input
                    id={label}
                    autoComplete="off"
                    type="text"
                    onChange={(e) => setState(e.target.value)}
                    value={value}
                    name={name}
                  />
                </InputLabelContainer>
              );
            })}
            <div></div>
            <InputLabelContainer>
              <Label>Description</Label>
              <TipTap setText={setDescription} />
            </InputLabelContainer>
            <div style={{ width: "100%" }}>
              Start date
              <SelectContainer>
                <DateSelect onChange={(e) => setStartMonth(e.target.value)}>
                  {months.map((month) => {
                    return <option key={month}>{month}</option>;
                  })}
                </DateSelect>
                <DateSelect
                  onChange={(e) => setStartYear(Number(e.target.value))}
                >
                  {years.map((year) => {
                    return <option key={year}>{year}</option>;
                  })}
                </DateSelect>
              </SelectContainer>
            </div>
            {!isCurrentExperience && (
              <div style={{ width: "100%" }}>
                End date
                <SelectContainer>
                  <DateSelect onChange={(e) => setEndMonth(e.target.value)}>
                    {months.map((month) => {
                      return <option key={month}>{month}</option>;
                    })}
                  </DateSelect>
                  <DateSelect
                    onChange={(e) => setEndYear(Number(e.target.value))}
                  >
                    {years.map((year) => {
                      return <option key={year}>{year}</option>;
                    })}
                  </DateSelect>
                </SelectContainer>
              </div>
            )}
            <CheckboxContainer>
              <input
                id="current-company"
                type="checkbox"
                checked={isCurrentExperience}
                onChange={() => setIsCurrentExperience(!isCurrentExperience)}
              />
              <Spacer size={8} axis="x" />
              <label htmlFor="current-company">I currently work here</label>
            </CheckboxContainer>
            <div></div>
            <ButtonsContainer>
              <button type="button" onClick={() => setShowAddExperience(false)}>
                Cancel
              </button>
              <Spacer size={20} axis="x" />
              <ColoredButton type="submit">Add experience</ColoredButton>
            </ButtonsContainer>
          </Container>
        </div>
      </MotionDialogContent>
    </MotionDialogOverlay>
  );
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const years = new Array(20).fill("").map((_year, index) => {
  return new Date().getFullYear() - index;
});

const formatDate = (month: string, year: number) => {
  const date = new Date();
  date.setMonth(months.indexOf(month));
  date.setFullYear(Number(year));
  date.setDate(1);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};

const SelectContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const DateSelect = styled.select`
  width: 49%;
  border-radius: 4px;
  padding: 4px 8px;
  background-color: var(--input);
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-self: flex-end;
`;

const InputLabelContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
`;

const Container = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  margin-bottom: 16px;
`;

const StyledDialogOverlay = styled(DialogOverlay)`
  background-color: rgba(0, 0, 0, 0.6);
`;

const StyledDialogContent = styled(DialogContent)`
  border-radius: 12px;
  padding: 20px 0;
  max-width: 600px;
  position: relative;
`;

const MotionDialogContent = motion(StyledDialogContent);
const MotionDialogOverlay = motion(StyledDialogOverlay);

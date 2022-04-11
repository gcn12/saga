import { DialogContent, DialogOverlay } from "@reach/dialog";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useState } from "react";

import TipTap from "../TipTap";
import { Label, Input } from "../Shared/Forms";
import { ColoredButton } from "../Shared/Buttons";
import toastError from "../Shared/Toast";
import Spacer from "../Shared/Spacer";
import { getErrorMessage } from "../../utils/utils";
import { Experience } from "../../types/types";

interface AddExperienceModalProps {
  experiences: Experience[];
  setShowAddExperience: (value: boolean) => void;
  setExperiences: (value: Experience[]) => void;
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

export default function AddExperienceModal({
  experiences,
  setExperiences,
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

  const formItems = [
    { label: "Company", setState: setCompany, value: company },
    { label: "Role", setState: setRole, value: role },
  ];

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

  const addExperience = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/experience/add-experience`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            company,
            role,
            description,
            userID: localStorage.getItem("userID"),
            startDate: formatDate(startMonth, startYear),
            endDate: formatDate(endMonth, endYear),
            isCurrentExperience: isCurrentExperience,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`Something went wrong. Response: ${res.status}`);
      }

      const data = await res.json();

      const sorted = sortExperiences([...experiences, data]);
      setExperiences(sorted);
      setShowAddExperience(false);
    } catch (err) {
      toastError(getErrorMessage(err));
    }
  };

  const sortExperiences = (experiences: Experience[]) => {
    const currentExperiences = experiences.filter((experience) => {
      return experience.isCurrentExperience;
    });

    const pastExperiences = experiences.filter((experience) => {
      return !experience.isCurrentExperience;
    });

    currentExperiences.sort((a, b) => {
      return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
    });

    pastExperiences.sort((a, b) => {
      return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
    });

    return [...currentExperiences, ...pastExperiences];
  };

  return (
    <div>
      <MotionDialogOverlay
        aria-label="blog post"
        onDismiss={() => setShowAddExperience(false)}
        isOpen={true}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { delay: 0.2 } }}
      >
        <MotionDialogContent
          aria-label="blog post"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { delay: 0.1, duration: 0.5 },
          }}
          exit={{
            opacity: 0,
            scale: isSubmitting ? 1.1 : 0.95,
            transition: { duration: 0.25 },
          }}
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
                const { label, setState, value } = formItem;
                return (
                  <InputLabelContainer key={label}>
                    <Label htmlFor={label}>{label}</Label>
                    <Input
                      id={label}
                      autoComplete="off"
                      type="text"
                      onChange={(e) => setState(e.target.value)}
                      value={value}
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
                <button
                  type="button"
                  onClick={() => setShowAddExperience(false)}
                >
                  Cancel
                </button>
                <Spacer size={20} axis="x" />
                <ColoredButton type="submit">Add experience</ColoredButton>
              </ButtonsContainer>
            </Container>
          </div>
        </MotionDialogContent>
      </MotionDialogOverlay>
    </div>
  );
}

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

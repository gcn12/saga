import { DialogContent, DialogOverlay } from "@reach/dialog";
import styled from "styled-components";
import { useState } from "react";
import "@reach/dialog/styles.css";
import { useRouter } from "next/router";
import TipTap from "../TipTap";
import { TabContent, Tab } from "../../Types/types";
import { Label, Input } from "../Shared/Forms";
import { ColoredButton } from "../Shared/Buttons";
import { motion } from "framer-motion";
import toastError from "../Shared/Toast";

interface AddExperienceModalProps {
  tabContent: TabContent[];
  selectedTab: Tab;
  setShowDialog: (value: boolean) => void;
  setTabContent: (value: TabContent[]) => void;
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

const yearsArr = new Array(20).fill("");
const years = yearsArr.map((_year, index) => {
  return new Date().getFullYear() - index;
});

export default function AddExperienceModal({
  tabContent,
  selectedTab,
  setShowDialog,
  setTabContent,
}: AddExperienceModalProps) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [timespan, setTimespan] = useState("2018-2021");
  const [startMonth, setStartMonth] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [endYear, setEndYear] = useState("");
  const router = useRouter();
  const { username } = router.query;

  const formItems = [
    { label: "Company", setState: setCompany, value: company },
    { label: "Role", setState: setRole, value: role },
    { label: "Timespan", setState: setTimespan, value: timespan },
  ];

  // const getDate = () => {
  //   const startDate = new Date();
  //   startDate.setMonth(months.indexOf(startMonth));
  //   startDate.setFullYear(Number(startYear));

  //   const endDate = new Date();
  //   endDate.setMonth(months.indexOf(endMonth));
  //   endDate.setFullYear(endYear === "Present" ? 5000 : Number(endYear));
  //   console.log(startDate);
  //   console.log(endDate);
  // };

  const addExperience = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const experience = {
      content: {
        company,
        role,
        description,
        timespan,
      },
      type: "experience",
      username,
      name: selectedTab.name,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/add-tab-preview`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(experience),
        }
      );

      const data = await res.json();

      const sortedContent = [...tabContent, data] as TabContent[];
      sortedContent.sort((a, b) => {
        return b.id.localeCompare(a.id);
      });
      setTabContent(sortedContent);
      setShowDialog(false);
    } catch (err) {
      toastError((err as any).toString());
    }
  };

  return (
    <div>
      <MotionDialogOverlay
        aria-label="blog post"
        onDismiss={() => setShowDialog(false)}
        isOpen={true}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <MotionDialogContent
          aria-label={"blog post"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            onClick={() => setShowDialog(false)}
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
                Start
                <SelectContainer>
                  <DateSelect onChange={(e) => setStartMonth(e.target.value)}>
                    {months.map((month) => {
                      return <option key={month}>{month}</option>;
                    })}
                  </DateSelect>
                  <DateSelect onChange={(e) => setStartYear(e.target.value)}>
                    {years.map((year) => {
                      return <option key={year}>{year}</option>;
                    })}
                  </DateSelect>
                </SelectContainer>
              </div>
              <div style={{ width: "100%" }}>
                End
                <SelectContainer>
                  <DateSelect onChange={(e) => setEndMonth(e.target.value)}>
                    {months.map((month) => {
                      return <option key={month}>{month}</option>;
                    })}
                  </DateSelect>
                  <DateSelect onChange={(e) => setEndYear(e.target.value)}>
                    {["Present", ...years].map((year) => {
                      return <option key={year}>{year}</option>;
                    })}
                  </DateSelect>
                </SelectContainer>
              </div>
              <div></div>
              <ButtonsContainer>
                <button type="button" onClick={() => setShowDialog(false)}>
                  Cancel
                </button>
                <ColoredButton type="submit">Add experience</ColoredButton>
                {/* <ColoredButton onClick={getDate} type="button">
                  Date
                </ColoredButton> */}
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
  gap: 20px;
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

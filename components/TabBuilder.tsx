import DragIcon from "./Icons/DragIcon";
import { Reorder, useDragControls } from "framer-motion";
import { Tab } from "../Types/types";
import styled from "styled-components";

interface TabBuilderProps {
  addTab: () => void;
  tabs: Tab[];
  updateTabName: (name: string, index: number) => void;
  updateTabType: (type: string, index: number) => void;
  setTabs: (tabs: Tab[]) => void;
}

export default function TabBuilder({
  addTab,
  tabs,
  updateTabName,
  updateTabType,
  setTabs,
}: TabBuilderProps) {
  const controls = useDragControls();

  const tabOptions = [
    {
      name: "Experience",
      value: "experience",
    },
    {
      name: "Blog",
      value: "blog",
    },
    {
      name: "Introduction",
      value: "introduction",
    },
    {
      name: "Portfolio",
      value: "portfolio",
    },
    {
      name: "Skills",
      value: "skills",
    },
    {
      name: "Education",
      value: "education",
    },
    {
      name: "Timeline",
      value: "timeline",
    },
  ];
  return (
    <div>
      <Reorder.Group axis="y" values={tabs} onReorder={setTabs}>
        {tabs.map((tab: Tab, index: number) => {
          return (
            <Reorder.Item
              // as={"p"}
              value={tab}
              style={{ display: "flex", alignItems: "center" }}
              key={tab.key}
              dragControls={controls}
              dragListener={false}
            >
              <CreateTabContainer key={tab.key}>
                <LabelContainer>
                  <label
                    htmlFor="name"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      position: "relative",
                      left: "20px",
                    }}
                  >
                    Tab name:
                  </label>
                  <IconContainer>
                    <DragIconContainer onPointerDown={(e) => controls.start(e)}>
                      <DragIcon />
                    </DragIconContainer>
                    <TabInput
                      data-testid="tab-input"
                      key={tab.key}
                      value={tab.name}
                      id="name"
                      onChange={(e) => updateTabName(e.target.value, index)}
                      type="text"
                    />
                  </IconContainer>
                </LabelContainer>
                <label style={{ display: "flex", flexDirection: "column" }}>
                  Tab type:
                  <SelectTab
                    className="tab-select"
                    onChange={(e) => updateTabType(e.target.value, index)}
                  >
                    {tabOptions.map((tab) => {
                      return (
                        <option
                          className={tab.value}
                          key={tab.value}
                          value={tab.value}
                        >
                          {tab.name}
                        </option>
                      );
                    })}
                  </SelectTab>
                </label>
              </CreateTabContainer>
            </Reorder.Item>
          );
        })}
      </Reorder.Group>
      <CreateTab type="button" onClick={addTab}>
        Add new tab
      </CreateTab>
    </div>
  );
}

const TabInput = styled.input`
  border-radius: 8px;
  padding: 6px 8px;
  width: 100%;
`;

const SelectTab = styled.select`
  width: 100%;
`;

const CreateTab = styled.button`
  padding: 8px 12px;
  border-radius: 8px;
  margin-bottom: 5px;
  font-size: 1rem;
  border: 1px solid black;
  margin-bottom: 100px;
`;

const DragIconContainer = styled.div`
  cursor: grab;
`;

const LabelContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CreateTabContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: 15px 0;
`;

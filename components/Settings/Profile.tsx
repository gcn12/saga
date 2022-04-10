import { Label, Input } from "../Shared/Forms";
import { SubmitButton, SubmitButtonStatus } from "../Shared/Buttons";
import { FormEvent, useContext, useState, Fragment } from "react";
import { AuthContext } from "../../state/context";
import toastError from "../Shared/Toast";
import Spacer from "../Shared/Spacer";
import { getErrorMessage } from "../../utils/utils";

export default function Profile() {
  const [status, setStatus] = useState<SubmitButtonStatus>("idle");
  const { user, setUser } = useContext(AuthContext);
  const [career, setCareer] = useState(user.career);
  const [location, setLocation] = useState(user.location);
  const [videoIntroduction, setVideoIntroduction] = useState(
    user.videoIntroduction || ""
  );

  const formItems = [
    { label: "Career", setState: setCareer, value: career },
    { label: "Location", setState: setLocation, value: location },
    {
      label: "Introduction video",
      setState: setVideoIntroduction,
      value: videoIntroduction,
    },
  ];

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const saveSettings = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    await delay(250);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/account/save-profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            career,
            location,
            videoIntroduction,
            userID: localStorage.getItem("userID"),
          }),
        }
      );
      const userData = await res.json();

      const newData = { ...user, ...userData, tabs: JSON.parse(userData.tabs) };
      await delay(250);
      setStatus("success");
      setUser(newData);
    } catch (err) {
      toastError(getErrorMessage(err));
      setStatus("idle");
    }
  };

  return (
    <form onSubmit={(e) => saveSettings(e)}>
      {formItems.map((formItem) => {
        return (
          <Fragment key={formItem.label}>
            <Label>
              {formItem.label}
              <Input
                defaultValue={formItem.value || ""}
                onChange={(e) => formItem.setState(e.target.value)}
              />
            </Label>
            <Spacer size={16} axis="y" />
          </Fragment>
        );
      })}
      <SubmitButton status={status} style={{ width: "100%" }} type="submit" />
    </form>
  );
}

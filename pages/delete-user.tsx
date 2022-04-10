import React, { useState } from "react";
import toastError from "../components/Shared/Toast";
import { getErrorMessage } from "../utils/utils";

export default function DeleteUser() {
  const [username, setUsername] = useState("");
  const [isDeleted, setIsDeleted] = useState(false);
  const deleteUser = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/account/delete-user/${username}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );
      if (!res.ok) {
        throw new Error(`Something went wrong. Response: ${res.status}`);
      }
      setIsDeleted(true);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteAllUsers = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/account/delete-all-users`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );
      if (!res.ok) {
        throw new Error(`Something went wrong. Response: ${res.status}`);
      }
    } catch (err) {
      toastError(getErrorMessage(err));
    }
  };

  return (
    <div>
      <label>
        Username:
        <input type="text" onChange={(e) => setUsername(e.target.value)} />
      </label>
      <button onClick={deleteUser}>Delete user</button>
      {isDeleted && <p>User deleted</p>}
      <div></div>
      <button onClick={deleteAllUsers}>Delete all users</button>
    </div>
  );
}

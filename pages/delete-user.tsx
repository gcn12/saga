import { useState } from "react";

export default function DeleteUser() {
  const [username, setUsername] = useState("");
  const deleteUser = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/delete-user/${username}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );
  };

  const deleteAllUsers = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/delete-all-users`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
  };

  return (
    <div>
      <label>
        Name:
        <input type="text" onChange={(e) => setUsername(e.target.value)} />
      </label>
      <button onClick={deleteUser}>Delete user</button>
      <div></div>
      <button onClick={deleteAllUsers}>Delete all users</button>
    </div>
  );
}

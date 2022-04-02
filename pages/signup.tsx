import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { User } from "../Types/types";

type UserRes = Pick<User, "id" | "name" | "username">;

export default function Signup() {
  const [name, setName] = useState("");
  const [username, setUserame] = useState("");

  const router = useRouter();

  const signup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typeof window === "undefined") return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
        }),
      });
      const user = (await res.json()) as UserRes;
      localStorage.setItem("userID", user.id);
      localStorage.setItem("name", user.name);
      localStorage.setItem("username", user.username);
      router.push("/create-user");
    } catch (err) {
      console.log("sign up failed");
    }
  };

  return (
    <Container>
      <Form onSubmit={signup}>
        <Title>Sign up</Title>
        <Label>
          Name:
          <Input onChange={(e) => setName(e.target.value)} type="text" />
        </Label>
        <Label>
          Username:
          <Input onChange={(e) => setUserame(e.target.value)} type="text" />
        </Label>
        <Submit type="submit">CREATE</Submit>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: grid;
  place-items: center;
`;

const Form = styled.form`
  border: 1px solid black;
  border-radius: 8px;
  width: 350px;
  height: 400px;
  padding: 0 2%;
  display: grid;
  place-items: center;
`;

const Input = styled.input`
  width: 100%;
  border-radius: 4px;
  background-color: var(--input);
  padding: 4px 8px;
`;

const Label = styled.label`
  font-weight: 400;
  width: 100%;
`;

const Title = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
`;

const Submit = styled.button`
  width: 100%;
  background-color: black;
  color: white;
  border-radius: 4px;
  height: 40px;
`;

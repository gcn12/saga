import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { User } from "../Types/types";
import { Label, Input } from "../components/Shared/Forms";
import { ColoredButton } from "../components/Shared/Buttons";

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
      console.log("sign up failed", err);
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
        <ColoredButton style={{ width: "100%" }} type="submit">
          CREATE
        </ColoredButton>
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
  border: 1px solid rgb(218, 218, 218);
  border-radius: 8px;
  width: 350px;
  height: 400px;
  padding: 8px 36px;
  display: grid;
  place-items: center;
  background-color: white;
  box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.03), 0 2px 2px hsl(0deg 0% 0% / 0.03),
    0 4px 4px hsl(0deg 0% 0% / 0.03), 0 8px 8px hsl(0deg 0% 0% / 0.03),
    0 16px 16px hsl(0deg 0% 0% / 0.03);
`;

const Title = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
`;

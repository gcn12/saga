import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { User } from "../types/types";
import { Label, Input } from "../components/Shared/Forms";
import { ColoredButton } from "../components/Shared/Buttons";
import toastError from "../components/Shared/Toast";
import { getErrorMessage } from "../utils/utils";
import { useForm, SubmitHandler } from "react-hook-form";

type UserRes = Pick<User, "id" | "name" | "username" | "email">;

type FormValues = {
  email: string;
  password: string;
};

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const router = useRouter();

  const signup: SubmitHandler<FormValues> = async (data, e) => {
    e?.preventDefault();
    const { email, password } = data;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      if (!res.ok) {
        throw new Error(`Something went wrong. Response: ${res.status}`);
      }

      const user = (await res.json()) as UserRes;
      console.log(user);
      localStorage.setItem("userID", user.id);
      localStorage.setItem("name", user.name);
      localStorage.setItem("username", user.username);
      router.push("/create-user");
    } catch (err) {
      toastError(getErrorMessage(err));
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(signup)}>
        <Title>Log in</Title>
        <Label>
          Email
          <Input
            {...register("email", { required: true, minLength: 3 })}
            type="email"
            autoComplete="off"
          />
        </Label>
        <Label>
          Password
          <Input
            {...register("password", { required: true, minLength: 3 })}
            type="password"
            autoComplete="off"
          />
        </Label>
        {errors.email && <p>Error</p>}
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
  height: 100vh;
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

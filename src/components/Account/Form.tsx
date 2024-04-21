import React, { useEffect, useState } from "react";
import Title from "../Title";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Form({
  titleText,
  fetchFunction,
  setToken,
}: {
  titleText: string;
  fetchFunction: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<Partial<{ token: string; message: string }>>;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  useEffect(() => {
    setToken(token);
    if (token) {
      localStorage.setItem("token", token);
      navigate("/account");
    }
  }, [token]);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const { email, password } = data;
        fetchFunction({ email, password }).then((res) => {
          if (res.token) {
            setToken(res.token);
            localStorage.setItem("token", res.token);
            alert(res.message);
            navigate("/account");
          }
        });
      }}
      className="aspect-video min-w-[50%] flex flex-col items-center justify-center rounded-xl bg-sidebar p-8 my-8"
    >
      <Title header={titleText} />
      <label htmlFor="email">
        Email:
        <input
          type="email"
          id="email"
          required
          value={data.email}
          onChange={(e) => {
            setData({ ...data, email: e.target.value });
          }}
          className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background"
        />
      </label>
      <label htmlFor="password">
        Password:
        <input
          type="password"
          id="password"
          required
          value={data.password}
          onChange={(e) => {
            setData({ ...data, password: e.target.value });
          }}
          className="h-5 bg-background text-center text-[.5rem]  md:text-sm rounded-xl  border-2 border-solid border-textColor hover:bg-sidebar hover:border-background"
        />
      </label>
      <button type="submit">{titleText}</button>
    </form>
  );
}

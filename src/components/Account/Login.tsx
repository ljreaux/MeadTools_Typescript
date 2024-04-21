import { Dispatch, SetStateAction, useEffect, useState } from "react";
import useMultiStepForm from "../../hooks/useMultiStepForm";
import signInButton from "../../assets/signin-assets/Web (mobile + desktop)/svg/dark/web_dark_rd_ctn.svg";
import lightSignIn from "../../assets/signin-assets/Web (mobile + desktop)/svg/light/web_light_rd_ctn.svg";
import { login, register } from "../../helpers/Login";
import Form from "./Form";
export default function Login({
  setToken,
}: {
  setToken: Dispatch<SetStateAction<string | null>>;
}) {
  const { goTo, step, currentStepIndex } = useMultiStepForm([
    <Form titleText="Login" setToken={setToken} fetchFunction={login} />,
    <Form titleText="Register" setToken={setToken} fetchFunction={register} />,
  ]);
  const index = currentStepIndex === 0 ? 1 : 0;
  const buttonMessage =
    index === 1
      ? "Don't have any account? Register now."
      : "Already have an account? Login here.";
  const [mode, setMode] = useState("dark");
  const btnSrc = mode === "dark" ? signInButton : lightSignIn;
  useEffect(() => {
    // Add listener to update styles
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => setMode(e.matches ? "dark" : "light"));

    // Setup dark/light mode for the first time
    setMode(
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
    );

    // Remove listener
    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", () => {});
    };
  }, []);
  return (
    <div className="flex flex-col items-center justify-center w-screen">
      <div className="flex flex-col items-center justify-center w-full">
        {step}
        <button onClick={() => goTo(index)}>{buttonMessage}</button>
      </div>
      <p>OR</p>
      <div>
        <button
          onClick={() => {
            (async function auth() {
              const response = await fetch(
                "http://localhost:3000/api/request",
                {
                  method: "post",
                }
              );
              const data = await response.json();
              console.log(data);
              window.location.href = data.url;
            })();
          }}
        >
          <img src={btnSrc} alt="Sign in with google" />
        </button>
      </div>
    </div>
  );
}
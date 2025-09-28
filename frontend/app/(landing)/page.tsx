"use client";
import { useEffect, useState } from "react";
import PromptBox from "../components/LandingPageComps/PromptBox";
// import Background from "./components/ui/Background";
// import NewNavBar from "./components/LandingPageComps/NewNavBar";
import Chips from "../components/LandingPageComps/Chips";
import React from "react";
import { useUserPrompt } from "../context/FormProvider";
import Background from "../components/ui/Background";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { inputPrompt, setInputPrompt } = useUserPrompt();
  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 overflow-hidden relative flex flex-col">
      <Background />
      <div className="flex-1 flex flex-col justify-center items-center px-4 pt-24 md:pt-32">
        <div className="w-full max-w-7xl px-4">
          <div
            className={`h-min w-full flex flex-col text-center mx-auto transition-all duration-600 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <span className="text-6xl font-bold">
              <h1 className="bg-gradient-to-r from-zinc-400 via-zinc-100 to-white inline-block text-transparent bg-clip-text drop-shadow-lg">
                What&apos;s on your mind today?
              </h1>
            </span>
            <span className="text-md font-thin text-zinc-400 pt-2 block align-middle ">
              Turn your ideas into reality with a single prompt!
            </span>
          </div>
          <PromptBox
            inputPrompt={inputPrompt}
            setInputPrompt={setInputPrompt}
          />
          <Chips setInputPrompt={setInputPrompt} />
        </div>
      </div>
    </div>
  );
};
export default Home;

"use client";
import { useEffect, useState } from "react";
import PromptBox from "./components/PromptBox";
import Background from "./components/ui/Background";
import NewNavBar from "./components/NewNavBar";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-zinc-950 to-zinc-900 overflow-hidden relative flex flex-col">
      <NewNavBar />
      <Background/>

      <div className="flex-1 flex flex-col justify-center items-center px-4 pt-16 md:pt-24">
        <div className="w-full max-w-7xl px-4">
          <div
            className={`h-min w-full flex flex-col text-center mx-auto transition-all duration-600 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <span className="text-6xl font-bold ">
              <h1 className="bg-gradient-to-r from-zinc-500 via-zinc-400 to-zinc-300 inline-block text-transparent bg-clip-text">
                AI Website Builder
              </h1>
            </span>
            <span className="text-md font-thin text-zinc-500 pt-2 block align-middle ">
              Turn your ideas into reality with a single prompt!
            </span>
          </div>
          <PromptBox />
        </div>
      </div>
    </div>
  );
};

export default Home;

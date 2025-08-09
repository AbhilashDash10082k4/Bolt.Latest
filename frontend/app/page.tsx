"use client";
import { useEffect, useState } from "react";
import PromptBox from "./components/PromptBox";
import Navbar from "./components/Navbar";
import Background from "./components/ui/Background";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    setIsVisible(true);
  }, []);
  return (
    <div className="min-h-screen w-full bg-[#101010] overflow-hidden relative">
       <Background/>
      {/* <nav className="text-2xl text-white w-screen  pt-10 pl-7 pr-7 font-bold font-mono flex justify-between">
        <div className="">AI SDE</div>
        <div className="flex gap-20">
          <div>Login</div>
          <div>Sign Up</div>
        </div>
      </nav> */}
      <Navbar/>
      <div className="flex justify-center items-center mt-10 w-full h-[calc(100vh-5rem)] px-4">
        <div className="w-full max-w-7xl px-4">
          <div
            className={`h-min w-full flex flex-col text-center  mx-auto transition-all duration-600 ${
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

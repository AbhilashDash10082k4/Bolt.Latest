import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const PromptBox = () => {
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) navigate("/builder", { state: { prompt } });
  };
  return (
    <form onSubmit={handleSubmit} className="w-[400px] text-xl mr-5">
      <div className="py-10 w-[400px] items-center flex flex-col">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your dream website..."
          className=" h-32 w-full p-4 bg-white/5 rounded-lg text-white placeholder-white/50 border border-white/20 focus:border-white/40 focus:ring-2 focus:ring-white/20 outline-none resize-none"
        />
        <Button />
      </div>
    </form>
  );
};
export default PromptBox;

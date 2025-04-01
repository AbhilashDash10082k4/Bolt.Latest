import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PromptBox = () => {
  const [prompt, setPrompt] = useState<string>("");
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) navigate("/api/builder", { state: { prompt } });
    setPrompt("");
  };
  
  return (
    <form onSubmit={handleSubmit} action='http://localhost:5173/api/builder' method="POST" className="w-[400px] text-xl mr-5">
      <div className="py-10 w-[400px] items-center flex flex-col">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your website"
          className=" h-32 w-full p-4 bg-white/5 rounded-lg text-gray-200 placeholder-white/50 border border-white/20 focus:border-white/40 focus:ring-2 focus:ring-white/20 outline-none resize-none font-medium valid:required:bg-gradient-to-br from-blue-900 via-cyan-900 to-transparent invalid:required:transparent"
          required
        ></textarea>
        <button
          type="submit"
          className="mt-4 max-w-3/4 bg-gradient-to-r from-blue-700 via-blue-900 to-gray-800 text-cyan-400 py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-white/90 transition-colors"
          onClick={handleSubmit}
        > Generate Website</button>
      </div>
    </form>
  );
};
export default PromptBox;

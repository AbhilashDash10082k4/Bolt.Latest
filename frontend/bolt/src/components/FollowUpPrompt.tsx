import React, { useState } from "react";
import Button from "./Button";


function FollowUpPrompt() {
    const [follwUpPrompt, setFollwUpPrompt] = useState("");
    const handleSubmit = () => {

    }

  return (
    <>
    <form onSubmit={handleSubmit} className="w-[275px] text-xl mr-5">
      <div className="py-10 w-[275px] items-center flex flex-col ">
        <textarea
          value={follwUpPrompt}
          onChange={(e) => setFollwUpPrompt(e.target.value)}
          placeholder="Describe your dream website..."
          className=" h-32 w-full p-4 bg-white/5 rounded-lg text-white placeholder-white/50 border border-white/20 focus:border-white/40 focus:ring-2 focus:ring-white/20 outline-none resize-none"
        />
        <Button />
      </div>
    </form>
    </>
    
  );
}

export default FollowUpPrompt;

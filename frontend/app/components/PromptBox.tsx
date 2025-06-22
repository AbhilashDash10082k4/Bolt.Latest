import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormContext } from "../context/FormProvider";

const PromptBox: React.FC = () => {
  const [inputPrompt, setInputPrompt] = useState<string>("");
  // const [prompt, setPrompt] = useState<string>("");
  const navigate = useNavigate();

  const { setPrompt } = useContext(FormContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPrompt(inputPrompt);
    if (inputPrompt.trim()) navigate("/api/builder", { state: { inputPrompt } });
  };
  
  return (
    <form onSubmit={handleSubmit} action='http://localhost:5173/api/builder' method="POST" className="w-[400px] text-xl mr-5">
      <div className="py-10 w-[400px] items-center flex flex-col">
        <textarea
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          placeholder="Describe your website"
          className=" h-32 w-full p-4 bg-white/5 rounded-lg text-gray-200 placeholder-white/50 border border-white/20 focus:border-white/40 focus:ring-2 focus:ring-white/20 outline-none resize-none font-medium valid:required:bg-gradient-to-br from-blue-900 via-cyan-900 to-transparent invalid:required:transparent"
          required
        ></textarea>
        <button
          type="submit"
          className="group mt-4 max-w-3/4 bg-gray-900 text-cyan-400 py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2  transition-colors relative shadow-[0px_1px_4px_0px_rgba(255, 255, 255, 0.1)_inset,0px_-1px_2px_0px_rgba(255, 255, 255, 0.1)_inset]"
        > Generate Website
        <span className="absolute inset-x-0 bottom-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent h-px w-3/4 mx-auto"></span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute inset-x-0 bottom-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent blur-sm h-[4px] w-full mx-auto"></span>
        </button>
      </div>
    </form>
  );
};
export default PromptBox;

/* interface PromptType {prompt: string, setPrompt: () => void} 
  const PromptContext = createContext<PromptType>({prompt: "", setPrompt: () => {}})
  const FormContextProvider = ({children :React.ReactNode}) => {const [prompt, setPrompt] = useState<string>("") return (<PromptContext.Provider value = ({prompt, setPrompt})>{children}</>) }
  const [input, setInput] = useState<string>("");
  const {setPrompt} = useContext(PromptContext)
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault; setPrompt(input)}
  return ( <form value={input} onChange=> {(e) => setInput(e.target.value)}>)
  const {prompt} = useContext(PromptContext)
  return (<div>{prompt}</>)
  <PromptContextProvider><allChildren></allChildren></PromptContextProvider>
*/
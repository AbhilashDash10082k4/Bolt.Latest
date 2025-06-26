import React, { createContext, useState } from "react";

interface FormContextType {
    prompt: string;
    setPrompt: (prompt : string) => void;
    aiResponse: string,
    setAiResponse: (res: string) => void 
}
  
export const FormContext = createContext<FormContextType> ({ prompt : "", setPrompt: () => {} , aiResponse:"", setAiResponse: () => {}})

export const FormProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [prompt, setPrompt] = useState<string>("");
    const [aiResponse, setAiResponse] = useState<string>("")
    return (
        <FormContext.Provider value={{ prompt, setPrompt, aiResponse, setAiResponse }}>
            {children}
        </FormContext.Provider>
    )
}
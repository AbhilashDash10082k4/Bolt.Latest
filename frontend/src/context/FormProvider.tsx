import React, { createContext, useState } from "react";

interface FormContextType {
    prompt: string;
    setPrompt: (prompt : string) => void;
}
  
export const FormContext = createContext<FormContextType> ({ prompt : "", setPrompt: () => {} })

export const FormProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [prompt, setPrompt] = useState<string>("");
    return (
        <FormContext.Provider value={{ prompt, setPrompt }}>
            {children}
        </FormContext.Provider>
    )
}

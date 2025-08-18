import React, { createContext, useContext, useState } from "react";

interface FormContextType {
  inputPrompt: string;
  setInputPrompt: React.Dispatch<React.SetStateAction<string>>;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useUserPrompt = () => {
  const [inputPrompt, setInputPrompt] = useState<string>("");
  return {inputPrompt, setInputPrompt};
}
export const FormProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {inputPrompt, setInputPrompt} = useUserPrompt();
  return (
    <FormContext.Provider value={{ inputPrompt , setInputPrompt}}>
      {children}
    </FormContext.Provider>
  );
};

export const usePrompt = () => {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error("usePrompt must be used within PromptProvider");
  return ctx;
};
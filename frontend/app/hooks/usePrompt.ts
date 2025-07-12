import { useState } from "react";

export function usePrompt() {
    const [inputPrompt, setInputPrompt] = useState<string>("");
    // setInputPrompt(inputPrompt);
    return {inputPrompt, setInputPrompt};
}
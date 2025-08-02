
import axios from "axios";
import { parseXml } from "./parser";
import { Dispatch, SetStateAction } from "react";
import { Step } from "./types";
interface PropType {
  promptQuery: string,
  setSteps: Dispatch<SetStateAction<Step[]>>
}
export async function backendCall({promptQuery, setSteps}: PropType) {
  try {
    const response = await axios.post("/api/template", {
      prompt: promptQuery,
    });

    const { prompts, uiPrompt } = response.data;
    const parsedResponse = parseXml(uiPrompt[0]);
    // console.log("parsedResponse ", parsedResponse);
    setSteps(parsedResponse);

    const stepsResponse = await axios.post("/api/chat", {
      prompt: [...prompts, promptQuery].map((content) => ({
        role: "user",
        content,
      })),
    });
    /* {prompt: [{role: "user", content:"...prompts"}, {role: "user", content:"promptQuery"}]} */
    const { message } = stepsResponse.data;
    console.log("parseXml(message) ", parseXml(message));

    setSteps((s) =>
      [...s, ...parseXml(message)].map((x) => ({
        ...x,
        status: "pending",
      }))
    );
  } catch (error) {
    console.log(error);
  }
}

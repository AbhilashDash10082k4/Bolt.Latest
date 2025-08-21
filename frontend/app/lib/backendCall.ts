
import axios from "axios";
import { parseXml } from "./parser";
import { Dispatch, SetStateAction } from "react";
import { Step } from "./types";
interface PropType {
  promptQuery: string,
  setSteps: Dispatch<SetStateAction<Step[]>>
}
export async function backendCall({ promptQuery, setSteps }: PropType) {
  try {
    const response = await axios.post("/api/template", {
      prompt: promptQuery,
    });

    const { prompts, uiPrompt } = response.data;
    const templResp = parseXml(uiPrompt[0]);
    // console.log("templResp from tempplate ", templResp);
    // setSteps(templResp);

    const stepsResponse = await axios.post("/api/chat", {
      prompt: [...prompts, promptQuery].map((content) => ({
        role: "user",
        content,
      })),
    });
    /* {prompt: [{role: "user", content:"...prompts"}, {role: "user", content:"promptQuery"}]} */
    const { message } = stepsResponse.data;
    const stepsResp = parseXml(message);
    // console.log("stepsResponse from chat", parseXml(message));

    const finalSteps = [...templResp?.map(file => {
      const updated = stepsResp.find(x => x.path === file.path);
      return updated ? { ...file, code: updated.code } : file;
    }),
    ...stepsResp.filter(x => !templResp.some(file => file.path === x.path))
    ];
    // Ensure first step is always from chat response
    if (stepsResp.length > 0) {
      finalSteps[0] = stepsResp[0];
    }
    console.log("finalSteps ",finalSteps);
    setSteps(finalSteps);
  } catch (error) {
    console.log(error);
  }
}

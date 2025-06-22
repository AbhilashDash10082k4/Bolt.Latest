import { groq } from "../../lib/config";
import { baseNextPrompt } from "../../lib/default/next";
import { baseNodePrompt } from "../../lib/default/node";
import { baseReactPrompt } from "../../lib/default/react";
import { userPrompts2 } from "../../lib/prompts";

export const POST = async (req: Request) => {
  try {
    //take prompt from body, app.post, to recieve the result at the body
    const prompt = await req.json();
    console.log("req ", req.body);

    // this endpoint will send user req to llm to chk what should be the stack to be preferred
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "user", content: prompt },
        {
          role: "system",
          content:
            "Based on the user prompts tell that what framework/library will be used to make the website as asked by user. DON'T tell anything EXCEPT REACT, NODE and NEXT. Return ONLY ONE WORD in response",
        },
      ],
      model: "gemma2-9b-it",
      temperature: 0.5,
      max_completion_tokens: 300,
      // "top_p": 1,
    });
    const answer = chatCompletion.choices[0]?.message?.content;
    console.log("chatCompletion ", chatCompletion);
    console.log("RESPONSE: ", answer);
    if (answer == "REACT" || "React" || "react") {
      return Response.json({
        prompt: [
          userPrompts2,
          `Project Files:\n\nThe following is a list of all project files and their complete contents that are currently visible and accessible to you ${baseReactPrompt}`,
        ],
        uiPrompt: [baseReactPrompt],
      });
    }
    if (answer == "NODE" || "Node" || "node") {
      return Response.json({
        prompt: [
          `Project Files:\n\nThe following is a list of all project files and their complete contents that are currently visible and accessible to you ${baseNodePrompt}`,
        ],
        uiPrompt: [baseNodePrompt],
      });
      return;
    }
    if (answer == "NEXT" || "Next" || "next") {
      return Response.json({
        prompt: [
          userPrompts2,
          `Project Files:\n\nThe following is a list of all project files and their complete contents that are currently visible and accessible to you ${baseNextPrompt}`,
        ],
        uiPrompt: [baseNextPrompt],
      });
    }
    if (answer !== "REACT" || "NEXT" || "NODE") {
      return Response.json({
        message: "Enter the tech stack for ur website",
      });
    }
  } catch (error) {
    console.error("Error in POST handler:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
};

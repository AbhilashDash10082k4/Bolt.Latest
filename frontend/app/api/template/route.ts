import { groq } from "../../lib/config";
// import { baseNextPrompt } from "../../lib/default/next";
// import { baseNodePrompt } from "../../lib/default/node";
import { baseReactPrompt } from "../../lib/default/react";
import { userPrompts2 } from "../../lib/prompts";

export const POST = async (req: Request) => {
  try {
    //take prompt from body, app.post, to recieve the result at the body
    const body = await req.json();
    const prompt = body.prompt;
    if (!prompt) throw new Error("No prompt provided");

    // this endpoint will send user req to llm to chk what should be the stack to be preferred
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "user", content: prompt },
        {
          role: "system",
          content:
            "Return either node or react based on what do you think this project should be. Only return a single word like 'node' or 'react', 'next. Do not return anything extra. Return ONLY ONE WORD in response",
        },
      ],
      model: "llama-3.3-70b-versatile",//gemma2-9b-it
      temperature: 0.6,
      max_completion_tokens: 300,
    });
    const answer = chatCompletion.choices[0]?.message?.content;
    console.log("chatCompletion ", chatCompletion);
    console.log("RESPONSE: ", answer);
    if (["react", "React", "REACT"].includes(answer?.trim() as string)) {
      return Response.json({
        prompts: [
          userPrompts2,
          `Project Files:\n\nThe following is a list of all project files and their complete contents that are currently visible and accessible to you ${baseReactPrompt}`,
        ],
        uiPrompt: [baseReactPrompt],
      });
    }
    //  if (answer == "NODE" || "Node" || "node") {
    //   return Response.json({
    //     prompt: [
    //       `Project Files:\n\nThe following is a list of all project files and their complete contents that are currently visible and accessible to you ${baseNodePrompt}`,
    //     ],
    //     uiPrompt: [baseNodePrompt],
    //   });
    // }
    // if(answer == "NEXT" || "Next" || "next") {
    //   Response.json({
    //     prompt: [
    //       userPrompts2,
    //       `Project Files:\n\nThe following is a list of all project files and their complete contents that are currently visible and accessible to you ${baseNextPrompt}`,
    //     ],
    //     uiPrompt: [baseNextPrompt],
    //   });
    //   return;
    // }
    return Response.json(
      {
        message: "Enter the tech stack for ur website",
      },
      { status: 403 }
    );
  } catch (error) {
    console.error("Error in POST handler:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
};

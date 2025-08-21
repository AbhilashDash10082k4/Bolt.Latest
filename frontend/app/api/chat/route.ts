import { groq } from "../../lib/config";
import { baseReactPrompt } from "../../lib/default/react";
// import prisma from "../../lib/prisma";
import { getSystemPrompt } from "../../lib/prompts";
export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const prompt = body.prompt; ///{prompt: [...]}
    if (!prompt) throw new Error("No prompt provided");

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: getSystemPrompt() },
        ...prompt,
        {
          role: "assistant", content: `Take the base template below:${baseReactPrompt}. Now, apply the following user requirements:
          ${body.prompt}
          Return the ENTIRE updated template in the structure as above.
          - For the FIRST step, set the title to a clear, meaningful project name (e.g., "Personal Portfolio Website" or "Fitness Tracker App").
          - Do not skip any files except the first step. In the first step, add the project name you have generated.
          - Apply modifications to relevant files.
          - If a file is unchanged, still include it in the response EXCEPT the FIRST step.  
          - If a new file is required, add it into the correct directory.  
          - The response must ONLY be the JSON template, with no explanation or additional text.  
.` },
      ],
      //...prompt: {role: "user", content:""}...
      model: "llama-3.3-70b-versatile",//llama-3.1-8b-instant, llama-3.3-70b-versatile
      temperature: 1,
      max_completion_tokens: 8192,
      // "top_p": 1,
    });
    const answer = chatCompletion.choices[0]?.message?.content;

    console.log("answer ", answer);
    return Response.json({ message: answer }, { status: 200 });
  } catch (error) {
    return Response.json(
      { msg: "Something went wrong", error: error },
      { status: 400 }
    );
  }
};

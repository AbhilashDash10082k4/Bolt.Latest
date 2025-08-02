import { groq } from "../../lib/config";
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
        ...prompt
      ], 
      //...prompt: {role: "user", content:""}...
      model: "llama-3.1-8b-instant",//llama-3.3-70b-versatile
      temperature: 0.7,
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

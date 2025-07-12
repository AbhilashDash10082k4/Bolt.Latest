// import { groq } from "../../lib/config";
// // import prisma from "../../lib/prisma";

import prisma from "../../lib/prisma";

// import { getSystemPrompt } from "../../lib/prompts";
export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const storeThisPrompt = body.storeThisPrompt;
    if (!storeThisPrompt) throw new Error("No prompt provided");

    //db call
    // await prisma.project.create ({
    //     data: {
    //         content: storeThisPrompt
    //     }
    // })
    // const chatCompletion = await groq.chat.completions.create({
    //   messages: [{ role: "system", content: getSystemPrompt() }, ...prompt], //...prompt: {role: "user", content:""}...
    //   model: "llama-3.3-70b-versatile",//llama-3.3-70b-versatile
    //   temperature: 1,
    //   max_completion_tokens: 8192,
    //   // "top_p": 1,
    // });
    // const answer = chatCompletion.choices[0]?.message?.content;
    
    // console.log("answer ", answer);
    return Response.json({ message: answer }, { status: 200 });
  } catch (error) {
    return Response.json(
      { msg: "Something went wrong", error: error },
      { status: 400 }
    );
  }
};

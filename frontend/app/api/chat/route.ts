import { groq } from "../../lib/config";
import { getSystemPrompt } from "../../lib/prompts";
export const POST = async (req: Request) => {
  try {
    const userPrompt = await req.json();

    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "system", content: getSystemPrompt() }, ...userPrompt],
      model: "llama-3.3-70b-versatile",
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

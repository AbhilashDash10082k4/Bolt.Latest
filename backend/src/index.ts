require("dotenv").config();

import { getSystemPrompt, userPrompts1, userPrompts2, userPrompts3 } from './prompts';
import Groq from 'groq-sdk';
import express, {Request, Response} from 'express';
import cors from 'cors';
import { baseReactPrompt } from './default/react';
import { baseNodePrompt } from './default/node';
import { baseNextPrompt } from './default/next';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

//post = add data on the client side - data == the web page it will show based on the base prompt = react || next || node

/*2 endpoints - chat and template - 
template -based on the user prompt, the llml will return whether the user is asking for react, next or nodejs application and will return just a single word, this will go to prompt that will give context about the type of prompts required

chat - */

const groq = new Groq({apiKey: process.env.GROQ_API_KEY});
app.post('/template', async (req, res, next) => {
    
    //take prompt from body, app.post, to recieve the result at the body
    const prompt = req.body.prompt;
    
    // this endpoint will send user req to llm to chk what should be the stack to be preferred
    const chatCompletion = await groq.chat.completions.create({
        "messages": [
        { role: 'user', content: prompt },
        { role: 'system', content: "Based on the user prompts tell that what framework/library will be used to make the website as asked by user. DON'T tell anything EXCEPT REACT, NODE and NEXT. Return ONLY ONE WORD in response" }],
        model: "deepseek-r1-distill-llama-70b",
        temperature: 1,
        max_completion_tokens: 300,
        // "top_p": 1,
    })
    const answer = chatCompletion.choices[0]?.message?.content;
    console.log("RESPONSE: ",answer);
    if( answer == "REACT" || "React" || "react") {
        res.json({
            prompt:[ userPrompts2, `Project Files:\n\nThe following is a list of all project files and their complete contents that are currently visible and accessible to you ${baseReactPrompt}`],
            uiPrompt: [baseReactPrompt],
        })
        return ;
    };
    if( answer == "NODE") {
        res.json({
            prompt:[ `Project Files:\n\nThe following is a list of all project files and their complete contents that are currently visible and accessible to you ${baseNodePrompt}`],
            uiPrompt: [baseNodePrompt],
        })
        return;
    };
    if( answer == "NEXT") {
        res.json({
            prompt:[ userPrompts2, `Project Files:\n\nThe following is a list of all project files and their complete contents that are currently visible and accessible to you ${baseNextPrompt}`],
            uiPrompt: [baseNextPrompt],
        })
        return;
    }
    if ( answer !== 'REACT' || 'NEXT' || 'NODE') {
        res.status(404).json({message: "Enter the tech stack for ur website"})
        return;
    }
})

app.post('/chat', async (req, res) => {
    const messages = req.body.messages;

    const chatCompletion = await groq.chat.completions.create({
        messages: [
        { role: 'system', content: getSystemPrompt()},
        ...messages
    ],
        model: "deepseek-r1-distill-llama-70b",
        temperature: 1,
        max_completion_tokens: 1024,
        // "top_p": 1,
    })
    console.log(chatCompletion);
    res.json({})
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// async function main() {
//     const chatCompletion = await groq.chat.completions.create({
//         "messages": [
//         { role: 'user', content: userPrompts1 },
//         { role: 'user', content: userPrompts2 },
//         { role: 'user', content: userPrompts3 },
//         { role: 'system', content: getSystemPrompt() }],
//         "model": "llama-3.2-90b-vision-preview",
//         "temperature": 1,
//         "max_completion_tokens": 6000,
//         // "top_p": 1,
//         "stream": true,
//         "stop": null
//     });

//     for await (const chunk of chatCompletion) {
//         process.stdout.write(chunk.choices[0]?.delta?.content || '');
//     }
// }

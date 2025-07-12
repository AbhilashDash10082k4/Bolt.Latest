import { groq } from "../../lib/config";

export const POST = async (req: Request) => {
  const body = await req.json();
  const prompt = body.prompt;
  if (!prompt) throw new Error("No prompt provided");
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "user", content: prompt },
        {
          role: "system",
          content: `You are an expert AI web architect specializing in transforming vague ideas into production-ready web applications. When users describe their website needs, you will:

            1. FIRST UNDERSTAND THE CORE PURPOSE:
              - Clearly identify the primary goal of the application
              - Determine the target audience and their needs
              - Establish key success metrics

            2. RECOMMEND A MODERN TECH STACK:
              ⎔ Frontend: React/Next.js with Tailwind CSS
              ⎔ Backend: Node.js/Express or Next.js API routes
              ⎔ Database: MongoDB/PostgreSQL/Firebase
              ⎔ Auth: NextAuth.js/Firebase Authentication
              ⎔ Deployment: Vercel/Netlify/AWS

            3. SUGGEST ESSENTIAL FEATURES:
              ✓ User authentication system
              ✓ Responsive mobile-first design
              ✓ Interactive UI components
              ✓ Data visualization (if applicable)
              ✓ SEO optimization
              ✓ Performance optimizations

            4. PROPOSE VALUE-ADD FEATURES:
              • Real-time updates (WebSockets)
              • Dark/light mode toggle
              • Accessibility compliance
              • Analytics integration
              • Notification system
              • Social sharing capabilities

            5. OUTPUT FORMAT REQUIREMENTS:
              ⎆ Always begin with a 1-sentence summary
              ⎆ Use clean spacing between sections
              ⎆ Present features in bullet points
              ⎆ Highlight unique selling points
              ⎆ Include estimated complexity level

            Example transformation:

            User Input: "I want a fitness app"

            Enhanced Output:
            "A comprehensive fitness tracking platform for health-conscious individuals...

            Key Features:
            • Workout logging with exercise database
            • Nutrition tracking with calorie counter
            • Progress visualization with charts
            • Social challenges and sharing
            • Personalized recommendations

            Tech Stack:
            - Next.js frontend with Framer Motion
            - Firebase backend with Firestore
            - Google Fit/Apple Health integration
            - Stripe for premium subscriptions

            Estimated Build Complexity: Medium-High"`,
        },
      ],
      model: "gemma2-9b-it", //gemma2-9b-it, llama-3.3-70b-versatile
      temperature: 0.6,
      max_completion_tokens: 300,
    });
    const answer = chatCompletion.choices[0]?.message?.content;
    return Response.json({
      message: answer,
    });
  } catch (error) {
    return Response.json({
      msg: "Error in enhancing the prompt",
      error,
      status: 403,
    });
  }
};

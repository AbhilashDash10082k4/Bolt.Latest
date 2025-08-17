import { samplePrompts } from "../lib/default/samplePrompts"
interface Prop {
    setInputPrompt: React.Dispatch<React.SetStateAction<string>>
}
export const Chips = ({setInputPrompt}: Prop) => {
    return (<div className="w-full max-w-3xl mx-auto mt-5">
        {/* First row with 3 chips */}
        <div className="grid grid-cols-3 gap-2">
          {samplePrompts.slice(0, 3).map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              className="px-3 py-1 rounded-lg bg-zinc-800 text-zinc-400 text-sm 
                   hover:cursor-pointer hover:bg-zinc-700 hover:text-white 
                   transition-all duration-200 shadow overflow-hidden 
                   text-ellipsis whitespace-nowrap"
              style={{ maxWidth: "100%" }}
              onClick={() => setInputPrompt(prompt)}
              title={prompt}
            >
              {prompt}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-6 gap-2 mt-3">
          {samplePrompts.slice(3, 5).map((prompt, idx) => (
            <div key={idx} className={idx == 0 ? "col-start-2 col-end-4": "col-start-4 col-end-6" }>
              <div className="flex">
                <button
                type="button"
                className="px-3 py-1 rounded-lg bg-zinc-800 text-zinc-400 text-sm 
                   hover:cursor-pointer hover:bg-zinc-700 hover:text-white 
                   transition-all duration-200 shadow overflow-hidden 
                   text-ellipsis whitespace-nowrap"
                style={{ maxWidth: "100%" }}
                onClick={() => setInputPrompt(prompt)}
                title={prompt}
              >
                {prompt}
              </button>
              </div>
            </div>
          ))}
        </div>
      </div>)
}
import { HeroiconsLink } from "../../icons/HeroiconsLink";
import React from "react";
import Star from "../../icons/Star";

interface Prop {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleAttach: React.RefObject<(e: React.ChangeEvent<HTMLInputElement>) => void>;
  handleClick: React.RefObject<() => void>;
  enhancePrompt: React.RefObject<() => Promise<void>>
}
function AttachEnhanceBtn({
  fileInputRef,
  handleAttach,
  handleClick,
  enhancePrompt,
}: Prop) {
  return (
    <div className="flex items-center gap-2 mt-4">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => handleAttach.current(e)}
        accept="image/*,.txt"
      />
      <label
        htmlFor="file-upload"
        onClick={() => handleClick.current()}
        className="cursor-pointer flex items-center gap-1 px-4 py-2 rounded-full bg-zinc-800 text-sm text-zinc-300 hover:bg-zinc-700"
      >
        <HeroiconsLink />
        <span className="leading-normal">Attach</span>
      </label>
      <button
        type="button"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          enhancePrompt.current();
        }}
      >
        <div className="flex cursor-pointer items-center gap-1 px-4 py-2 rounded-full bg-zinc-800 text-sm text-zinc-300 hover:bg-zinc-700">
          <Star />
          <span>Enhance</span>
        </div>
      </button>
    </div>
  );
}
export default React.memo(AttachEnhanceBtn);

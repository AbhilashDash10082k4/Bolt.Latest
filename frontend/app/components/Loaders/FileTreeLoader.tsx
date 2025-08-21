"use client";

export default function FileTreeLoader() {
  return (
    <div className="text-sm leading-relaxed grid grid-cols-5 border-[1px] border-zinc-700 overflow-hidden animate-pulse h-full ">
      <div className="bg-zinc-900 border-[1px] border-zinc-700 flex flex-col col-span-1">
        <div className="border-b border-zinc-700 p-3 flex-shrink-0">
          <span className="bg-zinc-700 rounded w-16 h-4 inline-block"></span>
        </div>
        <div className="flex-1 overflow-y-auto space-y-2 p-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-2 my-10 w-full">
              <div className="w-4 h-7 bg-zinc-700 rounded" />
              <div className="w-24 h-7 bg-zinc-700 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
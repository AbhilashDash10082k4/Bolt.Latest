import Link from "next/link";

export default function layout({children}: {children:React.ReactNode}) {
    return (
      <>
        <nav className="text-xl text-white w-full p-4 bg-zinc-900 font-bold border-b-[1px] border-zinc-700 flex justify-between">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold bg-gradient-to-r from-zinc-400 via-zinc-100 to-white bg-clip-text text-transparent drop-shadow-md">
            ThunderBolt
          </span>
        </Link>
        <div className="flex mr-2 gap-5 font-thin">
          <button className="flex hover:cursor-pointer gap-2 justify-center items-center px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            Export
          </button>
          <button className="flex font-thin text-shadow-md hover:cursor-pointer gap-2 justify-center items-center px-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
              />
            </svg>
            Deploy
          </button>
        </div>
      </nav>
      {children}
      </>
    )
}
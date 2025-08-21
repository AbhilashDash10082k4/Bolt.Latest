"use client";

import Link from "next/link";
import { SignUp } from "./SignUp";
import React from "react";

function NewNavBar() {
  return (
    <nav className="bg-transparent backdrop-blur-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-screen-xl mx-auto  py-10 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold bg-gradient-to-r from-zinc-400 via-zinc-100 to-white bg-clip-text text-transparent drop-shadow-md">
            ThunderBolt
          </span>
        </Link>
        <div className="hidden md:flex space-x-8 font-medium">
          <Link href="#" className="text-zinc-300 hover:text-white transition">
            About
          </Link>
          <Link href="#" className="text-zinc-300 hover:text-white transition">
            Services
          </Link>
          <Link href="#" className="text-zinc-300 hover:text-white transition">
            Pricing
          </Link>
          <Link href="#" className="text-zinc-300 hover:text-white transition">
            Contact
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center gap-2 sm:gap-3">
            <SignUp title="Sign In" />
          </div>
        </div>
      </div>
    </nav>
  );
}
export default React.memo(NewNavBar);

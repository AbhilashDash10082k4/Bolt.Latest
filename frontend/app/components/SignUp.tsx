"use client";

import { Button, Label, Modal, ModalBody } from "flowbite-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { VscGithub } from "react-icons/vsc";
import SignIn, { SignInWithGithub } from "../lib/actions";

interface Prop {
  title: string;
}
export function SignUp({ title }: Prop) {
  const [openModal, setOpenModal] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
    
      <div className="relative group w-full sm:w-auto">
        <div
          className="absolute inset-0 -m-2 rounded-full
                     hidden sm:block
                     bg-gray-100
                     opacity-40 filter blur-lg pointer-events-none
                     transition-all duration-300 ease-out
                     group-hover:opacity-60 group-hover:blur-group-hover:-m-3"
        ></div>
        <button
          className="relative z-10 px-4 py-2 sm:px-3 text-xs sm:text-sm font-semibold text-black 
                     bg-gradient-to-br from-gray-100 to-gray-300 rounded-full 
                     hover:from-gray-200 hover:to-gray-400 transition-all duration-200 
                     w-full sm:w-auto"
          type="submit"
          onClick={() => setOpenModal(true)}
        >
          {title}
        </button>
      </div>
      <div className="pl-2">
        <button className="px-4 py-2 rounded-xl bg-gradient-to-l from-zinc-900 via-zinc-600 to-zinc-900 hover:drop-shadow-white text-zinc-300 hover:bg-zinc-500 hover:text-white transition">
        Login
      </button>
      </div>
      
      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
        initialFocus={emailInputRef}
        className="backdrop-blur-xs bg-black/40 flex items-center justify-center"
      >
        <ModalBody className="bg-zinc-900 rounded-md p-8">
          <div className="space-y-6 bg-transparent rounded-xl">
            <div className="grid grid-cols-5">
              <div className="col-span-5">
                <h1 className="text-xl font-sans bg-gradient-to-r from-zinc-400 to-zinc-100 bg-clip-text text-transparent font-semibold text-center">
                  Sign in to our platform
                </h1>
              </div>
              <div className="col-start-6">
                <button className="" onClick={() => setOpenModal(false)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6 text-zinc-400"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <Label htmlFor="email" className="mb-2 block text-gray-300">
                Your email
              </Label>
              <input
                id="email"
                ref={emailInputRef}
                placeholder="name@company.com"
                required
                className="w-full px-4 py-2 rounded-lg 
               bg-zinc-800 text-gray-200 placeholder-gray-500
               border border-zinc-700 
               focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-transparent
               transition duration-200"
              />
            </div>
            <div>
              <Label htmlFor="password" className="mb-2 block text-gray-300">
                Your password
              </Label>
              <input
                id="password"
                placeholder="••••••••"
                type="password"
                required
                className="w-full px-4 py-2 rounded-lg 
               bg-zinc-800 text-gray-200 placeholder-gray-500
               border border-zinc-700 
               focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-transparent
               transition duration-200"
              />
            </div>
            <div className="flex justify-end">
              <Link href="#" className="text-sm text-zinc-400 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="w-full">
              <Button
                className="w-full bg-gradient-to-r from-blue-800 via-blue-600 to-cyan-500 
                                 text-white font-semibold hover:cursor-pointer"
              >
                Sign in to your account
              </Button>
            </div>
            <div className="flex items-center">
              <hr className="flex-grow border-gray-700" />
              <span className="px-2 text-gray-400 text-sm">or</span>
              <hr className="flex-grow border-gray-700" />
            </div>
            <div className="flex flex-col space-y-3">
              <form action={SignIn}>
                <button
                className="w-full px-4 py-2 rounded-lg font-medium 
                                 bg-zinc-800 border border-zinc-700 text-white 
                                 hover:bg-zinc-700 transition flex items-center justify-center space-x-2"
              >
                <FcGoogle className="text-red-400" />
                <span>Continue with Google</span>
              </button>
              </form>
              <form action={SignInWithGithub}>
              <button
                className="w-full px-4 py-2 rounded-lg font-medium 
                                 bg-zinc-800 border border-zinc-700 text-white 
                                 hover:bg-zinc-700 transition flex items-center justify-center space-x-2"
              >
                <VscGithub className="text-white" />
                <span>Continue with GitHub</span>
              </button>
              </form>
            </div>
            <div className="items-center flex justify-center text-sm font-medium text-gray-400">
              <span>Already registered?</span>
              <span>
                <Link href="#" className="text-blue-400 hover:underline">
                  Log In
                </Link>
              </span>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

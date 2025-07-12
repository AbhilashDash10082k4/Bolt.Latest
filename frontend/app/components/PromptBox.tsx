"use client";
import React, { ChangeEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { HeroiconsLink } from "../icons/HeroiconsLink";
// import { UploadStatus } from "../lib/types";
import axios from "axios";
import Image from "next/image";
import Star from "../icons/Star";
import { usePrompt } from "../hooks/usePrompt";
const PromptBox: React.FC = () => {
  const { inputPrompt, setInputPrompt } = usePrompt();

  const [files, setFiles] = useState<File[]>([]);
  // const [status, setStatus] = useState<UploadStatus>("idle");
  // const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleAttach = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const file = Array.from(e.target.files || []);
      console.log("🔥 File input triggered");

      if (!file) return;
      console.log("📦 Selected File:", file);

      const imageFiles = file.filter((x) => x.type.startsWith("image/"));

      if (imageFiles) {
        const imageUrl = imageFiles.map((x) => URL.createObjectURL(x));
        console.log("📸 Preview URL:", imageUrl);

        setPreviewUrl((prev) => [...prev, ...imageUrl]);
        setFiles((prev) => [...prev, ...files]);
      } else {
        setPreviewUrl([]);
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPrompt.trim()) return;
    setInputPrompt(inputPrompt);
    
    // const response = await axios.post('/api/storePrompt', {
    //   storeThisPrompt: inputPrompt
    // })
    
    // const promptId = response.data.id
    router.push(`/dashboard/builder?prompt=${inputPrompt}`);

    // if (!files) return;
    // setStatus("uploading");
    // const formData = new FormData();
    // // formData.append("file");
    // try {
    //   await axios.post(`/api/fileUpload`, formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //     // onUploadProgress: (progressEvent) => {},
    //   });
    //   setStatus("success");
    // } catch (error) {
    //   setStatus("error");
    //   console.log(error);
    // }
  };

  const deletePicFromView = (i: number) => {
    if (previewUrl[i]) {
      URL.revokeObjectURL(previewUrl[i]);

      setFiles((prev) => {
        return prev.filter((item, index) => {
          return index !== i;
        });
      });
      setPreviewUrl((prev) => {
        return prev.filter((item, index) => {
          return index !== i;
        });
      });
    }
  };

  async function enhancePrompt() {
    try {
      setLoading(true);
      const response = await axios.post("/api/enhance", {
        prompt: inputPrompt,
      });
      const message = response.data.message;
      setLoading(false);
      setInputPrompt(message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      method="POST"
      className="w-full text-xl mr-5 "
    >
      <div className="py-7 px-10 h-[100%] w-full mx-auto max-w-4xl items-center flex flex-col">
        <div className="relative w-full min-w-max h-52 rounded-lg overflow-hidden shadow-gray-800 shadow-xl">
          {/* Textarea */}
          {loading && (
            <div className="absolute inset-0 z-10 bg-[#171717]/70 backdrop-blur-sm flex items-center justify-center rounded-lg">
              <span className="text-sm text-gray-400 animate-pulse">
                Enhancing Prompt...
              </span>
            </div>
          )}
          <div className="relative h-full w-full p-4 bg-[#171717] rounded-lg text-stone-300 placeholder-white/50 outline-none resize-none  tracking-normal border-[1px] border-zinc-500 ">
            <textarea
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Describe your website"
              className="h-4/5 w-full pt-2 outline-none no-scrollbar"
              required
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault(); // stop newline
                  handleSubmit(e); // your custom submit handler
                }
              }}
            />
          </div>
          <div className="absolute bottom-3 left-3 flex items-center gap-2 hover:cursor-pointer">
            <div className="">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleAttach}
                accept="image/*,.txt"
              ></input>
              <label
                htmlFor="file-upload"
                onClick={handleClick}
                className="cursor-pointer flex items-center gap-1 px-4 py-2 rounded-full bg-zinc-800 text-sm text-white/80 hover:bg-zinc-700"
              >
                <HeroiconsLink />
                <span className="leading-normal">Attach</span>
              </label>
            </div>
            <button
              type="button"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                enhancePrompt();
              }}
            >
              <div className="flex cursor-pointer items-center gap-1 px-4 py-2 rounded-full bg-zinc-800 text-sm text-white/80 hover:bg-zinc-700">
                <Star />
                <span>Enhance</span>
              </div>
            </button>
          </div>
        </div>
        {/*Multiple image rendering */}
        <div className="flex">
          {previewUrl.map((item, index) => (
            <div
              key={index}
              className="mt-3 ml-1 bg-zinc-800 p-1 rounded-lg max-w-sm"
            >
              <div className="flex">
                <Image
                  src={item}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded-md"
                  width={20}
                  height={20}
                />

                <button className="" onClick={() => deletePicFromView(index)}>
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
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
};
export default PromptBox;

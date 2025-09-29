"use client";

import { useEffect, useRef, useState } from "react";
import { Code2, Play } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { FileOrFolder, Step } from "../../lib/types";
import { StepsList } from "../../components/BuilderComps/StepList";
import { RenderFileTree } from "../../components/BuilderComps/RenderFileTree/FileTreeClient"; 
import dynamic from "next/dynamic";
const PreviewFrameee = dynamic(
  () => import("../../features/webcontainers/components/PreviewFrame"),
  {
    ssr: false,
  }
);

import { useWebContainers } from "../../features/webcontainers/hooks/useWebContainers";
import { backendCall } from "../../lib/backendCall";
import { parseStepsToFileOrFolder } from "../../lib/parseStepsToFileOrFolder";
export default function Page() {
  const [activeTab, setActiveTab] = useState<"code" | "preview">("code");
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurentSteps] = useState(1);
  const [fileStructure, setFileStructure] = useState<FileOrFolder[]>([]);
  const searchParams = useSearchParams();
  const promptQuery = searchParams.get("prompt") as string;
  const fileStructureRef = useRef<FileOrFolder[]>([]);

  //prevents re render and putting fileStructure in otehr useEffects to prevent re renders
  useEffect(() => {
    fileStructureRef.current = fileStructure;
  }, [fileStructure]);

  // useEffect(() => {
  //   if (!promptQuery?.trim()) return;
  //   backendCall({ promptQuery, setSteps });
  // }, [promptQuery]);

  useEffect(() => {
    if (steps.length == 0) return;
    parseStepsToFileOrFolder({
      steps,
      fileStructure: fileStructureRef.current,
      setSteps,
      setFileStructure,
    });
    console.log("fileStructureRef inside the useEffect", fileStructureRef);
  }, [steps]);

  const { isLoading, error, instance, writeFileSync } = useWebContainers();
  return (
    <div className="h-full  bg-zinc-900 text-white w-full">
      <div className="grid grid-cols-7 pt-3 bg-zinc-900 w-full h-full min-h-0"> 
        <StepsList
          steps={steps}
          currentStep={currentStep}
          onStepClick={setCurentSteps}
        />

        
            <div className="flex-1 flex flex-col col-span-5 min-h-0">
              <div className="border-[1px] border-zinc-700 px-4 bg-zinc-900 ">
                <div className="flex gap-6 ">
                  <button
                    onClick={() => setActiveTab("code")}
                    className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                      activeTab === "code"
                        ? "border-cyan-400 text-cyan-400"
                        : "border-transparent text-gray-400 hover:text-gray-300"
                    }`}
                  >
                    <Code2 className="w-4 h-4" />
                    Code
                  </button>
                  <button
                    onClick={() => setActiveTab("preview")}
                    className={`flex items-center gap-2 py-4 border-b-2 transition-colors ${
                      activeTab === "preview"
                        ? "border-cyan-400 text-cyan-400"
                        : "border-transparent text-gray-400 hover:text-gray-300"
                    }`}
                  >
                    <Play className="w-4 h-4" />
                    Preview
                  </button>
                </div>
              </div>
              <div className="flex-1 min-h-0 relative">
                <div className={activeTab === "code" ? "block" : "hidden"}>
                  <div className="flex flex-col flex-1 h-[calc(100vh-160px)] min-h-0">
                    <RenderFileTree
                      fileStructure={fileStructure}
                      setFileStructure={setFileStructure}
                    />
                  </div>
                </div>
                <div
                  className={activeTab === "preview" ? "flex-1 flex" : "hidden"}
                >
                  <div className="h-[calc(100vh-160px)] flex flex-1 bg-gray-850 border-[1px] border-zinc-700">
                    <PreviewFrameee
                      filesFromBackend={fileStructure}
                      webContainerInstance={instance}
                      error={error}
                      writeFileSync={writeFileSync}
                      isLoading={isLoading}
                      forceResetup={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      
  );
}

"use client";

import { useEffect, useState } from "react";
import { Code2, Play } from "lucide-react";
import { parseXml } from "../../lib/parser";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { FileOrFolder, Step, StepType } from "../../lib/types";
import { PreviewFrame } from "../../components/Preview";
import { StepsList } from "../../components/StepList";
import { RenderFileTree } from "../../components/RenderFileTree";

export default function Builder() {
  const [activeTab, setActiveTab] = useState<"code" | "preview">("code");
  const searchParams = useSearchParams();
  const [steps, setSteps] = useState<Step[]>([]);
  const [currentStep, setCurentSteps] = useState(1);
  const [fileStructure, setFileStructure] = useState<FileOrFolder[]>([]);

  const promptQuery = searchParams.get("prompt") as string;
  // const webContainer = useWebContainer();

  useEffect(() => {
    async function backendCall() {
      try {
        const response = await axios.post("/api/template", {
          prompt: promptQuery,
        });

        const { prompts, uiPrompt } = response.data;
        const parsedResponse = parseXml(uiPrompt[0]);
        // console.log("parsedResponse ", parsedResponse);
        setSteps(parsedResponse);

        const stepsResponse = await axios.post("/api/chat", {
          prompt: [...prompts, promptQuery].map((content) => ({
            role: "user",
            content,
          })),
        });
        /* {prompt: [{role: "user", content:"...prompts"}, {role: "user", content:"promptQuery"}]} */
        const { message } = stepsResponse.data;
        console.log(parseXml(message));

        setSteps((s) =>
          [...s, ...parseXml(message)].map((x) => ({
            ...x,
            status: "pending",
          }))
        );
      } catch (error) {
        console.log(error);
      }
    }
    if (!promptQuery?.trim()) return;
    console.log("promptQuery value inside useEffect:", promptQuery);
    backendCall();
  }, [promptQuery]);

  useEffect(() => {
    let originalFiles = [...fileStructure]; //shallow copy -a new array named originalFiles with the inner elements pointing to same memory. The top level reference creates a new array -pointing to a different memory

    console.log("originalFiles ", originalFiles); //[]
    console.log("files ", fileStructure);

    let updateHappened = false; //a flag
    const pendingSteps = steps.filter((item) => item.status === "pending");

    pendingSteps.map((step) => {
      updateHappened = true; //for each item, the flag is true
      if (step?.type === StepType.CreateFile) {
        let parsedPath = step.path?.split("/") ?? [];

        console.log("!parsedPath.length ", !parsedPath.length);
        console.log("parsedPath ", parsedPath);
        console.log("originalFiles before the while loop", originalFiles);

        let currentFileStructure = [...originalFiles]; // shallow copy of originalFiles, pointing to a differnt memory but inner loop refering to same memory location. Cause of shallow copying -react's shallow comparison for state. React ompares teh initial state of a variable to the final value of its new top level reference. The new top level reference encapsulates the inner changes. Although the change directly happens in the state var, due to another reference, it gets shadowed and only renders when the original var is update with the new reference. The state var is not changed directly as according to react, the initial val and the changed val will be same and teh state will not be different, so teh UI will not re render.

        console.log(
          "currentFileStructure before while loop",
          currentFileStructure
        );

        const finalAnswerRef = currentFileStructure; //just another reference to the currentFileStructure. Same top level reference.
        // console.log("finalAnswerRef before while loop ", finalAnswerRef);

        let currentFolder = "";

        while (parsedPath.length) {
          currentFolder = `${currentFolder}/${parsedPath[0]}`; // /src
          console.log("currentFolder inside loop ", currentFolder);

          const currentFolderName = parsedPath[0]; // src
          parsedPath = parsedPath.slice(1); // [App.tsx]
          console.log("parsedPath in while loop after slicing ", parsedPath);
          console.log(
            "!parsedPath.length inside while loop ",
            !parsedPath.length
          );
          if (!parsedPath.length) {
            //false
            // final file
            const file = currentFileStructure.find(
              (x) => x.path === currentFolder
            );
            console.log("file from inside !parsedPath.lenth if loop ", file);
            if (!file) {
              currentFileStructure.push({
                name: currentFolderName,
                type: "file",
                path: currentFolder,
                content: step.code,
              });

              console.log(
                "currentFileStructure inside the if loop after the push ",
                currentFileStructure
              );
            } else {
              file.content = step.code;
              console.log("file.content inside else loop", file.content);
              console.log("step inside else loop", step);
            }
          } else {
            /// in a folder
            const folder = currentFileStructure.find(
              (x) => x.path === currentFolder // /src
            );
            console.log(
              "folder from else loop of the !parsedPath.lenth if loop  ",
              currentFolder
            );
            console.log(
              "folder from else loop of the !parsedPath.lenth if loop  ",
              folder
            );
            if (!folder) {
              // create the folder
              currentFileStructure.push({
                name: currentFolderName,
                type: "folder",
                path: currentFolder,
                children: [],
              });
              currentFileStructure = currentFileStructure.find(
                (x) => x.path === currentFolder
              )!.children!;
              console.log(
                "currentFileStructure inside !folder loop inside else loop of !parsedPath.lenth if loop ",
                currentFileStructure
              );
            }
          }
          originalFiles = finalAnswerRef;
        }
      }
    });
    if (updateHappened) {
      console.log("inside the updateHappened loop");
      setFileStructure(originalFiles);
      console.log("files inside the updateHappened loop", fileStructure);
      setSteps((steps) =>
        steps.map((s: Step) => {
          return {
            ...s,
            status: "completed",
          };
        })
      );
    }
  }, [steps, fileStructure]);

  return (
    <div className="min-h-screen bg-zinc-900 text-white w-full">
      <nav className="text-2xl text-white w-full p-4 font-bold border-b-[1px] border-zinc-700 flex justify-between">
        <div className="">AI SDE</div>
        <div className="flex gap-20">
          <div>Login</div>
          <div>Sign Up</div>
        </div>
      </nav>
      {/* Steps Sidebar */}
      <div className="grid grid-cols-7 pt-3 bg-zinc-900">
        <StepsList
          steps={steps}
          currentStep={currentStep}
          onStepClick={setCurentSteps}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col col-span-5">
          {/* File Explorer and Preview */}
          <div className="flex-1 flex">
            {/* File Explorer */}

            {/* Code/Preview Area */}

            <div className="flex-1 flex flex-col">
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
              <div className="flex-1 ">
                {activeTab === "code" ? (
                  <div className="flex flex-col flex-1 h-[calc(100vh-160px)]">
                    <RenderFileTree fileStructure={fileStructure} setFileStructure={setFileStructure}/>
                  </div>
                ) : (
                  <div className="h-[calc(100vh-160px)] flex items-center justify-center bg-gray-850 border-[1px] border-zinc-700">
                    <PreviewFrame files={fileStructure} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

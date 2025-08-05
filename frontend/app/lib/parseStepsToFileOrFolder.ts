
import { Dispatch, SetStateAction } from "react";
import { FileOrFolder, Step, StepType } from "./types";
interface PropTypes {
  fileStructure: FileOrFolder[],
  steps: Step[],
  setFileStructure:  Dispatch<SetStateAction<FileOrFolder[]>>,
  setSteps: Dispatch<SetStateAction<Step[]>>
}
export async function parseStepsToFileOrFolder({fileStructure, steps, setFileStructure, setSteps}:PropTypes) {
  let originalFiles = [...fileStructure]; //shallow copy -a new array named originalFiles with the inner elements pointing to same memory. The top level reference creates a new array -pointing to a different memory
    let updateHappened = false; //a flag
    const pendingSteps = steps.filter((item) => item.status === "pending");

    pendingSteps.map((step) => {
      updateHappened = true; //for each item, the flag is true
      if (step?.type === StepType.CreateFile) {
        let parsedPath = step.path?.split("/") ?? [];
        let currentFileStructure = [...originalFiles]; // shallow copy of originalFiles, pointing to a differnt memory but inner loop refering to same memory location. Cause of shallow copying -react's shallow comparison for state. React ompares teh initial state of a variable to the final value of its new top level reference. The new top level reference encapsulates the inner changes. Although the change directly happens in the state var, due to another reference, it gets shadowed and only renders when the original var is update with the new reference. The state var is not changed directly as according to react, the initial val and the changed val will be same and teh state will not be different, so teh UI will not re render.

        const finalAnswerRef = currentFileStructure; //just another reference to the currentFileStructure. Same top level reference.
        let currentFolder = "";

        while (parsedPath.length) {
          currentFolder = `${currentFolder}/${parsedPath[0]}`; // /src

          const currentFolderName = parsedPath[0]; // src
          parsedPath = parsedPath.slice(1); // [App.tsx]
          if (!parsedPath.length) {
            //false
            // final file
            const file = currentFileStructure.find(
              (x) => x.path === currentFolder
            );
            
            if (!file) {
              currentFileStructure.push({
                fileName: currentFolderName,
                type: "file",
                path: currentFolder,
                content: step.code,
              });
            } else {
              file.content = step.code;
            }
          } else {
            /// in a folder
            const folder = currentFileStructure.find(
              (x) => x.path === currentFolder // /src
            );
            if (!folder) {
              // create the folder
              currentFileStructure.push({
                folderName: currentFolderName,
                type: "folder",
                path: currentFolder,
                children: [],
              });
              currentFileStructure = currentFileStructure.find(
                (x) => x.path === currentFolder
              )!.children!;
            }
          }
          originalFiles = finalAnswerRef;
        }
      }
    });
    if (updateHappened) {
      setFileStructure(originalFiles);
      setSteps((steps) =>
        steps.map((s: Step) => {
          return {
            ...s,
            status: "completed",
          };
        })
      );
    }
}
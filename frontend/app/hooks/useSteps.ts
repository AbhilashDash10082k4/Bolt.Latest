// import { useEffect, useState } from "react";
// import { StepType, Step, FileOrFolder } from "../lib/types";

// export default function useSteps() {
//   const [fileStructure, setFileStructure] = useState<FileOrFolder[]>([]);
//   const [steps, setSteps] = useState<Step[]>([]);
//   useEffect(() => {

//     let originalFiles = [...fileStructure]; //opens up the str of files and folders
//     console.log("originalFiles ", originalFiles); //[]
//     console.log("files ", fileStructure);

//     let updateHappened = false;
    
//     steps.filter((item) => item.status === "pending").map((step) => {
//       updateHappened = true;
//       if (step?.type === StepType.CreateFile) {
//         let parsedPath = step.path?.split("/") ?? [];
//         console.log("parsedPath ", parsedPath);
//         console.log("!parsedPath.length ", !parsedPath.length);
//         console.log("originalFiles before the while loop", originalFiles);
//         console.log(
//           "originalFiles before the while loop in spread arr format",
//           [...originalFiles]
//         );
//         let currentFileStructure = [...originalFiles];
//         console.log(
//           "currentFileStructure before while loop",
//           currentFileStructure
//         );
//         const finalAnswerRef = currentFileStructure;
//         console.log("finalAnswerRef before while loop ", finalAnswerRef);

//         let currentFolder = "";

//         while (parsedPath.length) {
//           currentFolder = `${currentFolder}/${parsedPath[0]}`;
//           console.log("currentFolder inside loop ", currentFolder);

//           const currentFolderName = parsedPath[0];
//           parsedPath = parsedPath.slice(1);
//           console.log("parsedPath in while loop after slicing ", parsedPath);
//           console.log(
//             "!parsedPath.length inside while loop ",
//             !parsedPath.length
//           );
//           if (!parsedPath.length) {
//             // final file
//             const file = currentFileStructure.find(
//               (x) => x.path === currentFolder
//             );
//             console.log("file from inside !parsedPath.lenth if loop ", file);
//             if (!file) {
//               currentFileStructure.push({
//                 name: currentFolderName,
//                 type: "file",
//                 path: currentFolder,
//                 content: step.code,
//               });

//               console.log(
//                 "currentFileStructure inside the if loop after the push ",
//                 currentFileStructure
//               );
//             } else {
//               file.content = step.code;
//               console.log("file.content inside else loop", file.content);
//               console.log("step inside else loop", step);
//             }
//           } else {
//             /// in a folder
//             const folder = currentFileStructure.find(
//               (x) => x.path === currentFolder
//             );
//             console.log(
//               "folder from else loop of the !parsedPath.lenth if loop  ",
//               currentFolder
//             );
//             console.log(
//               "folder from else loop of the !parsedPath.lenth if loop  ",
//               folder
//             );
//             if (!folder) {
//               // create the folder
//               currentFileStructure.push({
//                 name: currentFolderName,
//                 type: "folder",
//                 path: currentFolder,
//                 children: [],
//               });
//               currentFileStructure = currentFileStructure.find(
//                 (x) => x.path === currentFolder
//               )!.children!;
//               console.log(
//                 "currentFileStructure inside !folder loop inside else loop of !parsedPath.lenth if loop ",
//                 currentFileStructure
//               );
//             }
//           }
//           originalFiles = finalAnswerRef;
//           console.log(
//             "originalFiles = finalAnswerRef; inside the outmost while loop",
//             originalFiles
//           );
//           console.log(
//             "originalFiles = finalAnswerRef; inside the outmost while loop",
//             finalAnswerRef
//           );
//         }
//       }
//     });
//     if (updateHappened) {
//       console.log("inside the updateHappened loop");
//       setFileStructure(originalFiles);
//       console.log("files inside the updateHappened loop", fileStructure);
//       setSteps((steps) =>
//         steps.map((s: Step) => {
//           return {
//             ...s,
//             status: "completed",
//           };
//         })
//       );
//       console.log(
//         "steps inside the useEffect inside the updateHappened loop ",
//         steps
//       );
//     }
//   }, [steps, fileStructure]);
//   return {steps, fileStructure, setFileStructure, setSteps};
// }

// // const statusAndPaths = steps.map((step) => [step.status, step.path]);
//     // console.log("statusAndPaths ", statusAndPaths); //[['pending', 'package.json'],['pending', 'postcss.config.js'],['pending', 'tailwind.config.js']]

//     // const filePaths = statusAndPaths.map((path) => path[1]?.split("/"));
//     // console.log("filePaths ", filePaths); //[['src', 'vite-env.d.ts'], ['src', 'index.css'], ['tsconfig.app.json']]
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { FileOrFolder } from "../../../lib/types";
import { WebContainer } from "@webcontainer/api";
import { createMountStructure } from "../hooks/webContainerFiles";
import { Loader } from "./Loader";
import { ErrorComp } from "./ErrorComp";
import { LoadingSteps } from "./LoadingSteps";

interface PreviewFrameProps {
  templateData: FileOrFolder[];
  serverUrl: string;
  isLoading: boolean;
  error: string | null;
  webContainerInstance: WebContainer ;
  writeFileSync: (path: string, content: string) => Promise<void>;
  forceResetup?: boolean;
}
export default function PreviewFrameee({
  templateData,
  error,
  webContainerInstance,
  isLoading,
  serverUrl,
  writeFileSync,
  forceResetup = false,
}: PreviewFrameProps) {
  const [url, setUrl] = useState<string>("");
  //different states of loading
  const [loadingState, setLoadingState] = useState({
    transforming: false,
    mounting: false,
    installing: false,
    starting: false,
    ready: false,
  });
  //to track diff steps of loading
  const [currentStep, setCurrentStep] = useState(0);
  // const totalSteps = 4; //step 'ready' is excluded
  //include transforming, mounting, installing, starting
  const [isSetupInProgress, setIsSetupInProgress] = useState(false);
  //includes the step 'ready'
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [setupError, setSetupError] = useState<string | null>(null);
  
  // Ref to access terminal methods - the terminal component will refer to this
  // const terminalRef = useRef(null);

  //reset due to any error-
  useEffect(() => {
    if (forceResetup) {
      setIsSetupComplete(false);
      setIsSetupInProgress(false);
      setUrl("");
      setCurrentStep(0);
      setLoadingState({
        transforming: false,
        mounting: false,
        installing: false,
        starting: false,
        ready: false,
      });
    }
  }, [forceResetup]);

  useEffect(() => {
    async function main() {
      // Don't run setup if it's already complete or in progress
      if (!webContainerInstance || isSetupComplete || isSetupInProgress) return;
      try {
        //progress chaluchi kintu error asini
        setIsSetupInProgress(true);
        setSetupError(null);
        try {
          //to check if package.json exists coz this is the file which will give all the deps and scripts
          const packageJsonExists = await webContainerInstance.fs.readFile(
            "package.json",
            "utf8"
          );
          if (packageJsonExists) {
            // Files are already mounted, just reconnect to existing server
            // if (terminalRef.current?.writeToTerminal) {
            //   terminalRef.current.writeToTerminal("🔄 Reconnecting to existing WebContainer session...\r\n");
            // }
            // Wait for `server-ready` event
            webContainerInstance?.on("server-ready", (port, url) => {
              // if (terminalRef.current?.writeToTerminal) {
              //   terminalRef.current.writeToTerminal(`🌐 Reconnected to server at ${url}\r\n`);
              // }
              console.log(`Server is ready on port ${port}`);
              setUrl(url);
              setLoadingState((prev) => ({
                ...prev,
                starting: false,
                ready: true,
              }));
              setIsSetupComplete(true);
              setIsSetupInProgress(false);
            });
            setCurrentStep(4);
            setLoadingState((prev) => ({ ...prev, starting: true }));
            return;
          }
        } catch (error) {
          console.error(error);
        }
        // Step 1: Transform data
        setLoadingState((prev) => ({ ...prev, transforming: true }));
        setCurrentStep(1);
        // Write to terminal
        // if (terminalRef.current?.writeToTerminal) {
        //   terminalRef.current.writeToTerminal("🔄 Transforming template data...\r\n");
        // }
        const files = createMountStructure(templateData);
        setLoadingState((prev) => ({
          ...prev,
          transforming: false,
          mounting: true,
        }));
        setCurrentStep(2);
        // Step 2: Mount files
        // if (terminalRef.current?.writeToTerminal) {
        //   terminalRef.current.writeToTerminal("📁 Mounting files to WebContainer...\r\n");
        // }
        await webContainerInstance?.mount(files);
        // if (terminalRef.current?.writeToTerminal) {
        //   terminalRef.current.writeToTerminal("✅ Files mounted successfully\r\n");
        // }
        setLoadingState((prev) => ({
          ...prev,
          mounting: false,
          installing: true,
        }));
        setCurrentStep(3);
        // Step 3: Install dependencies
        // if (terminalRef.current?.writeToTerminal) {
        //   terminalRef.current.writeToTerminal("📦 Installing dependencies...\r\n");
        // }
        const installProcess = await webContainerInstance?.spawn("npm", ["install"]);
        // Stream install output to terminal
        // installProcess.output.pipeTo(
        //   new WritableStream({
        //     write(data) {
        //       // Write directly to terminal
        //       if (terminalRef.current?.writeToTerminal) {
        //         terminalRef.current.writeToTerminal(data);
        //       }
        //     },
        //   })
        // );
        const installExitCode = await installProcess.exit;
        if (installExitCode !== 0) {
          throw new Error(`Failed to install dependencies. Exit code: ${installExitCode}`);
        }
        // if (terminalRef.current?.writeToTerminal) {
        //   terminalRef.current.writeToTerminal("✅ Dependencies installed successfully\r\n");
        // }
        setLoadingState((prev) => ({
          ...prev,
          installing: false,
          starting: true,
        }));
        setCurrentStep(4);
        // Step 4: Start the server
        // if (terminalRef.current?.writeToTerminal) {
        //   terminalRef.current.writeToTerminal("🚀 Starting development server...\r\n");
        // }
        const startProcess = await webContainerInstance.spawn("npm", ["run", "start"]);
        console.log(startProcess);
        // Listen for server ready event
        webContainerInstance?.on("server-ready", (port: number, url: string) => {
          console.log(`Server ready on port ${port} at ${url}`);
          // if (terminalRef.current?.writeToTerminal) {
          //   terminalRef.current.writeToTerminal(`🌐 Server ready at ${url}\r\n`);
          // }
          setUrl(url);
          setLoadingState((prev) => ({
            ...prev,
            starting: false,
            ready: true,
          }));
          setIsSetupComplete(true);
          setIsSetupInProgress(false);
        });
        // Handle start process output - stream to terminal
        // startProcess.output.pipeTo(
        //   new WritableStream({
        //     write(data) {
        //       if (terminalRef.current?.writeToTerminal) {
        //         terminalRef.current.writeToTerminal(data);
        //       }
        //     },
        //   })
        // );
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        // if (terminalRef.current?.writeToTerminal) {
        //   terminalRef.current.writeToTerminal(`❌ Error: ${errorMessage}\r\n`);
        // }
        setSetupError(errorMessage);
        setIsSetupInProgress(false);
        setLoadingState({
          transforming: false,
          mounting: false,
          installing: false,
          starting: false,
          ready: false,
        });
      }
    }
    main();
  }, [webContainerInstance,templateData, isSetupComplete, isSetupInProgress ]);
  if(isLoading) {
    return <Loader/>
  }
  if(error || setupError) {
    return <ErrorComp error={error} setupError={setupError}/>
  }
  return (
    <div className="h-full flex items-center justify-center text-gray-400">
      {!url ? (
       <div className="h-full flex flex-col">
          <div className="w-full max-w-md p-6 m-5 rounded-lg bg-white dark:bg-zinc-800 shadow-sm mx-auto">
            <LoadingSteps currentStep={currentStep} />
          </div>
        </div>
      ): (
        <iframe width={"100%"} height={"100%"} src={url}  title="WebContainer Preview"/>
      )}
    </div>
  );
}

/*const [webcontainer, setWebcontainer] = useState<WebContainer>();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    console.log("component mounted");
    setIsMounted(true);
  }, []);

  

  useEffect(() => {
    if (!isMounted) return;
    const runDevServer = async () => {
      if (!webcontainer) return;
      const mountFiles =  createMountStructure(files);
      if (!mountFiles) return;
      console.log("files mounted successfully", mountFiles);

      await webcontainer?.mount(mountFiles);
      console.log("Running npm install");
      const installProcess = await webcontainer?.spawn("npm", ["install"]);

      const installExitCode = await installProcess.exit;
      console.log("Ran npm install successfully");

      if (installExitCode !== 0) {
        throw new Error("Unable to run npm install");
      }
      console.log("Running npm run dev");
      await webcontainer?.spawn("npm", ["run", "dev"]);
      console.log("Ran npm run dev successfully");
      console.log("Running npm run start");

      //   await webcontainer?.spawn("npm", ["run", "start"]);
      // console.log("Ran npm run start successfully")
      webcontainer?.on("server-ready", (port, url) => {
        setUrl(url);
        console.log(port);
        console.log("url is set");
      });
    };

    runDevServer();
    console.log("website is ready");
  }, [files, webcontainer, isMounted]); */

/*// "use client";
// import React, { useEffect, useState, useRef } from "react";
// import { FileOrFolder } from "../lib/types";
// import { createMountStructure } from "../lib/webContainerFiles";
// import { WebContainer, WebContainerProcess } from "@webcontainer/api";

// interface PreviewFrameProps {
//   files: FileOrFolder[];
// }

// // Global WebContainer instance and state
// let globalWebContainer: WebContainer | null = null;
// let isBooting = false;
// let currentDevProcess: WebContainerProcess | null = null;
// let currentUrl = "";
// let serverReadyListenerAdded = false;

// export function PreviewFrame({ files }: PreviewFrameProps) {
//   const [url, setUrl] = useState("");
//   const [webcontainer, setWebcontainer] = useState<WebContainer | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isMounted, setIsMounted] = useState(false);
//   const lastFilesHash = useRef<string>("");
//   const componentId = useRef<string>(
//     `component-${Date.now()}-${Math.random()}`
//   );
//   console.log(componentId);

//   // Handle client-side mounting
//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   // Initialize WebContainer only once
//   useEffect(() => {
//     if (!isMounted) return;

//     const initWebContainer = async () => {
//       try {
//         if (globalWebContainer) {
//           setWebcontainer(globalWebContainer);
//           // If we already have a URL, use it
//           if (currentUrl) {
//             setUrl(currentUrl);
//             setIsLoading(false);
//           }
//           return;
//         }

//         if (isBooting) {
//           // Wait for existing boot process
//           const checkBoot = setInterval(() => {
//             if (globalWebContainer && !isBooting) {
//               setWebcontainer(globalWebContainer);
//               if (currentUrl) {
//                 setUrl(currentUrl);
//                 setIsLoading(false);
//               }
//               clearInterval(checkBoot);
//             }
//           }, 100);
//           return;
//         }

//         isBooting = true;
//         globalWebContainer = await WebContainer.boot();

//         // Add the server-ready listener only once, globally
//         if (!serverReadyListenerAdded) {
//           globalWebContainer.on("server-ready", (port: number, url: string) => {
//             currentUrl = url;
//             console.log(`Dev server ready on port ${port}`);
//             // Notify all component instances
//             window.dispatchEvent(
//               new CustomEvent("webcontainer-ready", {
//                 detail: { url, port },
//               })
//             );
//           });
//           serverReadyListenerAdded = true;
//         }

//         isBooting = false;
//         setWebcontainer(globalWebContainer);
//         const handleServerReady = (event: CustomEvent) => {
//           const { url } = event.detail;
//           setUrl(url);
//           setIsLoading(false);
//         };

//         window.addEventListener(
//           "webcontainer-ready",
//           handleServerReady as EventListener
//         );

//         return () => {
//           window.removeEventListener(
//             "webcontainer-ready",
//             handleServerReady as EventListener
//           );
//         };
//       } catch (err) {
//         console.error("Failed to initialize WebContainer:", err);
//         setError("Failed to initialize WebContainer");
//         isBooting = false;
//         setIsLoading(false);
//       }
//     };

//     initWebContainer();
//   }, [isMounted]);

//   // Listen for global server ready events
//   // useEffect(() => {
//   //   if (!isMounted) return;

//   //   const handleServerReady = (event: CustomEvent) => {
//   //     const { url } = event.detail;
//   //     setUrl(url);
//   //     setIsLoading(false);
//   //   };

//   //   window.addEventListener(
//   //     "webcontainer-ready",
//   //     handleServerReady as EventListener
//   //   );

//   //   return () => {
//   //     window.removeEventListener(
//   //       "webcontainer-ready",
//   //       handleServerReady as EventListener
//   //     );
//   //   };
//   // }, [isMounted]);

//   // Handle file changes and dev server
//   useEffect(() => {
//     if (!webcontainer || !files.length || !isMounted) return;

//     // Create a hash of the files to detect changes
//     // const filesHash = JSON.stringify(files);

//     // If files haven't changed, don't restart server
//     // if (filesHash === lastFilesHash.current && currentUrl) {
//     //   setUrl(currentUrl);
//     //   setIsLoading(false);
//     //   return;
//     // }

//     // lastFilesHash.current = filesHash;

//     const runDevServer = async () => {
//       try {
//         setIsLoading(true);
//         setError(null);

//         // // Reset current URL since we're restarting
//         // currentUrl = "";

//         // // Stop existing dev server if running
//         // if (currentDevProcess) {
//         //   try {
//         //     currentDevProcess.kill();
//         //   } catch (e) {
//         //     console.log("Previous process already terminated", e);
//         //   }
//         //   currentDevProcess = null;
//         // }

//         const mountFiles = createMountStructure(files);
//         console.log("mountFiles ", mountFiles);
//         if (!mountFiles) return;

//         await webcontainer.mount(mountFiles);

//         // Install dependencies
//         console.log("Installing dependencies...");
//         const installProcess = await webcontainer.spawn("npm", ["install"]);
//         const installExitCode = await installProcess.exit;

//         if (installExitCode !== 0) {
//           throw new Error("Unable to run npm install");
//         }

//         // Start dev server
//         console.log("Starting dev server...");
//         currentDevProcess = await webcontainer.spawn("npm", ["run", "dev"]);

//         // The server-ready event will be handled by the global listener
//         // which will dispatch a custom event to update all component instances
//       } catch (err) {
//         console.error("Failed to run dev server:", err);
//         setError("Failed to start development server");
//         setIsLoading(false);
//       }
//     };

//     runDevServer();
//   }, [files, webcontainer, isMounted]);

//   // Don't render anything on server side
//   if (!isMounted) {
//     return null;
//   }

//   return (
//     <div className="h-full flex items-center justify-center text-gray-400">
//       {error && (
//         <div className="text-center text-red-500">
//           <p className="mb-2">Error: {error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//           >
//             Reload Page
//           </button>
//         </div>
//       )}
//       {isLoading && !error && (
//         <div className="text-center">
//           <p className="mb-2">Loading development server...</p>
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400 mx-auto"></div>
//         </div>
//       )}
//       {url && !isLoading && !error && (
//         <iframe
//           width="100%"
//           height="100%"
//           src={url}
//           title="Preview"
//           className="border-0"
//         />
//       )}
//     </div>
//   );
// }
 */

"use client";
import React, { useEffect, useRef, useState } from "react";
import { FileOrFolder } from "../../../lib/types";
import { WebContainer } from "@webcontainer/api";
import {
  createMountStructure,
  // WebContainerFileSystem,
} from "../hooks/webContainerFiles";
import { Loader } from "./Loader";
import { ErrorComp } from "./ErrorComp";
import { LoadingSteps } from "./LoadingSteps";

interface PreviewFrameProps {
  filesFromBackend: FileOrFolder[];
  // serverUrl: string;
  isLoading: boolean;
  error: string | null;
  webContainerInstance: WebContainer | null;
  writeFileSync: (path: string, content: string) => Promise<void>;
  forceResetup?: boolean;
}
export default function PreviewFrameee({
  filesFromBackend,
  webContainerInstance,
  error,
  isLoading,
  // serverUrl,
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
  console.log(loadingState);
  //to track diff steps of loading
  const [currentStep, setCurrentStep] = useState(0);
  // const totalSteps = 4; //step 'ready' is excluded
  //include transforming, mounting, installing, starting
  const [isSetupInProgress, setIsSetupInProgress] = useState(false);
  //includes the step 'ready'
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const [setupError, setSetupError] = useState<string | null>(null);

  const hasMountedOnce = useRef(false);

  // Create a stable hash of template data to detect real changes
  // const templateHash = useMemo(() => {
  //   if (!filesFromBackend) return "";
  //   try {
  //     return JSON.stringify(Object.keys(filesFromBackend).sort());
  //   } catch {
  //     return Math.random().toString(); // Fallback for non-serializable data
  //   }
  // }, [filesFromBackend]);
  // Memoize files to prevent unnecessary re-processing
  // const processedFiles = useMemo(() => {
  //   if (!filesFromBackend || filesFromBackend.length === 0) {
  //     return null;
  //   }
  //   try {
  //     return createMountStructure(filesFromBackend);
  //   } catch (err) {
  //     console.error("Error processing files:", err);
  //     setSetupError(
  //       "Failed to process files: " +
  //         (err instanceof Error ? err.message : String(err))
  //     );
  //     return null;
  //   }
  // }, [filesFromBackend]);
  const processedFiles = createMountStructure(filesFromBackend);
  // console.log("processedFiles from outside of useEffect ",processedFiles);
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

  // console.log(loadingState);
  useEffect(() => {
    async function main() {
      // Don't run setup if it's already complete or in progress
      if (
        !webContainerInstance ||
        isSetupComplete ||
        (isSetupInProgress && hasMountedOnce.current)
      )
        return;
      hasMountedOnce.current = true;
      try {
        //progress chaluchi kintu error asini
        setIsSetupInProgress(true);
        setSetupError(null);

        //   //to check if package.json exists coz this is the file which will give all the deps and scripts
        //   const packageJsonExists = await webContainerInstance.fs.readFile(
        //     "package.json",
        //     "utf8"
        //   );
        //   if (packageJsonExists) {
        //     // Files are already mounted, just reconnect to existing server
        //     // if (terminalRef.current?.writeToTerminal) {
        //     //   terminalRef.current.writeToTerminal("🔄 Reconnecting to existing WebContainer session...\r\n");
        //     // }
        //     // Wait for `server-ready` event
        //     webContainerInstance?.on("server-ready", (port, url) => {
        //       // if (terminalRef.current?.writeToTerminal) {
        //       //   terminalRef.current.writeToTerminal(`🌐 Reconnected to server at ${url}\r\n`);
        //       // }
        //       console.log(`Server is ready on port ${port}`);
        //       setUrl(url);
        //       setLoadingState((prev) => ({
        //         ...prev,
        //         starting: false,
        //         ready: true,
        //       }));
        //       setIsSetupComplete(true);
        //       setIsSetupInProgress(false);
        //     });
        //     setCurrentStep(4);
        //     setLoadingState((prev) => ({ ...prev, starting: true }));
        //     return;
        //   }
        // } catch (error) {
        //   console.error(error);
        // }
        // Step 1: Transform data
        setLoadingState((prev) => ({ ...prev, transforming: true }));
        setCurrentStep(1);

        // hasMountedOnce.current = true;
        // console.log("files from backend inside useEffect", filesFromBackend);
        setLoadingState((prev) => ({
          ...prev,
          transforming: false,
          mounting: true,
        }));

        try {
          // console.log("processedFiles inside useEffect", processedFiles);
          await webContainerInstance?.mount(processedFiles!);
        } catch (error) {
          console.log(error);
        }
        try {
          const packageJsonExists = await webContainerInstance?.fs.readFile(
            "package.json",
            "utf8"
          );
          if (!packageJsonExists) return;
        } catch (error) {
          console.log(error);
        }
        setLoadingState((prev) => ({
          ...prev,
          mounting: false,
          installing: true,
        }));
        setCurrentStep(3);
        const hasNodeModules = await webContainerInstance?.fs
          .readdir("/node_modules")
          .catch(() => null);

        if (!hasNodeModules) {
          const installProcess = await webContainerInstance?.spawn("npm", [
            "install",
          ]);
          const timeout = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Install timed out")), 30000)
          );
          const exitCode = await Promise.race([installProcess.exit, timeout]);
          if (exitCode !== 0) {
            throw new Error(`npm install failed with exit code ${exitCode}`);
          }
        } else {
          console.log("node_modules already exists. Skipping install.");
        }
        // This will collect and log stderr output properly

        setLoadingState((prev) => ({
          ...prev,
          installing: false,
          starting: true,
        }));
        setCurrentStep(4);

        const startProcess = await webContainerInstance.spawn("npm", [
          "run",
          "dev",
        ]);

        console.log("startProcess ", startProcess);
        // Listen for server ready event
        webContainerInstance?.on(
          "server-ready",
          (port: number, url: string) => {
            console.log(`Server ready on port ${port} at ${url}`);
            setUrl(url);
            setLoadingState((prev) => ({
              ...prev,
              starting: false,
              ready: true,
            }));
            setIsSetupComplete(true);
            setIsSetupInProgress(false);
          }
        );
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);

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
  }, [
    filesFromBackend,
    isSetupComplete,
    isSetupInProgress,
    processedFiles,
    webContainerInstance,
  ]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full  min-h-screen">
        <Loader />
      </div>
    );
  }
  if (error || setupError) {
    return <ErrorComp error={error} setupError={setupError} />;
  }
  return (
    <div className="h-full w-full flex items-center justify-center text-gray-400">
      {!url ? (
        <div className="flex items-center justify-center h-full w-full">
          <div className="w-full max-w-md p-6 m-5 rounded-lg bg-white dark:bg-zinc-800 shadow-sm mx-auto">
            <LoadingSteps currentStep={currentStep} />
          </div>
        </div>
      ) : (
        <iframe
          width={"100%"}
          height={"100%"}
          src={url}
          title="WebContainer Preview"
        />
      )}
    </div>
  );
}

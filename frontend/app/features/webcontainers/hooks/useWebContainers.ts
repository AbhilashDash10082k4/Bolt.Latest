import { useCallback, useEffect, useState } from "react";
import { WebContainer } from "@webcontainer/api";
import { FileOrFolder } from "../../../lib/types";
import { getWebContainer } from "./singletonWC";


interface UseWebContainerReturn {
    serverUrl: string | null;
    isLoading: boolean;
    error: string | null;
    instance: WebContainer | null;
    writeFileSync: (path: string, content: string) => Promise<void>;
    destroy: () => void;
}
let webContainerSingleton: WebContainer | null = null;
interface PropTypes {
    fileStructure: FileOrFolder[]
}
export function useWebContainers({ fileStructure }: PropTypes): UseWebContainerReturn {
    console.log(fileStructure);
    const [instance, setInstance] = useState<WebContainer | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [serverUrl, setServerUrl] = useState<string | null>(null);
    //   const instanceRef = useRef<WebContainer | null>(null);

    useEffect(() => {
        let mounted = true;
        const initializeWebContainer = async () => {
            try {
                if (!webContainerSingleton) {
                    webContainerSingleton = await getWebContainer();
                }
                // instanceRef.current = webcontainerInstance;
                if (!mounted) return;
                setInstance(webContainerSingleton);
                setIsLoading(false);
            } catch (err) {
                console.error("Failed to initialize WebContainer:", err);
                if (mounted) {
                    setError(err instanceof Error ? err.message : "Failed to initialize WebContainer");
                    setIsLoading(false);
                }
            }
        };

        initializeWebContainer();

        return () => {
            mounted = false;
            if (webContainerSingleton) {
                webContainerSingleton.teardown();
            }
        };
    }, []);
    const writeFileSync = useCallback(async (path: string, content: string): Promise<void> => {
        if (!webContainerSingleton) {
            throw new Error('WebContainer webContainerSingleton is not available');
        }
        try {
            // Ensure the folder structure exists
            const pathParts = path.split('/');
            const folderPath = pathParts.slice(0, -1).join('/'); // Extract folder path
            if (folderPath) {
                await webContainerSingleton?.fs.mkdir(folderPath, { recursive: true }); // Create folder structure recursively
            }
            // Write the file
            await webContainerSingleton?.fs.writeFile(path, content);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to write file';
            console.error(`Failed to write file at ${path}:`, err);
            throw new Error(`Failed to write file at ${path}: ${errorMessage}`);
        }
    }, []);

    // Added destroy function
    const destroy = useCallback(() => {
        if (webContainerSingleton) {
            webContainerSingleton.teardown();
            setInstance(null);
            setServerUrl(null);
        }
    }, []);

    return { serverUrl, isLoading, error, instance, destroy,writeFileSync };
}
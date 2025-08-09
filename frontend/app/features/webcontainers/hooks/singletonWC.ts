import { WebContainer } from "@webcontainer/api";

let webContainerSingleton: WebContainer | null = null;

export async function getWebContainer(): Promise<WebContainer> {
  if (!webContainerSingleton) {
    webContainerSingleton = await WebContainer.boot();
  }
  return webContainerSingleton;
}

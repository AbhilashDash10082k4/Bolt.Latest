import { WebContainer } from "@webcontainer/api";
import { useEffect, useState } from "react";

export const useWebContainer = () => {
  const [webContainer, setWebContainer] = useState<WebContainer>();
  // Call only once
  async function main() {
    const webcontainerInstance = await WebContainer.boot();
    setWebContainer(webcontainerInstance);
  }
  useEffect(() => {
    main();
  }, []);
  return webContainer;
};
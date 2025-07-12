import { FileOrFolder } from "./types";

export async function fileParser(files: FileOrFolder[]) {
  const mountFiles = new Map();
  for (let i = 0; i < files.length; i++) {
    if (files[i].type === "file") {
      mountFiles.set(files[i].name, {
        file: { contents: files[i].content },
      });
    } else if (files[i].type === "folder") {
      const handleChildren = fileParser(files[i].children!);
      mountFiles.set(files[i].name, { directory: { ...handleChildren } });
    } else {
      console.log("F off");
    }
  }
  return Object.fromEntries(mountFiles);
} 

/*M1-
  const mountFiles = {};
  for (let i = 0; i < files.length; i++) {
    if (files[i].type === "file") {
      mountFiles[files[i].name] = {
        file: { contents: files[i].content },
      });
    } else if (files[i].type === "folder") {
      const handleChildren = fileParser(files[i].children!);
      mountFiles[files[i].name] = { directory: { handleChildren } });
    } else {
      console.log("F off");
    }
  }
  return mountFiles;

  M2-

*/
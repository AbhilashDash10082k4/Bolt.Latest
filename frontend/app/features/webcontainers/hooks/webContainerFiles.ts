 import { FileOrFolder } from "../../../lib/types";

interface WebContainerFile {
  file: {
    contents: string;
  };
}

interface WebContainerDirectory {
  directory: {
    [key: string]: WebContainerFile | WebContainerDirectory;
  };
}

type WebContainerFileSystem = Record<string, WebContainerFile | WebContainerDirectory>;
export const createMountStructure = (
  files: FileOrFolder[] 
): WebContainerFileSystem  => {
 function processItem(item: FileOrFolder): WebContainerFile | WebContainerDirectory  {
    if (item.folderName && item.children) {
      // This is a directory
      const directoryContents: WebContainerFileSystem = {};
      
      item.children?.forEach(subItem => {
        const key = subItem?.fileExtension 
          ? `${subItem.fileName}.${subItem.fileExtension}`
          : subItem.folderName!;
        directoryContents[key] = processItem(subItem);
      });

      return {
        directory: directoryContents
      };
    } else {
      // This is a file
      return {
        file: {
          contents: item.content as string
        }
      };
    }
  }
   const result: WebContainerFileSystem = {};
  
  files?.forEach(item => {
    const key = item.fileExtension 
      ? `${item.fileName}.${item.fileExtension}`
      : item.folderName!;
    result[key] = processItem(item);
  });

  return result;
};

//   const mountStructure: Record<string, any> = {};

//   const processFile = (file: FileOrFolder, isRootFolder: boolean) => {
//     if (file.type === "folder") {
//       // For folders, create a directory entry
//       mountStructure[file.name] = {
//         directory: file.children
//           ? Object.fromEntries(
//               file.children.map((child) => [
//                 child.name,
//                 processFile(child, false),
//               ])
//             )
//           : {},
//       };
//     } else if (file.type === "file") {
//       if (isRootFolder) {
//         mountStructure[file.name] = {
//           file: {
//             contents: file.content || "",
//           },
//         };
//       } else {
//         // For files, create a file entry with contents
//         return {
//           file: {
//             contents: file.content || "",
//           },
//         };
//       }
//     }

//     return mountStructure[file.name];
//   };
//   // Process each top-level file/folder
//   files.forEach((file) => processFile(file, true));

//   return mountStructure;
// };
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
  // await Promise.all(
  //   files.map(async (x: FileOrFolder) => {
  //     return x.type === "file"
  //       ? mountFiles.set(x.name, {
  //           file: {
  //             contents: x.content || "",
  //           },
  //         })
  //       : mountFiles.set(x.name, {
  //           directory: await fileParser(x.children || []),
  //         });
  //   }) ?? []
  // );

  m3-
  const mountFiles = new Map();
  //M3
  const isRootFile = false;
  for (const x of files) {
    if (x.type === "file") {
      if (!isRootFile) {
        mountFiles.set(x.name, {
          file: { contents: x.content || "" },
        });
      } else {
        return {
          file: {
            content: x.content || "",
          },
        };
      }
    } else if (x.type === "folder") {
      mountFiles.set(x.name, {
        directory: x.children
          ? await fileParser(x.children)
          : {},
      });
    }
  }
  return Object.fromEntries(mountFiles);

  M4-
const mountStructure: Record<string, any> = {};
  
      const processFile = (file: FileOrFolder, isRootFolder: boolean) => {  
        if (file.type === 'folder') {
          // For folders, create a directory entry
          mountStructure[file.name] = {
            directory: file.children ? 
              Object.fromEntries(
                file.children.map(child => [child.name, processFile(child, false)])
              ) 
              : {}
          };
        } else if (file.type === 'file') {
          if (isRootFolder) {
            mountStructure[file.name] = {
              file: {
                contents: file.content || ''
              }
            };
          } else {
            // For files, create a file entry with contents
            return {
              file: {
                contents: file.content || ''
              }
            };
          }
        } 
  
        return mountStructure[file.name];
      };
  
      // Process each top-level file/folder
      files.forEach(file => processFile(file, true));
  
      return mountStructure;

      M5-
      const createMountStructure = (
  files: FileOrFolder[]
): Record<string, any> => {
  const mountStructure: Record<string, any> = {};

  const processItem = (item: FileOrFolder): Record<string, any> => {
    if (item.type === "folder") {
      const directoryContents: Record<string, any> = {};
      if (item.children) {
        item.children.forEach((child) => {
          directoryContents[child.name] = processItem(child);
        });
      }
      return {
        directory: directoryContents,
      };
    } else { // item.type === "file"
      return {
        file: {
          contents: item.content || "",
        },
      };
    }
  };

  // Process each top-level file/folder and add to the root mountStructure
  files.forEach((file) => {
    mountStructure[file.name] = processItem(file);
  });

  return mountStructure;
};
*/

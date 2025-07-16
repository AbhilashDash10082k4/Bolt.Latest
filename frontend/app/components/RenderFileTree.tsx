"use client";
import {
  ChevronDown,
  ChevronRight,
  FolderOpen,
  Folder,
  FileCode,
  FileText,
} from "lucide-react";
import { FileOrFolder } from "../lib/types";
import { Dispatch, SetStateAction, useState } from "react";
import CodeEditor from "./CodeEditor";

interface PropTypes {
  fileStructure: FileOrFolder[];
  setFileStructure: Dispatch<SetStateAction<FileOrFolder[]>>;
}

export function RenderFileTree({
  fileStructure,
  setFileStructure,
}: PropTypes) {
  const [selectedFileName, setSelectedFileName] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const toggleFolder = (path: string[]) => {
    const updateFolder = (
      items: FileOrFolder[],
      currentPath: string[]
    ): FileOrFolder[] => {
      return items.map((item) => {
        if (item.type === "folder") {
          if (currentPath.length === 1 && currentPath[0] === item.name) {
            // This is the folder we want to toggle
            return { ...item, isOpen: !item.isOpen };
          } else if (
            currentPath.length > 1 &&
            currentPath[0] === item.name &&
            item.children
          ) {
            // We need to go deeper into the folder structure
            return {
              ...item,
              children: updateFolder(item.children, currentPath.slice(1)),
            };
          }
        }
        return item;
      });
    };

    setFileStructure((prevStructure) => updateFolder(prevStructure, path));
  };

  const selectFile = (fileName: string, content: string) => {
    setSelectedFile(content);
    setSelectedFileName(fileName);
  };

  const renderFileTree = (
    items: FileOrFolder[],
    depth: number = 0,
    parentPath: string[] = []
  ) => {
    return items.map((item, index) => {
      const currentPath = [...parentPath, item.name];
      const indentLevel = depth * 16; // 16px per level

      return (
        <div key={`${item.name}-${index}`} className="select-none">
          {item.type === "folder" ? (
            <div>
              <button
                onClick={() => toggleFolder(currentPath)}
                className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded w-full text-left text-sm group transition-colors"
                style={{ paddingLeft: `${8 + indentLevel}px` }}
              >
                {item.isOpen ? (
                  <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-300 flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-300 flex-shrink-0" />
                )}
                {item.isOpen ? (
                  <FolderOpen className="w-4 h-4 text-blue-400 flex-shrink-0" />
                ) : (
                  <Folder className="w-4 h-4 text-blue-400 flex-shrink-0" />
                )}
                <span className="text-gray-200 group-hover:text-white truncate">
                  {item.name}
                </span>
              </button>
              {item.isOpen && item.children && (
                <div>
                  {renderFileTree(item.children, depth + 1, currentPath)}
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => selectFile(item.name, item.content || "")}
              className={`flex items-center gap-2 p-2 hover:bg-gray-700 rounded w-full text-left text-sm transition-colors ${
                selectedFileName === item.name
                  ? "bg-gray-700 text-white"
                  : "text-gray-300"
              }`}
              style={{ paddingLeft: `${32 + indentLevel}px` }}
            >
              {item.name.endsWith(".tsx") || item.name.endsWith(".ts") ? (
                <FileCode className="w-4 h-4 text-blue-400 flex-shrink-0" />
              ) : item.name.endsWith(".json") ? (
                <FileText className="w-4 h-4 text-yellow-400 flex-shrink-0" />
              ) : item.name.endsWith(".md") ? (
                <FileText className="w-4 h-4 text-green-400 flex-shrink-0" />
              ) : item.name.endsWith(".css") ? (
                <FileText className="w-4 h-4 text-pink-400 flex-shrink-0" />
              ) : item.name.endsWith(".html") ? (
                <FileText className="w-4 h-4 text-orange-400 flex-shrink-0" />
              ) : (
                <FileText className="w-4 h-4 text-gray-400 flex-shrink-0" />
              )}
              <span className="truncate">{item.name}</span>
            </button>
          )}
        </div>
      );
    });
  };
  return (
    <div className="text-sm leading-relaxed grid grid-cols-5 border-[1px] border-zinc-700 overflow-hidden">
      <div className=" bg-zinc-900 border-[1px] border-zinc-700  flex flex-col col-span-1">
        <div className=" border-b border-zinc-700 p-3 flex-shrink-0">
          <span>Files</span>
        </div>
        <div className="flex-1 overflow-y-auto">
          {/* <div className="p-2">
                            {renderFileTree(fileStructure)}
                          </div> */}
          {renderFileTree(fileStructure)}
        </div>
      </div>
      <div className="col-span-4 border-[1px] border-zinc-700 w-full h-full">
        <CodeEditor
          content={selectedFile || "// Select a file from the explorer"}
        />
      </div>
    </div>
  );
}

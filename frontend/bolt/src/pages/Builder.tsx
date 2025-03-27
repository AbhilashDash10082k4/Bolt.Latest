// import React from 'react'
// import FollowUpPrompt from '../components/FollowUpPrompt';

// const Builder = () => {
//   return (
//     <div className='bg-gray-800 h-fit w-dvw pl-4'>
//     <div className="w-[275px] h-screen bg-black text-white">User prompt</div>
//       <div className='bottom-0 left-0  fixed z-10 p-4'><FollowUpPrompt/></div>
//     </div>
//   )
// }
// export default Builder;

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Code2,
  Play,
  Folder,
  ChevronDown,
  ChevronRight,
  FileCode,
  FileText,
} from "lucide-react";

interface FileOrFolder {
  name: string;
  type: "file" | "folder";
  content?: string;
  children?: FileOrFolder[];
  isOpen?: boolean;
}

export default function Builder() {
  const location = useLocation();
  const { prompt } = location.state || {};
  const [activeTab, setActiveTab] = useState<"code" | "preview">("code");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileStructure, setFileStructure] = useState<FileOrFolder[]>([
    {
      name: "src",
      type: "folder",
      isOpen: true,
      children: [
        {
          name: "components",
          type: "folder",
          isOpen: true,
          children: [
            {
              name: "Header.tsx",
              type: "file",
              content: "export function Header() { /* ... */ }",
            },
            {
              name: "Footer.tsx",
              type: "file",
              content: "export function Footer() { /* ... */ }",
            },
          ],
        },
        {
          name: "pages",
          type: "folder",
          isOpen: false,
          children: [
            {
              name: "Home.tsx",
              type: "file",
              content: "export default function Home() { /* ... */ }",
            },
            {
              name: "About.tsx",
              type: "file",
              content: "export default function About() { /* ... */ }",
            },
          ],
        },
        {
          name: "App.tsx",
          type: "file",
          content: "function App() { return <div>App</div> }",
        },
        {
          name: "main.tsx",
          type: "file",
          content:
            'import React from "react";\nimport ReactDOM from "react-dom";',
        },
      ],
    },
    {
      name: "public",
      type: "folder",
      isOpen: true,
      children: [
        {
          name: "index.html",
          type: "file",
          content:
            '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n  </head>\n</html>',
        },
        { name: "style.css", type: "file", content: "/* Global styles */" },
      ],
    },
  ]);

  const steps = [
    "Analyzing requirements",
    "Setting up project structure",
    "Creating components",
    "Implementing styles",
    "Adding functionality",
  ];

  const toggleFolder = (path: string[]) => {
    setFileStructure((prevStructure) => {
      const newStructure = [...prevStructure];
      console.log("newStructure: ", newStructure);

      let current = newStructure;
      let target;

      for (const segment of path) {
        target = current.find((item) => item.name === segment);
        if (target?.type === "folder" && target.children) {
          target.isOpen = true;
          current = target.children;
        }
      }

      return newStructure;
    });
  };

  const renderFileTree = (items: FileOrFolder[], path: string[] = []) => {
    return items.map((item) => (
      <div key={item.name} className="ml-4 first:ml-0">
        {item.type === "folder" ? (
          <div>
            <button
              onClick={() => toggleFolder([...path, item.name])}
              className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded w-full text-left text-sm group"
            >
              {item.isOpen ? (
                <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-300" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-300" />
              )}
              <Folder className="w-4 h-4 text-blue-400" />
              {item.name}
            </button>
            {item.isOpen && item.children && (
              <div className="ml-4">
                {renderFileTree(item.children, [...path, item.name])}
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setSelectedFile(item.content || null)}
            className={`flex items-center gap-2 p-2 hover:bg-gray-700 rounded w-full text-left text-sm ${
              selectedFile === item.content ? "bg-gray-700" : ""
            }`}
          >
            <span className="w-4" /> {/* Spacing for alignment */}
            {item.name.endsWith(".tsx") || item.name.endsWith(".ts") ? (
              <FileCode className="w-4 h-4 text-blue-400" />
            ) : (
              <FileText className="w-4 h-4 text-gray-400" />
            )}
            {item.name}
          </button>
        )}
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      {/* Steps Sidebar */}
      <div className="w-64 bg-gray-800 p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-4">Build Steps</h2>
        <div className="space-y-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2 rounded bg-gray-700/50"
            >
              <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-sm">
                {index + 1}
              </div>
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Prompt Display */}
        <div className="bg-gray-800 p-4">
          <h3 className="text-sm font-medium text-gray-400">Your Prompt</h3>
          <p className="mt-1">{prompt}</p>
        </div>

        {/* File Explorer and Preview */}
        <div className="flex-1 flex">
          {/* File Explorer */}
          <div className="w-64 bg-gray-800 border-r border-gray-700">
            <div className="p-4">
              <h3 className="flex items-center gap-2 font-medium mb-4">
                <Folder className="w-4 h-4" />
                Files
              </h3>
              <div className="space-y-1">{renderFileTree(fileStructure)}</div>
            </div>
          </div>

          {/* Code/Preview Area */}
          <div className="flex-1 flex flex-col">
            <div className="border-b border-gray-700 px-4">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab("code")}
                  className={`flex items-center gap-2 py-4 border-b-2 ${
                    activeTab === "code"
                      ? "border-purple-500 text-purple-500"
                      : "border-transparent text-gray-400"
                  }`}
                >
                  <Code2 className="w-4 h-4" />
                  Code
                </button>
                <button
                  onClick={() => setActiveTab("preview")}
                  className={`flex items-center gap-2 py-4 border-b-2 ${
                    activeTab === "preview"
                      ? "border-purple-500 text-purple-500"
                      : "border-transparent text-gray-400"
                  }`}
                >
                  <Play className="w-4 h-4" />
                  Preview
                </button>
              </div>
            </div>
            <div className="flex-1 p-4">
              {activeTab === "code" ? (
                <pre className="bg-gray-800 p-4 rounded">
                  <code>
                    {selectedFile || "Select a file to view its contents"}
                  </code>
                </pre>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-400">Preview will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

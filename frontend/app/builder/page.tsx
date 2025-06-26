"use client";

import { useEffect, useState } from "react";
// import CodeEditor from "../components/CodeEditor";
import {
  Code2,
  Play,
  Folder,
  ChevronDown,
  ChevronRight,
  FileCode,
  FileText,
} from "lucide-react";
import { parseXml } from "../lib/parser";
// import { FormContext } from "../context/FormProvider";
import { Step } from "../lib/types";
import { useSearchParams } from "next/navigation";
import axios from "axios";

interface FileOrFolder {
  name: string;
  type: "file" | "folder";
  content?: string;
  children?: FileOrFolder[];
  isOpen?: boolean;
}

export default function Builder() {
  const [activeTab, setActiveTab] = useState<"code" | "preview">("code");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileStructure, setFileStructure] = useState<FileOrFolder[]>([]);
  const [steps, setSteps] = useState<Step[]>([]);
  const searchParams = useSearchParams();
  const promptQuery = searchParams.get("prompt");

  useEffect(() => {
    if (!promptQuery?.trim()) return;
    async function backendCall() {
      const response = await axios.post("/api/template", {
        prompt: promptQuery,
      });
      const { uiPrompt } = response.data;
      const parsedResponse = parseXml(uiPrompt[0]);
      setSteps(parsedResponse);
    }
    backendCall()
  }, [promptQuery]);

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
            <span className="w-3" /> {/* Spacing for alignment */}
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
        <h2 className="text-xl font-bold mb-4">Steps</h2>
        <div className="space-y-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-2 rounded-md bg-gray-900/50"
            >
              <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-sm">
                {index + 1}
              </div>
              <span>{step.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Prompt Display */}
        <div className="bg-gray-800 p-4">
          {/* <h3 className="text-sm font-medium text-gray-400">Your Prompt</h3> */}
          {/* <p className="mt-1">HI</p> */}
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
                  {/*<CodeEditor/> */}
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

// const content = parseXml(
//   `<boltArtifact id=\"project-import\" title=\"Project Files\"><boltAction type=\"file\" filePath=\"eslint.config.js\">import js from '@eslint/js';\nimport globals from 'globals';\nimport reactHooks from 'eslint-plugin-react-hooks';\nimport reactRefresh from 'eslint-plugin-react-refresh';\nimport tseslint from 'typescript-eslint';\n\nexport default tseslint.config(\n  { ignores: ['dist'] },\n  {\n    extends: [js.configs.recommended, ...tseslint.configs.recommended],\n    files: ['**/*.{ts,tsx}'],\n    languageOptions: {\n      ecmaVersion: 2020,\n      globals: globals.browser,\n    },\n    plugins: {\n      'react-hooks': reactHooks,\n      'react-refresh': reactRefresh,\n    },\n    rules: {\n      ...reactHooks.configs.recommended.rules,\n      'react-refresh/only-export-components': [\n        'warn',\n        { allowConstantExport: true },\n      ],\n    },\n  }\n);\n</boltAction><boltAction type=\"file\" filePath=\"index.html\"><!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <link rel=\"icon\" type=\"image/svg+xml\" href=\"/vite.svg\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Vite + React + TS</title>\n  </head>\n  <body>\n    <div id=\"root\"></div>\n    <script type=\"module\" src=\"/src/main.tsx\"></script>\n  </body>\n</html>\n</boltAction><boltAction type=\"file\" filePath=\"package.json\">{\n  \"name\": \"vite-react-typescript-starter\",\n  \"private\": true,\n  \"version\": \"0.0.0\",\n  \"type\": \"module\",\n  \"scripts\": {\n    \"dev\": \"vite\",\n    \"build\": \"vite build\",\n    \"lint\": \"eslint .\",\n    \"preview\": \"vite preview\"\n  },\n  \"dependencies\": {\n    \"lucide-react\": \"^0.344.0\",\n    \"react\": \"^18.3.1\",\n    \"react-dom\": \"^18.3.1\"\n  },\n  \"devDependencies\": {\n    \"@eslint/js\": \"^9.9.1\",\n    \"@types/react\": \"^18.3.5\",\n    \"@types/react-dom\": \"^18.3.0\",\n    \"@vitejs/plugin-react\": \"^4.3.1\",\n    \"autoprefixer\": \"^10.4.18\",\n    \"eslint\": \"^9.9.1\",\n    \"eslint-plugin-react-hooks\": \"^5.1.0-rc.0\",\n    \"eslint-plugin-react-refresh\": \"^0.4.11\",\n    \"globals\": \"^15.9.0\",\n    \"postcss\": \"^8.4.35\",\n    \"tailwindcss\": \"^3.4.1\",\n    \"typescript\": \"^5.5.3\",\n    \"typescript-eslint\": \"^8.3.0\",\n    \"vite\": \"^5.4.2\"\n  }\n}\n</boltAction><boltAction type=\"file\" filePath=\"postcss.config.js\">export default {\n  plugins: {\n    tailwindcss: {},\n    autoprefixer: {},\n  },\n};\n</boltAction><boltAction type=\"file\" filePath=\"tailwind.config.js\">/** @type {import('tailwindcss').Config} */\nexport default {\n  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n};\n</boltAction><boltAction type=\"file\" filePath=\"tsconfig.app.json\">{\n  \"compilerOptions\": {\n    \"target\": \"ES2020\",\n    \"useDefineForClassFields\": true,\n    \"lib\": [\"ES2020\", \"DOM\", \"DOM.Iterable\"],\n    \"module\": \"ESNext\",\n    \"skipLibCheck\": true,\n\n    /* Bundler mode */\n    \"moduleResolution\": \"bundler\",\n    \"allowImportingTsExtensions\": true,\n    \"isolatedModules\": true,\n    \"moduleDetection\": \"force\",\n    \"noEmit\": true,\n    \"jsx\": \"react-jsx\",\n\n    /* Linting */\n    \"strict\": true,\n    \"noUnusedLocals\": true,\n    \"noUnusedParameters\": true,\n    \"noFallthroughCasesInSwitch\": true\n  },\n  \"include\": [\"src\"]\n}\n</boltAction><boltAction type=\"file\" filePath=\"tsconfig.json\">{\n  \"files\": [],\n  \"references\": [\n    { \"path\": \"./tsconfig.app.json\" },\n    { \"path\": \"./tsconfig.node.json\" }\n  ]\n}\n</boltAction><boltAction type=\"file\" filePath=\"tsconfig.node.json\">{\n  \"compilerOptions\": {\n    \"target\": \"ES2022\",\n    \"lib\": [\"ES2023\"],\n    \"module\": \"ESNext\",\n    \"skipLibCheck\": true,\n\n    /* Bundler mode */\n    \"moduleResolution\": \"bundler\",\n    \"allowImportingTsExtensions\": true,\n    \"isolatedModules\": true,\n    \"moduleDetection\": \"force\",\n    \"noEmit\": true,\n\n    /* Linting */\n    \"strict\": true,\n    \"noUnusedLocals\": true,\n    \"noUnusedParameters\": true,\n    \"noFallthroughCasesInSwitch\": true\n  },\n  \"include\": [\"vite.config.ts\"]\n}\n</boltAction><boltAction type=\"file\" filePath=\"vite.config.ts\">import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\n\n// https://vitejs.dev/config/\nexport default defineConfig({\n  plugins: [react()],\n  optimizeDeps: {\n    exclude: ['lucide-react'],\n  },\n});\n</boltAction><boltAction type=\"file\" filePath=\"src/App.tsx\">import React from 'react';\n\nfunction App() {\n  return (\n    <div className=\"min-h-screen bg-gray-100 flex items-center justify-center\">\n      <p>Start prompting (or editing) to see magic happen :)</p>\n    </div>\n  );\n}\n\nexport default App;\n</boltAction><boltAction type=\"file\" filePath=\"src/index.css\">@tailwind base;\n@tailwind components;\n@tailwind utilities;\n</boltAction><boltAction type=\"file\" filePath=\"src/main.tsx\">import { StrictMode } from 'react';\nimport { createRoot } from 'react-dom/client';\nimport App from './App.tsx';\nimport './index.css';\n\ncreateRoot(document.getElementById('root')!).render(\n  <StrictMode>\n    <App />\n  </StrictMode>\n);\n</boltAction><boltAction type=\"file\" filePath=\"src/vite-env.d.ts\">/// <reference types=\"vite/client\" />\n</boltAction></boltArtifact>`
// ).then((x) => console.log(x));

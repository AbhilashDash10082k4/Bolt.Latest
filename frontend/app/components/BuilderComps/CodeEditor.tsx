import { Editor, useMonaco } from "@monaco-editor/react";
import React, { useEffect, useRef } from "react";
import { editor } from 'monaco-editor';

type ContentProps = {
  content: string
}

function CodeEditor({content}: ContentProps) {
  //to store the code
  const monaco = useMonaco();

  useEffect(() => {
    if (monaco) {
      // Disable TypeScript/JavaScript validation
      monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: true,
      });
      monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: true,
        noSyntaxValidation: true,
      });
    }
  }, [monaco]);
  //focusing on the editor when it mounts
  const editorRef = useRef<editor.IStandaloneCodeEditor>(null);

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
    editor.focus();
  }
  return (
    <div className="w-full h-dvh flex justify-end items-center">
      <Editor
        defaultLanguage="typescript"
        height="100%"
        width="100%"
        theme="vs-dark"
        className="rounded-2xl"
        value={content as string}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: true,
          fontSize: 14,
        }}
      />
    </div>
  );
}

export default CodeEditor;

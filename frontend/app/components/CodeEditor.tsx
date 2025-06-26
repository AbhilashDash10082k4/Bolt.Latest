import { Editor } from "@monaco-editor/react";
import React, { useRef, useState } from "react";
import { editor } from 'monaco-editor';


function CodeEditor(content: string) {
  //to store the code
  const [value, setValue] = useState<string>(content);
  //focusing on the editor when it mounts
  const editorRef = useRef<editor.IStandaloneCodeEditor>(null);

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
    editor.focus();
  }
  return (
    <div className="w-full min-h-screen flex justify-end items-center">
      <Editor
        defaultLanguage="typescript"
        defaultValue=""
        height="100vh"
        width="100%"
        theme="vs-dark"
        className="rounded-2xl"
        value={value}
        onChange={(content) =>setValue(content!) }
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
        }}
      />
    </div>
  );
}

export default CodeEditor;

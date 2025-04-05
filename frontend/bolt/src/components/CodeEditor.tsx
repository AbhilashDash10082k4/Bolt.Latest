import { Editor } from "@monaco-editor/react";
import React, { useRef, useState } from "react";

function CodeEditor() {
  //to store the code
  const [value, setValue] = useState("");
  //focusing on the editor when it mounts
  const editorRef = useRef("");

  function handleEditorDidMount(editor) {
    editorRef.current = editor;
    editor.focus();
  }
  return (
    <>
      <Editor
        defaultLanguage="typescript"
        defaultValue="//code likh"
        height="100%"
        theme="vs-dark"
        className="rounded-2xl"
        value={value}
        onChange={(value) => setValue(value)}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          fontSize: 14,
        }}
      />
    </>
  );
}

export default CodeEditor;

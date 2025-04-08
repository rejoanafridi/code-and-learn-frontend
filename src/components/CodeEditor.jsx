import MonacoEditor from "@monaco-editor/react";

function CodeEditor({ code, onChange }) {
    return (
        <MonacoEditor
            height="400px"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={code}
            onChange={onChange}
            options={{
                minimap: { enabled: false },
                fontSize: 16,
                scrollBeyondLastLine: false,
            }}
        />
    );
}

export default CodeEditor;
import { useState } from "react";
import CodeEditor from "./components/CodeEditor";
import Output from "./components/Output";

function App() {
  const [code, setCode] = useState("// Write your code here\nconsole.log('Hello World');");
  const [output, setOutput] = useState("");

  const runCode = () => {
    try {
      // Capture console.log output
      const logs = [];
      const originalLog = console.log;
      console.log = (...args) => {
        logs.push(args.join(" "));
      };

      // Evaluate the code
      const result = eval(code);

      // Restore console.log
      console.log = originalLog;

      // Combine logs and result
      setOutput([...logs, result].filter(Boolean).join("\n"));
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Code & Learn</h1>
      <CodeEditor code={code} onChange={setCode} />
      <button
        onClick={runCode}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Run Code
      </button>
      <Output output={output} />
    </div>
  );
}

export default App;
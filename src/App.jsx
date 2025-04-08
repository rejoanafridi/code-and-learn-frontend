import { useState, useEffect } from "react";
import CodeEditor from "./components/CodeEditor";
import Output from "./components/Output";
import Sidebar from "./components/Sidebar";
import TutorialContent from "./components/TutorialContent";

function App() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [tutorials, setTutorials] = useState([]);
  const [selectedTutorial, setSelectedTutorial] = useState(null);

  // Fetch tutorials on mount
  useEffect(() => {
    fetch("http://localhost:5000/api/tutorials")
      .then((res) => res.json())
      .then((data) => setTutorials(data))
      .catch((err) => console.error("Failed to fetch tutorials:", err));
  }, []);

  // Fetch selected tutorial
  const handleSelectTutorial = (id) => {
    fetch(`http://localhost:5000/api/tutorials/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedTutorial(data);
        setCode(data.sampleCode);
        setOutput(""); // Clear output when switching
      })
      .catch((err) => console.error("Failed to fetch tutorial:", err));
  };

  const runCode = () => {
    try {
      const logs = [];
      const originalLog = console.log;
      console.log = (...args) => logs.push(args.join(" "));
      const result = eval(code);
      console.log = originalLog;
      setOutput([...logs, result].filter(Boolean).join("\n"));
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar tutorials={tutorials} onSelectTutorial={handleSelectTutorial} />
      <div className="flex-1 p-4">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Code & Learn</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <CodeEditor code={code} onChange={setCode} />
            <button
              onClick={runCode}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Run Code
            </button>
            <Output output={output} />
          </div>
          <div>
            {selectedTutorial ? (
              <TutorialContent content={selectedTutorial.content} />
            ) : (
              <p className="text-gray-500">Select a tutorial to start.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
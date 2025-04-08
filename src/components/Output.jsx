function Output({ output }) {
    return (
        <div className="mt-4 p-4 bg-gray-800 text-white rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Output:</h2>
            <pre>{output || "Run your code to see the output."}</pre>
        </div>
    );
}

export default Output;
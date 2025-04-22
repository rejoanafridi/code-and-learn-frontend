import React, { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { bulkUploadTutorials } from '../lib/api';
import { toast } from 'react-hot-toast';

const BulkTutorialUpload = ({ onSuccess }) => {
    const { token } = useAuthContext();
    const [jsonInput, setJsonInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [previewData, setPreviewData] = useState(null);

    const handleJsonChange = (e) => {
        const input = e.target.value;
        setJsonInput(input);

        // Clear previous preview and errors
        setPreviewData(null);
        setError(null);

        // Try to parse JSON if not empty
        if (input.trim()) {
            try {
                const parsed = JSON.parse(input);
                if (Array.isArray(parsed)) {
                    setPreviewData(parsed);
                } else {
                    setPreviewData([parsed]); // If single object, convert to array
                }
            } catch (_) {
                // Invalid JSON, don't show error yet until they submit
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!jsonInput.trim()) {
            setError('Please enter tutorial data in JSON format');
            return;
        }

        let tutorials;
        try {
            const parsed = JSON.parse(jsonInput);
            tutorials = Array.isArray(parsed) ? parsed : [parsed];

            // Validate format
            for (const tutorial of tutorials) {
                if (!tutorial.title || !tutorial.content) {
                    setError('Each tutorial must have a title and content');
                    return;
                }
            }
        } catch (_) {
            setError('Invalid JSON format');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const result = await bulkUploadTutorials(tutorials, token);

            // Reset form
            setJsonInput('');
            setPreviewData(null);

            // Show success message
            toast.success(`Successfully uploaded ${result.tutorials.length} tutorials!`);

            // Call success callback if provided
            if (onSuccess) {
                onSuccess(result);
            }
        } catch (err) {
            setError(err.message || 'Failed to upload tutorials');
            toast.error('Failed to upload tutorials');
        } finally {
            setLoading(false);
        }
    };

    const handleSampleClick = () => {
        const sampleTutorials = [
            {
                title: "Introduction to JavaScript",
                content: "# Introduction to JavaScript\n\nJavaScript is a programming language used to create interactive effects within web browsers.",
                sampleCode: "// Hello World\nconsole.log('Hello, World!');"
            },
            {
                title: "Variables in JavaScript",
                content: "# Variables in JavaScript\n\nLearn about var, let, and const in JavaScript.",
                sampleCode: "let name = 'John';\nconst age = 30;\nconsole.log(`${name} is ${age} years old`);"
            }
        ];

        setJsonInput(JSON.stringify(sampleTutorials, null, 2));
        setPreviewData(sampleTutorials);
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Bulk Upload Tutorials</h2>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <label htmlFor="jsonInput" className="block text-gray-700 font-medium">
                            Tutorial Data (JSON)
                        </label>
                        <button
                            type="button"
                            onClick={handleSampleClick}
                            className="text-blue-600 text-sm hover:underline"
                        >
                            Load Sample
                        </button>
                    </div>
                    <textarea
                        id="jsonInput"
                        value={jsonInput}
                        onChange={handleJsonChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                        rows={12}
                        placeholder='[
  {
    "title": "Tutorial Title",
    "content": "Tutorial content in markdown",
    "sampleCode": "// Optional sample code"
  }
]'
                        required
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        Enter an array of tutorial objects in JSON format.
                    </p>
                </div>

                {previewData && (
                    <div className="mb-4">
                        <h3 className="text-md font-medium mb-2">Preview ({previewData.length} tutorials)</h3>
                        <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-md p-3 bg-gray-50">
                            <ul className="list-disc pl-5">
                                {previewData.map((tutorial, index) => (
                                    <li key={index} className="mb-1">
                                        <span className="font-medium">{tutorial.title}</span>
                                        {tutorial.content && (
                                            <span className="text-gray-500 text-sm ml-2">
                                                ({tutorial.content.length} chars)
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 px-4 rounded-md text-white font-medium ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                        } transition-colors`}
                >
                    {loading ? 'Uploading...' : 'Upload Tutorials'}
                </button>
            </form>
        </div>
    );
};

export default BulkTutorialUpload; 
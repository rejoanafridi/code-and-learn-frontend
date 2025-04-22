import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { createTutorial } from '../lib/api';
import { toast } from 'react-hot-toast';

const TutorialForm = ({ onSuccess }) => {
    const { token } = useAuthContext();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [sampleCode, setSampleCode] = useState('// Sample code');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            setError('Title and content are required');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const tutorialData = {
                title: title.trim(),
                content: content.trim(),
                sampleCode
            };

            const result = await createTutorial(tutorialData, token);

            // Reset form
            setTitle('');
            setContent('');
            setSampleCode('// Sample code');

            // Show success message
            toast.success('Tutorial created successfully!');

            // Call success callback if provided
            if (onSuccess) {
                onSuccess(result);
            }
        } catch (err) {
            setError(err.message || 'Failed to create tutorial');
            toast.error('Failed to create tutorial');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Create New Tutorial</h2>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter tutorial title"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="content" className="block text-gray-700 font-medium mb-2">
                        Content (Markdown)
                    </label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={8}
                        placeholder="Enter tutorial content in markdown format"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="sampleCode" className="block text-gray-700 font-medium mb-2">
                        Sample Code
                    </label>
                    <textarea
                        id="sampleCode"
                        value={sampleCode}
                        onChange={(e) => setSampleCode(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                        rows={5}
                        placeholder="// Enter sample code"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 px-4 rounded-md text-white font-medium ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                        } transition-colors`}
                >
                    {loading ? 'Creating...' : 'Create Tutorial'}
                </button>
            </form>
        </div>
    );
};

export default TutorialForm; 
import { useState } from 'react';
import TutorialFormHook from './forms/TutorialFormHook';
import BulkTutorialFormHook from './forms/BulkTutorialFormHook';
import { useAuthContext } from '../context/AuthContext';

// Set this to false to bypass admin check during development
const REQUIRE_ADMIN = false;

const TutorialUploadManager = ({ onSuccess }) => {
    const [activeTab, setActiveTab] = useState('single'); // 'single' or 'bulk'
    const { user } = useAuthContext();

    // Check if user has admin role
    const isAdmin = user && (user.role === 'admin' || !REQUIRE_ADMIN);

    if (isAdmin) {
        return (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg shadow-sm">
                <h3 className="font-medium text-lg mb-2">Permission Required</h3>
                <p>You need admin privileges to upload tutorials.</p>
            </div>
        );
    }

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleUploadSuccess = (result) => {
        // Call parent success handler if provided
        if (onSuccess) {
            onSuccess(result);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">Tutorial Upload</h1>
                <p className="text-gray-600">Create new tutorials for the platform</p>
                {!REQUIRE_ADMIN && (
                    <div className="mt-2 text-xs bg-yellow-50 p-2 rounded border border-yellow-200">
                        Admin check is disabled for development
                    </div>
                )}
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Tab Navigation */}
                <div className="flex border-b border-gray-200">
                    <button
                        className={`px-6 py-3 font-medium text-sm ${activeTab === 'single'
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-600 hover:text-gray-800'
                            }`}
                        onClick={() => handleTabChange('single')}
                    >
                        Single Tutorial
                    </button>
                    <button
                        className={`px-6 py-3 font-medium text-sm ${activeTab === 'bulk'
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-600 hover:text-gray-800'
                            }`}
                        onClick={() => handleTabChange('bulk')}
                    >
                        Bulk Upload
                    </button>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                    {activeTab === 'single' ? (
                        <TutorialFormHook onSuccess={handleUploadSuccess} />
                    ) : (
                        <BulkTutorialFormHook onSuccess={handleUploadSuccess} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default TutorialUploadManager; 
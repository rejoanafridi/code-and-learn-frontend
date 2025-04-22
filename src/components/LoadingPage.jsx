import React from 'react';

const LoadingPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4"></div>
                <p className="text-lg text-gray-700">Loading...</p>
            </div>
        </div>
    );
};

export default LoadingPage; 
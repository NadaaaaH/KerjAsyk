import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white shadow-lg rounded-xl">
                <h1 className="text-3xl font-bold text-indigo-600 mb-4">
                    Laravel + React
                </h1>
                <p className="text-gray-600">
                    Your Vite + React setup is running successfully!
                </p>
            </div>
        </div>
    );
}

// Find the root element in the DOM
const container = document.getElementById('app');

if (container) {
    // Render the React component inside the root element
    const root = createRoot(container);
    root.render(<App />);
}

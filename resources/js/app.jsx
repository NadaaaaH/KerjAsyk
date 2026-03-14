import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import Landing from './components/Landing';

// Find the root element in the DOM
const container = document.getElementById('app');

if (container) {
    // Render the React component inside the root element
    const root = createRoot(container);
    root.render(
        <BrowserRouter>
            <Landing />
        </BrowserRouter>
    );
}

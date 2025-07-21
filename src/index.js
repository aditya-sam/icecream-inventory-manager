import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// This is the entry point of the React application.
// It renders the App component into the root element of the HTML document.
const root = createRoot(document.getElementById('root'));
root.render(<App />);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. This comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

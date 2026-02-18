import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// Import Bootstrap CSS (assuming installed via npm as per package.json)
import 'bootstrap/dist/css/bootstrap.min.css';
import 'katex/dist/katex.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)

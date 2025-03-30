
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const container = document.getElementById('root');
const root = createRoot(container!);

// Directly render the main application without the initial loading spinner
root.render(<App />);

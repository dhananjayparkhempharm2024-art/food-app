import ReactDom from 'react-dom/client';
import App from './App';
import AuthContext from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

let root = ReactDom.createRoot(document.getElementById('root'));
// console.log('main')
root.render(<AuthContext>
    <App />
    <Toaster />
</AuthContext>);
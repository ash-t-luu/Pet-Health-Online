import React from 'react';
import { createRoot } from 'react-dom/client';
// import { Provider } from 'react-redux';
import App from './components/App.jsx';
// import store from './store';
import './scss/App.scss';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    // <Provider store={store}>
    <React.StrictMode>
        <App />
    </React.StrictMode>
    // </Provider>
);

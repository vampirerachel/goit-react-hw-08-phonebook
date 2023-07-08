import React from 'react';
import { Provider } from 'react-redux';
import { store } from './components/redux/store';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './components/App';

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/goit-react-hw-08-phonebook">
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

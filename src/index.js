import React from 'react';
import { Provider } from 'react-redux';
import  store,{persistor } from 'components/redux/store';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import { PersistGate } from 'redux-persist/integration/react';

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/goit-react-hw-08-phonebook">
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

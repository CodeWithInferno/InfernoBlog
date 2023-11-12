import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './Components/Auth/AuthContext';
import { LoadingProvider } from './Components/LoadingContext';

ReactDOM.render(
  <React.StrictMode>
    <LoadingProvider>    
      <AuthProvider>
      <App />
    </AuthProvider>
    </LoadingProvider>

  </React.StrictMode>,
  document.getElementById('root')
);

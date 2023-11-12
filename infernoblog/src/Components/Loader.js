// Loader.js

import React from 'react';
import AtomicSpinner from 'atomic-spinner';

const Loader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <AtomicSpinner size="50" color="#007bff" />
    </div>
  );
};

export default Loader;

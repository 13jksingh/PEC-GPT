import React from 'react';
import { CircularProgress } from '@mui/material';

const loadingStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
};

const LoadingPage = () => {
  return (
    <div style={loadingStyles}>
      <CircularProgress />
      <p>Loading...</p>
    </div>
  );
};

export default LoadingPage;
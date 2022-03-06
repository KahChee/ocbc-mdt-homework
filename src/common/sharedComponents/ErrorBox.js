import React from 'react';
import './style.css';

const ErrorBox = ({ hasError, children }) => {
  return (
    <div className={`info-box error ${hasError ? 'show' : ''}`}>
      { children }
    </div>
  )
}

export default ErrorBox
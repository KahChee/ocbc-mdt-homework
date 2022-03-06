import React from 'react';
import './style.css';

const SuccessBox = ({ isSuccess, children }) => {
  return (
    <div className={`info-box success ${isSuccess ? 'show' : ''}`}>
      { children }
    </div>
  )
}

export default SuccessBox
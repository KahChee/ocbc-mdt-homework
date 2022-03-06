import React from 'react';
import './style.css';

const TextField = ({ label, name, errMsg, hasError, ...props }) => {
  return (
    <div className="text-field-container">
      <label htmlFor={name}>{ label }</label>
      <input name={name} {...props} />
      <div className={`err-msg ${hasError ? 'show' : ''}`}>{ errMsg }</div>
    </div>
  )
}

export default TextField
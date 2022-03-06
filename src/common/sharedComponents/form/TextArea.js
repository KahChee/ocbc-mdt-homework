import React from 'react';
import './style.css';

const TextArea = ({ label, name, rows, errMsg, hasError, ...props }) => {
  return (
    <div className="textarea-container">
      <label htmlFor={name}>{ label }</label>
      <textarea name={name} rows={rows} {...props}></textarea>
      <div className={`err-msg ${hasError ? 'show' : ''}`}>{ errMsg }</div>
    </div>
  )
}

export default TextArea
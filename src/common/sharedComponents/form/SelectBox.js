import React from 'react';
import { CaretDownFill } from 'react-bootstrap-icons';
import './style.css';

const SelectBox = ({ label, name, errMsg, hasError, children, ...props }) => {
  return (
    <div className="selectbox-container">
      <label htmlFor={name}>{ label }</label>
      <CaretDownFill size={18} color="black" />
      <select name={name} {...props}>
        { children }
      </select>
      <div className={`err-msg ${hasError ? 'show' : ''}`}>{ errMsg }</div>
    </div>
  )
}

export default SelectBox
import React from 'react';
import './style.css';

const Button = ({ color, children, ...props }) => {
  return (
    <button className={`btn-round ${color}`} {...props}>
      { children }
    </button>
  )
}

export default Button
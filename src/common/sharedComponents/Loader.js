import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = ({ show }) => {
  return (
    <>
      <div className={`loader-overlay ${show ? 'show' : ''}`}></div>
      <div className={`loader-container ${show ? 'show' : ''}`}>
        <Spinner animation="grow" role="status" size="lg">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </>
  )
}

export default Loader
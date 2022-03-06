import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = ({ isLoading }) => {
  return (
    <>
      <div className={`loader-overlay ${isLoading ? 'show' : ''}`}></div>
      <div className={`loader-container ${isLoading ? 'show' : ''}`}>
        <Spinner animation="grow" role="status" size="lg">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </>
  )
}

export default Loader
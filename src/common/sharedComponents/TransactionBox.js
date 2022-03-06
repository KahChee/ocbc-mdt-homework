import React from 'react';
import './style.css';

const TransactionBox = ({ transactionDate, children }) => {
  return (
    <div className="transaction-box">
      <h3 className="transaction-date">{ transactionDate }</h3>
      <div className="transaction-details">
        {/* <div className="d-flex justify-content-between credit">
          <div>Jackie<br /><span>4992-321-3321</span></div>
          <div>1,200.00</div>
        </div>
        <div className="d-flex justify-content-between debit">
          <div>Tim Cook<br /><span>4992-321-3321</span></div>
          <div>-300.00</div>
        </div> */}
        { children }
      </div>
    </div>
  )
}

export default TransactionBox
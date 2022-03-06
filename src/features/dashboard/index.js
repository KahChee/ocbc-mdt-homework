import React, { useState, useEffect } from 'react';
import Layout from '../layout';
import TransactionBox from '../../common/sharedComponents/TransactionBox';
import Footer from './Footer';
import { formatTransactions, formatCurrency, fetchApi } from '../../common/helpers';
import './style.css';

const Dashboard = () => {
  const defaultAccount = {
    accountNo: '0000-000-0000',
    balance: 0
  }
  const [account, setAccount] = useState(defaultAccount)
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    (async () => {
      const [accountApi, transactionsApi] = await Promise.allSettled([
        fetchApi({
          url: '/balance'
        }),
        fetchApi({
          url: '/transactions'
        })
      ])

      if (accountApi.value && (accountApi.value.status === 'success')) {
        setAccount({ accountNo: accountApi.value.accountNo, balance: accountApi.value.balance })
      }

      if (transactionsApi.value && (transactionsApi.value.status === 'success')) {
        setTransactions(formatTransactions({ transactions: transactionsApi.value.data }))
      }
    })()

    return () => {
      setAccount(defaultAccount)
    }
  }, [])

  return (
    <Layout
      footer={<Footer />}
      logoutBtn
    >
      <div className="account-container">
        You have
        <div className="account-amount">SGD { formatCurrency({ amount: account.balance }) }</div>
        <div className="account-no">
          <span>Account No.</span><br />
          { account.accountNo }
        </div>
        <div className="account-name">
          <span>Account Holder</span><br />
          Donald Trump
        </div>
      </div>
      <div className="transaction-container">
        <h2>Your transaction history</h2>
        {
          transactions.map((transaction, transactionIndex) => {
            return (
              <TransactionBox key={`transaction-${transactionIndex}`} transactionDate={transaction.date}>
                {
                  transaction.data.map((record, recordIndex) => {
                    return (
                      <div key={`record-${recordIndex}`} className={`d-flex justify-content-between ${record.transactionType === 'received' ? 'credit' : 'debit'}`}>
                        <div>{ record.accountHolder }<br /><span>{ record.accountNo }</span></div>
                        <div>{ (record.transactionType === 'received' ? '' : '-') + formatCurrency({ amount: record.amount }) }</div>
                      </div>
                    )
                  })
                }
              </TransactionBox>
            )
          })
        }
      </div>
    </Layout>
  )
}

export default Dashboard
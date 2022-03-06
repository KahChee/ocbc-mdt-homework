import React from 'react';
import Button from '../../common/sharedComponents/form/Button';
import { fetchApi } from '../../common/helpers';

const Footer = ({ defaultTransaction, transaction, setTransaction, setIsLoading, setTransferStatus }) => {
  const clearForm = () => {
    setTransaction(prevState => {
      return {
        payee: { ...prevState.payee, hasError: false },
        amount: { ...prevState.amount, hasError: false },
        description: { ...prevState.description, hasError: false }
      }
    })
  }

  const handleTransfer = async () => {
    if ((transaction.payee.value !== '') && (transaction.amount.value !== '') && (transaction.description.value !== '')) {
      setIsLoading(true)
      clearForm()
      const response = await fetchApi({
        url: '/transfer',
        method: 'POST',
        data: { receipientAccountNo: transaction.payee.value, amount: Number(transaction.amount.value), description: transaction.description.value }
      })
      setIsLoading(false)

      if (response.status === 'success') {
        setTransaction(defaultTransaction) // Reset form
        setTransferStatus({ isSuccess: true, isError: false, errMsg: '' })
      }
      else {
        setTransferStatus({ isSuccess: false, isError: true, errMsg: response.error })
      }
    }
    else {
      clearForm()

      if (transaction.payee.value === '') {
        setTransaction(prevState => {
          return { ...prevState, payee: { ...prevState.payee, hasError: true } }
        })
      }

      if (transaction.amount.value === '') {
        setTransaction(prevState => {
          return { ...prevState, amount: { ...prevState.amount, hasError: true } }
        })
      }

      if (transaction.description.value === '') {
        setTransaction(prevState => {
          return { ...prevState, description: { ...prevState.description, hasError: true } }
        })
      }
    }
  }

  return (
    <>
      <Button onClick={handleTransfer}>TRANSFER NOW</Button>
    </>
  )
}

export default Footer
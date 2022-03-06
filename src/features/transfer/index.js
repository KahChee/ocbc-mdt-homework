import React, { useState, useEffect } from 'react';
import Layout from '../layout';
import SuccessBox from '../../common/sharedComponents/SuccessBox';
import ErrorBox from '../../common/sharedComponents/ErrorBox';
import SelectBox from '../../common/sharedComponents/form/SelectBox';
import TextField from '../../common/sharedComponents/form/TextField';
import TextArea from '../../common/sharedComponents/form/TextArea';
import Footer from './Footer';
import { fetchApi } from '../../common/helpers';

const Transfer = () => {
  const defaultTransaction = {
    payee: { value: '', hasError: false },
    amount: { value: '', hasError: false },
    description: { value: '', hasError: false }
  }
  const [transaction, setTransaction] = useState(defaultTransaction)
  const [payeeList, setPayeeList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [transferStatus, setTransferStatus] = useState({ isSuccess: false, isError: false, errMsg: '' })

  const updatePayee = (e) => {
    setTransaction(prevState => {
      return { ...prevState, payee: { ...prevState.payee, value: e.target.value } }
    })
  }

  const updateAmount = (e) => {
    setTransaction(prevState => {
      return { ...prevState, amount: { ...prevState.amount, value: e.target.value } }
    })
  }

  const updateDescription = (e) => {
    setTransaction(prevState => {
      return { ...prevState, description: { ...prevState.description, value: e.target.value } }
    })
  }

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      const payeeListApi = await fetchApi({ url: '/payees' })

      if ((payeeListApi.status === 'success') && payeeListApi.data) {
        setPayeeList(payeeListApi.data)
      }
      setIsLoading(false)
    })()

    return () => {
      setTransaction(defaultTransaction)
    }
  }, [])

  return (
    <Layout
      title="Transfer"
      footer={<Footer defaultTransaction={defaultTransaction} transaction={transaction} setTransaction={setTransaction} setIsLoading={setIsLoading} setTransferStatus={setTransferStatus} />}
      isLoading={isLoading}
      backBtn
    >
      <div className="form-container">
        <SelectBox id="payee" name="payee" label="Payee" errMsg="Payee is required" hasError={transaction.payee.hasError} value={transaction.payee.value} onChange={updatePayee}>
          <option value="">Please select a payee...</option>
          {
            payeeList.map((payee, payeeIndex) => {
              return <option key={`payee-${payeeIndex}`} value={payee.accountNo}>{ payee.name }</option>
            })
          }
        </SelectBox>
        <TextField id="amount" name="amount" type="number" min="0" label="Amount" errMsg="Amount is required" hasError={transaction.amount.hasError} value={transaction.amount.value} onChange={updateAmount} />
        <TextArea id="description" name="description" rows="5" label="Description" errMsg="Description is required" hasError={transaction.description.hasError} value={transaction.description.value} onChange={updateDescription} />
      </div>
      <SuccessBox isSuccess={transferStatus.isSuccess}>Transfer completed successfully!</SuccessBox>
      <ErrorBox hasError={transferStatus.isError}>{ transferStatus.errMsg }</ErrorBox>
    </Layout>
  )
}

export default Transfer
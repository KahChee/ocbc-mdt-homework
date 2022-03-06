import React from 'react';
import Button from '../../common/sharedComponents/form/Button';
import { register } from '../../common/authentication';

const Footer = ({ defaultUser, user, setUser, setIsLoading, setRegisterStatus }) => {
  const clearForm = () => {
    setUser(prevState => {
      return {
        username: { ...prevState.username, hasError: false },
        password: { ...prevState.password, hasError: false },
        conPassword: { ...prevState.conPassword, hasError: false }
      }
    })
  }

  const handleRegister = async () => {
    if ((user.username.value !== '') && (user.password.value !== '') && (user.conPassword.value === user.password.value)) {
      setIsLoading(true)
      clearForm()
      const response = await register({ username: user.username.value, password: user.password.value })
      setIsLoading(false)

      if (response.status === 'success') {
        setUser(defaultUser) // Reset form
        setRegisterStatus({ isSuccess: true, isError: false, errMsg: '' })
      }
      else {
        setRegisterStatus({ isSuccess: false, isError: true, errMsg: response.error })
      }
    }
    else {
      clearForm()

      if (user.username.value === '') {
        setUser(prevState => {
          return { ...prevState, username: { ...prevState.username, hasError: true } }
        })
      }

      if (user.password.value === '') {
        setUser(prevState => {
          return { ...prevState, password: { ...prevState.password, hasError: true } }
        })
      }

      if (user.conPassword.value !== user.password.value) {
        setUser(prevState => {
          return { ...prevState, conPassword: { ...prevState.conPassword, hasError: true } }
        })
      }
    }
  }

  return (
    <>
      <Button onClick={handleRegister}>REGISTER</Button>
    </>
  )
}

export default Footer
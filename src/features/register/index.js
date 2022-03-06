import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Layout from '../layout';
import SuccessBox from '../../common/sharedComponents/SuccessBox';
import ErrorBox from '../../common/sharedComponents/ErrorBox';
import TextField from '../../common/sharedComponents/form/TextField';
import Footer from './Footer';

const Register = () => {
  const defaultUser = {
    username: { value: '', hasError: false },
    password: { value: '', hasError: false },
    conPassword: { value: '', hasError: false }
  }
  const [user, setUser] = useState(defaultUser)
  const [isLoading, setIsLoading] = useState(false)
  const [registerStatus, setRegisterStatus] = useState({ isSuccess: false, isError: false, errMsg: '' })

  const updateUsername = (e) => {
    setUser(prevState => {
      return { ...prevState, username: { ...prevState.username, value: e.target.value } }
    })
  }

  const updatePassword = (e) => {
    setUser(prevState => {
      return { ...prevState, password: { ...prevState.password, value: e.target.value } }
    })
  }

  const updateConPassword = (e) => {
    setUser(prevState => {
      return { ...prevState, conPassword: { value: e.target.value, hasError: (e.target.value !== user.password.value) } }
    })
  }

  useEffect(() => {
    return () => {
      setUser(defaultUser)
    }
  }, [])

  return (
    <Layout
      title="Register"
      footer={<Footer defaultUser={defaultUser} user={user} setUser={setUser} setIsLoading={setIsLoading} setRegisterStatus={setRegisterStatus} />}
      isLoading={isLoading}
      backBtn
    >
      <div className="form-container">
        <TextField id="username" name="username" type="text" label="Username" errMsg="Username is required" hasError={user.username.hasError} value={user.username.value} onChange={updateUsername} />
        <TextField id="password" name="password" type="password" label="Password" errMsg="Password is required" hasError={user.password.hasError} value={user.password.value} onChange={updatePassword} />
        <TextField id="conPassword" name="conPassword" type="password" label="Confirm Password" errMsg="Confirm Password not match" hasError={user.conPassword.hasError} value={user.conPassword.value} onChange={updateConPassword} />
      </div>
      <SuccessBox isSuccess={registerStatus.isSuccess}>
        User registered successfully!<br />
        Please click <NavLink to="/">here</NavLink> to login.
      </SuccessBox>
      <ErrorBox hasError={registerStatus.isError}>{ registerStatus.errMsg }</ErrorBox>
    </Layout>
  )
}

export default Register
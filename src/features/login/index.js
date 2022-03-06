import React, { useState, useEffect } from 'react';
import Layout from '../layout';
import ErrorBox from '../../common/sharedComponents/ErrorBox';
import TextField from '../../common/sharedComponents/form/TextField';
import Footer from './Footer';

const Login = () => {
  const defaultUser = {
    username: { value: '', hasError: false },
    password: { value: '', hasError: false }
  }
  const [user, setUser] = useState(defaultUser)
  const [isLoading, setIsLoading] = useState(false)
  const [loginStatus, setLoginStatus] = useState({ isSuccess: false, isError: false, errMsg: '' })

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

  useEffect(() => {
    return () => {
      setUser(defaultUser)
    }
  }, [])

  return (
    <Layout
      title="Login"
      footer={<Footer user={user} setUser={setUser} setIsLoading={setIsLoading} setLoginStatus={setLoginStatus} />}
      isLoading={isLoading}
    >
      <div className="form-container">
        <TextField id="username" name="username" type="text" label="Username" errMsg="Username is required" hasError={user.username.hasError} value={user.username.value} onChange={updateUsername} />
        <TextField id="password" name="password" type="password" label="Password" errMsg="Password is required" hasError={user.password.hasError} value={user.password.value} onChange={updatePassword} />
      </div>
      <ErrorBox hasError={loginStatus.isError}>{ loginStatus.errMsg }</ErrorBox>
    </Layout>
  )
}

export default Login
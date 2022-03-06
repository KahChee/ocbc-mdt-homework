import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '../../common/sharedComponents/form/Button';
import { login } from '../../common/authentication';
import { setCookie } from '../../common/helpers';

const Footer = ({ user, setUser, setIsLoading, setLoginStatus }) => {
  const navigate = useNavigate()

  const clearForm = () => {
    setUser(prevState => {
      return {
        username: { ...prevState.username, hasError: false },
        password: { ...prevState.password, hasError: false }
      }
    })
  }

  const handleLogin = async () => {
    if ((user.username.value !== '') && (user.password.value !== '')) {
      setIsLoading(true)
      clearForm()
      const response = await login({ username: user.username.value, password: user.password.value })
      setIsLoading(false)

      if (response.status === 'success') {
        setCookie('token', response.token, 0.1)
        navigate('/dashboard')
      }
      else {
        setLoginStatus({ isSuccess: false, isError: true, errMsg: response.error })
        // navigate('/')
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
    }
  }

  return (
    <>
      <Button onClick={handleLogin}>LOGIN</Button>
      <NavLink to="/register">
        <Button color="white">REGISTER</Button>
      </NavLink>
    </>
  )
}

export default Footer
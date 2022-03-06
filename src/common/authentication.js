import { removeCookie, fetchApi } from './helpers'

export const register = async ({ username, password }) => {
  return await fetchApi({
      url: '/register',
      method: 'POST',
      data: { username, password }
    })
}

export const login = async ({ username, password }) => {
  return await fetchApi({
      url: '/login',
      method: 'POST',
      data: { username, password }
    })
}

export const logout = async () => {
  removeCookie('token')
}
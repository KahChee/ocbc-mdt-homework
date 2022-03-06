export const formatTransactions = ({ transactions = [] }) => {
  const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  let newTransactions = transactions
    .reduce((transactionArr, curr) => {
      let currTransactionDate = new Date(curr.transactionDate)
      let currTimestamp = (new Date(`${currTransactionDate.getFullYear()}-${currTransactionDate.getMonth()}-${currTransactionDate.getDate()}`)).getTime()
      let selectedTransaction = transactionArr.filter(tran => tran.timestamp === currTimestamp)

      if (selectedTransaction.length === 0) {
        transactionArr.push({
          timestamp: currTimestamp,
          date: `${currTransactionDate.getDate()} ${month[currTransactionDate.getMonth()]} ${currTransactionDate.getFullYear()}`,
          data: [{
            accountNo: curr.receipient?.accountNo || curr.sender.accountNo,
            accountHolder: curr.receipient?.accountHolder || curr.sender.accountHolder,
            transactionType: curr.transactionType,
            amount: curr.amount
          }]
        })
      }
      else {
        selectedTransaction[0].data.push({
          accountNo: curr.receipient?.accountNo || curr.sender.accountNo,
          accountHolder: curr.receipient?.accountHolder || curr.sender.accountHolder,
          transactionType: curr.transactionType,
          amount: curr.amount
        })
      }

      return transactionArr
    }, [])
    .sort((a, b) => b - a)

  return newTransactions
}

export const formatCurrency = ({ amount = '' }) => {
  if (amount !== '') {
    amount += ''
    let amountArr = amount.split('.')
    amount = Number(amountArr[0]).toLocaleString('en-US')

    if (amountArr.length === 2) {
      amount += `.${amountArr[1].padEnd(2, 0)}`
    }
    else {
      amount += '.00'
    }
  }

  return amount
}

export const getCookie = (cName) => {
  let name = `${cName}=`
  let ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

export const setCookie = (cName, cValue, exDays) => {
  const d = new Date()
  d.setTime(d.getTime() + (exDays * 24 * 60 * 60 * 1000))
  let expires = `expires=${d.toUTCString()}`
  document.cookie = `${cName}=${cValue}; ${expires}; path=/;`
}

export const removeCookie = (cName) => {
  document.cookie = `${cName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
}

export const getLocalStorage = (name) => {
  return localStorage.getItem(name)
}

export const setLocalStorage = (name, value) => {
  localStorage.setItem(name, value)
}

export const removeLocalStorage = (name) => {
  localStorage.removeItem(name)
}

/**
 * @param {String} url
 * @param {String} method
 * @param {Object} headers
 * @param {String} token
 * @param {Array | Object} data
 * @param {Boolean} isJsonData
 * @param {String} returnType
 * @returns json | blob
 */
 export const fetchApi = async ({ url, method = 'GET', headers = {}, token = '', data = {}, isJsonData = true, returnType = 'json' }) => {
  try {
    if ((headers['Content-Type'] == undefined) && isJsonData) headers['Content-Type'] = 'application/json'
    const body = (method == 'GET' ? {} : { body: (isJsonData ? JSON.stringify(data) : data) })
    const response = await fetch(`${process.env.REACT_APP_API_URL}${url}`, {
      method,
      'headers': {
        // 'Content-Type': 'application/json',
        'Authorization': token || getCookie('token'),
        ...headers
      },
      ...body
    })

    switch (returnType) {
      case 'blob':
        return await response.blob()
        // break
      
      default:
        return await response.json()
        // break
    }
  } catch (err) {
    return { status: 500, message: JSON.stringify(err) }
  }
}
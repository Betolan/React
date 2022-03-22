const updateCredentials = (user, password) => {
  return {
    type: 'UPDATE_CREDENTIALS',
    user: user,
    password: password,
  }
}

export default updateCredentials

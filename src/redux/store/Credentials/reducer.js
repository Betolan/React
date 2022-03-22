// Inicializa el estado
const initialState = { password: '', user: '' }

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_CREDENTIALS':
      return {
        ...state,
        password: action.password,
        user: action.user,
      }
    default:
      return state
  }
}

export const selectActivePassword = (state) => state.credentialsReducer.password
export const selectActiveUser = (state) => state.credentialsReducer.user

import React from 'react'
import './Resultado.css'
import { connect } from 'react-redux'
import {
  selectActivePassword,
  selectActiveUser,
} from '../../redux/store/Credentials/reducer'

const Resultado = ({ user, password }) => (
  <div>
    {password} {user}
  </div>
)

// Se crea la función para acceder al contenido de la "store"
const mapStateToProps = (state) => {
  console.log({ hola: state })
  return {
    user: selectActiveUser(state),
    password: selectActivePassword(state),
  }
}

// Se conecta con la "store" de Redux: se quita el segundo parámetro que
// era la función que modificaba el "store"
// Se incluye el método que recupera el valor del "store"
export default connect(mapStateToProps)(Resultado)

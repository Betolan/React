import React, { useRef } from 'react'
import './Formulario.css'
import { connect } from 'react-redux'
import updateCredentials from '../../redux/store/Credentials/action'

const Formulario = ({ updateCredentials }) => {
  const resultadoRef = useRef(null)
  const resultadoRef2 = useRef(null)
  const onButtonClick = () => {
    updateCredentials(resultadoRef.current.value, resultadoRef2.current.value)
  }

  return (
    <div>
      Campo:
      <input type="text" ref={resultadoRef} />
      <input type="text" ref={resultadoRef2} />
      <button onClick={onButtonClick}>Guardar en Store</button>
    </div>
  )
}

// Se conecta con Redux: null = indica si desea recuperar algo de la "store"
export default connect(null, { updateCredentials })(Formulario)

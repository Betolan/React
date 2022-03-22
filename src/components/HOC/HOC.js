import React from 'react'
import { obtenerDatos } from '../Funciones/funciones'
import ComentarioHOC from '../Comentario/ComentarioHOC'

export const ComentarioconSuscripcion = conSuscripcion(
  ComentarioHOC,
  (props, manejadorCambios) => obtenerDatos(props, manejadorCambios),
)

function conSuscripcion(ComponenteEnvuelto, selecionarDatos) {
  return class extends React.Component {
    constructor(props) {
      super(props)
      this.manejadorCambios = this.manejadorCambios.bind(this)
      this.state = {
        cargando: false,
        datos: null,
      }
    }

    componentDidMount() {
      selecionarDatos(this.props, this.manejadorCambios)
    }

    manejadorCambios(vcargando, vdatos) {
      Array.isArray(vdatos)
        ? this.setState({
            datos: { body: 'No comments' },
            cargando: vcargando,
          })
        : this.setState({ datos: vdatos, cargando: vcargando })
    }

    render() {
      return (
        <ComponenteEnvuelto
          datos={this.state.datos}
          cargando={this.state.cargando}
          {...this.props}
        />
      )
    }
  }
}

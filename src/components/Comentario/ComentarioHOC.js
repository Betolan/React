import React from 'react'

class ComentarioHOC extends React.Component {
  render() {
    return (
      <p>
        {' '}
        Comments:
        <br />
        {this.props.cargando
          ? 'Loading ...'
          : this.props.datos == null
          ? 'No comments.'
          : '- ' + this.props.datos.body}
      </p>
    )
  }
}

export default ComentarioHOC

export function obtenerDatos(propiedades, manejadorCambios) {
  manejadorCambios(true, null)
  let url = propiedades.url
  if (propiedades.id) {
    url = url + '/' + propiedades.id
  }
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      manejadorCambios(false, result)
    })
    .catch((e) => {
      console.log(e)
      manejadorCambios(false, null)
    })
}

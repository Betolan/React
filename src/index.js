import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Header from './components/Header/Header'

// Se importa el "store"
import storeF from './redux/store'

// Para conectar Redux con React se importa el siguiente paquete
import { Provider } from 'react-redux'

const store = storeF()

ReactDOM.render(
  <Provider store={store}>
    <Header />
  </Provider>,
  document.getElementById('root'),
)

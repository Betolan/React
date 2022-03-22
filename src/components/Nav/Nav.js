import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom'
import './Nav.css'
import ImgWrapper from '../ImgWrapper/ImgWrapper'
import PictureForm from '../PictureForm/PictureForm'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import updateCredentials from '../../redux/store/Credentials/action'
import { connect } from 'react-redux'
import Resultado from '../Resultado/Resultado'

export default function Nav() {
  return (
    <Router>
      <div>
        <Login />
        <div>
          <div>
            <Link to="/pictureformpage">Picture Form</Link>
          </div>
          <div>
            <Link to="/album">Album</Link>
          </div>
          <hr />
        </div>

        <Switch>
          <RutaPrivada path="/pictureformpage">
            <PictureFormPage />
          </RutaPrivada>
          <Route path="/authpage">
            <AuthPage />
          </Route>
          <RutaPrivada path="/album">
            <AlbumPage />
          </RutaPrivada>
        </Switch>
      </div>
    </Router>
  )
}

const autenticacionSimulada = {
  estaAutenticado: false,
  login(cb) {
    autenticacionSimulada.estaAutenticado = true
    setTimeout(cb, 100)
  },
  logout(cb) {
    autenticacionSimulada.estaAutenticado = false
    setTimeout(cb, 100)
  },
}
function Login() {
  let history = useHistory()

  return (
    autenticacionSimulada.estaAutenticado && (
      <button
        onClick={() => {
          autenticacionSimulada.logout(() => history.push('/'))
        }}
      >
        Log out
      </button>
    )
  )
}

function RutaPrivada({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        autenticacionSimulada.estaAutenticado ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/authpage',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

function PictureFormPage() {
  return (
    <div>
      <PictureForm />
      <Resultado />
    </div>
  )
}

function AlbumPage() {
  const [estaCargado, setEstaCargado] = useState(false)
  const [images, setImages] = useState([])
  const [error, setError] = useState(null)

  fetch('https://jsonplaceholder.typicode.com/photos')
    .then((respuesta) => respuesta.json())
    .then(
      (resultado) => {
        for (let i = 0; i < 10; i++) {
          var lista = images
          lista.push(resultado[i].url)
          setImages(lista)
        }
        setError(null)
        setEstaCargado(true)
      },
      (errores) => {
        setError(errores)
        setEstaCargado(true)
        setImages([])
      },
    )

  return <div>{<ImgWrapper images={images} />}</div>
}

function AuthPage() {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(true)

  const [passIcon, setPassIcon] = useState('unShowPass.png')

  const changePasswordStatus = (e) => {
    setShowPassword(!showPassword)
    if (passIcon === 'showPass.png') {
      setPassIcon('unShowPass.png')
    } else {
      setPassIcon('showPass.png')
    }
  }
  let history = useHistory()
  let location = useLocation()

  let { from } = location.state || { from: { pathname: '/' } }
  let auth = (user, password) => {
    updateCredentials(user, password)
    connect(null, { updateCredentials })(Nav)
    autenticacionSimulada.login(() => {
      history.replace(from)
    })
  }

  return (
    <Formik
      initialValues={{ user: '', password: '' }}
      validate={(values) => {
        let errors = {}
        if (values.user === '') {
          errors.user = 'El usuario es requerido'
        } else if (values.password === '') {
          errors.password = 'La clave es requerida'
        }
        return errors
      }}
      onSubmit={(values, { setSubmitting }) => {
        auth(values.user, values.password)
        values.user = ''
        values.password = ''
        setSubmitting(false)
      }}
    >
      {(touched, errors, isSubmitting) => (
        <div className="form">
          <Form>
            <div>
              <div className="form-container">
                <label htmlFor="user">User</label>
                <Field name="user" type="text" className="form-control" />
                <ErrorMessage
                  component="div"
                  name="user"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-container">
                <label htmlFor="password">Password</label>
                <div className="password">
                  <Field
                    name="password"
                    type={!showPassword ? 'text' : 'password'}
                    className="form-control"
                  />
                  <img
                    className="passIcon"
                    alt=""
                    src={require(`../../images/${passIcon}`)}
                    onClick={changePasswordStatus}
                  />
                  <ErrorMessage
                    component="div"
                    name="password"
                    className={`form-control ${
                      touched.password && errors.password ? 'is-invalid' : ''
                    }`}
                  />
                </div>
              </div>
              <button type="submit" className="button" disabled={isSubmitting}>
                Show Images
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  )
}

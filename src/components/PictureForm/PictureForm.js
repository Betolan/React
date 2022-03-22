import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import './PictureForm.css'

class PictureForm extends React.Component {
  render() {
    return (
      <Formik
        initialValues={{ name: '', type: '' }}
        validate={(values) => {
          console.log({
            fileName: values.file,
          })
          let errors = {}
          if (values.name === '') {
            errors.name = 'El nombre es requerido'
          } else if (values.file === undefined) {
            errors.file = 'La imagen es requerida'
          }
          return errors
        }}
        onSubmit={(values, { setSubmitting }) => {
          alert('Imagen agregada con éxito.')
          values.name = ''
          values.file = undefined
          setSubmitting(false)
        }}
      >
        {(touched, errors, isSubmitting) => (
          <div className="form">
            <Form>
              <div>
                <div className="form-container">
                  <label htmlFor="name">Name</label>
                  <Field type="text" name="name" className="form-control" />
                  <ErrorMessage
                    component="div"
                    name="name"
                    className="invalid-feedback"
                  />
                </div>
                <div className="form-container">
                  <label htmlFor="type">Type</label>
                  <Field as="select" name="type">
                    <option value="red">Family</option>
                    <option value="green">Couple</option>
                    <option value="blue">Alone</option>
                  </Field>
                  <ErrorMessage
                    component="div"
                    name="type"
                    className="invalid-feedback"
                  />
                </div>

                <div className="form-container">
                  <label htmlFor="file">Image</label>
                  <Field
                    type="file"
                    accept="image/*"
                    name="file"
                    className="form-control is-invalid"
                  />
                  <ErrorMessage
                    component="div"
                    name="file"
                    className={`form-control ${
                      touched.file && errors.file ? 'is-invalid' : ''
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  className="button"
                  disabled={isSubmitting}
                >
                  Enviar
                </button>
                <br />
              </div>
            </Form>
          </div>
        )}
      </Formik>
    )
  }
}

export default PictureForm

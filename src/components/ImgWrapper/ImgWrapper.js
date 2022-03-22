import React, { useState } from 'react'
import './ImgWrapper.css'
import { ComentarioconSuscripcion } from '../HOC/HOC'
import Popup from '../Popup/Popup'

function Image(props) {
  const [isOpen, setIsOpen] = useState(false)

  const togglePopup = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      {/* <img src={require(`../../images/${props.name}`)}></img> */}
      <button onClick={togglePopup}>
        <img alt="" src={props.name} />
      </button>
      {isOpen && (
        <Popup
          content={
            <>
              <ComentarioconSuscripcion
                id={props.index}
                url="https://jsonplaceholder.typicode.com/comments"
              />
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </div>
  )
}

function ImgWrapper(props) {
  const images = props.images
  return (
    <div className="img-wrapper">
      {images.map((image, index) => (
        <Image key={image} name={image} index={index} />
      ))}
    </div>
  )
}

export default ImgWrapper

import React from 'react'

import './Header.css'

import Nav from '../Nav/Nav'

import logo from '../../images/logo.png'

function Header(props) {
  return (
    <div className="App">
      <img src={logo} alt="logo" />
      <Nav />
    </div>
  )
}

export default Header

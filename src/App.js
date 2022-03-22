import React from "react";
import {
  BrowserRouter as Router,
  Switch,  Route,  Link,  useLocation
} from "react-router-dom";
import './App.css';

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link to="/quienessomos">Quienes Somos</Link>
            </li>
            <li>
              <Link to="/productos">Productos</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/quienessomos">
            <QuienesSomos />
          </Route>
          <Route path="/productos">
            <Productos />
          </Route>
          <Route exact path="/">
            <Inicio />
          </Route>
          <Route path="*">
            <PaginaNoEncontrada />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
function Inicio() {
  return <div><h2>Inicio</h2><p>Página de Inicio</p></div>;
}
function QuienesSomos() {
  return <div><h2>Quienes Somos</h2><p>Página de Presentación</p></div>;
}
function Productos() {
  return <div><h2>Productos</h2><p>Página con Información de los Productos</p></div>;
}
function PaginaNoEncontrada() {
  let direccion = useLocation();
  return <div><h2>Página No Encontrada</h2><p>No se encontró la página indicada 
    <code>{direccion.pathname}</code></p></div>;
}

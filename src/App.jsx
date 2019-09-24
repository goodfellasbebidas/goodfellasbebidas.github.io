import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import Home from './Home'
import Product from './Product'
import Cart from './Cart'
import { actualizarCarrito, cerrarDescargarPrecios } from './functions'
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import Config from './config'


function App() {
    const customHistory = createBrowserHistory();

    const descargarPrecios = () => {
        window.location.href = Config.UrlApi + "api/home/downloadfile"
    }
    useEffect(() => {
        actualizarCarrito()

    })

    return (
        <div className="App">
            <div className="loading">Loading&#8230;</div>
            <div className="row">
                <div className="col-md-4 ">
                </div>
                <div className="col-md-4 ">
                    <h1>
                        <a href="/" className="ms-img-replacement" title="GoodFellas Bebidas">
                            <img className="img-fluid mx-auto d-block header-logo justify-content-md-center" src="/img/logo4.png" alt="goodfellas" /> GoodFellas Bebidas
                    </a>

                    </h1>
                </div>
                <div className="col-md-4">

                    <div className="carrito float-right vertical-center" onClick={function () { window.location.href = '/cart' }}>
                        <div id="carritonumero" className="carrito-numero">0</div>
                    </div>
                </div>
            </div>
            <Router history={customHistory}>
                <nav className="navbar navbar-expand-md navbar-light navbar-fixed-top rounded">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample10" aria-controls="navbarsExample10" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>

                    </button>

                    <div className="collapse navbar-collapse justify-content-md-center" id="navbarsExample10">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link item-menu" to="/">INICIO</Link>
                                {/* <router-link className="nav-link item-menu" to="/" title="Inicio">INICIO</router-link> */}
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link item-menu" to="/Productos/Vodka">VODKA</Link>

                                {/* <router-link className="nav-link item-menu" to="/Productos/Vodka" title="Vodka">VODKA</router-link> */}
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link item-menu" to="/Productos/Cerveza">CERVEZA</Link>

                                {/* <router-link className="nav-link item-menu" to="/Productos/Cerveza" title="Cerveza">CERVEZA</router-link> */}
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link item-menu" to="/Productos/Whiskys">WHISKYS</Link>

                                {/* <router-link className="nav-link item-menu" to="/Productos/Whiskys" title="Whiskys">WHISKYS</router-link> */}
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link item-menu" to="/Productos/Aperitivos">APERITIVOS</Link>

                                {/* <router-link className="nav-link item-menu" to="/Productos/Aperitivos" title="Aperitivos">APERITIVOS</router-link> */}
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link item-menu" to="/Productos/Champagne">CHAMPAGNE</Link>

                                {/* <router-link className="nav-link item-menu" to="/Productos/Champagne" title="Champagne">CHAMPAGNE</router-link> */}
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link item-menu dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" title="Otros">OTROS</a>
                                <div className="dropdown-menu" aria-labelledby="dropdown01">
                                    <Link className="dropdown-item" to="/Productos/Licor">LICOR</Link>
                                    <Link className="dropdown-item" to="/Productos/Tequila">TEQUILA</Link>
                                    <Link className="dropdown-item" to="/Productos">Más</Link>

                                    {/* <router-link className="dropdown-item" to="/Productos/Licor" title="Licor">LICOR</router-link>
                                <router-link className="dropdown-item" to="/Productos/Tequila" title="Tequila">TEQUILA</router-link>
                                <router-link className="dropdown-item" to="/Productos" title="Más Productos">Más</router-link> */}
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
                <h3 className="estilo estilo-90">
                    Distribuidora online de bebidas con delivery a todo capital federal
        </h3>

                <Route path="/" exact component={Home} />
                <Route path="/Productos" component={Product} />
                <Route path="/Cart" component={Cart} />
            </Router>
            <div className="row justify-content-md-center footer">

                <div className="col-md-4">
                    <p>
                        <img className="icono" src="/img/ubicacion-min.png" alt="ubicacion" /> Ambrosetti 568. Caballito
                    </p>

                    <p>
                        <img className="icono" src="/img/clock-min.png" alt="horario" /> Martes a Jueves: 15 a 20hs
                        <p>
                            Viernes: 13:30 a 22h
                        </p>
                        <p>
                            Sábado: 12 a 22h
                        </p>
                    </p>
                </div>


                <div className="col-md-4">
                    <div className=" float-right">
                        <p>
                            <img className="icono" src="/img/wpprojo-min.png" alt="whatsapp" />11-6291-2507
                    </p>


                        <p>
                            <img className="icono" src="/img/instagram-logo-min.png" alt="instagram" /> @goodfellas.bebidas
                        <p>
                                <a href="http://www.lautarocarro.com" title="Lautaro Carro">WebSite por Lautaro Carro</a>
                            </p>
                        </p>
                    </div>
                </div>

            </div>


            <div className="row contacto-flotante">
                <div className="col-md-4 ">
                    <a href="https://api.whatsapp.com/send?phone=541162912507" title="WhatsApp" target="_blank">
                        <img src="/img/whatsapp-min.png" width="32px" height="32px" alt="WhatsApp" /> 15-6291-2507
                </a>
                </div>

                <div className="col-md-4 ">
                    <a href="https://www.facebook.com/GoodfellasBebidas/" title="Facebook" target="_blank">
                        <img src="/img/facebook.png" alt="Facebook" /> GoodFellasBebidas
                </a>
                </div>

                <div className="col-md-4 ">
                    <a href="https://www.instagram.com/goodfellas.bebidas/" title="Instagram" target="_blank">
                        <img src="/img/instagram.png" alt="Instagram" /> @goodfellas.bebidas
                </a>
                </div>

            </div>
            <div id="descargarprecios" className="fixed">
                <div id="btnclosedescargarprecios" className="float-right unselectable" onClick={cerrarDescargarPrecios}>X</div>
                <h4 className="center"> Descargue la lista completa de precios</h4>
                <button id="btndescargarprecios" className=" center boton lista-precio-button" onClick={descargarPrecios}>
                    Descargar
                </button>
            </div>
        </div>
    );
}

export default App;

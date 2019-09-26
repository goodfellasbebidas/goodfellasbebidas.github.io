import React, { useEffect, useState } from 'react'
import Config from './config'
import { agregarCarrito } from './functions'

const Product = (props) => {
    const [state, setState] = useState({
        productoViewModel: [],
        finishFetch: false
    })
    const [category, setCategory] = useState()
    const { match: { params } } = props
    const onProductClick = index => event => {
        let product = state.productoViewModel[index]
        document.querySelector('.modal-title > span').textContent = product.nombre
        document.getElementById('pImagenModal').src = product.imagen
        document.getElementById('pImagenModal').textContent = product.id
        document.getElementById('pPrecio').value = product.precio.toFixed(2)
        document.getElementById('pPrecio').disabled = true;
        document.getElementById('btnp').textContent = 'Agregar al carrito'
        document.getElementById('btnp').onclick = agregarCarrito
        document.getElementById('modalCantidad').classList.remove('has-danger')
        document.getElementById('pId').value = product.id
    }
    useEffect(() => {
        var url = window.location;
        var elements = document.querySelectorAll('ul.navbar-nav a')
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].href == url) {
                elements[i].classList.add('active')
            }
            else {
                elements[i].classList.remove('active')
            }
        }
        if (category != params.category) {
            setCategory(params.category)
            setState({
                productoViewModel: state.productoViewModel,
                finishFetch: false
            })
        }
        if (!state.finishFetch) {
            // let categoryName = document.location.pathname.split('/')[2]
            document.getElementsByClassName('loading')[0].style.visibility = "visible"
            fetch(Config.UrlApi + "api/products/" + (params.category ? params.category : ''))
                .then(response => response.json())
                .then(data => {
                    document.getElementsByClassName('loading')[0].style.visibility = "hidden"
                    setState({ productoViewModel: data, finishFetch: true })
                })
        }
    })
    const getProducts = () => {
        const { productoViewModel } = state;
        return (

            <div id="promoRow" className="row">

                {productoViewModel.map((product, index) => {
                    return (
                        <div id="promoCuadro" className="col col-md-3 promo">
                            <div className="contenedorPopUp">
                                <img id="promoImagen" className="promo center" src={product != null ? product.imagen : ''} alt="distribuidora" />
                                <div className="superposicion" onClick={onProductClick(index)} data-toggle="modal" data-target="#pModal" data-id={product.id} data-descripcion={product.nombre} data-imagen={product != null ? product.imagen : ''} data-precio={product.precio}>

                                </div>
                            </div>
                            <p className="text-center promo-tag">Producto</p>
                            <h3 className="text-center promo-precio ">${product.precio}</h3>
                            <h3 className="text-center promo-desc">{product.nombre}</h3>
                        </div>
                    )
                })
                } </div>)
    }


    return (
        <div>
            <div className="contenedor center">
                <img className="subTitle-marco" src="/img/marco.png" alt="Productos" />
                <h2 className="subTitle centrado">PRODUCTOS</h2>
            </div>
            <h3 className="estilo estilo-40 estilo-size-30">Haga click en los productos para agregar al carrito</h3>
            <img src="/img/felchaabajo.svg" alt="distribuidora" width="60px" className="center" />
            <div id="promoRow" className="row">
                {state.productoViewModel.length > 0 ? getProducts() : null}
            </div>

            <div className="modal fade" id="pModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Producto: <span></span></h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <img id="pImagenModal" className="promo center" src="" />
                            <input type="hidden" value="" id="pId" />
                            <input type="hidden" value="1" id="pTipo" />
                            <label className="col-form-label">Precio:</label>
                            <input type="text" className="form-control" id="pPrecio" />

                            <label className="col-form-label">Cantidad:</label>
                            <input type="number" className="form-control" id="modalCantidad" />


                        </div>
                        <div className="modal-footer">
                            <button id="btnp" type="button" onClick={agregarCarrito} className="center boton promo-button">Agregar al carrito</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Product
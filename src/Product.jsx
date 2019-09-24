import React, { useEffect, useState } from 'react'
import Config from './config'

const [state, setState] = useState({
    productoViewModel: []
})

useEffect(() => {
    var url = window.location;
    var elements = document.querySelectorAll('ul.navbar-nav a')
    for (let i = 0; i < elements.length; i++) {
        if (elements[i].href == url) {
            elements[i].classList.add('active')
        }
    }
    let categoryName = document.location.pathname.split('/')[2]
    fetch(Config.UrlApi + "api/products/" + (categoryName ? categoryName : ''))
        .then(response => response.json())
        .then(data => {
            setState(data)
        })
})
const Product = () => {
    const getProducts = () => {
        const { productoViewModel } = state;
        return (

            <div id="promoRow" className="row">

                {productoViewModel.map((product, index) => {
                    return (
                        <div id="promoCuadro" class="col col-md-3 promo">
                            <div class="contenedorPopUp">
                                <img id="promoImagen" class="promo center" src={product != null ? product.imagen : ''} alt="distribuidora" />
                                <div class="superposicion" data-toggle="modal" data-target="#pModal" data-id={product.id} data-descripcion={product.nombre} data-imagen={product != null ? product.imagen : ''} data-precio={product.precio}>

                                </div>
                            </div>
                            <p class="text-center promo-tag">Producto</p>
                            <h3 class="text-center promo-precio ">${product.precio}</h3>
                            <h3 class="text-center promo-desc">{product.precio}</h3>
                        </div>
                    )
                })
                } </div>)
    }


    return (
        <div>
            <div class="contenedor center">

                <img class="subTitle-marco" src="/img/marco.png" alt="Productos" />
                <h2 class="subTitle centrado">PRODUCTOS</h2>
            </div>
            <h3 class="estilo estilo-40 estilo-size-30">Haga click en los productos para agregar al carrito</h3>
            <img src="/img/felchaabajo.svg" alt="distribuidora" width="60px" class="center" />
            <div id="promoRow" class="row">
                {getProducts()}
            </div>

            <div class="modal fade" id="pModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Producto: <span></span></h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">

                            <img id="pImagenModal" class="promo center" src="" />
                            <input type="hidden" value="" id="pId" />
                            <input type="hidden" value="1" id="pTipo" />
                            <label class="col-form-label">Precio:</label>
                            <input type="text" class="form-control" id="pPrecio" readonly />

                            <label class="col-form-label">Cantidad:</label>
                            <input type="number" class="form-control" id="modalCantidad" value="0" />


                        </div>
                        <div class="modal-footer">
                            <button id="btnp" type="button" onclick="agregarCarrito()" class="center boton promo-button">Agregar al carrito</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Product
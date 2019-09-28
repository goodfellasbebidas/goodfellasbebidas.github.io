import React, { useEffect, useState } from 'react'
import { actualizarCarrito } from './functions'
import { Redirect, Link } from "react-router-dom";
const Promos = (props) => {
    const { promosViewModel } = props
    const [goToCart, setGoToCart] = useState(false)
    useEffect(() => {

    })

    const onPromoClick = index => event => {
        let promo = promosViewModel[index]
        document.querySelector('.modal-title > span').textContent = promo.descripcion
        document.getElementById('pImagenModal').src = promo.imagen
        document.getElementById('pImagenModal').textContent = promo.id
        document.getElementById('pPrecio').value = promo.precio.toFixed(2)
        document.getElementById('pPrecio').disabled = true;
        document.getElementById('btnp').textContent = 'Agregar al carrito'
        document.getElementById('btnp').onclick = agregarCarrito
        document.getElementById('modalCantidad').classList.remove('has-danger')
        document.getElementById('pId').value = promo.id
    }

    const ver4Promos = () => {
        let elements = document.querySelectorAll(".promo.oculto")
        for (let i = 0; i < 4; i++) {
            if (elements[i])
                elements[i].classList.remove('oculto')
        }
        if (document.querySelectorAll(".promo.oculto").length == 0)
            document.querySelector('.promo-button').remove()
    }
    const getPromos = () => {
        return (

            <div id="promoRow" className="row">

                {promosViewModel.map((promo, index) => {
                    return (
                        <div id="promoCuadro" className={index >= 0 && index < 4 ? "col col-md-3 promo" : "col col-md-3 promo oculto"}>
                            <div className="contenedorPopUp">
                                <img id="promoImagen" className="promo center" src={promo != null ? promo.imagen : ''} alt="distribuidora" />
                                <div className="superposicion" onClick={onPromoClick(index)} data-toggle="modal" data-target="#pModal" data-id={promo.id} data-descripcion={promo.descripcion} data-imagen={promo != null ? promo.imagen : ''} data-precio={promo.precio}></div>
                            </div>
                            <p className="text-center promo-tag">Promo</p>
                            <p className="text-center promo-precio ">{"$" + promo.precio}</p>
                            <p className="text-center promo-desc">{promo.descripcion}</p>
                        </div>
                    )
                })
                } </div>)
    }

    const agregarCarrito = () => {

        if (document.getElementById('modalCantidad').value < 1) {
            document.getElementById('modalCantidad').classList.add('has-danger')
            return;
        }
        if (document.getElementById('modalCantidad').value > 99999) {
            document.getElementById('modalCantidad').classList.add('has-danger')
            return;
        }
        let compra = {
            Tipo: parseInt(document.getElementById('pTipo').value),
            Id: parseInt(document.getElementById('pId').value),
            Cant: parseInt(document.getElementById('modalCantidad').value)
        } //Tipo 1 es Producto. Tipo 2 es Promo
        document.getElementById('carritonumero').innerText = parseInt(document.getElementById('carritonumero').innerText) + parseInt(document.getElementById('modalCantidad').value);
        //$('#pModal').modal('hide')
        document.getElementById('btnp').textContent = 'Ir al Carrito'
        document.getElementById('btnp').onclick = function () { setGoToCart(true) }
        // window.$('#btnp').text('Ir al Carrito')
        // window.$('#btnp').attr("onclick", "irCart()");

        document.getElementById('modalCantidad').value = 0;

        let compras = {}
        if (!window.Cookies.get('carrito')) {
            compras = {
                Items: []
            }
        }
        else {
            compras = JSON.parse(window.Cookies.get('carrito'))
        }

        compras.Items.push(compra)
        window.Cookies.set('carrito', compras)
        actualizarCarrito()
    }
if(goToCart){
    return <Redirect to='/cart' />
}
    return (
        <div>
            <div>
                <div className="contenedor center">
                    <img className="subTitle-marco" src="/img/marco.png" alt="Promo" />
                    <h2 className="subTitle centrado">PROMOS</h2>
                </div>

            </div>

            <div id="promos">
                <h3 className="estilo estilo-40 estilo-size-30">Haga click en las promos para agregar al carrito</h3>
                <img src="/img/felchaabajo.svg" alt="distribuidora" width="60px" className="center" />

                {getPromos()}


            </div>
            <div className="row justify-content-md-center">

                <div className="col-md-4">
                    <button className="center boton promo-button" onClick={ver4Promos}>
                        Ver más Promos
    </button>

                </div>
            </div>
            <h3 className="estilo">
                Si no encuentra lo que busca,
<p>puede revisar todo nuestro <Link to="/Productos">catálogo completo de productos online</Link></p>
            </h3>
            <div className="modal fade" id="pModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Promo: <span></span></h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">

                            <img id="pImagenModal" className="promo center" src="" alt="Promo" />
                            <input type="hidden" value="" id="pId" />
                            <input type="hidden" value="2" id="pTipo" />
                            <label className="col-form-label">Precio:</label>
                            <input type="text" className="form-control" id="pPrecio" />

                            <label className="col-form-label">Cantidad:</label>
                            {/* <input type="number" className="form-control" id="modalCantidad" value={cant} onChange={onChangeCant} /> */}
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

export default Promos
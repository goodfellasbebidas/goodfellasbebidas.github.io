import React, { useState } from 'react'
import { validateEmail } from './functionsW'

const CartConfirmModal = (props) => {
    const { cartViewModel } = props
    // const [linkhref, setLinkHref] = useState('')

    let monto = cartViewModel.total
    let linkhref
    const barrios1 = ['Villa Crespo', 'Caballito', 'Almagro', 'Boedo', 'Parque Chacabuco']
    const barrios2 = ['Palermo', 'Colegiales', 'Chacarita', 'La Paternal', 'Villa General Mitre', 'Flores', 'Recoleta', 'Balvanera', 'San Cristobal', 'Parque Patricios', 'Nueva Pompeya']
    const barrios3 = ['Belgrano', 'Villa Ortúzar', 'Parque Chas', 'Agronomía', 'Villa del Parque', 'Villa Santa Rita', 'Floresta', 'Parque Avellaneda', 'San Nicolás', 'Monserrat', 'Constitución']
    const barrios4 = ['Núñez', 'Saavedra', 'Coghlan', 'Villa Urquiza', 'Villa Pueyrredón', 'Villa Devoto', 'Villa Real', 'Monte Castro', 'Versalles', 'Villa Luro', 'Vélez Sarsfield', 'Liniers', 'Mataderos', 'Villa Lugano', 'Villa Soldati', 'Villa Riachuelo', 'Barracas', 'La Boca', 'San Telmo', 'Puerto Madero', 'Retiro']


    const isOptionDelivery = () => {
        return document.querySelector('input[name=radioOptions]:checked').value == '3'
    }

    const isOptionCompraOnline = () => {
        return document.querySelector('input[name=radioOptions]:checked').value == '2' || document.querySelector('input[name=radioOptions]:checked').value == '3'
    }
    function agregarDelivery(id) {


        var compra = { Tipo: 1, Id: id, Cant: 1 } //Tipo 1 es Producto. Tipo 2 es Promo


        var compras
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
    }
    function confirmarCompra() {
        var hasError
        if (document.getElementById('cartNombre').value == '') {
            document.getElementById('cartNombre').classList.add('has-danger')
            hasError = true
        }
        else
            document.getElementById('cartNombre').classList.remove('has-danger')

        if (document.getElementById('cartApellido').value == '') {
            document.getElementById('cartApellido').classList.add('has-danger')
            hasError = true
        }
        else
            document.getElementById('cartApellido').classList.remove('has-danger')

        if (!validateEmail(document.getElementById('cartMail').value)) {
            document.getElementById('cartMail').classList.add('has-danger')
            hasError = true
        }
        else
            document.getElementById('cartMail').classList.remove('has-danger')

        if (document.getElementById('cartTel').value == 0 || document.getElementById('cartTel').value.length < 8) {
            document.getElementById('cartTel').classList.add('has-danger')
            hasError = true
        }
        else
            document.getElementById('cartTel').classList.remove('has-danger')

        if (isOptionDelivery()) {
            if (document.getElementById('cartDireccion').value == '') {
                document.getElementById('cartDireccion').classList.add('has-danger')
                hasError = true
            }
            else
                document.getElementById('cartDireccion').classList.remove('has-danger')
        }



        if (hasError) {
            // $("#CartModal").animate({ scrollTop: 0 }, "slow");
            return
        }
        else {
            if (isOptionDelivery()) {
                fetch(linkhref)
                    .then(response => response.json())
                    .then(data => {

                        if (data.location.address.country != "Argentina") {
                            alert('No se hacen envios fuera de Argentina')
                            return;
                        }
                        if (data.location.address.state == 'Ciudad Autónoma de Buenos Aires' || data.location.address.state == "Buenos Aires Autonomous City") {
                            if (monto < 6000) {
                                if (barrios1.filter(x => x == data.location.address.district).length == 0) {
                                    if (barrios2.filter(x => x == data.location.address.district).length > 0) {
                                        if (monto < 700) {
                                            alert('Para hacer envios a ' + data.location.address.district + ' la compra debe ser mayor o igual a $700')
                                        }
                                        else if (window.confirm("El envio a " + data.location.address.district + " tiene un costo adiccional de $50. ¿Desea Continuar?")) {
                                            agregarDelivery(176)
                                            crearVenta()
                                        }
                                    }
                                    else if (barrios3.filter(x => x == data.location.address.district).length > 0) {
                                        if (monto < 1500) {
                                            alert('Para hacer envios a ' + data.location.address.district + ' la compra debe ser mayor o igual a $1500')
                                        }
                                        else if (window.confirm("El envio a " + data.location.address.district + " tiene un costo adiccional de $150. ¿Desea Continuar?")) {
                                            agregarDelivery(177)
                                            crearVenta()
                                        }
                                    }
                                    else if (barrios4.filter(x => x == data.location.address.district).length > 0) {
                                        if (monto < 2500) {
                                            alert('Para hacer envios a ' + data.location.address.district + ' la compra debe ser mayor o igual a $2500')
                                        }
                                        else if (window.confirm("El envio a " + data.location.address.district + " tiene un costo adiccional de $250. ¿Desea Continuar?")) {
                                            agregarDelivery(178)
                                            crearVenta()
                                        }
                                    }
                                    else {
                                        alert('No se encontró el barrio')
                                    }

                                }
                                else {
                                    agregarDelivery(175)
                                    crearVenta()
                                }
                            }
                            else {
                                agregarDelivery(175)
                                crearVenta()
                            }


                        }
                        else {
                            alert('No se hacen envios fuera de CABA')
                        }


                    })

            }
            else {
                crearVenta()
            }

        }


    }
    function direccionChange(value) {
        fetch("https://places.api.here.com/places/v1/discover/search?q=' + document.getElementById('cartDireccion').value + '&app_id=RBHSaqIhcPXzNhDE0iiA&app_code=8SEeYHdSPZkG77xmTnCCzA&at=-35.9303,-58.2873'")
            .then(response => response.json())
            .then(data => {
                try {
                    var iframe = document.getElementById('mapaCart')

                    iframe.src = 'https://maps.google.com/maps?width=100%&height=600&hl=es&coord=' + data.results.items[0].position[0] + ',' + data.results.items[0].position[1] + '&q=+(' + data.results.items[0].title + ', ' + data.results.items[0].vicinity + ' )&ie=UTF8&t=&z=14&iwloc=B&output=embed'
                    document.querySelector('#CartModal button.oculto').classList.remove('oculto')
                    linkhref = data.results.items[0].href
                } catch (e) {
                    iframe.src = 'https://maps.google.com/maps?width=100%&height=600&hl=es&q=&ie=UTF8&t=&z=15&iwloc=B&output=embed'
                    document.querySelector('#CartModal button').classList.add('oculto')
                }
            })

    }
    const radioOptionsChange = (e) => {
        if (isOptionDelivery()) {
            document.querySelector('#cartDireccion').value = ''
            direccionChange('')

            document.querySelector('.direccion').style.display = 'block'
        }
        else {
            document.querySelector('#CartModal button.oculto').classList.remove('oculto')
            document.querySelector('.direccion').style.display = 'none'
        }
    }

    return (
        <div className="modal fade" id="CartModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Confirmar Compra ${cartViewModel.total}<span></span></h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Nombre</label>
                                <input id="cartNombre" className="form-control" placeholder="Nombre" />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Apellido</label>
                                <input id="cartApellido" className="form-control" placeholder="Apellido" />
                            </div>
                        </div>

                        <div className="form-group ">
                            <label>E-Mail</label>
                            <input id="cartMail" className="form-control" placeholder="E-Mail" type="email" />
                        </div>
                        <div className="form-group">
                            <label>Telefono / Celular</label>
                            <input id="cartTel" className="form-control" placeholder="Telefono / Celular" type="number" />
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="radioOptions" onClick={radioOptionsChange} id="inlineRadio1" value="1" />
                            <label className="form-check-label" htmlFor="inlineRadio1">Pagar Efectivo y retirar en el local ( - 10% Descuento )</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="radioOptions" onClick={radioOptionsChange} id="inlineRadio2" value="2" />
                            <label className="form-check-label" htmlFor="inlineRadio2">Pagar online y retirar en el local</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="radioOptions" onClick={radioOptionsChange} id="inlineRadio3" value="3" />
                            <label className="form-check-label" htmlFor="inlineRadio3">Pagar online y delivery</label>
                        </div>
                        <div className=" direccion form-row">
                            <div className="form-group col-md-6">
                                <label>Dirección</label>
                                <input id="cartDireccion" className="form-control" placeholder="Ej: Ambrosetti 568, CABA" />
                                {/* onInput="direccionChange(this.value)" */}
                            </div>
                            <div className="form-group col-md-3">
                                <label>Piso</label>
                                <input id="cartPiso" className="form-control" placeholder="Ej: PB o 2" title="Ej: PB o 2" />
                            </div>
                            <div className="form-group col-md-3">
                                <label>Departamento</label>
                                <input id="cartDepto" className="form-control" placeholder="Ej: 1 o A " title="Ej: 1 o A " />
                            </div>

                            <iframe id="mapaCart" width="100%" height="300"
                                src="https://maps.google.com/maps?width=100%&height=600&hl=es&q=&ie=UTF8&t=&z=15&iwloc=B&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="center boton promo-button confirmar oculto" >Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
// onClick={confirmarCompra}

export default CartConfirmModal
import React, { useEffect, useState } from 'react'
import CartConfirmDelivery from './CartConfirmDelivery'
import CartConfirmModal from './CartConfirmModal'
import Config from './config'
const Cart = () => {

    const [state, setState] = useState({ cartViewModel: {}, finishFetch: false })
    const removeItemCart = (tipo, id) => e => {
        let compras = {}
        compras = JSON.parse(window.Cookies.get('carrito'))
        compras.Items = compras.Items.filter(function (value, index, arr) {

            return !(value.Tipo == tipo && value.Id == id)

        });
        window.Cookies.set('carrito', compras)
        window.location.href = "/Cart"
    }

    useEffect(() => {

        if (!state.finishFetch) {
            document.getElementsByClassName('loading')[0].style.visibility = "visible"
            var myHeaders = new Headers();
            myHeaders.append("carrito", window.Cookies.get('carrito'))
            fetch(Config.UrlApi + "api/cart/", { headers: myHeaders })
                .then(response => response.json())
                .then(data => {
                    document.getElementsByClassName('loading')[0].style.visibility = "hidden"
                    setState({ cartViewModel: data, finishFetch: true })
                })
        }

    }, [])

    const getTable = () => {
        const { cartViewModel } = state
        return (
            <div>
                <table className="table cart">
                    <thead>
                        <tr>
                            <th scope="col"></th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Precio c/u</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartViewModel.promos ? cartViewModel.promos.map((promo, index) => {
                            return (
                                <tr key={promo.Id}>
                                    <th scope="row"><span onClick={removeItemCart(2, promo.id)}>x</span></th>
                                    <td><div>{promo.descripcion}<img className="promo center" src={promo != null ? promo.imagen : ''} alt="Promo" /></div></td>
                                    <td>{promo.cantidad}</td>
                                    <td>${promo.precio}</td>
                                </tr>
                            )
                        }) : null}
                        {cartViewModel.productos ? cartViewModel.productos.map((producto, index) => {
                            return (
                                <tr key={producto.Id}>
                                    <th scope="row"><span onClick={removeItemCart(1, producto.id)}>x</span></th>
                                    <td><div>{producto.descripcion}<img className="promo center" src={producto != null ? producto.imagen : ''} alt="Producto" /></div></td>
                                    <td>{producto.cantidad}</td>
                                    <td>${producto.precio}</td>
                                </tr>
                            )
                        }) : null}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th scope="row"></th>
                            <td> </td>
                            <td>Total: </td>
                            <td>${cartViewModel.total}</td>
                        </tr>
                    </tfoot>
                </table>
                <button type="button" className=" boton promo-button" data-toggle="modal" data-target="#CartModal">Continuar</button>
            </div>
        )
    }
    const getModals = () => {
        return (<div>
            <CartConfirmModal cartViewModel={state.cartViewModel} />
            <CartConfirmDelivery cartViewModel={state.cartViewModel} />
        </div>)
    }



    return (
        <div>
            <div className="contenedor center">
                <img className="subTitle-marco" src="/img/marco.png" alt="Carrito" />
                <h2 className="subTitle centrado">COMPRAS</h2>
            </div>
            <div className="container">
                <div className="col col-md-12">
                    <div className="table-responsive">
                        {state.cartViewModel.hasItems ? getTable() : <p className="white">No hay productos agregados al carrito</p>}
                        {state.cartViewModel.hasItems ? getModals() : null}
                    </div>
                </div>
            </div >
        </div>


    )
}

export default Cart;
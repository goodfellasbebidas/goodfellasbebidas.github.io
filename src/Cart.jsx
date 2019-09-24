import React, { useEffect, useState } from 'react'
import CartConfirmDelivery from './CartConfirmDelivery'
import CartConfirmModal from './CartConfirmModal'
import Config from './config'
const Cart = () => {

    const [state, setState] = useState({ cartViewModel: { hasItems: false, productos: [], promos: [], total: 0.00 }, finishFetch: false })

    useEffect(() => {
        console.log(state.finishFetch)
        if (!state.finishFetch) {
            document.getElementsByClassName('loading')[0].style.visibility = "visible"
            fetch(Config.UrlApi + "api/cart/")
                .then(response => response.json())
                .then(data => {
                    document.getElementsByClassName('loading')[0].style.visibility = "hidden"
                    setState({ cartViewModel: data, finishFetch: true })
                })
        }
    })


    const getModals = () => {
        return (<div>
            <CartConfirmModal cartViewModel={state.cartViewModel} />
            <CartConfirmDelivery cartViewModel={state.cartViewModel} />
        </div>)
    }



    return (
        <div>
            <div className="contenedor center">
                <img className="subTitle-marco" src="/Img/marco.png" alt="Carrito" />
                <h2 className="subTitle centrado">COMPRAS</h2>
            </div>
            <div className="container">
                <div className="col col-md-12">
                    <div className="table-responsive">
                        hrdhdhdhrd
                        rdhdhdr
                        dgdsrhrdhjrd
                        {state.cartViewModel.hasItems ? getModals() : null}
                    </div>
                </div>
            </div >
        </div>


    )
}

export default Cart;
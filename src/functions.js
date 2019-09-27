
export const isOptionDelivery = () => {
    return document.querySelector('input[name=radioOptions]:checked').value == '3'
}

export const isOptionCompraOnline = () => {
    return document.querySelector('input[name=radioOptions]:checked').value == '2' || document.querySelector('input[name=radioOptions]:checked').value == '3'
}

export const agregarCarrito = () => {

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
    document.getElementById('btnp').onclick = function () { window.location.href = '/cart' }
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

export const actualizarCarrito = () => {
    if (!window.Cookies.get('carrito')) {
        document.getElementById('carritonumero').innerText = 0
    }
    else {
        let cantidad = 0
        let carrito = JSON.parse(window.Cookies.get('carrito'))
        let i;
        for (i = 0; i < carrito.Items.length; i++) {
            cantidad = cantidad + parseInt(carrito.Items[i].Cant)
        }
        document.getElementById('carritonumero').innerText = cantidad
    }
}

export const cerrarDescargarPrecios = (e) => {
    document.querySelector('#descargarprecios').remove()
}

// export const getParameterByName = (name) => {
//     name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
//     let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
//         results = regex.exec(location.search);
//     return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
// }
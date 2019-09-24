


window.$(document).ready(function () {
    // marcarItemMenu()
    // $("#idForm").submit(function (e) {

    //     e.preventDefault();

    //     var form = $(this);
    //     var url = 'Contacto/Send'
    //     $('.loading').css('visibility', 'visible');
    //     $.ajax({
    //         type: "POST",
    //         url: url,
    //         data: form.serialize(),
    //         success: function (data) {
    //             document.getElementById("idForm").reset();
    //             $('.loading').css('visibility', 'hidden');
    //             alert('El Mensaje Se Envió Con Exito');

    //         },
    //         error: function (data) {
    //             $('.loading').css('visibility', 'hidden');
    //             alert('Hubo Un Error. Intente Más Tarde.');
    //         }
    //     });


    // });
    window.$('#pModal').on('show.bs.modal', function (event) {
        var button = window.$(event.relatedTarget)
        var descripcion = button.data('descripcion')
        var imagen = button.data('imagen')
        var precio = button.data('precio')
        var id = button.data('id')

        var modal = window.$(this)
        modal.find('.modal-title > span').text(descripcion)
        modal.find('#pImagenModal').attr('src', imagen);
        modal.find('#pId').val(id)
        modal.find('#pPrecio').val(precio)
        window.$('#btnp').text('Agregar al carrito')
        window.$('#btnp').attr("onclick", "agregarCarrito()");
    })

    // ver4Promos()
    // actualizarCarrito()
    window.$('.loading').css('visibility', 'hidden');
});
// function marcarItemMenu() {
//     var url = window.location;
//     var element = $('ul.navbar-nav a').filter(function () {
//         return this.href == url;
//     }).addClass('active').parent();
// }

// function cerrarDescargarPrecios() {
//     $('#descargarprecios').hide()
// }
function descargarPrecios() {
    window.location.href = "/Home/DownloadFile"
}
// function actualizarCarrito() {
//     if (!Cookies.get('carrito')) {
//         document.getElementById('carritonumero').innerText = 0
//     }
//     else {
//         var cantidad = 0
//         var carrito = JSON.parse(Cookies.get('carrito'))
//         var i;
//         for (i = 0; i < carrito.Items.length; i++) {
//             cantidad = cantidad + parseInt(carrito.Items[i].Cant)
//         }
//         document.getElementById('carritonumero').innerText = cantidad
//     }
// }
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
function agregarCarrito() {

    if (document.getElementById('modalCantidad').value < 1) {
        document.getElementById('modalCantidad').classList.add('has-danger')
        return;
    }
    if (document.getElementById('modalCantidad').value > 99999) {
        document.getElementById('modalCantidad').classList.add('has-danger')
        return;
    }
    var compra = { Tipo: parseInt(document.getElementById('pTipo').value), Id: parseInt(document.getElementById('pId').value), Cant: parseInt(document.getElementById('modalCantidad').value) } //Tipo 1 es Producto. Tipo 2 es Promo
    document.getElementById('carritonumero').innerText = parseInt(document.getElementById('carritonumero').innerText) + parseInt(document.getElementById('modalCantidad').value);
    //$('#pModal').modal('hide')
    $('#btnp').text('Ir al Carrito')
    $('#btnp').attr("onclick", "irCart()");

    document.getElementById('modalCantidad').value = 0;

    var compras
    if (!Cookies.get('carrito')) {
        compras = {
            Items: []
        }
    }
    else {
        compras = JSON.parse(Cookies.get('carrito'))
    }

    compras.Items.push(compra)
    Cookies.set('carrito', compras)
    actualizarCarrito()
}

function irCart() {
    window.location.href = "/Cart"
}
function removeItemCart(tipo, id) {
    compras = JSON.parse(Cookies.get('carrito'))
    compras.Items = compras.Items.filter(function (value, index, arr) {
        return !(value.Tipo == tipo && value.Id == id)
    });
    Cookies.set('carrito', compras)
    window.location.href = "/Cart"
}


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


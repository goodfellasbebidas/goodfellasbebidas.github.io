var linkhref
var barrios1 = ['Villa Crespo', 'Caballito', 'Almagro', 'Boedo', 'Parque Chacabuco']
var barrios2 = ['Palermo', 'Colegiales', 'Chacarita', 'La Paternal', 'Villa General Mitre', 'Flores', 'Recoleta', 'Balvanera', 'San Cristobal', 'Parque Patricios', 'Nueva Pompeya']
var barrios3 = ['Belgrano', 'Villa Ortúzar', 'Parque Chas', 'Agronomía', 'Villa del Parque', 'Villa Santa Rita', 'Floresta', 'Parque Avellaneda', 'San Nicolás', 'Monserrat', 'Constitución']
var barrios4 = ['Núñez', 'Saavedra', 'Coghlan', 'Villa Urquiza', 'Villa Pueyrredón', 'Villa Devoto', 'Villa Real', 'Monte Castro', 'Versalles', 'Villa Luro', 'Vélez Sarsfield', 'Liniers', 'Mataderos', 'Villa Lugano', 'Villa Soldati', 'Villa Riachuelo', 'Barracas', 'La Boca', 'San Telmo', 'Puerto Madero', 'Retiro']

$(document).ready(function () {
    $('.direccion').hide();
    $("input[name=radioOptions]").click(function () {
        
        if (isOptionDelivery()) {
            document.querySelector('#cartDireccion').value = ''
            direccionChange('')
            $('.direccion').show();
        }
        else {
            $('#CartModal button.oculto').removeClass('oculto')
            $('.direccion').hide();
        }
        
    });
});

function isOptionDelivery() {
    return document.querySelector('input[name=radioOptions]:checked').value == '3'
}

function isOptionCompraOnline() {
    return document.querySelector('input[name=radioOptions]:checked').value == '2' || document.querySelector('input[name=radioOptions]:checked').value == '3'
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
        $("#CartModal").animate({ scrollTop: 0 }, "slow");
        return
    }
    else {
        if (isOptionDelivery()) {
            $.ajax({
                url: linkhref,

                success: function (data, status) {

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
                                    else if (confirm("El envio a " + data.location.address.district + " tiene un costo adiccional de $50. ¿Desea Continuar?")) {
                                        agregarDelivery(176)
                                        crearVenta()
                                    }
                                }
                                else if (barrios3.filter(x => x == data.location.address.district).length > 0) {
                                    if (monto < 1500) {
                                        alert('Para hacer envios a ' + data.location.address.district + ' la compra debe ser mayor o igual a $1500')
                                    }
                                    else if (confirm("El envio a " + data.location.address.district + " tiene un costo adiccional de $150. ¿Desea Continuar?")) {
                                        agregarDelivery(177)
                                        crearVenta()
                                    }
                                }
                                else if (barrios4.filter(x => x == data.location.address.district).length > 0) {
                                    if (monto < 2500) {
                                        alert('Para hacer envios a ' + data.location.address.district + ' la compra debe ser mayor o igual a $2500')
                                    }
                                    else if (confirm("El envio a " + data.location.address.district + " tiene un costo adiccional de $250. ¿Desea Continuar?")) {
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


                }
            });
        }
        else {
            crearVenta()
        }
        
    }


}
function direccionChange(value) {
    $.ajax({
        url: 'https://places.api.here.com/places/v1/discover/search?q=' + document.getElementById('cartDireccion').value + '&app_id=RBHSaqIhcPXzNhDE0iiA&app_code=8SEeYHdSPZkG77xmTnCCzA&at=-35.9303,-58.2873',

        success: function (data, status) {
            try {
                var iframe = document.getElementById('mapaCart')
                linkhref = data.results.items[0].href
                iframe.src = 'https://maps.google.com/maps?width=100%&height=600&hl=es&coord=' + data.results.items[0].position[0] + ',' + data.results.items[0].position[1] + '&q=+(' + data.results.items[0].title + ', ' + data.results.items[0].vicinity + ' )&ie=UTF8&t=&z=14&iwloc=B&output=embed'
                $('#CartModal button.oculto').removeClass('oculto')
                $("#CartModal").animate({ scrollTop: $("#CartModal").height() }, "slow");
            } catch (e) {
                iframe.src = 'https://maps.google.com/maps?width=100%&height=600&hl=es&q=&ie=UTF8&t=&z=15&iwloc=B&output=embed'
                $('#CartModal button').addClass('oculto')
            }

        }
    });
}
function buscarDireccion() {
    $.ajax({
        url: 'https://places.api.here.com/places/v1/discover/search?q=' + document.getElementById('cartDireccion').value + '&app_id=RBHSaqIhcPXzNhDE0iiA&app_code=8SEeYHdSPZkG77xmTnCCzA&at=-35.9303,-58.2873',

        success: function (data, status) {
            var iframe = document.getElementById('mapaCart')

            iframe.src = 'https://maps.google.com/maps?width=100%&height=600&hl=es&coord=' + data.results.items[0].position[0] + ',' + data.results.items[0].position[1] + '&q=+(' + data.results.items[0].title + ', ' + data.results.items[0].vicinity + ' )&ie=UTF8&t=&z=14&iwloc=B&output=embed'
            $('#CartModal button.oculto').removeClass('oculto')
            $("#CartModal").animate({ scrollTop: $("#CartModal").height() }, "slow");
        }
    });

}
function agregarDelivery(id) {


    var compra = { Tipo: 1, Id: id, Cant: 1 } //Tipo 1 es Producto. Tipo 2 es Promo


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
}
function crearVenta() {
    var request = {}
    request.Contacto = {}
    request.Contacto.Nombre = document.getElementById('cartNombre').value
    request.Contacto.Apellido = document.getElementById('cartApellido').value
    request.Contacto.Email = document.getElementById('cartMail').value
    request.Contacto.Telefono = document.getElementById('cartTel').value
    if (isOptionDelivery()) {
        request.Direccion = document.getElementById('cartDireccion').value + ' Piso: ' + document.getElementById('cartPiso').value + ' Depto: ' + document.getElementById('cartDepto').value
        request.LinkGoogleMaps = document.getElementById('mapaCart').src
    }
    request.ReturnMercadoPagoLink = isOptionCompraOnline()
    request.Tipo = 3 
    request.Estado = isOptionCompraOnline() ? 2 : 1; 
    request.Promos = JSON.parse(Cookies.get('carrito')).Items.filter(function (value) { return value.Tipo == 2 }).map(function (value) { return { Id: value.Id, Cantidad: value.Cant } })
    request.Productos = JSON.parse(Cookies.get('carrito')).Items.filter(function (value) { return value.Tipo == 1 }).map(function (value) { return { Id: value.Id, Cantidad: value.Cant } })

    Cookies.set('venta', JSON.stringify(request))
    $('.loading').css('visibility', 'visible');
    $('#CartModal').modal('hide');
    var url = isOptionDelivery() ? '/cart/crearventaenvio': '/cart/crearventa' ; 
    $.ajax({
        url: url ,
        method: 'POST',

        success: function (data, status) {
            $('.loading').css('visibility', 'hidden');
            Cookies.remove('venta')
            Cookies.remove('carrito')
            if (isOptionCompraOnline())
                location.href = JSON.parse(data).linkMP
            else {
                alert("Se hizo la reserva con exito. Acerquese al local y con su mail retire los productos.")
                location.href = '/'
            }
                

        },
        error: function (data) {
            alert("Hubo un error. Vuelva a intentarlo más tarde.")
            $('.loading').css('visibility', 'hidden');
        }
    });
}

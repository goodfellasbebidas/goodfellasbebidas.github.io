import React from 'react'

const Product = () => {


    return (
        <div>
            <div class="contenedor center">

                <img class="subTitle-marco" src="/img/marco.png" alt="Productos" />
                <h2 class="subTitle centrado">PRODUCTOS</h2>
            </div>
            <h3 class="estilo estilo-40 estilo-size-30">Haga click en los productos para agregar al carrito</h3>
            <img src="/img/felchaabajo.svg" alt="distribuidora" width="60px" class="center" />
            <div id="promoRow" class="row">



56i6tit6i





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
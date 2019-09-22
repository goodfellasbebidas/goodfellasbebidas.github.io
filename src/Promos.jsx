import React,{useEffect} from 'react'


const Promos = (props) => {
    const { promosViewModel } = props
    useEffect(() => {
        
    })
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
                        <div id="promoCuadro" className= {index >= 0 && index < 4? "col col-md-3 promo": "col col-md-3 promo oculto"}>
                            <div className="contenedorPopUp">
                                <img id="promoImagen" className="promo center" src={promo != null ? promo.imagen : ''} alt="distribuidora" />
                                <div className="superposicion" data-toggle="modal" data-target="#pModal" data-id={promo.id} data-descripcion={promo.descripcion} data-imagen={promo != null ? promo.imagen : ''} data-precio={promo.precio}></div>
                            </div>
                            <p className="text-center promo-tag">Promo</p>
                            <p className="text-center promo-precio ">{"$" + promo.precio}</p>
                            <p className="text-center promo-desc">{promo.descripcion}</p>
                        </div>
                    )
                })
                } </div>)
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
<p>puede revisar todo nuestro <a href="/Productos" title="Todos Productos Online">catálogo completo de productos online</a></p>
            </h3>
            <div className="modal fade" id="pModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                            <input type="text" className="form-control" id="pPrecio" readonly />

                            <label className="col-form-label">Cantidad:</label>
                            <input type="number" className="form-control" id="modalCantidad" value="0" />

                        </div>
                        <div className="modal-footer">
                            <button id="btnp" type="button" onclick="agregarCarrito()" className="center boton promo-button">Agregar al carrito</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Promos
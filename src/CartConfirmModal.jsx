import React from 'react'

const CartConfirmModal = (props) => {
    const { cartViewModel } = props
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
                            <input className="form-check-input" type="radio" name="radioOptions" id="inlineRadio1" value="1" />
                            <label className="form-check-label" htmlFor="inlineRadio1">Pagar Efectivo y retirar en el local ( - 10% Descuento )</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="radioOptions" id="inlineRadio2" value="2" />
                            <label className="form-check-label" htmlFor="inlineRadio2">Pagar online y retirar en el local</label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="radioOptions" id="inlineRadio3" value="3" />
                            <label className="form-check-label" htmlFor="inlineRadio3">Pagar online y delivery</label>
                        </div>
                        <div className=" direccion form-row">
                            <div className="form-group col-md-6">
                                <label>Dirección</label>
                                <input id="cartDireccion" className="form-control" placeholder="Ej: Ambrosetti 568, CABA"  />
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
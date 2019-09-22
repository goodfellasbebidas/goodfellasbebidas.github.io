import React, {useEffect} from 'react'


const Contact = () => {

    const sendMessage = () => {

    }
    useEffect(()=>{

    })
    return (
        <div>
            <div class="contenedor center">

                <img class="subTitle-marco" src="/Img/marco.png" alt="Contacto" />
                <h2 class="subTitle centrado">CONTACTO</h2>
            </div>

            <h3 class="estilo estilo-40">Envíenos su consulta y le estaremos respondiendo pronto </h3>
            <form id="idForm">
                <div class="row justify-content-md-center contacto">
                    <div class="col-lg-4 col-md-5">
                        <div class="form-group">
                            <label>Nombre</label>
                            <input type="text" class="form-control contacto-campo" placeholder="Nombre" asp-for="Nombre" name="Nombre" />
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" class="form-control contacto-campo" placeholder="Email" asp-for="Email" name="Email" />
                        </div>
                        <div class="form-group">
                            <label>Celular</label>
                            <input type="tel" class="form-control contacto-campo" placeholder="Celular" asp-for="Telefono" name="Telefono" />
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-5 justify-content-md-center">
                        <div class="form-group">
                            <label>Mensaje</label>
                            <textarea class="form-control contacto-campo" placeholder="Mensaje" name="Mensaje" asp-for="Mensaje"></textarea>
                        </div>
                        <div>
                            <button type="submit" class=" contacto-enviar ">Enviar Mensaje</button>
                            <a href="https://api.whatsapp.com/send?phone=541162912507" target="_blank" title="WhatsApp">
                                <div>
                                    <img class="whatsapp" src="/Img/whatsapp-min.png" alt="WhatsApp" />
                                    <h3 class="inline-block">También nos podes contactar por WhatsApp</h3>
                                </div>
                            </a>
                        </div>

                    </div>
                </div>
            </form>
        </div>
    )
}

export default Contact
import React, { useEffect } from 'react'
import Config from './config'


const Contact = () => {

    const sendMessage = (e) => {
        e.preventDefault();
        document.getElementsByClassName('loading')[0].style.visibility = "visible";

        const data = {
            nombre: document.querySelector('form input[name=Nombre]').value,
            email: document.querySelector('form input[name=Email]').value,
            telefono: document.querySelector('form input[name=Telefono]').value,
            mensaje: document.querySelector('form textarea[name=Mensaje]').value
        }

        fetch(Config.UrlApi + "api/contact/", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                document.getElementsByClassName('loading')[0].style.visibility = "hidden"

                if (response.status == 200) {
                    document.getElementById("idForm").reset();
                    alert('El Mensaje Se Envió Con Exito');
                }
                else {
                    alert('Hubo Un Error. Intente Más Tarde.');
                }
            })

    }
    useEffect(() => {

    })
    return (
        <div>
            <div className="contenedor center">

                <img className="subTitle-marco" src="/img/marco.png" alt="Contacto" />
                <h2 className="subTitle centrado">CONTACTO</h2>
            </div>

            <h3 className="estilo estilo-40">Envíenos su consulta y le estaremos respondiendo pronto </h3>
            <form id="idForm" onSubmit={sendMessage}>
                <div className="row justify-content-md-center contacto">
                    <div className="col-lg-4 col-md-5">
                        <div className="form-group">
                            <label>Nombre</label>
                            <input type="text" className="form-control contacto-campo" placeholder="Nombre" asp-for="Nombre" name="Nombre" />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control contacto-campo" placeholder="Email" asp-for="Email" name="Email" />
                        </div>
                        <div className="form-group">
                            <label>Celular</label>
                            <input type="tel" className="form-control contacto-campo" placeholder="Celular" asp-for="Telefono" name="Telefono" />
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-5 justify-content-md-center">
                        <div className="form-group">
                            <label>Mensaje</label>
                            <textarea className="form-control contacto-campo" placeholder="Mensaje" name="Mensaje" asp-for="Mensaje"></textarea>
                        </div>
                        <div>
                            <button type="submit" className=" contacto-enviar ">Enviar Mensaje</button>
                            <a href="https://api.whatsapp.com/send?phone=541162912507" target="_blank" title="WhatsApp">
                                <div>
                                    <img className="whatsapp" src="/Img/whatsapp-min.png" alt="WhatsApp" />
                                    <h3 className="inline-block">También nos podes contactar por WhatsApp</h3>
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
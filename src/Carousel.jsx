import React, { useEffect } from 'react'


const Carousel = (props) => {


    const { carrouselViewModel } = props
    const getCarrouselIndicators = () => {
        return (
            <ul className="carousel-indicators">

                {carrouselViewModel.map((item, index) => {
                    return <li key={index} data-target="#demo" data-slide-to={index} className={index == 0 ? "active" : ""}></li>
                })
                } </ul>)
    }

    const getCarrouselItems = () => {
        return (
            <div className="carousel-inner ">
                {
                    carrouselViewModel.map((item, index) => {
                        return <div className={index == 0 ? "carousel-item active justify-content-center" : "carousel-item justify-content-center"}>
                            <img src={item != null ? item.imagen : ''} alt="Carrousel GoodFellas" />
                        </div>
                    })

                }

            </div>
        )
    }
    return (
        <div id="demo" className="carousel slide" data-ride="carousel">

            {carrouselViewModel.length > 0 ? getCarrouselIndicators() : <ul className="carousel-indicators"></ul>}

            {carrouselViewModel.length > 0 ? getCarrouselItems() : <div className="carousel-inner "></div>}

            <a className="carousel-control-prev" href="#demo" data-slide="prev" title="Anterior">
                <span className="carousel-control-prev-icon"></span>
            </a>
            <a className="carousel-control-next" href="#demo" data-slide="next" title="Siguiente">
                <span className="carousel-control-next-icon"></span>
            </a>

        </div >
    )
}
export default Carousel
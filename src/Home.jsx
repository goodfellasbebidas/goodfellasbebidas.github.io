import React, { useEffect, useState } from 'react'
import Contact from './Contact'
import Carousel from './Carousel'
import Promos from './Promos'
import Config from './config'
const Home = () => {

    const [state, setState] = useState({
        carrouselViewModel: [],
        promosViewModel: [],
        finishFetch: false
    })
    useEffect(() => {
        let url = window.location;
        let elements = document.querySelectorAll('ul.navbar-nav a')
        for (let i = 0; i < elements.length; i++) {
            if (elements[i].href == url) {
                elements[i].classList.add('active')
            }
            else {
                elements[i].classList.remove('active')
            }
        }
        if (!state.finishFetch) {
            document.getElementsByClassName('loading')[0].style.visibility = "visible"

            fetch(Config.UrlApi + "api/home")
                .then(response => response.json())
                .then(data => {
                    document.getElementsByClassName('loading')[0].style.visibility = "hidden"

                    setState({ ...data, finishFetch: true })
                })
        }

    })



    return (
        <div>
            <Carousel carrouselViewModel={state.carrouselViewModel} />
            <Contact />
            <Promos promosViewModel={state.promosViewModel} />
        </div>
    )
}
export default Home
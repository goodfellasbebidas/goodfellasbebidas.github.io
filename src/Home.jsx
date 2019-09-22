import React, { useEffect, useState } from 'react'
import Contact from './Contact'
import Carousel from './Carousel'
import Promos from './Promos'
const Home = () => {

    const [state, setState] = useState({
        carrouselViewModel: [],
        promosViewModel: []
    })
    useEffect(() => {
        var url = window.location;
        var elements = document.querySelectorAll('ul.navbar-nav a')
        for(let i = 0; i < elements.length; i++){
            if(elements[i].href == url){
                elements[i].classList.add('active')
            }
        }
        fetch("http://localhost:54930/api/home")
            .then(response => response.json())
            .then(data => {
                setState(data)
            })
    })

    

    return (
        <div>
            <Carousel carrouselViewModel= {state.carrouselViewModel}/>
            <Contact />
            <Promos promosViewModel={state.promosViewModel}/>
        </div>
    )
}
export default Home
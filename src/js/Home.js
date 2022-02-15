import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';


const Home = (props) => {


    useEffect(() => {

        document.getElementsByClassName('menu')[0].classList.add("darker")
        document.getElementsByClassName('cp-text')[0].style.color = 'white'


        d3.select('svg').remove()
        d3.select(".main").style("opacity", 1);

        return () => {
            document.getElementsByClassName('menu')[0].classList.remove("darker")
            document.getElementsByClassName('cp-text')[0].style.color = 'black'

        }
    }, []);
    
    console.log(props);

    return null
}

export default Home;
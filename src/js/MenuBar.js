import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import '../css/menubar.css'

const MenuBar = (props) => {

    console.log(props);

    const [path, setPath] = useState(location.pathname);

    const [data, setData] = useState([
        {
            name: 'Home',
            value: '/'
        }, {
            name: 'Bar chart',
            value: '/bar'
        },
        {
            name: 'Histogram chart',
            value: '/histogram'
        },
        {
            name: 'Scatter Plot',
            value: '/scatter'
        }
    ]);

    useEffect(() => {
        window.addEventListener('locationchange', function(){
            console.log(location.pathname);
        })
    });

    return(
        <div>
            <nav class="menu">
                <ol>
                {data.map((node) => (
                    <li onClick={()=>{setPath(node.value)}} class={`menu-item ${node.value == path ? 'active' : ''}`} >
                        <Link to={node.value} href="">{node.name}</Link>
                    </li>
                ))}
                </ol>
            </nav>
        </div>
    )
}

export default MenuBar;
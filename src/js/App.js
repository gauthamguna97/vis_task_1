import React from 'react';
import ReactDOM from 'react-dom';
import { Outlet } from 'react-router-dom';
import MenuBar from './MenuBar';
import '../css/dropdown.css';
import '../css/app.css';
import '../css/toggle.css';

const App = (props) => {

    console.log(props);

    return(
        <div>
            <div >
                <img className='main' src='bar.jpeg' />
            </div>
            <MenuBar {...props} />
            <Outlet />
            <p class="cp-text">
                CSE 564 Assignment1 - Gautham Gunapati.
            </p>
        </div>

    )
}

export default App;
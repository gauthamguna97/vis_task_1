import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Toggle = ({ callback }) => {

    const [val, setInitial] = useState(false);

    return(
    <div
        style={{top: '100px', right: '300px', position: 'fixed'}}
    >
      <label class="switch">
        <input type="checkbox" onChange={() => {
            callback(!val);
            setInitial(!val);
        }}/>
        <span class="slider round"></span>
      </label>
    </div>
    )
}

export default Toggle;
import React, { useState } from 'react';
import '../css/radio.css';

const Radio = (props) => {

  const [curr, setCurr] = useState('X');
  return (
    <fieldset>
        <input type="radio" name="sizeBy" value="weight" id="sizeWeight" checked="checked" onChange={() => {
            props.callback(0)
        }} />
        <label for="sizeWeight">X-axis</label>
        <input type="radio" name="sizeBy" value="dimensions" id="sizeDimensions" onChange={() => {
            props.callback(1) 
        }}/>
        <label for="sizeDimensions" >Y-axis</label>
    </fieldset>
  );
}

export default Radio;



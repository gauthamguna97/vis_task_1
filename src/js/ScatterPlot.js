import React, { useEffect, useState } from 'react';
import DropDown from './DropDown';
import jsondata from '../data/Games.json'
import Toggle from './Toggle';
import Radio from './Radio';


var value1 = 'yellow_cards';
var value2 = 'yellow_cards';

var x;
var y;

var value1 = null
var value2 = null


const ScatterPlot = (props) => {

  const { margin, width, height}  = props;


  const [list, setList] = useState([
    ...props.nums,
    ...props.cats,
  ].sort());

  const [index, setIndex] = useState(0);

  const buildScat = () => {

    d3.select("svg").remove();

    if (value1 == null && value2 == null) {
      value1 = props.nums[0];
      value2 = props.nums[0];
    }

    // append the svg object to the body of the page
    var svg = d3.select('body').append('svg')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

    //Read the data
    d3.csv("Fifa1.csv", function(data) {

    // Add X axis

    if (props.nums.indexOf(value1) >= 0) {
      x = d3.scaleLinear()
      .domain([0, d3.max(data, d => parseInt(+d[value1], 10))])
      .range([ 0, width ]);
      
    } else {
      x = d3.scalePoint()
      .range([ 0, width ])
      .domain(data.map(d => d[value1]))
      .padding(0.2);
    }

    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");
    
    if (props.nums.indexOf(value2) >= 0) {
      // Add Y axis
      y = d3.scaleLinear()
      .domain([0, d3.max(data, d => parseInt(+d[value2], 10))])
      .range([ height, 0]);
      
    } else {
      y = d3.scalePoint()
      .range([ height, 0])
      .domain(data.map(d => d[value2]))
      .padding(0.2);
    }

    svg.append("g")
      .call(d3.axisLeft(y));
    

      data = data.filter(d => !(d.value1 && d.value2))


    // Add dots
    svg.append('g')
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("cx", function (d) { return x(d[value1]) + 2* Math.random()} )
      .attr("cy", function (d) { return y(d[value2]) + 2* Math.random()} )
      .attr("r", d => 3)
      .style("fill", "#0a0b99")
      .style("opacity", 0.3)

    })

     // xlabel
     svg.append("text")             
     .attr("transform",
             "translate(" + (width/2) + " ," + 
                         (height + 100) + ")")
     .style("text-anchor", "middle")
     .text(value1 || "");

     //ylabel
     svg.append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 0 - margin.left + 20)
     .attr("x",0 - (height/2))
     .attr("dy", "1em")
     .style("text-anchor", "middle")
     .text(value2 || "");
  }

  useEffect(() => {
      // set the dimensions and margins of the graph
      d3.select(".main").style("opacity", 0.1)

      buildScat();
  }, []);

  const callback = (value) => {
    if (index == 0) {
      value1 = value;
    } else {
      value2  = value;
    }
    buildScat()
  }

  const currIndex = (idx) => {
    setIndex(idx);
  }

  return (
    <div>
      <Radio callback={currIndex} />
      <DropDown data={list} callback={callback} nums={props.nums} cats={props.cats} />
    </div>
  );
}

export default ScatterPlot;


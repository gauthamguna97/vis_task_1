import React, { useEffect, useState } from 'react';
import DropDown from './DropDown';
import Toggle from './Toggle';


var value1 = null;
const color = 'darkblue';
const color2 = 'red';

const Histogram = (props) => {

  const { margin, width, height}  = props;


  const [list, setList] = useState(props.nums)

  // const [list , setList] = useState(['yellow_cards']);

  const buildHist = (toggle = false) => {
      // set the dimensions and margins of the graph
      // set the dimensions and margins of the graph
      console.log(value1)
      value1 = value1 || list[0];
      if (toggle) {
        d3.select("svg").remove();
        var svg = d3.select('body').append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        d3.csv("Fifa1.csv", function(total) {
          var data = total.map(d => parseInt(d[value1], 10))

          console.log(data)


          var y = d3.scaleLinear()
          .domain([d3.min(data) - 1, d3.max(data) + 1])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
          .range([height, 0]);
          svg.append("g")
            .call(d3.axisLeft(y));
            
            
        var histogram = d3.histogram()
        .value(function(d) { return d; })   // I need to give the vector of value
        .domain(y.domain())  // then the domain of the graphic
        .thresholds(y.ticks(20)); 
    
          // X axis: scale and draw:
          console.log(d3.max(data))

          var bins = histogram(data);


          var x = d3.scaleLinear()
          .range([0, width]);
              
          x.domain([0, d3.max(bins, function(d) { return d.length; })]);
              // d3.hist has to be called before the Y axis obviously
          
          svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

      var max = d3.max(bins, (d) => d.length);
          

      var rect = svg.selectAll("rect")
          .data(bins)
          .enter()
          .append("rect")

          rect
            .attr("x", 1)
            .attr("y", 0)
            .transition()
            .duration(1000)
            .attr("transform", function(d) { return "translate("+ x(0) + "," + y(d.x1) + ")"; })
            .attr("height", function(d) { console.log(d); return y(d.x0) - y(d.x1)-1 ; })
            .attr("width", function(d) { return x(d.length); })
            .style("fill", color)
            .style("opacity", (d) => ( 0.4 + .6 * (d.length/max)))

        rect.on("mousemove", function(d, i) {


          var xPosition = d3.event.pageX - 10
          var yPosition = d3.event.pageY - 100    


          d3.select("#tooltip")
            .style("left", (xPosition) + "px")
            .style("top", yPosition + "px")
            .select("#value")
            .text(d.x0 + " - " +d.x1);

                    d3.select("#tooltip")
                    .style("left", xPosition + "px")
                    .style("top", yPosition + "px")
                    .select("#namer")
                    .text(d.length);


          d3.select("#tooltip").classed("hidden", false);

                    d3.select(this)
                    .transition()
                    .duration(50)
                    .style("fill", color2)
                    // .attr("width", (d) => 
                    //     1.1 * (y(d.x1) -y(d.x0))
                    // );


         })
         .on("mouseout", function() {

                    d3.select(this).attr("fill", color)

          d3.select("#tooltip").classed("hidden", true);

                    d3.select(this)
                    .transition()
                    .duration(50)
                    .style("fill", color)
                    // .attr("width", (d) => 
                    //   (y(d.x1) -y(d.x0))
                    // );


         })

        });


        return;
      }
    
      d3.select("svg").remove();
    

      // append the svg object to the body of the page
      var svg = d3.select('body').append('svg')
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // get the data
      d3.csv("Fifa1.csv", function(total) {

      var data = total.map(d => parseInt(d[value1], 10))

      console.log(data)

      // X axis: scale and draw:
      console.log(d3.max(data))
      var x = d3.scaleLinear()
        .domain([d3.min(data)-1, d3.max(data) + 1])     // can use this instead of 1000 to have the max of data: d3.max(data, function(d) { return +d.price })
        .range([0, width]);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

      // set the parameters for the histogram
      var histogram = d3.histogram()
        .value(function(d) { return d; })   // I need to give the vector of value
        .domain(x.domain())  // then the domain of the graphic
        .thresholds(x.ticks(20)); // then the numbers of bins

      // And apply this function to data to get the bins
      var bins = histogram(data);

      console.log(bins)

      // Y axis: scale and draw:
      var y = d3.scaleLinear()
        .range([height, 0]);
        y.domain([0, d3.max(bins, function(d) { return d.length; })]);   // d3.hist has to be called before the Y axis obviously
      svg.append("g")
        .call(d3.axisLeft(y));

      var max = d3.max(bins, (d) => d.length);

      // append the bar rectangles to the svg element
      var rect = svg.selectAll("rect")
        .data(bins)
        .enter()
        .append("rect")
          
      rect.attr("x", 1)
          .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
          .transition()
          .duration(1000)
          .attr("width", function(d) { console.log(d); return x(d.x1) - x(d.x0) -1 ; })
          .attr("height", function(d) { return height - y(d.length); })
          .style("fill", color)
          .style("opacity", (d) => ( 0.4 + .6 * (d.length/max)))
      
          rect.on("mousemove", function(d, i) {


            var xPosition = d3.event.pageX - 10
            var yPosition = d3.event.pageY - 100    
  
  
            d3.select("#tooltip")
              .style("left", (xPosition) + "px")
              .style("top", yPosition + "px")
              .select("#value")
              .text(d.length);
  
                      d3.select("#tooltip")
                      .style("left", xPosition + "px")
                      .style("top", yPosition + "px")
                      .select("#namer")
                      .text(value1 + " " + d.x0 + " - " + d.x1);
  
  
            d3.select("#tooltip").classed("hidden", false);
  
                      d3.select(this)
                      .transition()
                      .duration(50)
                      .style("fill", color2)
                      .attr("width", (d) => 
                          1.1 * (x(d.x1) -x(d.x0)-1)
                      );
  
  
           })
           .on("mouseout", function() {
  
                      d3.select(this).attr("fill", color)
  
            d3.select("#tooltip").classed("hidden", true);
  
                      d3.select(this)
                      .transition()
                      .duration(50)
                      .style("fill", color)
                      .attr("width", (d) => 
                        x(d.x1) -x(d.x0)-1
                      );
  
  
           })
      
      });


      // xlabel
      svg.append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                            (height + margin.top) + ")")
      .style("text-anchor", "middle")
      .text(value1);

      //ylabel

      svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Frequency");

  }

  useEffect(() => {
      d3.select(".main").style("opacity", 0.1)
      buildHist();
  }, []);

  const callback = (value) => {
    value1 = value;
    buildHist()
  }

  const Toggler = (value) => {
    buildHist(value);
  }

  return (
    <div>
      <DropDown data={list} callback={callback} nums={props.nums} />
      <Toggle callback={Toggler}/>
    </div>
    
  );
}

export default Histogram;


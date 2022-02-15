import React, { useEffect, useState } from 'react';
import DropDown from './DropDown';
import Radio from './Radio';
// import jsondata from '../data/Fifa1.json'
import Toggle from './Toggle';


var value = null;
var value2 = null;

const x1 = 0.4
const x2 = 0.6

const color = 'darkblue';
const color2 = 'red';
var toggle = false;

const BarGraph = (props) => {

    const [list, setList] = useState(props.cats);

    const [index, setIndex] = useState(0);

    const currIndex = (idx) => {
        setIndex(idx);
    }

    const { margin, width, height}  = props;



    const buildBar = () => {
        
        value = value || list[0]

        if (toggle) {

            d3.select("svg").remove();

            var svg = d3.select('body').append('svg')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("left", margin.left)
            .attr("right", margin.right)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

            // Parse the Data
            d3.csv("Fifa1.csv", function(total) {

            // Add X axis

            console.log(total)
    
            var map = new Map();
    
            total.map((node) => {
                if (value2 == null) {
                    map.set(node[value], (map.get(node[value] ) || 0) + 1);
                } else {
                    map.set(node[value], (map.get(node[value] ) || 0) + parseInt(node[value2] || 0, 10));
                }
            });
    
            console.log(map);
    
            var data = Array.from(map, ([name, value]) => ({ name, value }));
    
            console.log(data);

            var x = d3.scaleLinear()
            .domain([0, d3.max(data, function(d) { return d.value; })])
            .range([ 0, width]);
            svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))

            // Y axis
            var y = d3.scaleBand()
            .range([ 0, height ])
            .domain(data.map(function(d) { return d.name; }))
            .padding(.1);
            svg.append("g")
            .call(d3.axisLeft(y))
            .selectAll("text")
            .attr("transform", "translate(-10, -10) rotate(-45)")
            .style("text-anchor", "end");

            var max = d3.max(data, function(d) { return d.value; })

            //Bars
            var rect = svg.selectAll("myRect")
            .data(data)
            .enter()
            .append("rect")

            rect
            .attr("x", x(0) )
            .attr("y", function(d) { return y(d.name); })
            .transition()
            .duration(1000)
            .attr("width", function(d) { return x(d.value); })
            .attr("height", y.bandwidth() )
            .attr("fill", color)
            .style("opacity", (d) => x1 + x2 * d.value/max)

            rect.on("mousemove", function(d, i) {


                var xPosition = d3.event.pageX - 10
                var yPosition = d3.event.pageY - 100    


                d3.select("#tooltip")
                    .style("left", (xPosition) + "px")
                    .style("top", yPosition + "px")
                    .select("#value")
                    .text(d.value);

                d3.select("#tooltip")
                .style("left", xPosition + "px")
                .style("top", yPosition + "px")
                .select("#namer")
                .text(d.name);


                d3.select("#tooltip").classed("hidden", false);

                d3.select(this)
                .transition()
                .duration(100)
                .attr("fill", color2)
                .attr("height", (d) => 
                    1.1 * y.bandwidth()
                );


           })
           .on("mouseout", function() {

                d3.select(this).attr("fill", color)

                d3.select("#tooltip").classed("hidden", true);

                d3.select(this)
                .transition()
                .duration(100)
                .attr("fill", color)
                .attr("height", (d) => 
                    y.bandwidth()
                );


           })
        });


                  // xlabel
                  svg.append("text")             
                  .attr("transform",
                          "translate(" + (width/2) + " ," + 
                                      (height + 100) + ")")
                  .style("text-anchor", "middle")
                  .style("font-weight", "bold")
                  .text('Frequency');
      
                  //ylabel
                  svg.append("text")
                  .attr("transform", "rotate(-90)")
                  .attr("y", 0 - margin.left)
                  .attr("x",0 - (height/2))
                  .attr("dy", "1em")
                  .style("text-anchor", "middle")
                  .style("font-weight", "bold")
                  .text(value);

        } else {
            d3.select("svg").remove();

            var svg = d3.select('body').append('svg')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
    
            // Parse the Data
            d3.csv("Fifa1.csv", function(total) {
    
                console.log(total)
        
                var map = new Map();
        
                total.map((node) => {
                    if (value2 == null) {
                        map.set(node[value], (map.get(node[value] ) || 0) + 1);
                    } else {
                        map.set(node[value], (map.get(node[value] ) || 0) + parseInt(node[value2] || 0, 10));
                    }
                })
        
                console.log(map);
        
                var data = Array.from(map, ([name, value]) => ({ name, value }));
    
                data.sort((a, b) => a.name-b.name)
    
                // X axis
                var x = d3.scaleBand()
                .range([ 0, width ])
                .domain(data.map(function(d) { return d.name; }))
                .padding(0.2);
                svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x))
                .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");
    
                // Add Y axis
                var y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.value)])
                .range([ height, 0]);
                svg.append("g")
                .call(d3.axisLeft(y))

                var max = d3.max(data, function(d) { return d.value; })

    
                // Bars
                var rect = svg.selectAll("mybar")
                .data(data)
                .enter()
                .append("rect")

                console.log(rect)

                rect
                .attr("x", function(d) { return x(d.name); })
                .attr("y", function(d) { return y(0); })
                .transition()
                .duration(1000)
                .delay((d, i) => i*100)
                .attr("width", x.bandwidth())
                .attr("height", function(d) { return height - y(d.value); })
                .attr("y", function(d) { return y(d.value); })
                .attr("fill", color)
                .style("opacity", (d) => x1 + x2 * d.value/max)

                rect.on("mousemove", function(d, i) {


					var xPosition = d3.event.pageX - 10
					var yPosition = d3.event.pageY - 100    


					d3.select("#tooltip")
						.style("left", (xPosition) + "px")
						.style("top", yPosition + "px")
						.select("#value")
						.text(d.value);

                    d3.select("#tooltip")
                    .style("left", xPosition + "px")
                    .style("top", yPosition + "px")
                    .select("#namer")
                    .text(d.name);


					d3.select("#tooltip").classed("hidden", false);

                    d3.select(this)
                    .transition()
                    .duration(50)
                    .attr("fill", color2)
                    .attr("width", (d) => 
                        1.1 * x.bandwidth()
                    );


			   })
			   .on("mouseout", function() {

                    d3.select(this).attr("fill", color)

					d3.select("#tooltip").classed("hidden", true);

                    d3.select(this)
                    .transition()
                    .duration(50)
                    .attr("fill", color)
                    .attr("width", (d) => 
                        x.bandwidth()
                    );


			   })

                // console.log(d3.selectAll('rect'))

    
                      // xlabel
                svg.append("text")             
                .attr("transform",
                        "translate(" + (width/2) + " ," + 
                                    (height + 100) + ")")
                .style("text-anchor", "middle")
                .style("font-weight", "bold")
                .style("font-size", "20px")
                .text(value);
    
                //ylabel
                svg.append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 0 - margin.left + 20)
                .attr("x",0 - (height/2))
                .attr("dy", "1em")
                .style("text-anchor", "middle")
                .style("font-weight", "bold")
                .text(value2 || 'Frequency');
        });
    }

        // d3.selectAll('rect').transition().delay(100).duration(1000)

        
    }

    useEffect(() => {
        d3.select(".main").style("opacity", 0.1)
        buildBar()
    }, []);

    const callback = (val) => {
        if (index == 0) {
            value = val;
            value2 = null;
        } else {
            value2 = val;
        }
        buildBar()
    }

    const Toggler = (val) => {
        toggle=val;
        buildBar();
    }

    return (
        <div>
            {/* <Radio callback={currIndex} /> */}
            <DropDown data={index== 0 ? list : props.nums} callback={callback} index={0} nums={props.nums}/>
            <Toggle callback={Toggler}/>
        </div>
        
    );
}

export default BarGraph;


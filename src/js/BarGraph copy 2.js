import React, { useEffect, useState } from 'react';


const BarGraph = () => {

    const [toggle, setToggle] = useState(false);


    const buildBar = (toggle) => {
        if (toggle) {
                    // set the dimensions and margins of the graph
                    // set the dimensions and margins of the graph
            var margin = {top: 20, right: 30, bottom: 40, left: 90},
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

            // append the svg object to the body of the page
            var svg = d3.select("#my_dataviz")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

            // Parse the Data
            d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv", function(data) {

            // Add X axis
            var x = d3.scaleLinear()
            .domain([0, 13000])
            .range([ 0, width]);
            svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");

            // Y axis
            var y = d3.scaleBand()
            .range([ 0, height ])
            .domain(data.map(function(d) { return d.Country; }))
            .padding(.1);
            svg.append("g")
            .call(d3.axisLeft(y))

            //Bars
            svg.selectAll("myRect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", x(0) )
            .attr("y", function(d) { return y(d.Country); })
            .attr("width", function(d) { return x(d.Value); })
            .attr("height", y.bandwidth() )
            .attr("fill", "#69b3a2")
        // .attr("x", function(d) { return x(d.Country); })
        // .attr("y", function(d) { return y(d.Value); })
        // .attr("width", x.bandwidth())
        // .attr("height", function(d) { return height - y(d.Value); })
        // .attr("fill", "#69b3a2")
            });
            return;
        }


        // set the ranges
        var x = d3.scaleBand()
            .range([0, width])
            .padding(0.5);
        var y = d3.scaleLinear()
            .range([height, 0]);
            
        // append the svg object to the body of the page
        // append a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        var svg = d3.selectAll('svg')

        console.log(svg);
        svg
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        // get the data
        d3.csv("final.csv", function(error, data) {
        if (error) throw error;

        console.log(data)

        var map = new Map();

        data.map((node) => {
        map.set(node.stadium, (map.get(node.stadium ) || 0) + 1);
        })

        console.log(map);

        var data2 = Array.from(map, ([name, value]) => ({ name, value }));

        console.log(data2);

        // format the data
        // data.forEach(function(d) {
        //     d.value = +d.value;
        // });

        var margin = {top: 20, right: 30, bottom: 40, left: 90},
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        // // Scale the range of the data in the domains
        x.domain(data2.map(function(d) { return d.name; }));
        y.domain([0, d3.max(data2, function(d) { return d.value; })]);

        // // append the rectangles for the bar chart
        svg.selectAll(".bar")
        .data(data2)
        .enter().append("rect")
        .transition()
        .duration(1000)
        .attr("fill", "green")
        .attr("x", function(d) { console.log(d.name); return x(d.name); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.value); })
        .attr("height", function(d) { console.log(d.value); return height - y(d.value); })
        // .call(d3.drag())
        // .on("mouseover", (d) => {
        //     console.log(d);
        //     var val = d3.select(this);
        //     console.log(val);
        //     d3.select(this).attr("fill", "red")
        // }).on("mouseout", (d) => {
        //     console.log(d);
        //     d3.select(this).attr("fill", "red")
        // })

        // add the x Axis
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-20, 40) rotate(-70)");

        // add the y Axis
        svg.append("g")
        .call(d3.axisLeft(y));

        });

        // xlabel
        svg.append("text")          
        .attr("transform",
        "translate(" + (width/2) + " ," + 
                    (height + margin.top + 20) + ")")
        .style("text-anchor", "middle")
        .text("Date");

        //ylabel

        svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Value");
    }

    useEffect(() => {
        buildBar()
    }, []);

    return <div style={{ width: '100px', height: '100px'}} onClick={() => {
        setToggle(!toggle);
        buildBar(!toggle);
    }}>Toggle</div>;
}

export default BarGraph;


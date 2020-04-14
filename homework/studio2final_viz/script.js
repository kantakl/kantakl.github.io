d3.csv("./data/rpdr_data.csv").then(function(data) {
    console.log(data);

    var width = document.querySelector("#chart").clientWidth;
    var height = document.querySelector("#chart").clientHeight;
    var margin = {top: 50, left: 150, right: 50, bottom: 150};

    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);



    
    var age = {
        min: d3.min(data, function(d) { return +d.age; }),
        max: d3.max(data, function(d) { return +d.age; })
    };

    var final_place = {
        min: d3.min(data, function(d) { return +d.final_place; }),
        max: d3.max(data, function(d) { return +d.final_place; })
    };

    var ls_battles = {
        min: d3.min(data, function(d) { return +d.ls_battles; }),
        max: d3.max(data, function(d) { return +d.ls_battles; })
    };

    var challenge_wins = {
        min: d3.min(data, function(d) { return +d.challenge_wins; }),
        max: d3.max(data, function(d) { return +d.challenge_wins; })
    };

    var xScale = d3.scaleLinear()
        .domain([18, age.max])
        .range([margin.left, width-margin.right]);

    var yScale = d3.scaleLinear()
        .domain([0, 8])
        .range([height-margin.bottom, margin.top]);

    var rScale = d3.scaleSqrt()
        .domain([ls_battles.min, ls_battles.max])
        .range([3, 15]);

    var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    var xAxis = svg.append("g")
        .attr("transform", `translate(0,${height-margin.bottom})`)
        .call(d3.axisBottom().scale(xScale));

    var yAxis = svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft().scale(yScale));
    
    var points = svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
            .attr("cx", function(d) { return xScale(d.age); })
            .attr("cy", function(d) { return yScale(d.challenge_wins); })
            .attr("r", function(d) { return rScale(d.ls_battles); })
            .attr("fill", function(d) { return colorScale(d.final_place); })

    var xAxisLabel = svg.append("text")
        .attr("class", "axisLabel")
        .attr("x", width/2)
        .attr("y", height - margin.bottom/2)
        .text("Age");

    var yAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("transform","rotate(-90)")
        .attr("x", -height/2)
        .attr("y", margin.left/2)
        .text("Challenge Wins");

});
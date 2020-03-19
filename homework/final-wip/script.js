d3.csv("./bfro_reports_geocoded.csv", function(data) {
    
    console.log(data);

    var width = document.querySelector("#chart").clientWidth;
    var height = document.querySelector("#chart").clientHeight;
    var margin = {top: 50, left: 150, right: 50, bottom: 150};

    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
   
    var filtered_data = data.filter(function(d) {
        return d.state == "California";
    });

    console.log(filtered_data);

    /*

    var lifeExp = {
        min: d3.min(filtered_data, function(d) { return +d.lifeExp; }),
        max: d3.max(filtered_data, function(d) { return +d.lifeExp; })
    };

    var gdpPercap = {
        min: d3.min(filtered_data, function(d) { return +d.gdpPercap; }),
        max: d3.max(filtered_data, function(d) { return +d.gdpPercap; })
    };

    var pop = {
        min: d3.min(filtered_data, function(d) { return +d.pop; }),
        max: d3.max(filtered_data, function(d) { return +d.pop; })
    };

    var xScale = d3.scaleLinear()
        .domain([lifeExp.min, lifeExp.max])
        .range([margin.left, width-margin.right]);

    var yScale = d3.scaleLinear()
        .domain([gdpPercap.min, gdpPercap.max])
        .range([height-margin.bottom, margin.top]);

    var rScale = d3.scaleSqrt()
        .domain([pop.min, pop.max])
        .range([3, 25]);

    var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    var xAxis = svg.append("g")
        .attr("transform", `translate(0,${height-margin.bottom})`)
        .call(d3.axisBottom().scale(xScale));

    var yAxis = svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft().scale(yScale));
    
    var points = svg.selectAll("circle")
        .data(filtered_data)
        .enter()
        .append("circle")
            .attr("cx", function(d) { return xScale(d.lifeExp); })
            .attr("cy", function(d) { return yScale(d.gdpPercap); })
            .attr("r", function(d) { return rScale(d.pop); })
            .attr("fill", function(d) { return colorScale(d.continent); })

    var xAxisLabel = svg.append("text")
        .attr("class", "axisLabel")
        .attr("x", width/2)
        .attr("y", height - margin.bottom/2)
        .text("Life Expectancy");

    var yAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("transform","rotate(-90)")
        .attr("x", -height/2)
        .attr("y", margin.left/2)
        .text("GDP Per Capita");

});*/})
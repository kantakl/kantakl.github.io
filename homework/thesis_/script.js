d3.csv("./data/toughestsport/toughest_sport.csv").then(function(data) {
    console.log(data);

    var width = document.querySelector("#chart").clientWidth;
    var height = document.querySelector("#chart").clientHeight;
    var margin = {top: 50, left: 150, right: 50, bottom: 150};

var chartWidth = width - margin.left - margin.right;
var chartHeight = height - margin.top - margin.bottom;

    var svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

    var yes_team = data.filter(function(d) {
      return d.team_sport == "yes";
  });

    var no_team = data.filter(function(d) {
        return d.team_sport == "no";
    });

          
        var endurance = {
            min: d3.min(data, function(d) { return +d.endurance; }),
            max: d3.max(data, function(d) { return +d.endurance; })
        };

        var strength = {
            min: d3.min(data, function(d) { return +d.strength; }),
            max: d3.max(data, function(d) { return +d.strength; })
        };

        var power = {
          min: d3.min(data, function(d) { return +d.power; }),
          max: d3.max(data, function(d) { return +d.power; })
        };

        var speed = {
          min: d3.min(data, function(d) { return +d.speed; }),
          max: d3.max(data, function(d) { return +d.speed; })
        };

//x and y scale domain//

        var xScale = d3.scaleLinear()
            .domain([endurance.min, endurance.max])
            .range([margin.left, width-margin.right]);


        var yScale = d3.scaleLinear()
            .domain([strength.min, strength.max])
            .range([height-margin.bottom, margin.top]);

        var colorScale = d3.scaleOrdinal(d3.schemeBlues[0,5]);


        var rScale = d3.scaleSqrt()
        .domain([power.min, power.max])
        .range([5, 35]);

// x and y scale drawing//

        var xAxis = svg.append("g")
        .attr("class","axis")
        .attr("transform", `translate(0,${height-margin.bottom})`)
        .call(d3.axisBottom().scale(xScale));

    var yAxis = svg.append("g")
        .attr("class","axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft().scale(yScale));

    
    var xAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("x", width/2)
        .attr("y", height-margin.bottom/2)
        .text("Endurance");

    var yAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("transform","rotate(-90)")
        .attr("x",-height/2)
        .attr("y",margin.left/2)
        .text("Strength");  




});



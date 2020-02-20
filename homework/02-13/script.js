var url = "https://datausa.io/api/data?drilldowns=State&measures=Population&year=latest";

var data = [];

function fetchData() {

    d3.json(url, function(error, data) {
        console.log(data);
        
        var margin = {top: 50, left: 150, right: 50, bottom: 150};
        var width = window.innerWidth;
        var height = window.innerHeight;

        var svg = d3.select("#chart")
            .attr("width", width)
            .attr("height", height);

        var xScale = d3.scaleBand()
            .domain(["Vermont","New Hampshire","Maine","Massachusetts","Rhode Island","Connecticut"])
            .rangeRound([margin.left, width-margin.right])
            .padding(0.5);
        
        var yScale = d3.scaleLinear()
            .domain([100000, 8000000])
            .range([height-margin.bottom, margin.top]);

        var xAxis = svg.append("g")
            .attr("class","axis")
            .attr("transform", `translate(0,${height-margin.bottom})`)
            .call(d3.axisBottom().scale(xScale));

        var yAxis = svg.append("g")
            .attr("class","axis")
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft().scale(yScale));

        var bar = svg.selectAll("rect")
            .data(data.data)
            .enter()
            .append("rect")
              .attr("x",function(d) { return xScale(d.State); })
              .attr("y", function(d) { return yScale(d.Population); })
              .attr("width",xScale.bandwidth())
              .attr("height", function(d) { return height - margin.bottom - yScale(d.Population); })
              .attr("fill","green")
              .attr("opacity", 0.7);

        var xAxisLabel = svg.append("text")
            .attr("class","axisLabel")
            .attr("x", width/2)
            .attr("y", height-margin.bottom/2)
            .text("State");

        var yAxisLabel = svg.append("text")
            .attr("class","axisLabel")
            .attr("transform","rotate(-90)")
            .attr("x",-height/2)
            .attr("y",margin.left/2)
            .text("2018 Population");

                });
                

}


fetchData();
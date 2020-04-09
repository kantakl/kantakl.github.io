   
   
   var width = document.querySelector("#chart2").clientWidth;
   var height = document.querySelector("#chart2").clientHeight;
   var svg = d3.select("#chart2")
       .append("svg")
       .attr("width", width)
       .attr("height", height);

       var margin = {
        top: 10,
        right: 0,
        bottom: 60,
        left: 90
      };

   var data = [
     {season: "Fall", sightings: 1756},
     {season: "Winter", sightings: 734},
     {season: "Spring", sightings: 876},
     {season: "Summer", sightings: 1840},
   ];

   var xScale = d3.scaleBand()
     .domain(["Fall","Winter","Spring","Summer"])
     .rangeRound([margin.left, width-margin.right])
     .padding(0.5);


   var yScale = d3.scaleLinear()
     .domain([0, 2000])
     .range([height-margin.bottom, margin.top]);


   var xAxis = svg.append("g")
     .attr("transform",`translate(0,${height-margin.bottom})`)
     .call(d3.axisBottom().scale(xScale));



   var yAxis = svg.append("g")
     .attr("transform",`translate(${margin.left},0)`)
     .call(d3.axisLeft().scale(yScale));

    var xAxisLabel = svg.append("text")
     .attr("class","axisLabel")
     .attr("x", width/2)
     .attr("y", height-margin.bottom/2)
     .attr("text-anchor","middle")
     .text("Season of Reported Sighting");

   var yAxisLabel = svg.append("text")
     .attr("class","axisLabel")
     .attr("transform","rotate(-90)")
     .attr("x",-height/2)
     .attr("y",margin.left/2)
     .attr("text-anchor","middle")
     .text("Number of Sightings");




   var bar = svg.selectAll("rect")
     .data(data)
     .enter()
     .append("rect")
       .attr("x",function(d) { return xScale(d.season); })
       .attr("y", function(d) { return yScale(d.sightings); })
       .attr("width",xScale.bandwidth())
       .attr("height", function(d) { return height - margin.bottom - yScale(d.sightings); })
       .attr("fill","#265218");
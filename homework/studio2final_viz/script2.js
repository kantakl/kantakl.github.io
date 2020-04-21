   
   
   var width = document.querySelector("#chart2").clientWidth;
   var height = document.querySelector("#chart2").clientHeight;
   var svg = d3.select("#chart2")
       .append("svg")
       .attr("width", width)
       .attr("height", height);

       var margin = {
        top: 50,
        right: 50,
        bottom: 90,
        left: 90
      };

   var data = [
     {region: "Southeast", contestants: 29},
     {region: "Northeast", contestants: 38},
     {region: "Midwest", contestants: 23},
     {region: "West", contestants: 35},
     {region: "Southwest", contestants: 10},
     {region: "Puerto Rico", contestants: 7},
   ];

   var xScale = d3.scaleBand()
     .domain(["Southeast","Northeast","Midwest","West","Southwest","Puerto Rico"])
     .rangeRound([margin.left, width-margin.right])
     .padding(0.5);


   var yScale = d3.scaleLinear()
     .domain([0, 40])
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
     .text("Geographic Region");

   var yAxisLabel = svg.append("text")
     .attr("class","axisLabel")
     .attr("transform","rotate(-90)")
     .attr("x",-height/2)
     .attr("y",margin.left/2)
     .attr("text-anchor","middle")
     .text("Number of Contestants");




   var bar = svg.selectAll("rect")
     .data(data)
     .enter()
     .append("rect")
       .attr("x",function(d) { return xScale(d.region); })
       .attr("y", function(d) { return yScale(d.contestants); })
       .attr("width",xScale.bandwidth())
       .attr("height", function(d) { return height - margin.bottom - yScale(d.contestants); })
       .attr("fill","white");
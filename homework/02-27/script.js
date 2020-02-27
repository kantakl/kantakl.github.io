var url = "https://datausa.io/api/data?drilldowns=State&measures=Population&year=latest";

var data = [];

        
var margin = {top: 50, left: 150, right: 50, bottom: 150};
var width = window.innerWidth;
var height = window.innerHeight;


var chartWidth = width - margin.left - margin.right;
var chartHeight = height - margin.top - margin.bottom;

var svg = d3.select("#chart")
  .attr("width", width)
  .attr("height", height);


var scaleWidth = 400;
var scaleHeight = 20;
var scaleX = margin.left + chartWidth / 2 - (scaleWidth / 2);
var scaleY = margin.top + chartHeight + 40;
            
var scale = svg.select("#scale")
  .attr("transform", "translate(" + scaleX + ", " + scaleY + ")");
            
scale.select("#scaleRect")
  .attr("width", scaleWidth)
  .attr("height", scaleHeight); //initially had everything dictating size and scale inside function, not issue//

function fetchData() {

  d3.json(url, function(error, data) {
        console.log(data);



            var xScale = d3.scaleBand()
                 .domain(["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
                 "Delaware", "District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois",
                 "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts",
                 "Michicgan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
                 "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
                 "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
                 "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", 
                 "Wisconsin", "Wyoming", "Puerto Rico"])
                 .rangeRound([margin.left, width-margin.right])
                 .padding(0.5);

              var yScale = d3.scaleLinear()
                 .domain([10000, 50000000])
                 .range([height-margin.bottom, margin.top]);
     
             var xAxis = svg.append("g")
                 .attr("class","axis")
                 .attr("transform", `translate(0,${height-margin.bottom})`)
                 .call(d3.axisBottom().scale(xScale));
     
             var yAxis = svg.append("g")
                 .attr("class","axis")
                 .attr("transform", `translate(${margin.left},0)`)
                 .call(d3.axisLeft().scale(yScale));

                 var maximum = d3.max(data.data, function(d) {
                    return d.Population;
                    
                  });

                  function interpolateInferno(t) {
                    return d3.hsl(t * 360, 1, 0.5) + "";
                  }

          var barColor = d3.scaleSequential(d3.interpolateInferno)
              .domain([0, maximum]);

          var stops = d3.range(0, 1, 0.25);

                    svg.select("#colorGradient").selectAll("stop")
                      .data(stops).enter()
                      .append("stop")
                        .attr("offset", function(d) {
                          return d * 75 + "%";
                        })
                        .attr("stop-color", function(d) {
                          return barColor(d * maximum);
                        });


     
             var bar = svg.selectAll("rect")
                 .data(data.data)
                 .enter()
                 .append("rect")
                   .attr("x",function(d) { return xScale(d.State); })
                   .attr("y", function(d) { return yScale(d.Population); })
                   .attr("width",xScale.bandwidth())
                   .attr("height", function(d) { return height - margin.bottom - yScale(d.Population); })
                   .attr("fill", function(d) {
                    return barColor(d.Population);   
                  })
     
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
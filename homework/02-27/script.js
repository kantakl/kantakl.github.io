var realtimeURL = "https://whiteboard.datawheel.us/api/google-analytics/realtime/random";
      var frequency = 5 * 1000; // 1 seconds

      var dataMax = 10;
      var data = [];

      var width = window.innerWidth;
      var height = window.innerHeight;

      var margin = {
        top: 20,
        right: 150,
        bottom: 100,
        left: 50
      };

      var chartWidth = width - margin.left - margin.right;
      var chartHeight = height - margin.top - margin.bottom;

      var svg = d3.select("#chart")
        .attr("width", width)
        .attr("height", height);

     var scaleWidth = 300;
     var scaleHeight = 30;
     var scaleX = margin.left + chartWidth / 2 - (scaleWidth / 2);
     var scaleY = margin.top + chartHeight + 40;

     var scale = svg.select("#scale")
        .attr("transform", "translate(" + scaleX + ", " + scaleY + ")");

    scale.select("#scaleRect")
      .attr("width", scaleWidth)
      .attr("height", scaleHeight);

    var legendX = margin.left + chartWidth;

    var legendY = margin.top;

    var legend = svg.select("#legend")
      .attr("transform", "translate(" + legendX + ", " + legendY + ")");

    var legendSize = 20;
    var legendPadding = 10;
     

      var domainValues = d3.range(1, dataMax + 1);

      var x = d3.scaleBand()
        .domain(domainValues.reverse())
        .range([margin.left, margin.left + chartWidth])
        .paddingInner(0.2)
        .paddingOuter(0.1);

      var barWidth = x.bandwidth();

      function fetchData() {

        d3.json(realtimeURL, function(error, users) {

          var dataObject = {
            users: users,
            timestamp: new Date()
          };

          data.unshift(dataObject);
          if (data.length > dataMax) data.pop();

          if (data.length === dataMax) clearInterval(myInterval);

          var legendData = data.map(function(d) {
              return d.users;
          });

          legendData = legendData.filter(function (d, i)    {
              return legendData.indexOf(d) === i;
          })
          legendData = legendData.sort(function(a, b)   {
              return a - b;
          });


          var maximum = d3.max(data, function(d) {
            return d.users;
          });

          var barColor = d3.scaleSequential(d3.interpolateInferno)
          .domain([0, maximum]);

          var legendRects = legend.selectAll("rect")
          .data(legendData);
  
    var legendRectsEnter = legendRects.enter().append("rect");
  
      legendRects.merge(legendRectsEnter)
          .attr("x", legendPadding)
          .attr("y", function(d, i) {
              return i * legendSize + i * legendPadding;
          })
          .attr("fill", barColor)
          .attr("width", legendSize)
          .attr("height", legendSize);

          var legendTexts = legend.selectAll("text")
          .data(legendData);
        
        var legendTextsEnter = legendTexts.enter().append("text")
          .attr("baseline-shift", "-100%");
        
        legendTexts.merge(legendTextsEnter)
          .attr("x", legendPadding + legendSize + legendPadding / 2)
          .attr("y", function(d, i) {
            return i * legendSize + i * legendPadding;
          })
          .text(function(d) {
            return d;
          });



          var stops = d3.range(0, 1.25, 0.25);

          svg.select("#colorGradient").selectAll("stop")
            .data(stops).enter()
            .append("stop")
                .attr("offset", function (d)    {
                    return d * 100 + "%";
                })
                .attr("stop-color", function(d) {
                    return barColor(d * maximum);
                });
        
        var gradientScale = d3.scaleLinear()
            .domain([0, maximum])
            .range([0, scaleWidth]);

        var scaleAxis = d3.axisBottom(gradientScale);

        scale.select("#scaleAxis")
            .attr("transform", "translate(0, " + scaleHeight + ")")
            .transition().duration(frequency/2)
            .call(scaleAxis);

          var barHeight = d3.scaleLinear()
            .domain([0, maximum])
            .range([0, chartHeight]);

          var y = d3.scaleLinear()
            .domain([0, maximum])
            .range([margin.top + chartHeight, margin.top]);

          var yAxis = d3.axisLeft(y);
          svg.select("#y")
            .attr("transform", "translate(" + margin.left + ", 0)")
            .transition().duration(frequency / 2)
            .call(yAxis);

          var xAxis = d3.axisBottom(x)
            .tickFormat(function(d) {
              var tickData = data[d - 1];
              if (tickData) {
                var now = new Date();
                var msAgo = now - tickData.timestamp;
                var secondsAgo = Math.round(msAgo / 1000);
                if (secondsAgo === 0) {
                  return "Now";
                }
                else {
                  var word = secondsAgo === 1 ? "second" : "seconds";
                  return secondsAgo + " " + word + " ago";
                }
              }
              else {
                return "";
              }
            });

          svg.select("#x")
            .attr("transform", "translate(0, " + (margin.top + chartHeight) + ")")
            .call(xAxis);

          var bars = svg.select("#shapes").selectAll(".bar")
            .data(data, function(d) {
              return d.timestamp;
            });

          function zeroState(selection) {
            selection
              .attr("height", 0)
              .attr("y", function(d) {
                return y(d.users);
              });
          }

          var enter = bars.enter().append("rect")
            .attr("class", "bar")
            .attr("width", barWidth)
            .call(zeroState)
            .attr("fill", function(d)   {
                return barColor(d.users);
            })
            .attr("x", function(d, i) {
              return x(i + 1);
            });

          bars.merge(enter)
            .transition().duration(frequency / 2)
            .attr("height", function(d) {
              return barHeight(d.users);
            })
            .attr("y", function(d) {
              return y(d.users);
            })
            .attr("x", function(d, i) {
              return x(i + 1);
            });

          bars.exit()
            .transition().duration(frequency / 2)
            .call(zeroState)
            .remove();

        });

      }

      fetchData();
      var myInterval = setInterval(fetchData, frequency);
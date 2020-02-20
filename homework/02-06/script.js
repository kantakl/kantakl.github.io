var realtimeURL = "https://whiteboard.datawheel.us/api/google-analytics/realtime/random";

var frequency = 1.5 * 1000; // 1 second

var dataMax = 5;    //this means max bars that will show up are 5//
var data = [];  //creates empty data array to use for whatever//

var width = window.innerWidth;
var height = window.innerHeight;

var margin = {
    top:20,
    right:20,
    bottom:50,
    left:100
};

var chartWidth = width - margin.left - margin.right;
var chartHeight = height - margin.top - margin.bottom;



var svg = d3.select("#chart")
  .attr("width", width)
  .attr("height", height);

var domainValues = d3.range(1, dataMax + 1);

var x = d3.scaleBand()
    .domain(domainValues.reverse())
    .range([margin.left, margin.left + chartWidth])
    .paddingInner(0.1)
    .paddingOuter(0.1);

var barWidth = x.bandwidth();

function fetchData() {

    d3.json(realtimeURL, function(error, users) {

    
    var dataObject = {
        users: users,
        timestamp: new Date()   //where did this come from idk//
          };
  
data.unshift(dataObject);
if (data.length > dataMax) 
    data.pop();


var maximum = d3.max(data, function(d) {    //where did this come from? who knows//
        return d.users;
      });
    
        
var barHeight = d3.scaleLinear()
      .domain([0, maximum]) //use max here bc it is changed above with the function that pulls from users//
      .range([0, chartHeight]);

var y = d3.scaleLinear()
      .domain([0, maximum])
      .range([margin.top + chartHeight, margin.top]);


var yAxis = d3.axisLeft(y);
svg.select("#y").call(yAxis)
      .attr("transform", "translate(" + margin.left + ", 0)")
      .transition().duration(frequency / 2)
      .call(yAxis);

var xAxis = d3.axisBottom(x)
      .tickFormat(function(d) {
        var tickData = data[d - 1];

        if (tickData)   {
        
        var now = new Date ();
        var msAgo = now - tickData.timestamp;
        var secondsAgo = Math.round(msAgo/1000)
        var time = tickData.timestamp;
        if (secondsAgo === 0)   {
        return "Now"
        }

                else {
                    var word = secondsAgo === 1 ? "second" : "seconds" ;
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
        .attr("y", y(0))

  }
        
        
  var enter  = bars.enter().append("rect")
          .attr("class", "bar")
          .attr("width", barWidth)
          .attr("fill", "green")
          .attr("opacity", 0.7)
          .call(zeroState)
          .attr("x", function(d, i) {
          return x(i + 1)
          });

    bars.merge(enter)
            .transition().duration(frequency / 2)
            .attr("height", function(d) {
            return barHeight(d.users);
            })
            .attr("y", function(d) {
                return y(d.users)
                  })
                  .attr("x", function(d, i) {
                    return x(i + 1);
                  });
        
        
        
        
    bars.exit()
        .transition().duration(frequency / 2)
        .call(zeroState)
        .attr("fill", "white")
        .remove();
        
});

}

    fetchData();
    setInterval(fetchData, frequency);
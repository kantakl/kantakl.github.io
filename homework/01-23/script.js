var realtimeURL = "https://whiteboard.datawheel.us/api/google-analytics/realtime/random";
var frequency = 2.5 * 1000; // 1 second

var dataMax = 5;    //this means max bars that will show up are 5//
var data = [];  //creates empty data array to use for whatever//

var width = window.innerWidth;
var height = window.innerHeight;

var svg = d3.select("#chart")
  .attr("width", width)
  .attr("height", height);


var barWidth = width / dataMax;

var x = d3.scaleLinear()
    .domain([dataMax, 1])
    .range([0, width - barWidth]);

function fetchData() {

    d3.json(realtimeURL, function(error, users) {

    
    var dataObject = {
        users: users,
        timestamp: new Date()   //where did this come from idk//
          };
  
data.unshift(dataObject);
if (data.length > dataMax) 
    data.pop();
    console.log(data);


var maximum = d3.max(data, function(d) {    //where did this come from? who knows//
        return d.users;
      });
    
        
var barHeight = d3.scaleLinear()
      .domain([0, maximum]) //use max here bc it is changed above with the function that pulls from users//
      .range([0, height]);
  


var bars = svg.selectAll(".bar")
    .data(data, function(d) {
    return d.timestamp;
  });
        
        
  var enter  = bars.enter().append("rect")
          .attr("class", "bar")
          .attr("width", barWidth)
          .attr("height", 0)
          .attr("y", height)
          .attr("fill", "green")
          .attr("opacity", 0.7)
          .attr("x", function(d, i) {
          return x(i + 1)
          });

    bars.merge(enter)
            .transition().duration(frequency / 2)
            .attr("height", function(d) {
            return barHeight(d.users);
            })
            .attr("y", function(d) {
            
            var h = barHeight(d.users);
                    return height - h;
                  })
                  .attr("x", function(d, i) {
                    return x(i + 1);
                  });
        
        
        
        
    bars.exit()
        .transition().duration(frequency / 10)
        .attr("height", 0)
        .attr("y", height)
        .attr("fill", "white")
        .remove();
        
});

}

    fetchData();
    setInterval(fetchData, frequency);
  




        


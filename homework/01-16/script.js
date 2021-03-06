var width = 1000;
var height = 1000;

var svg = d3.select("body")
.append("svg")
.attr("width",width)
.attr("height",height);
        

var realtimeURL = "https://whiteboard.datawheel.us/api/google-analytics/realtime/random";

var frequency = 10 * 1000; // 10 seconds

//i wish this worked as enter/update/exit but it wont and im sad//

function fetchData() {

d3.json(realtimeURL, function(error, users) {

console.log("users:", users);
d3.select("#users").html(users);




var circle = svg.selectAll("circles")
.data(realtimeURL)
.enter()
.append("circle")
    .attr("cx", 100)
    .attr("cy", 200)
    .attr("fill", "red")
    .attr("r", 10)
});

}

var c = svg.selectAll("circle")
.data(realtimeURL, function(d) { return d.users; });

c.enter().append("circle")
.attr("cx", 100)
.attr("cy", 200)
.attr("fill", "red")
.attr("r",function(d) { return d.users; })

.merge(c)   

.transition()
.duration(1000)
.attr("cx", 100)
.attr("cy", 200)
.attr("fill", "red")
.attr("r",function(d) { return d.users; })

c.exit().remove();



fetchData();
setInterval(fetchData, frequency);





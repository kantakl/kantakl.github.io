var width = window.innerWidth;
var height = window.innerHeight;

var svg = d3.select("#chart")
    .attr("width", width)
    .attr("height", height);

var realTimeURL = "https://whiteboard.datawheel.us/api/google-analytics/realtime/random";

var frequency = 3000; //3 seconds

var dataMax = 25;

var data = [];

var barWidth = width / dataMax;

var x = d3.scaleLinear()
    .domain([dataMax, 1])
    .range([0, width-barWidth]);

/// fetchin' time

function fetchData() {
d3.json(realTimeURL, function(error,users) {


    var dataObject = {
        users: users,
        timestamp: new Date()
        };

    data.unshift(dataObject);
    if (data.length > dataMax) {
        data.pop();
    }

    var max = d3.max(data, function(d) {
        return d.users;
        })

    var barHeight = d3.scaleLinear()
        .domain([0, max])
        .range([0, height]);

    var bars = svg.selectAll(".bar")
        .data(data, function(d) {
        return d.timestamp;
        });

        var enter = bars.enter().append("rect")
            .attr("class", "bar")
            .attr("width", barWidth)
            .attr("height", 0)
            .attr("x", function(d, i) {
                return x(i + 1);
                })
            .attr("y", height)
            .attr("fill", "green")
            .attr("opacity", 0.7)
            .attr("stroke", "green");
           

        bars.merge(enter)
            .transition()
            .duration(frequency/2)
            .attr("height", function(d) {
                return barHeight(d.users);
                })
            .attr("y", function(d, i) {
                
            var h = barHeight(d.users);
                return height - h;
                })
            .attr("x", function(d, i) {
                return x(i + 1);
                })
            .attr("fill", "green")
            .attr("opacity", 0.7)
            .attr("stroke", "green");

        bars.exit()
            .transition()
            .duration(frequency/2)
            .attr("y", height)
            .attr("fill", "white")
            .remove();

        var labels = svg.selectAll(".label")
            .data(data, function(d) {
                return d.timestamp; 
            });

        var fontSize = 10;
            
        var labelEnter = labels.enter().append("text")
            .attr("class", "label")
            .attr("font-size", fontSize)
            .attr("x", function(d, i) {
                return (x(i + 1))+(barWidth/2);
            })
            .style("text-anchor", "left")
            .attr("y", height)
            .attr("fill", "white");
            
        labels.merge(labelEnter)
            .each(function(d, i) {
                    
            var textElement = d3.select(this);
            textElement.text("");

            var statement = "There are " + d.users + " peeps on here";
                    
            var words = statement.split(" ");
            
            var tspan = textElement.append("tspan");
            
            var line = 0;

            words.forEach(function(word) {
                var statement = tspan.text();
                
                tspan.text(statement + " " + word);
                                
                var domElement = tspan.node();
                var tspanWidth = domElement.getBoundingClientRect().width;

                        if (tspanWidth > barWidth) {
                            line++;
                            tspan.text(statement);
                            tspan = textElement.append("tspan")
                            .attr("y", function() {
                
                    var h = barHeight(d.users);
                        return (height - h) + (fontSize * line);
                    }) 
                    .attr("x",function() {
                        return (x(i + 1))+(barWidth/2);
                    })
                    .text(word);
                    }
     });

     });
                


            labels.exit()
                .transition()
                .duration(frequency/2)
                .attr("y", height)
                .remove();
            
    });
}


    fetchData();
    setInterval(fetchData, frequency);


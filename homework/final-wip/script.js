var promises = [
    d3.csv("./bfro_reports_geocoded.csv",parseCSV), 
    d3.json("./worldgeo.json")
];

Promise.all(promises).then(function(data) {


var bigfootData = data[0];

var usa = data[1];

console.log(data)

var width = document.querySelector("#chart").clientWidth;
var height = document.querySelector("#chart").clientHeight;

var svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);


var projection = d3.geoMercator()
    .translate([width/2, height/2])
    .scale(100);


var path = d3.geoPath().projection(projection);


svg.selectAll("path")
    .data(usa.features)
    .enter()
    .append("path")
        .attr("state")
        .attr("d", path);

bigfootData = bigfootData.sort(function(a,b) { return a.date - b.date; });




var slider = d3.select("#selectDate");

slider
        .property("min", bigfootData[0].date)
        .property("max", [7.1])
        .property("value", bigfootData[bigfootData.length-1].date)
        .property("tickValues",[1,3,5,7,10]);


var selectedDate = slider.property("value");


var dateLabel = svg.append("text")
        .attr("class", "dateLabel")
        .attr("x", 600)
        .attr("y", height - 90)
        .text(selectedDate)
        .text("Date");

var rScale = d3.scaleSqrt()
        .domain([1, 125])
        .range([0,475]);


function updateMap(date) {

        var filtered_data = bigfootData.filter(function(d) {
            return d.date == date;
        });

var date = svg.selectAll("circle")
            .data(filtered_data, function(d) { return d.state; })
            .data(filtered_data, function(d) { return d.county; });


    date.enter().append("circle")
            .attr("cx", function(d) {
                var proj = projection([d.long, d.lat]);
                return proj[0];
            }).attr("cy", function(d) {
                var proj = projection([d.long, d.lat]);
                return proj[1];
            }).attr("r", 0)
            .attr("opacity", 0.5)
            .attr("fill", "white")
        
    .merge(date)
            .transition()
            .duration(800)
            .attr("cx", function(d) {
                var proj = projection([d.long, d.lat]);
                return proj[0];
            }).attr("cy", function(d) {
                var proj = projection([d.long, d.lat]);
                return proj[1];
            }).attr("r", function(d) { return rScale(d.date); })
            .attr("opacity", 0.5)
            .attr("fill", "red");

    date.exit()
            .transition()
            .duration(500)
            .attr("r", 0)
            .remove();

dateLabel.text(date);

svg.selectAll("circle")
        .on("mouseover", function(d) {
            var cx = +d3.select(this).attr("cx") + 100;
            var cy = +d3.select(this).attr("cy") + 300;

            tooltip.style("visibility","visible")
                .style("left", cx + "px")
                .style("top", cy + "px")
                .html(d.state + "<br>" + d.date.toLocaleDateString("en-US") + "<br>" + d.county);

            svg.selectAll("circle")
                .attr("opacity",0.5);

            d3.select(this)
                .attr("opacity",0.7);

        }).on("mouseout", function() {
            tooltip.style("visibility","hidden");

            svg.selectAll("circle")
                .attr("opacity",0.3);
            })

    }

updateMap(selectedDate);


slider.on("input", function() {
    var date = this.value;


    selectedDate = date;
    updateMap(selectedDate);

    })


var tooltip = d3.select("#chart")
    .append("div")
    .attr("class","tooltip");





});

function parseCSV(data) {
    var d = {};
    d.state = data.state;
    d.lat = +data.lat;
    d.long = +data.long;
    d.date = +data["Date"];
    d.county = +data.county;
    d.date = new Date(data.date);

    return d;




}

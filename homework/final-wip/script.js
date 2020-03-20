
var promises = [
    d3.csv("./data/bfro_reports_geocoded.csv"), 
    d3.json("./geojson/usa.json")
];

Promise.all(promises).then(function(data) {


    var quakeData = data[0];
    
    var usa = data[1];
    
    console.log(data)
    
    var width = document.querySelector("#chart1").clientWidth;
    var height = document.querySelector("#chart1").clientHeight;
    
    var svg = d3.select("#chart1")
        .append("svg")
        .attr("width", width)
        .attr("height", height);
    
    
    var projection = d3.geoMercator()
        .translate([width/2, height/2])
        .scale(100);
    
    
    var path = d3.geoPath().projection(projection);
    
    
    svg.selectAll("path")
        .data(usa.features)
        .append("path")
            .attr("class","place")
            .attr("d", path);
    
    quakeData = quakeData.sort(function(a,b) { return a.magnitude - b.magnitude; });
    
    
    
    
    var slider = d3.select("#selectMagnitude");
    
    slider
            .property("min", quakeData[0].magnitude)
            .property("max", [7.1])
            .property("value", quakeData[quakeData.length-1].magnitude)
            .property("tickValues",[1,3,5,7,10]);
    
    
    var selectedMagnitude = slider.property("value");
    
    
    var magnitudeLabel = svg.append("text")
            .attr("class", "magnitudeLabel")
            .attr("x", 600)
            .attr("y", height - 90)
            .text(selectedMagnitude)
            .text("Magnitude");
    
    var rScale = d3.scaleSqrt()
            .domain([1, 125])
            .range([0,475]);
    
    
    function updateMap(magnitude) {
    
            var filtered_data = quakeData.filter(function(d) {
                return d.magnitude == magnitude;
            });
    
    var mag = svg.selectAll("circle")
                .data(filtered_data, function(d) { return d.place; })
                .data(filtered_data, function(d) { return d.Depth; });
    
    
        mag.enter().append("circle")
                .attr("cx", function(d) {
                    var proj = projection([d.longitude, d.latitude]);
                    return proj[0];
                }).attr("cy", function(d) {
                    var proj = projection([d.longitude, d.latitude]);
                    return proj[1];
                }).attr("r", 0)
                .attr("opacity", 0.5)
                .attr("fill", "white")
            
        .merge(mag)
                .transition()
                .duration(800)
                .attr("cx", function(d) {
                    var proj = projection([d.longitude, d.latitude]);
                    return proj[0];
                }).attr("cy", function(d) {
                    var proj = projection([d.longitude, d.latitude]);
                    return proj[1];
                }).attr("r", function(d) { return rScale(d.magnitude); })
                .attr("opacity", 0.5)
                .attr("fill", "red");
    
        mag.exit()
                .transition()
                .duration(500)
                .attr("r", 0)
                .remove();
    
    magnitudeLabel.text(magnitude);
    
    svg.selectAll("circle")
            .on("mouseover", function(d) {
                var cx = +d3.select(this).attr("cx") + 100;
                var cy = +d3.select(this).attr("cy") + 300;
    
                tooltip.style("visibility","visible")
                    .style("left", cx + "px")
                    .style("top", cy + "px")
                    .html(d.place + "<br>" + d.date.toLocaleDateString("en-US") + "<br>" + d.Depth);
    
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
    
    updateMap(selectedMagnitude);
    
    
    slider.on("input", function() {
        var magnitude = this.value;
    
    
        selectedMagnitude = magnitude;
        updateMap(selectedMagnitude);
    
        })
    
    
    var tooltip = d3.select("#chart1")
        .append("div")
        .attr("class","tooltip");
    
    
    
    
    
    });
    
    function parseCSV(data) {
        var d = {};
        d.place = data.place;
        d.latitude = +data.Latitude;
        d.longitude = +data.Longitude;
        d.magnitude = +data["Magnitude"];
        d.Depth = +data.Depth;
        d.date = new Date(data.Date);
    
        return d;
    
    
    
    
    }
    
var promises = [
    d3.csv("./data/bfro_reports_geocoded.csv",parseCSV), 
    d3.json("./geojson/usa.json")
];

Promise.all(promises).then(function(data) {

    console.log(data);

    var bigfootData = data[0];

    var usa = data[1];


    var width = document.querySelector("#chart").clientWidth;
    var height = document.querySelector("#chart").clientHeight;
    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);




    var projection = d3.geoAlbersUsa()
        .translate([width/2, height/2])
        .scale(1020);


    var path = d3.geoPath().projection(projection);


    svg.selectAll("path")
        .data(usa.features)
        .enter()
        .append("path")
            .attr("class","state")
            .attr("d", path);


bigfootData = bigfootData.sort(function(a,b) { return a.year - b.year; });


var slider = d3.select("#selectYear");

    slider
        .property("min", bigfootData[0].year)
        .property("max", bigfootData[bigfootData.length-1].year)
        .property("value", bigfootData[bigfootData.length-1].year);

var selectedYear = slider.property("value");

var colorScale = d3.scaleOrdinal(d3.schemeCategory10);
    


    var yearLabel = svg.append("text")
        .attr("class", "yearLabel")
        .attr("x", 710)
        .attr("y", height - 1)
        .attr("opacity", 0.7)
        .text(selectedYear);
    

    var rScale = d3.scaleSqrt()
        .domain([0, 40])
        .range([0,15]);

    

    function updateMap(year) {

        var filtered_data = bigfootData.filter(function(d) {
            return d.year == year;
        });

        var c = svg.selectAll("circle")
            .data(filtered_data, function(d) { return d.date; }); /*check here for circles index in data array d,i combine index plus current year
            return d.year + "" i*/

        c.enter().append("circle")
            .attr("cx", function(d) {
                var proj = projection([d.longitude, d.latitude]);
                return proj[0];
            }).attr("cy", function(d) {
                var proj = projection([d.longitude, d.latitude]);
                return proj[1];            
            }).attr("r", 0)
            .attr("opacity", 0.2)
            .attr("fill", function(d) { return colorScale(d.season); })
        .merge(c)
            .transition()
            .duration(1000)
            .attr("cx", function(d) {
                var proj = projection([d.longitude, d.latitude]);
                return proj[0];
            }).attr("cy", function(d) {
                var proj = projection([d.longitude, d.latitude]);
                return proj[1];            
            }).attr("r", 7.0)
            .attr("opacity", 0.7)
            .attr("fill", function(d) { return colorScale(d.season); })
            
        c.exit()
            .transition()
            .duration(900)
            .attr("r", 0)
            .remove();

        yearLabel.text(year);

        svg.selectAll("circle")
            .on("mouseover", function(d) {
                var cx = +d3.select(this).attr("cx") + 20;
                var cy = +d3.select(this).attr("cy") + 470;

                tooltip.style("visibility","visible")
                    .style("left", cx + "px")
                    .style("top", cy + "px")
                    .html(d.county + ", "+ d.state + "<br>" + "<br>" + d.observed + 
                    "<br>" + "<br>"+ d.date.toLocaleDateString("en-US"));

                svg.selectAll("circle")
                    .attr("opacity",0.2);

                d3.select(this)
                    .attr("opacity",0.7)
                    .attr("stroke","#ffffff")
                    .attr("stroke-width",2)


            }).on("mouseout", function() {
                tooltip.style("visibility","visible"); 

                d3.select(this)
                .attr("stroke","none")
                .attr("stroke-width",0);

                svg.selectAll("circle")
                    .attr("opacity",0.7);
            })
        
    }
    


    updateMap(selectedYear);

    

    slider.on("input", function() {
        var year = this.value;
        console.log(year);

        selectedYear = year;
        updateMap(selectedYear);

    })
    
    var tooltip = d3.select("#tooltip")
        .append("div")
        .attr("class", "tooltip");

        var tooltip2 = d3.select("#chart")
        .append("div")
        .attr("class", "tooltip");


});



function parseCSV(data) {
    var d = {};
    d.observed = data.observed;
    d.state = data.state;
    d.county = data.county;
    d.latitude = +data.latitude;
    d.longitude = +data.longitude;
    d.season = data.season; 
    d.date = new Date(data.date);
    d.year = d.date.getFullYear();

    return d;

}
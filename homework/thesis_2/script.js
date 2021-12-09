var width = window.innerWidth;
var height = window.innerHeight;

var svg = d3.select("#viz")
  .attr("width", width)
  .attr("height", height);

  var map = svg.select("#map");

var zoom = d3.zoom()
    .translateExtent([[0, 0], [width, height]])
    .scaleExtent([1, 8])
    .on("zoom", zoomed);

function zoomed()   {
    map.attr("transform", d3.event.transform);
}

svg.call(zoom);


d3.json("usa.json", function(error, usa) {

    var geoJSON = topojson.feature(usa, usa.objects.states);

    geoJSON.features = geoJSON.features.filter(function(d) {
        return d.id !== "NE" && d.id !== "GA" && d.id !== "NV"; 
        //&& makes sure both ne and ga dont show, or would make both pass (cancel)//
      });

    var projection = d3.geoAlbersUsa()
    .fitSize([width, height], geoJSON);

    var path = d3.geoPath()
        .projection(projection);

    var states = map.selectAll("path")
        .data(geoJSON.features);

    states.enter().append("path")
        .attr("d", path)
        .attr("fill", "black")
        .attr("opacity", 0.7)
        .attr("stroke", "yellow");

        svg.select("#background")
        .attr("width", width)
        .attr("height", height);
        
        
        var points = [
            {"name": "Boston", "coords": [-71.0589, 42.3601]},
            {"name": "London", "coords": [-0.1278, 51.5074]}
          ];
          
          var points = map.selectAll("circle")
            .data(points);
          
          points.enter().append("circle")
            .attr("transform", function(d){
              return "translate(" + projection(d.coords) + ")";
            })
            .attr("r", 10)
            .attr("fill", "orange");



  });
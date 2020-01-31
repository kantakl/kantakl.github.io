var svg = d3.select("#chart");

var data1 = [
    "Hello, my name is Liz",
    "Titles",
    "Strings this is a string I don't understand strings"
];

var data2 = [
    "Heyo Ima string"
];

var columnWidth = 100;

var svg = d3.select("#chart");

function drawBoxes(data) {
    
    var boxes = svg.selectAll(".box")
        .data(data);

    boxes.enter().append("rect")
        .attr("class", "box")
        .attr("x", function(d, i)   {
            return i * columnWidth;
        })
        .attr("y", 0)                           //code that draw boxes//
        .attr("width", columnWidth)
        .attr("height", 200);

    boxes.exit().remove();
    
    var labels = svg.selectAll(".label")
    .data(data);

var fontSize = 20;

var enterLabels = labels.enter().append("text")     //code that draws labels//
    .attr("class", "label")
    .attr("font-size", fontSize)
    .attr("x", function(d, i)   {
        return i * columnWidth;

    })
    .attr("y", 0)
    .attr("width", columnWidth)
    .attr("height", 200);


labels.merge(enterLabels)
    .each(function(d, i) {
    var textElement = d3.select(this);
    textElement.text(" ");

    var words = d.split(" ");   //allows line breaks within svg//
    var tspan = textElement.append("tspan")
    var line = 0;

    words.forEach(function(word)    {

    var sentence = tspan.text();
    tspan.text(sentence + " " + word);

    var domElement = tspan.node();

    var tspanWidth = domElement.getBoundingClientRect().width;



    if (tspanWidth > columnWidth) {
        line++;
        tspan.text(sentence);
        tspan = textElement.append("tspan")
        .attr("y", line * fontSize)
        .attr("x", columnWidth * i)
        .text(word);
    }

});


  });

labels.exit().remove();

}

drawBoxes(data1);


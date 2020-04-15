d3.csv("./data/rpdr_data.csv").then(function(data) {
    console.log(data);

    var width = document.querySelector("#chart").clientWidth;
    var height = document.querySelector("#chart").clientHeight;
    var margin = {top: 50, left: 150, right: 50, bottom: 150};

    var svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

    var season_1 = data.filter(function(d) {
        return d.season == 1;
    });

    var season_2 = data.filter(function(d) {
        return d.season == 2;
    });

    var season_3 = data.filter(function(d) {
        return d.season == 3;
    });

    var season_4 = data.filter(function(d) {
        return d.season == 4;
    });

    var season_5 = data.filter(function(d) {
        return d.season == 5;
    });

    var season_6 = data.filter(function(d) {
        return d.season == 6;
    });

    var season_7 = data.filter(function(d) {
      return d.season == 7;
    });



   

    

    var age = {
        min: d3.min(data, function(d) { return +d.age; }),
        max: d3.max(data, function(d) { return +d.age; })
    };

    var challenge_wins = {
        min: d3.min(data, function(d) { return +d.challenge_wins; }),
        max: d3.max(data, function(d) { return +d.challenge_wins; })
    };

    var final_place = {
      min: d3.min(data, function(d) { return +d.final_place; }),
      max: d3.max(data, function(d) { return +d.final_place; })
  };

  var ls_battles = {
    min: d3.min(data, function(d) { return +d.ls_battles; }),
    max: d3.max(data, function(d) { return +d.ls_battles; })
};


    var xScale = d3.scaleLinear()
        .domain([18, age.max])
        .range([margin.left, width-margin.right]);


    var yScale = d3.scaleLinear()
        .domain([final_place.max, final_place.min])
        .range([height-margin.bottom, margin.top]);


    var colorScale = d3.scaleOrdinal(d3.schemeCategory10);



    var xAxis = svg.append("g")
        .attr("class","axis")
        .attr("transform", `translate(0,${height-margin.bottom})`)
        .call(d3.axisBottom().scale(xScale));

    var yAxis = svg.append("g")
        .attr("class","axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft().scale(yScale));

    
    var xAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("x", width/2)
        .attr("y", height-margin.bottom/2)
        .text("Age");

    var yAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("transform","rotate(-90)")
        .attr("x",-height/2)
        .attr("y",margin.left/2)
        .text("Finishing Place");  

  //draw and label axis for circles//

    
    var circle = svg.selectAll("circle")
        .data(season_1)
        .enter()
        .append("circle")
            .attr("cx", function(d) { return xScale(d.age); })
            .attr("cy", function(d) { return yScale(d.final_place); })
            .attr("r", 10)
            .attr("fill", function(d) { return colorScale(d.challenge_wins); })
            .on("mouseover", function(d) {

              var cx = +d3.select(this).attr("cx")+15;
              var cy = +d3.select(this).attr("cy")-20;
           
              tooltip.style("visibility","visible")
                .style("left", cx+"px")
                .style("top", cy+"px")
                .text(d.name);
           
              d3.select(this)
                .attr("stroke","#010101")
                .attr("stroke-width",3);
           
            }).on("mouseout", function() {
           
              tooltip.style("visibility","hidden");
           
              d3.select(this)
                .attr("stroke","none")
                .attr("stroke-width",0);
            })
           

    
     var tooltip = d3.select("#chart")
            .append("div")
            .attr("class","tooltip");
                        

    d3.select("#season_1").on("click", function() {

            var c = svg.selectAll("circle")
            .data(season_1, function(d) { return d.final_place; });
            c.enter()
            .append("circle")
              .attr("cx", function(d) { return xScale(d.age); })
              .attr("cy", function(d) { return yScale(d.final_place); })
              .attr("r", 10)
              .attr("fill", function(d) { return colorScale(d.challenge_wins); })
              .on("mouseover", function(d) {

                var cx = +d3.select(this).attr("cx")+15;
                var cy = +d3.select(this).attr("cy")-20;
             
                tooltip.style("visibility","visible")
                  .style("left", cx+"px")
                  .style("top", cy+"px")
                  .text(d.name);
             
                d3.select(this)
                  .attr("stroke","#010101")
                  .attr("stroke-width",3);
             
              }).on("mouseout", function() {
             
                tooltip.style("visibility","hidden");
             
                d3.select(this)
                  .attr("stroke","none")
                  .attr("stroke-width",0);
              })
            .merge(c)
              .transition()
              .duration(1500)
              .attr("cx", function(d) { return xScale(d.age); })
              .attr("cy", function(d) { return yScale(d.final_place); })
              .attr("r", 10)
              .attr("fill", function(d) { return colorScale(d.challenge_wins); })
      
            c.exit()
              .transition()
              .duration(500)
              .attr("r",0)
              .remove();

            
            
          });
      
      
      
    d3.select("#season_2").on("click", function() {
           
            var c = svg.selectAll("circle")
              .data(season_2, function(d) { return d.final_place; });
      
            c.enter()
            .append("circle")
              .attr("cx", function(d) { return xScale(d.age); })
              .attr("cy", function(d) { return yScale(d.final_place); })
              .attr("r", 10)
              .attr("fill", function(d) { return colorScale(d.challenge_wins); })
              .on("mouseover", function(d) {

                var cx = +d3.select(this).attr("cx")+15;
                var cy = +d3.select(this).attr("cy")-20;
             
                tooltip.style("visibility","visible")
                  .style("left", cx+"px")
                  .style("top", cy+"px")
                  .text(d.name);
             
                d3.select(this)
                  .attr("stroke","#010101")
                  .attr("stroke-width",3);
             
              }).on("mouseout", function() {
             
                tooltip.style("visibility","hidden");
             
                d3.select(this)
                  .attr("stroke","none")
                  .attr("stroke-width",0);
              })
            .merge(c)
              .transition()
              .duration(2000)
              .attr("cx", function(d) { return xScale(d.age); })
              .attr("cy", function(d) { return yScale(d.final_place); })
              .attr("r", 10)
              .attr("fill", function(d) { return colorScale(d.challenge_wins); })
      
            c.exit()
              .transition()
              .duration(500)
              .attr("r",0)
              .remove();
          })

          //szn 3//

          d3.select("#season_3").on("click", function() {
           
            var c = svg.selectAll("circle")
              .data(season_3, function(d) { return d.final_place; });
      
            c.enter()
            .append("circle")
              .attr("cx", function(d) { return xScale(d.age); })
              .attr("cy", function(d) { return yScale(d.final_place); })
              .attr("r", 10)
              .attr("fill", function(d) { return colorScale(d.challenge_wins); })
              .on("mouseover", function(d) {

                var cx = +d3.select(this).attr("cx")+15;
                var cy = +d3.select(this).attr("cy")-20;
             
                tooltip.style("visibility","visible")
                  .style("left", cx+"px")
                  .style("top", cy+"px")
                  .text(d.name);
             
                d3.select(this)
                  .attr("stroke","#010101")
                  .attr("stroke-width",3);
             
              }).on("mouseout", function() {
             
                tooltip.style("visibility","hidden");
             
                d3.select(this)
                  .attr("stroke","none")
                  .attr("stroke-width",0);
              })
            .merge(c)
              .transition()
              .duration(2000)
              .attr("cx", function(d) { return xScale(d.age); })
              .attr("cy", function(d) { return yScale(d.final_place); })
              .attr("r", 10)
              .attr("fill", function(d) { return colorScale(d.challenge_wins); })
      
            c.exit()
              .transition()
              .duration(500)
              .attr("r",0)
              .remove();
          })

    //szn 4//

    d3.select("#season_4").on("click", function() {
           
      var c = svg.selectAll("circle")
        .data(season_4, function(d) { return d.final_place; });

      c.enter()
      .append("circle")
        .attr("cx", function(d) { return xScale(d.age); })
        .attr("cy", function(d) { return yScale(d.final_place); })
        .attr("r", 10)
        .attr("fill", function(d) { return colorScale(d.challenge_wins); })
        .on("mouseover", function(d) {

          var cx = +d3.select(this).attr("cx")+15;
          var cy = +d3.select(this).attr("cy")-20;
       
          tooltip.style("visibility","visible")
            .style("left", cx+"px")
            .style("top", cy+"px")
            .text(d.name);
       
          d3.select(this)
            .attr("stroke","#010101")
            .attr("stroke-width",3);
       
        }).on("mouseout", function() {
       
          tooltip.style("visibility","hidden");
       
          d3.select(this)
            .attr("stroke","none")
            .attr("stroke-width",0);
        })
      .merge(c)
        .transition()
        .duration(2000)
        .attr("cx", function(d) { return xScale(d.age); })
        .attr("cy", function(d) { return yScale(d.final_place); })
        .attr("r", 10)
        .attr("fill", function(d) { return colorScale(d.challenge_wins); })

      c.exit()
        .transition()
        .duration(500)
        .attr("r",0)
        .remove();
    })

    //szn 5//

    d3.select("#season_5").on("click", function() {
           
      var c = svg.selectAll("circle")
        .data(season_5, function(d) { return d.final_place; });

      c.enter()
      .append("circle")
        .attr("cx", function(d) { return xScale(d.age); })
        .attr("cy", function(d) { return yScale(d.final_place); })
        .attr("r", 10)
        .attr("fill", function(d) { return colorScale(d.challenge_wins); })
        .on("mouseover", function(d) {

          var cx = +d3.select(this).attr("cx")+15;
          var cy = +d3.select(this).attr("cy")-20;
       
          tooltip.style("visibility","visible")
            .style("left", cx+"px")
            .style("top", cy+"px")
            .text(d.name);
       
          d3.select(this)
            .attr("stroke","#010101")
            .attr("stroke-width",3);
       
        }).on("mouseout", function() {
       
          tooltip.style("visibility","hidden");
       
          d3.select(this)
            .attr("stroke","none")
            .attr("stroke-width",0);
        })
      .merge(c)
        .transition()
        .duration(2000)
        .attr("cx", function(d) { return xScale(d.age); })
        .attr("cy", function(d) { return yScale(d.final_place); })
        .attr("r", 10)
        .attr("fill", function(d) { return colorScale(d.challenge_wins); })

      c.exit()
        .transition()
        .duration(500)
        .attr("r",0)
        .remove();
    })

    //szn 6//

    d3.select("#season_6").on("click", function() {
           
      var c = svg.selectAll("circle")
        .data(season_6, function(d) { return d.final_place; });

      c.enter()
      .append("circle")
        .attr("cx", function(d) { return xScale(d.age); })
        .attr("cy", function(d) { return yScale(d.final_place); })
        .attr("r", 10)
        .attr("fill", function(d) { return colorScale(d.challenge_wins); })
        .on("mouseover", function(d) {

          var cx = +d3.select(this).attr("cx")+15;
          var cy = +d3.select(this).attr("cy")-20;
       
          tooltip.style("visibility","visible")
            .style("left", cx+"px")
            .style("top", cy+"px")
            .text(d.name);
       
          d3.select(this)
            .attr("stroke","#010101")
            .attr("stroke-width",3);
       
        }).on("mouseout", function() {
       
          tooltip.style("visibility","hidden");
       
          d3.select(this)
            .attr("stroke","none")
            .attr("stroke-width",0);
        })
      .merge(c)
        .transition()
        .duration(2000)
        .attr("cx", function(d) { return xScale(d.age); })
        .attr("cy", function(d) { return yScale(d.final_place); })
        .attr("r", 10)
        .attr("fill", function(d) { return colorScale(d.challenge_wins); })

      c.exit()
        .transition()
        .duration(500)
        .attr("r",0)
        .remove();
    })

        //szn 7//

        d3.select("#season_7").on("click", function() {
           
          var c = svg.selectAll("circle")
            .data(season_7, function(d) { return d.final_place; });
    
          c.enter()
          .append("circle")
            .attr("cx", function(d) { return xScale(d.age); })
            .attr("cy", function(d) { return yScale(d.final_place); })
            .attr("r", 10)
            .attr("fill", function(d) { return colorScale(d.challenge_wins); })
            .on("mouseover", function(d) {
    
              var cx = +d3.select(this).attr("cx")+15;
              var cy = +d3.select(this).attr("cy")-20;
           
              tooltip.style("visibility","visible")
                .style("left", cx+"px")
                .style("top", cy+"px")
                .text(d.name);
           
              d3.select(this)
                .attr("stroke","#010101")
                .attr("stroke-width",3);
           
            }).on("mouseout", function() {
           
              tooltip.style("visibility","hidden");
           
              d3.select(this)
                .attr("stroke","none")
                .attr("stroke-width",0);
            })
          .merge(c)
            .transition()
            .duration(2000)
            .attr("cx", function(d) { return xScale(d.age); })
            .attr("cy", function(d) { return yScale(d.final_place); })
            .attr("r", 10)
            .attr("fill", function(d) { return colorScale(d.challenge_wins); })
    
          c.exit()
            .transition()
            .duration(500)
            .attr("r",0)
            .remove();
        })

});

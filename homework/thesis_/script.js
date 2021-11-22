d3.csv("./data/toughestsport/toughest_sport.csv").then(function(data) {
    console.log(data);

    var width = document.querySelector("#chart").clientWidth;
    var height = document.querySelector("#chart").clientHeight;
    var margin = {top: 50, left: 150, right: 50, bottom: 150};

var chartWidth = width - margin.left - margin.right;
var chartHeight = height - margin.top - margin.bottom;

    var svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

    var yes_team = data.filter(function(d) {
      return d.team_sport == "yes";
  });

    var no_team = data.filter(function(d) {
        return d.team_sport == "no";
    });


          
        var endurance = {
            min: d3.min(data, function(d) { return +d.endurance; }),
            max: d3.max(data, function(d) { return +d.endurance; })
        };

        var strength = {
            min: d3.min(data, function(d) { return +d.strength; }),
            max: d3.max(data, function(d) { return +d.strength; })
        };

        var power = {
          min: d3.min(data, function(d) { return +d.power; }),
          max: d3.max(data, function(d) { return +d.power; })
        };

        var speed = {
          min: d3.min(data, function(d) { return +d.speed; }),
          max: d3.max(data, function(d) { return +d.speed; })
        };


        var agility = {
          min: d3.min(data, function(d) { return +d.agility; }),
          max: d3.max(data, function(d) { return +d.agility; })
        };

        var flexibility = {
          min: d3.min(data, function(d) { return +d.flexibility; }),
          max: d3.max(data, function(d) { return +d.flexibility; })
        };

        var nerve = {
          min: d3.min(data, function(d) { return +d.nerve; }),
          max: d3.max(data, function(d) { return +d.nerve; })
        };


        var durability = {
          min: d3.min(data, function(d) { return +d.durability; }),
          max: d3.max(data, function(d) { return +d.durability; })
        };


        var h_e_coordination = {
          min: d3.min(data, function(d) { return +d.h_e_coordination; }),
          max: d3.max(data, function(d) { return +d.h_e_coordination; })
        };

        var ana = {
          min: d3.min(data, function(d) { return +d.ana; }),
          max: d3.max(data, function(d) { return +d.ana; })
        };

        var total = {
          min: d3.min(data, function(d) { return +d.total; }),
          max: d3.max(data, function(d) { return +d.total; })
        };

        var rank = {
          min: d3.min(data, function(d) { return +d.rank; }),
          max: d3.max(data, function(d) { return +d.rank; })
        };






//x and y scale domain//


        var xScale = d3.scaleBand()
        .domain(["Archery", "Auto Racing", "Badminton", "Baseball/Softball", "Basketball", "Billiards", "Bobsledding/Luge",
        "Bowling", "Boxing", "Canoe/Kayak", "Cheerleading", "Curling", "Cycling: Distance", "Cycling: Sprints",
        "Diving", "Equestrian", "Fencing", "Field Hockey", "Figure Skating", "Fishing", "Football", "Golf",
        "Gymnastics", "Horse Racing", "Ice Hockey", "Lacrosse", "Martial Arts", "Racquetball/Squash", "Rodeo: Bull/Bareback/Bronc Riding", "Rodeo: Calf Roping",
        "Rodeo: Steer Wrestling", "Roller Skating", "Rowing", "Rugby", "Shooting", "Skateboarding",
        "Ski Jumping", "Skiing: Alpine", "Skiing: Freestyle", "Skiing: Nordic", "Soccer", "Speed Skating",
        "Surfing", "Swimming (all strokes): Distance", "Swimming (all strokes): Sprints", "Table Tennis", "Team Handball", "Tennis", "Track and Field: Distance", 
        "Track and Field: High Jump", "Track and Field: Long, Triple jumps", "Track and Field: Middle Distance",
        "Track and Field: Pole Vault", "Track and Field: Sprints", "Track and Field: Weights",
        "Volleyball", "Water Polo", "Water Skiing", "Weight-Lifting", "Wrestling"])
        .rangeRound([margin.left, width-margin.right])
        .padding(0.3);

        var yScale = d3.scaleLinear()
            .domain([speed.min, speed.max])
            .range([height-margin.bottom, margin.top]);

        var colorScale = d3.scaleOrdinal(d3.schemeGreens[1,4]);


        var rScale = d3.scaleSqrt()
        .domain([nerve.min, nerve.max])
        .range([3, 25]);

// x and y scale drawing//

        var xAxis = svg.append("g")
        .attr("class","x axis")
        .attr("transform", `translate(0,${height-margin.bottom})`)
        .call(d3.axisBottom().scale(xScale))
        .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-1.5em")
            .attr("dy", ".5em")
            .attr("transform", "rotate(-60)" );
        ;

    var yAxis = svg.append("g")
        .attr("class","axis")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft().scale(yScale));

    
    var xAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("x", width/2)
        .attr("y", height-margin.bottom/2);

    var yAxisLabel = svg.append("text")
        .attr("class","axisLabel")
        .attr("transform","rotate(-90)")
        .attr("x",-height/2)
        .attr("y",margin.left/2);  

          //draw and label axis for circles//

          //endurance//

          var circle = svg.selectAll("circle")
          .data(data)
          .enter()
          .append("circle")
              .attr("cx", function(d) { return xScale(d.sport); })
              .attr("cy", function(d) { return yScale(d.endurance); })
              .attr("r", function(d) { return rScale(d.endurance); })
              .attr("fill", function(d) { return colorScale(d.team_sport); })
              .on("mouseover", function(d) {
  
                var cx = +d3.select(this).attr("cx") + 50;
                var cy = +d3.select(this).attr("cy") + 170;
             
                tooltip.style("visibility","visible")
                  .style("left", cx + "px")
                  .style("top", cy + "px")
                  .html(d.sport + "<br>" + d.total);
             
                d3.select(this)
                  .attr("stroke","purple")
                  .attr("stroke-width",2);
             
              }).on("mouseout", function() {
             
                tooltip.style("visibility","hidden");
             
                d3.select(this)
                  .attr("stroke","none")
                  .attr("stroke-width",0);
              })
             
  
      
       var tooltip = d3.select("#tooltip")
              .append("div")
              .attr("class","tooltip");
                          
  
      d3.select("#endurance").on("click", function() {
  
              var c = svg.selectAll("circle")
              .data(data, function(d) { return d.endurance; });
              c.enter()
              .append("circle")
                .attr("cx", function(d) { return xScale(d.sport); })
                .attr("cy", function(d) { return yScale(d.endurance); })
                .attr("r", function(d) { return rScale(d.endurance); })
                .attr("fill", function(d) { return colorScale(d.team_sport); })
                .on("mouseover", function(d) {
               
                  var cx = +d3.select(this).attr("cx") + 150;
                  var cy = +d3.select(this).attr("cy") + 570;
  
                  tooltip.style("visibility","visible")
                    .style("left", cx+"px")
                    .style("top", cy+"px")
                    .html(d.sport + "<br>" + d.total);
               
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
                .duration(800)
                .attr("cx", function(d) { return xScale(d.sport); })
                .attr("cy", function(d) { return yScale(d.endurance); })
                .attr("r", function(d) { return rScale(d.endurance); })
                .attr("fill", function(d) { return colorScale(d.team_sport); })
        
              c.exit()
                .transition()
                .duration(800)
                .attr("r",0)
                .remove();
  
              
              
            })

            //strength//

                        
          d3.select("#strength").on("click", function() {
                
            var c = svg.selectAll("circle")
              .data(data, function(d) { return d.strength; });

            c.enter()
            .append("circle")
              .attr("cx", function(d) { return xScale(d.sport); })
              .attr("cy", function(d) { return yScale(d.strength); })
              .attr("r", function(d) { return rScale(d.strength); })
              .attr("fill", function(d) { return colorScale(d.team_sport); })
              .on("mouseover", function(d) {

                var cx = +d3.select(this).attr("cx") + 50;
                var cy = +d3.select(this).attr("cy") + 570;
            
                tooltip.style("visibility","visible")
                  .style("left", cx+"px")
                  .style("top", cy+"px")
                  .html(d.sport + "<br>" + d.total);
            
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
              .duration(800)
              .attr("cx", function(d) { return xScale(d.sport); })
              .attr("cy", function(d) { return yScale(d.strength); })
              .attr("r", function(d) { return rScale(d.strength); })
              .attr("fill", function(d) { return colorScale(d.team_sport); })

            c.exit()
              .transition()
              .duration(800)
              .attr("r",0)
              .remove();
          })

          //power//

          d3.select("#power").on("click", function() {
                
            var c = svg.selectAll("circle")
              .data(data, function(d) { return d.power; });

            c.enter()
            .append("circle")
              .attr("cx", function(d) { return xScale(d.sport); })
              .attr("cy", function(d) { return yScale(d.power); })
              .attr("r", function(d) { return rScale(d.power); })
              .attr("fill", function(d) { return colorScale(d.team_sport); })
              .on("mouseover", function(d) {

                var cx = +d3.select(this).attr("cx") + 50;
                var cy = +d3.select(this).attr("cy") + 570;
            
                tooltip.style("visibility","visible")
                  .style("left", cx+"px")
                  .style("top", cy+"px")
                  .html(d.sport + "<br>" + d.total);
            
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
              .duration(800)
              .attr("cx", function(d) { return xScale(d.sport); })
              .attr("cy", function(d) { return yScale(d.power); })
              .attr("r", function(d) { return rScale(d.power); })
              .attr("fill", function(d) { return colorScale(d.team_sport); })

            c.exit()
              .transition()
              .duration(800)
              .attr("r",0)
              .remove();
          })

            //speed//

            d3.select("#speed").on("click", function() {
                
              var c = svg.selectAll("circle")
                .data(data, function(d) { return d.speed; });
  
              c.enter()
              .append("circle")
                .attr("cx", function(d) { return xScale(d.sport); })
                .attr("cy", function(d) { return yScale(d.speed); })
                .attr("r", function(d) { return rScale(d.speed); })
                .attr("fill", function(d) { return colorScale(d.team_sport); })
                .on("mouseover", function(d) {
  
                  var cx = +d3.select(this).attr("cx") + 50;
                  var cy = +d3.select(this).attr("cy") + 570;
              
                  tooltip.style("visibility","visible")
                    .style("left", cx+"px")
                    .style("top", cy+"px")
                    .html(d.sport + "<br>" + d.total);
              
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
                .duration(800)
                .attr("cx", function(d) { return xScale(d.sport); })
                .attr("cy", function(d) { return yScale(d.speed); })
                .attr("r", function(d) { return rScale(d.speed); })
                .attr("fill", function(d) { return colorScale(d.team_sport); })
  
              c.exit()
                .transition()
                .duration(800)
                .attr("r",0)
                .remove();
            })

    
            //agility//

            d3.select("#agility").on("click", function() {
                
              var c = svg.selectAll("circle")
                .data(data, function(d) { return d.agility; });
  
              c.enter()
              .append("circle")
                .attr("cx", function(d) { return xScale(d.sport); })
                .attr("cy", function(d) { return yScale(d.agility); })
                .attr("r", function(d) { return rScale(d.agility); })
                .attr("fill", function(d) { return colorScale(d.team_sport); })
                .on("mouseover", function(d) {
  
                  var cx = +d3.select(this).attr("cx") + 50;
                  var cy = +d3.select(this).attr("cy") + 570;
              
                  tooltip.style("visibility","visible")
                    .style("left", cx+"px")
                    .style("top", cy+"px")
                    .html(d.sport + "<br>" + d.total);
              
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
                .duration(800)
                .attr("cx", function(d) { return xScale(d.sport); })
                .attr("cy", function(d) { return yScale(d.agility); })
                .attr("r", function(d) { return rScale(d.agility); })
                .attr("fill", function(d) { return colorScale(d.team_sport); })
  
              c.exit()
                .transition()
                .duration(800)
                .attr("r",0)
                .remove();
            })

        
            //flexibility//

            d3.select("#flexibility").on("click", function() {
                
              var c = svg.selectAll("circle")
                .data(data, function(d) { return d.flexibility; });
  
              c.enter()
              .append("circle")
                .attr("cx", function(d) { return xScale(d.sport); })
                .attr("cy", function(d) { return yScale(d.flexibility); })
                .attr("r", function(d) { return rScale(d.flexibility); })
                .attr("fill", function(d) { return colorScale(d.team_sport); })
                .on("mouseover", function(d) {
  
                  var cx = +d3.select(this).attr("cx") + 50;
                  var cy = +d3.select(this).attr("cy") + 570;
              
                  tooltip.style("visibility","visible")
                    .style("left", cx+"px")
                    .style("top", cy+"px")
                    .html(d.sport + "<br>" + d.total);
              
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
                .duration(800)
                .attr("cx", function(d) { return xScale(d.sport); })
                .attr("cy", function(d) { return yScale(d.flexibility); })
                .attr("r", function(d) { return rScale(d.flexibility); })
                .attr("fill", function(d) { return colorScale(d.team_sport); })
  
              c.exit()
                .transition()
                .duration(800)
                .attr("r",0)
                .remove();
            })

                //nerve//

                d3.select("#nerve").on("click", function() {
                
                  var c = svg.selectAll("circle")
                    .data(data, function(d) { return d.nerve; });
      
                  c.enter()
                  .append("circle")
                    .attr("cx", function(d) { return xScale(d.sport); })
                    .attr("cy", function(d) { return yScale(d.nerve); })
                    .attr("r", function(d) { return rScale(d.nerve); })
                    .attr("fill", function(d) { return colorScale(d.team_sport); })
                    .on("mouseover", function(d) {
      
                      var cx = +d3.select(this).attr("cx") + 50;
                      var cy = +d3.select(this).attr("cy") + 570;
                  
                      tooltip.style("visibility","visible")
                        .style("left", cx+"px")
                        .style("top", cy+"px")
                        .html(d.sport + "<br>" + d.total);
                  
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
                    .duration(800)
                    .attr("cx", function(d) { return xScale(d.sport); })
                    .attr("cy", function(d) { return yScale(d.nerve); })
                    .attr("r", function(d) { return rScale(d.nerve); })
                    .attr("fill", function(d) { return colorScale(d.team_sport); })
      
                  c.exit()
                    .transition()
                    .duration(800)
                    .attr("r",0)
                    .remove();
                })

                    //nerve//

                d3.select("#nerve").on("click", function() {
                
                  var c = svg.selectAll("circle")
                    .data(data, function(d) { return d.nerve; });
      
                  c.enter()
                  .append("circle")
                    .attr("cx", function(d) { return xScale(d.sport); })
                    .attr("cy", function(d) { return yScale(d.nerve); })
                    .attr("r", function(d) { return rScale(d.nerve); })
                    .attr("fill", function(d) { return colorScale(d.team_sport); })
                    .on("mouseover", function(d) {
      
                      var cx = +d3.select(this).attr("cx") + 50;
                      var cy = +d3.select(this).attr("cy") + 570;
                  
                      tooltip.style("visibility","visible")
                        .style("left", cx+"px")
                        .style("top", cy+"px")
                        .html(d.sport + "<br>" + d.total);
                  
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
                    .duration(800)
                    .attr("cx", function(d) { return xScale(d.sport); })
                    .attr("cy", function(d) { return yScale(d.nerve); })
                    .attr("r", function(d) { return rScale(d.nerve); })
                    .attr("fill", function(d) { return colorScale(d.team_sport); })
      
                  c.exit()
                    .transition()
                    .duration(800)
                    .attr("r",0)
                    .remove();
                })
            
            //durability//

            d3.select("#durability").on("click", function() {
                
            var c = svg.selectAll("circle")
              .data(data, function(d) { return d.durability; });
        
              c.enter()
                .append("circle")
                  .attr("cx", function(d) { return xScale(d.sport); })
                  .attr("cy", function(d) { return yScale(d.durability); })
                  .attr("r", function(d) { return rScale(d.durability); })
                  .attr("fill", function(d) { return colorScale(d.team_sport); })
                  .on("mouseover", function(d) {
        
                        var cx = +d3.select(this).attr("cx") + 50;
                        var cy = +d3.select(this).attr("cy") + 570;
                    
                        tooltip.style("visibility","visible")
                          .style("left", cx+"px")
                          .style("top", cy+"px")
                          .html(d.sport + "<br>" + d.total);
                    
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
                      .duration(800)
                      .attr("cx", function(d) { return xScale(d.sport); })
                      .attr("cy", function(d) { return yScale(d.durability); })
                      .attr("r", function(d) { return rScale(d.durability); })
                      .attr("fill", function(d) { return colorScale(d.team_sport); })
        
                    c.exit()
                      .transition()
                      .duration(800)
                      .attr("r",0)
                      .remove();
                  })
                
            //durability//

            d3.select("#h_e_coordination").on("click", function() {
                
              var c = svg.selectAll("circle")
                .data(data, function(d) { return d.h_e_coordination; });
          
                c.enter()
                  .append("circle")
                    .attr("cx", function(d) { return xScale(d.sport); })
                    .attr("cy", function(d) { return yScale(d.h_e_coordination); })
                    .attr("r", function(d) { return rScale(d.h_e_coordination); })
                    .attr("fill", function(d) { return colorScale(d.team_sport); })
                    .on("mouseover", function(d) {
          
                          var cx = +d3.select(this).attr("cx") + 50;
                          var cy = +d3.select(this).attr("cy") + 570;
                      
                          tooltip.style("visibility","visible")
                            .style("left", cx+"px")
                            .style("top", cy+"px")
                            .html(d.sport + "<br>" + d.total);
                      
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
                        .duration(800)
                        .attr("cx", function(d) { return xScale(d.sport); })
                        .attr("cy", function(d) { return yScale(d.h_e_coordination); })
                        .attr("r", function(d) { return rScale(d.h_e_coordination); })
                        .attr("fill", function(d) { return colorScale(d.team_sport); })
          
                      c.exit()
                        .transition()
                        .duration(800)
                        .attr("r",0)
                        .remove();
                    })

                   
            //analytic aptitide//

            d3.select("#ana").on("click", function() {
                
              var c = svg.selectAll("circle")
                .data(data, function(d) { return d.ana; });
          
                c.enter()
                  .append("circle")
                    .attr("cx", function(d) { return xScale(d.sport); })
                    .attr("cy", function(d) { return yScale(d.ana); })
                    .attr("r", function(d) { return rScale(d.ana); })
                    .attr("fill", function(d) { return colorScale(d.team_sport); })
                    .on("mouseover", function(d) {
          
                          var cx = +d3.select(this).attr("cx") + 50;
                          var cy = +d3.select(this).attr("cy") + 570;
                      
                          tooltip.style("visibility","visible")
                            .style("left", cx+"px")
                            .style("top", cy+"px")
                            .html(d.sport + "<br>" + d.total);
                      
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
                        .duration(800)
                        .attr("cx", function(d) { return xScale(d.sport); })
                        .attr("cy", function(d) { return yScale(d.ana); })
                        .attr("r", function(d) { return rScale(d.ana); })
                        .attr("fill", function(d) { return colorScale(d.team_sport); })
          
                      c.exit()
                        .transition()
                        .duration(800)
                        .attr("r",0)
                        .remove();
                    })

   });
        


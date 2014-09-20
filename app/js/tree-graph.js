"use strict";

var margin = {top: 100, right: 100, bottom: 100, left: 100};
var width = 960 - margin.right - margin.left;
var height = 700 - margin.top - margin.bottom;

var tree = d3.layout.tree()
    .size([width / 2, height / 2.5])
    .separation(function(a, b){ 
      return (a.parent == b.parent ? 1 : 2) / a.depth; 
    });

var diagonal = d3.svg.diagonal.radial()
    .projection(function(d){ 
      return [d.y, d.x / 180 * Math.PI]; 
    });

var svg = d3.select("body").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

d3.json("data/tree-data.json", function(error, root) {
  var nodes = tree.nodes(root),
      links = tree.links(nodes);

  var link = svg.selectAll(".link")
      .data(links)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", diagonal);

  var node = svg.selectAll(".node")
      .data(nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { 
        return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; 
      });
      // .on("click", function(d) { // turn nodes into clickable links
      //   window.location.assign(d.url);
      // });


  node.append("circle")
      .attr("r", function(d){
        // console.log(d);
        return 4.5;
      })
      .attr("class", function(d){
        return "depth_" + d.depth;
      });

  node.append("text")
      .attr("text-anchor", function(d) { 
        return d.x < 180 ? "start" : "end"; 
      })
      // .attr("transform", function(d) { return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)"; })
      .attr("transform", function(d) { 
        return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)"; 
      })
      .text(function(d) { 
        return d.name; 
      });
});

d3.select(self.frameElement).style("height", height + "px");

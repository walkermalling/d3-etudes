var width = 960,
    height = 500;

var vertices = d3.range(100).map(function(d) {
  return [Math.random() * width, Math.random() * height];
});

var voronoi = d3.geom.voronoi()
    .clipExtent([[0, 0], [width, height]]);

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);
    // .on("mousemove", functio n() { vertices[0] = d3.mouse(this); redraw(); });

var path = svg.append("g").selectAll("path");

svg.selectAll("circle")
    .data(vertices.slice(1))
  .enter().append("circle")
    .attr("transform", function(d) { return "translate(" + d + ")"; })
    .attr("r", 6)
    .style("z-index", 10)
    .on("click", function(d){console.log(d)});

redraw();

function redraw() {
  path = path
      .data(voronoi(vertices), polygon);

  path.exit().remove();

  path.enter().append("path")
      .attr("class", function(d, i) { return "q" + (i % 9) + "-9"; })
      .attr("d", polygon)
      .style("z-index", 1);

  path.order();
}

function polygon(d) {
  return "M" + d.join("L") + "Z";
}
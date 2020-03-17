import Component from '@glimmer/component';
import { action } from '@ember/object';
import d3 from 'd3';

export default class AnimateThisComponent extends Component {
  @action
  showTheDots(el) {
    // From https://bl.ocks.org/mbostock/3231298
    // Released under the GNU General Public License, version 3
    var width = 960,
    height = 500;

    var nodes = d3.range(200).map(function() { return {radius: Math.random() * 12 + 4}; }),
        root = nodes[0],
        color = d3.scale.category10();

    root.radius = 0;
    root.fixed = true;

    var force = d3.layout.force()
        .gravity(0.05)
        .charge(function(d, i) { return i ? 0 : -2000; })
        .nodes(nodes)
        .size([width, height]);

    force.start();

    var svg = d3.select(el).append("svg")
    .attr("width", width)
    .attr("height", height);

const tomsters = [
  "a11y-tomster.png",
  "chicago-zoey.png",
  "empress.png",
  "munich.png",
  "raleigh.png",
  "slc.png",
  "a11y-zoey.png", 
  "berlin-tomster.png",
  "columbus.png", 
  "london.png",
  "nizhny-novgorod.png",
  "stockholm.png",
  "atlanta-zoey.png",
  "boston.png",
  "dc-tomster.png",
  "louisville.png", 
  "nyc.png", 
  "sandiego-zoey.png",
  "austin-zoey.png",
  "cancer-zoey.png",
  "denver.png", 
  "montevideo.png",
  "paris.png",
  "seattle.png",
  "austin.png",
  "chicago-tomster.png",
  "emberconf-2016-tomster.png",
  "munich-zoey.png",
  "portland.png",
  "serbia-tomster.png"
]

svg.selectAll("zoey")
    .data(nodes.slice(1))
  .enter().append("image")
    .attr("width", function(d) { return 2 * d.radius; })
    .attr("href", function() { return tomsters[Math.floor(Math.random() * tomsters.length)]})

force.on("tick", function(e) {
  var q = d3.geom.quadtree(nodes),
      i = 0,
      n = nodes.length;

  while (++i < n) q.visit(collide(nodes[i]));

  svg.selectAll("image")
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; });
});

    svg.on("mousemove", function() {
      var p1 = d3.mouse(this);
      root.px = p1[0];
      root.py = p1[1];
      force.resume();
    });

    function collide(node) {
      var r = node.radius + 16,
          nx1 = node.x - r,
          nx2 = node.x + r,
          ny1 = node.y - r,
          ny2 = node.y + r;
      return function(quad, x1, y1, x2, y2) {
        if (quad.point && (quad.point !== node)) {
          var x = node.x - quad.point.x,
              y = node.y - quad.point.y,
              l = Math.sqrt(x * x + y * y),
              r = node.radius + quad.point.radius;
          if (l < r) {
            l = (l - r) / l * .5;
            node.x -= x *= l;
            node.y -= y *= l;
            quad.point.x += x;
            quad.point.y += y;
          }
        }
        return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
      };
    }
  }
}

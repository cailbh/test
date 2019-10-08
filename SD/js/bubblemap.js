var date1 = ["2018-3-1", "2018-3-2", "2018-3-3", "2018-3-4", "2018-3-5", "2018-3-6", "2018-3-7", "2018-3-8",
  "2018-3-9", "2018-3-10", "2018-3-11", "2018-3-12", "2018-3-13", "2018-3-14", "2018-3-15", "2018-3-16", "2018-3-17",
  "2018-3-18", "2018-3-19", "2018-3-20", "2018-3-21", "2018-3-22", "2018-3-23", "2018-3-24", "2018-3-25", "2018-3-26",
  "2018-3-27", "2018-3-28", "2018-3-29", "2018-3-30", "2018-3-31", "2018-4-1", "2018-4-2", "2018-4-3", "2018-4-4", "2018-4-5",
  "2018-4-6", "2018-4-7", "2018-4-8", "2018-4-9", "2018-4-10", "2018-4-11", "2018-4-12", "2018-4-13", "2018-4-14", "2018-4-15",
  "2018-4-16", "2018-4-17", "2018-4-18", "2018-4-19", "2018-4-20"]
function sc(num) {
  var width = document.getElementById("downmiddlebody").clientWidth;
  var height = document.getElementById("downmiddlebody").clientHeight;
  var yb = 300
  var x=10;
  var ys = (width+height)/20
  // 0-10 --- 0 - 20
  // 10-80-----20 - 90
  // 80 - 100---90-100
  if(num<30){
    y = num*ys*0.2/yb+x;//2
  }
  else if(num<240){
    y = num*ys*0.7/yb+x+ys*0.2;
  }
  else{
    y = num*ys*0.1/yb+x+ys*0.9;
  }
  // y = num * 4 / a + 10
  return y
}

function drawChart(data, day, name, padding, curvature) {
  namelist = NAMELIST
  idlist = IDLIST

  var width = document.getElementById("downmiddlebody").clientWidth;

  var height = document.getElementById("downmiddlebody").clientHeight;
  d3.select("#downmiddlebody").selectAll("svg").remove()
  var svg = d3.select("#downmiddlebody").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    // .call(zoom)
    .attr("transform", "translate(" + width / 2 + "," + height/2 + ")");

  var list1 = data
  var id = namelist[name] + '';
  for (i in list1) {
    for (j in namelist) {
      var fid = namelist[j] + ""
      var tid = fid[0] + fid[1] + fid[2];
      if (fid.length == 5) {
        var vv = list1[i]["children"]
          .find(function (x) { return x.name == idlist[fid[0]]; })["children"]
          .find(function (x) { return x.name == idlist[tid]; })["children"]
          .find(function (x) { return x.name == idlist[fid]; })["index"]
        var ww = list1[i]["children"]
          .find(function (x) { return x.name == idlist[fid[0]]; })["children"]
          .find(function (x) { return x.name == idlist[tid]; })["reweight"]
        var xx = list1[i]["children"]
          .find(function (x) { return x.name == idlist[fid[0]]; })["reweight"]
        if (vv != '') {
          list1[i]["children"]
            .find(function (x) { return x.name == idlist[fid[0]]; })["children"]
            .find(function (x) { return x.name == idlist[tid]; })["children"]
            .find(function (x) { return x.name == idlist[fid]; })["value"] = sc((parseFloat(vv)) * (parseFloat(ww)) * (parseFloat(xx)))
        }
        else {
          list1[i]["children"]
            .find(function (x) { return x.name == idlist[fid[0]]; })["children"]
            .find(function (x) { return x.name == idlist[tid]; })["children"]
            .find(function (x) { return x.name == idlist[fid]; })["value"] = 0;
        }
      }
      if (fid.length == 3) {
        var vv = list1[i]["children"]
          .find(function (x) { return x.name == idlist[fid[0]]; })["children"]
          .find(function (x) { return x.name == idlist[tid]; })["index"]
        var xx = list1[i]["children"]
          .find(function (x) { return x.name == idlist[fid[0]]; })["reweight"]
        if (vv != '') {
          list1[i]["children"]
            .find(function (x) { return x.name == idlist[fid[0]]; })["children"]
            .find(function (x) { return x.name == idlist[tid]; })["value"] = sc((parseFloat(vv)) * (parseFloat(xx)))
        }
        else {
          list1[i]["children"]
            .find(function (x) { return x.name == idlist[fid[0]]; })["children"]
            .find(function (x) { return x.name == idlist[tid]; })["value"] = 0;
        }
      }
      if (fid.length == 1) {
        if (list1[i]['children'] == null) break;
        var vv = list1[i]["children"]
          .find(function (x) { return x.name == idlist[fid[0]]; })["index"]
        if (vv != '') {
          list1[i]["children"]
            .find(function (x) { return x.name == idlist[fid[0]]; })["value"] = sc(parseFloat(vv))
        }
        else {
          list1[i]["children"]
            .find(function (x) { return x.name == idlist[fid[0]]; })["value"] = 0;
        }
      }
    }
  }
  var op = {}
  sid = id[0] + id[1] + id[2]
  if (name == "tea") {
    op = list1[day]
  }

  else if (id.length == 1) {
    op = list1[day]["children"]
      .find(function (x) { return x.name == idlist[id[0]]; })
  }
  else if (id.length == 3) {
    op = list1[day]["children"]
      .find(function (x) { return x.name == idlist[id[0]]; })["children"]
      .find(function (x) { return x.name == idlist[sid]; })
  }
  else if (id.length == 5) {
    op = list1[day]["children"]
      .find(function (x) { return x.name == idlist[id[0]]; })["children"]
      .find(function (x) { return x.name == idlist[sid]; })
  }

  // Create hierarchy.
  let root = d3.hierarchy(op)
    .sum(function (d) { return d.value; })
    .sort(function (a, b) { return b.value - a.value; });
  a = document.getElementById("#downmiddlebody")
  // let renderedSVGSize = svg.node().getBoundingClientRect();

  // Create bubbletreemap.
  let bubbletreemap = d3.bubbletreemap()
    .padding(padding)
    .curvature(curvature)
    .hierarchyRoot(root)
    .width(100)
    .height(100)
    .colormap(mcolor); // Color brewer: 12-class Paired

  // Do layout and coloring.
  let hierarchyRoot = bubbletreemap.doLayout().doColoring().hierarchyRoot();

  let leafNodes = hierarchyRoot.descendants().filter(function (candidate) {
    return !candidate.children;
  });

  // Draw contour.
  let contourGroup = svg.append("g")
    .attr("class", "contour");

  contourGroup.selectAll("path")
    .data(bubbletreemap.getContour())
    .enter().append("path")
    .attr("d", function (arc) { return arc.d; })
    .style("stroke", "grey")
    .style("stroke-width", function (arc) { return arc.strokeWidth; })
    .attr("transform", function (arc) { return arc.transform; });

  // Draw circles.
  let circleGroup = svg.append("g")
    .attr("class", "circlesAfterPlanck");

  circleGroup.selectAll("circle")
    .data(leafNodes)
    .enter().append("circle")
    .attr("r", function (d) { return d.r; })
    .attr("cx", function (d) { return d.x; })
    .attr("cy", function (d) { return d.y; })
    .style("fill", function (d) { return d.color; })
    .style("stroke", "black")
    .style("stroke-width", "2");
}
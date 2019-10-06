var date1 = ["2018-3-1", "2018-3-2", "2018-3-3", "2018-3-4", "2018-3-5", "2018-3-6", "2018-3-7", "2018-3-8",
  "2018-3-9", "2018-3-10", "2018-3-11", "2018-3-12", "2018-3-13", "2018-3-14", "2018-3-15", "2018-3-16", "2018-3-17",
  "2018-3-18", "2018-3-19", "2018-3-20", "2018-3-21", "2018-3-22", "2018-3-23", "2018-3-24", "2018-3-25", "2018-3-26",
  "2018-3-27", "2018-3-28", "2018-3-29", "2018-3-30", "2018-3-31", "2018-4-1", "2018-4-2", "2018-4-3", "2018-4-4", "2018-4-5",
  "2018-4-6", "2018-4-7", "2018-4-8", "2018-4-9", "2018-4-10", "2018-4-11", "2018-4-12", "2018-4-13", "2018-4-14", "2018-4-15",
  "2018-4-16", "2018-4-17", "2018-4-18", "2018-4-19", "2018-4-20"]
var namelist = {}
var idlist = {}
let working = false;

        function doIt() {
            if(!working) {
                working = true;

                    let svg = d3.select("#svgCircles");
                    svg.selectAll("*").remove();
                    Data = {
                        "name": "Eve",
                        "uncertainty": 7,
                        "children": [
                          {
                            "name": "Cain",
                            "uncertainty": 10,
                            "size": 35
                          },
                          {
                            "name": "Seth",
                            "uncertainty": 5,
                            "children": [
                              {
                                "name": "Marc",
                                "size": 20,
                                "uncertainty": 2,
                                "children": [
                                  {
                                    "name": "A1",
                                    "size": 10,
                                    "uncertainty": 0
                                  },
                                  {
                                    "name": "A2",
                                    "size": 15,
                                    "uncertainty": 5
                                  },
                                  {
                                    "name": "A3",
                                    "size": 20,
                                    "uncertainty": 7
                                  }
                                ]
                              },
                              {
                                "name": "Janine",
                                "size": 50,
                                "uncertainty": 4,
                                "children": [
                                  {
                                    "name": "B1",
                                    "size": 12,
                                    "uncertainty": 3
                                  },
                                  {
                                    "name": "B2",
                                    "size": 8,
                                    "uncertainty": 3
                                  },
                                  {
                                    "name": "B3",
                                    "size": 15,
                                    "uncertainty": 3
                                  }
                                ]
                              },
                              {
                                "name": "Luke",
                                "size": 40,
                                "uncertainty": 2,
                                "children": [
                                  {
                                    "name": "C1",
                                    "size": 3,
                                    "uncertainty": 3
                                  },
                                  {
                                    "name": "C2",
                                    "size": 8,
                                    "uncertainty": 3
                                  },
                                  {
                                    "name": "C3",
                                    "size": 5,
                                    "uncertainty": 3
                                  }
                                ]
                              }
                            ]
                          },
                          {
                            "name": "Oli",
                            "uncertainty": 3,
                            "size": 30
                          },
                          {
                            "name": "Awan",
                            "uncertainty": 3,
                            "children": [
                              {
                                "name": "David",
                                "uncertainty": 5,
                                "size": 76
                              },
                              {
                                "name": "Peter",
                                "uncertainty": 3,
                                "size": 23
                              }
                            ]
                          },
                          {
                            "name": "Horst",
                            "uncertainty": 3,
                            "size": 80
                          }
                        ]
                      }

                      d3.csv("data/number.csv", function (namedata) {
                        d3.csv("data/new_xl.csv", function (iddata) {
                      

                          for (i in namedata) {
                            namelist[namedata[i].name] = namedata[i].id;
                          }
                          
                          for (i in namedata) {
                            idlist[namedata[i].id] = namedata[i].name;
                          }
                          IDLIST = idlist
                          NAMELIST = namelist
                         pro(iddata,date1,"2018-3-1", "name", "dataname", "datavalue", 0);
                         console.log(Data)
                         Data=GLOBAL_DATA
                           let padding = Number(document.getElementById("paddingSlider").value);
                    let curvature = Number(document.getElementById("curvatureSlider").value);

                    drawChart(Data,"2018-3-1","tea叶",svg, padding, (curvature === 100 ? 100000 : curvature));
                        })});
                    //   pro(newdata, date1, CURRENT_DATE, na, TEXT, edit);
                  

                working = false;
            }
        }

        function drawChart(data, day,name,svg, padding, curvature) {
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
                    .find(function (x) { return x.name == idlist[fid]; })["value"] = (parseFloat(vv)) * (parseFloat(ww)) * (parseFloat(xx)) /8
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
                    .find(function (x) { return x.name == idlist[tid]; })["value"] = (parseFloat(vv)) * (parseFloat(xx)) /8
                }
                else {
                  list1[i]["children"]
                    .find(function (x) { return x.name == idlist[fid[0]]; })["children"]
                    .find(function (x) { return x.name == idlist[tid]; })["value"] = 0;
                }
              }
              if (fid.length == 1) {
                if(list1[i]['children']==null)break;
                var vv = list1[i]["children"]
                  .find(function (x) { return x.name == idlist[fid[0]]; })["index"]
                if (vv != '') {
                  list1[i]["children"]
                    .find(function (x) { return x.name == idlist[fid[0]]; })["value"] = parseFloat(vv) /8
                }
                else {
                  list1[i]["children"]
                    .find(function (x) { return x.name == idlist[fid[0]]; })["value"] = 0;
                }
              }
            }
          }
        
        

          console.log(list1[day])
            // Create hierarchy.
            let root = d3.hierarchy(list1["2018-3-1"])
                .sum(function(d) { return d.value; })
                .sort(function(a, b) { return b.value - a.value; });
  console.log(root)
            let renderedSVGSize = svg.node().getBoundingClientRect();

            // Create bubbletreemap.
            let bubbletreemap = d3.bubbletreemap()
                .padding(padding)
                .curvature(curvature)
                .hierarchyRoot(root)
                .width(renderedSVGSize.width)
                .height(renderedSVGSize.height)
                .colormap(["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"]); // Color brewer: 12-class Paired

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
                .attr("d", function(arc) { return arc.d; })
                .style("stroke", "black")
                .style("stroke-width", function(arc) { return arc.strokeWidth; })
                .attr("transform", function(arc) {return arc.transform;});

            // Draw circles.
            let circleGroup = svg.append("g")
                .attr("class", "circlesAfterPlanck");

            circleGroup.selectAll("circle")
                .data(leafNodes)
                .enter().append("circle")
                .attr("r", function(d) { return d.r; })
                .attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; })
                .style("fill", function(d) { return d.color; })
                .style("stroke", "black")
                .style("stroke-width", "2");
        }
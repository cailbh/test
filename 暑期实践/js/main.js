
var color = d3.schemeCategory20;
var colore = [0x00FFFF, 0x0000FF, 0xFF00FF, 0x808080, 0x008000, 0x00FF00, 0x800000, 0x000080, 0x808000, 0x800080, 0xFF0000, 0xC0C0C0, 0x008080, 0xFFFF00]

var svg = d3.select("#sankey")//sankey
  .append("svg")
  .attr("width", 800)
  .attr("height", 360)
  .append("g");

var width = 799, height = 350;

var myChart1 = echarts.init(document.getElementById('p1'));
var myChart2 = echarts.init(document.getElementById('p2'));

var config2 = {
  container: document.getElementById("g1"),
  radius: 3,
  maxOpacity: .7,
  minOpacity: 0,
  blur: .75
};
// create heatmap with configuration 
var h1 = h337.create(config2);

var config3 = {
  container: document.getElementById("g2"),
  radius: 3,
  maxOpacity: .7,
  minOpacity: 0,
  blur: .75
};
// create heatmap with configuration 
var h2 = h337.create(config3);

var config4 = {
  container: document.getElementById("g3"),
  radius: 3,
  maxOpacity: .7,
  minOpacity: 0,
  blur: .75
};
// create heatmap with configuration 
var h3 = h337.create(config4);

var config5 = {
  container: document.getElementById("g4"),
  radius: 3,
  maxOpacity: .7,
  minOpacity: 0,
  blur: .75
};
// create heatmap with configuration 
var h4 = h337.create(config5);

var config6 = {
  container: document.getElementById("g5"),
  radius: 3,
  maxOpacity: .7,
  minOpacity: 0,
  blur: .75
};
// create heatmap with configuration 
var h5 = h337.create(config6);

var config6 = {
  container: document.getElementById("g6"),
  radius: 3,
  maxOpacity: .7,
  minOpacity: 0,
  blur: .75
};
// create heatmap with configuration 
var h6 = h337.create(config6);


//创建热力图画布

var g1 = d3.select("#g1")
  .append("svg")
  .attr("width", 400)
  .attr("height", 400);

g1.append("text").text("deepwalk").attr("x", 10).attr("y", 20);

var g2 = d3.select("#g2")
  .append("svg")
  .attr("width", 400)
  .attr("height", 400);

g2.append("text").text("gf").attr("x", 10).attr("y", 20);

var g3 = d3.select("#g3")
  .append("svg")
  .attr("width", 400)
  .attr("height", 400);

g3.append("text").text("sdne").attr("x", 10).attr("y", 20);


var g4 = d3.select("#g4")
  .append("svg")
  .attr("width", 400)
  .attr("height", 400);

g4.append("text").text("le").attr("x", 10).attr("y", 20);

var g5 = d3.select("#g5")
  .append("svg")
  .attr("width", 400)
  .attr("height", 400);

g5.append("text").text("node2vec").attr("x", 10).attr("y", 20);

var g6 = d3.select("#g6")
  .append("svg")
  .attr("width", 400)
  .attr("height", 400);

g6.append("text").text("lle").attr("x", 10).attr("y", 20);

//d3画布

let type = "WebGL"
if (!PIXI.utils.isWebGLSupported()) {
  type = "canvas"
}

PIXI.utils.sayHello(type)
//测试PIXI是否成功
let app = new PIXI.Application({ width: 800, height: 800 });
document.getElementById("force").appendChild(app.view);
app.renderer.backgroundColor = 0xFFFFFF;
//canvas画布——PIXI


function switchchart(i) {
  if (i == 1) {
    document.getElementById("t2").innerHTML = "sankey";
    var size = document.getElementById("title1").innerHTML;
    size = size.substr(5, 1);
    a = document.getElementById("sankey");
    a.style["opacity"] = 1;
    a.style["z-index"] = 10;
    b = document.getElementById("pp");
    b.style["opacity"] = 0;
    b.style["z-index"] = 1;
    if (size == "中") {
      var sankey = d3.sankey()
        .nodeWidth(15)//每个资源块的水平像素宽度
        .nodePadding(10)//资源块间的纵向间距
        .size([width, height]);

      var path = sankey.link();
      d3.json("data3/sankey.json", function (a) {
        var nodes = [];
        var links = [];
        var name = ["a", "b", "c", "d", "e", "f", "g"];
        for (var j = 0; j < name.length; j++) {
          for (var i = 1; i < 8; i++) {
            nodes.push({ name: name[j] + String(i) });
          }
        }
        links = a.links;
        console.log(a);
        console.log(nodes);
        console.log(links)
        sankey
          .nodes(nodes)
          .links(links)
          .layout(32);

        var link = svg.append("g").selectAll(".link")
          .data(links)
          .enter().append("path")
          .attr("class", "link")
          .attr("id", "san")
          .attr("d", path)//链接的路径设置已经被sankey封装了，这里调用之后就可以生成连线呢的路径
          //下面这句生成线的宽度，//线的宽度按照线端点两端块较小者扩宽，但为啥偏移max(1, d.dy）？
          .style("stroke-width", function (d) {
            return Math.max(1, d.dy);
          })
          .sort(function (a, b) { return b.dy - a.dy; });//这句去掉效果一样不知为啥？
        //(5)sankey设置链接提示
        link.append("title")
          .text(function (d) { return d.source.name + " → " + d.target.name + "\n" + d.value; });
        //(6)拖动
        var node = svg.append("g").selectAll(".node")
          .data(nodes)
          .enter().append("g")
          .attr("class", "node")
          .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; })
          .call(d3.drag()
            .on("drag", dragmove));
        //(7)块
        node.append("rect")
          .attr("id", "san")
          .attr("height", function (d) { return d.dy; })
          .attr("width", sankey.nodeWidth())//刚才设置的块的宽度
          .style("fill", function (d) { return color[parseInt(d.name.substr(1)) - 1]; })
          .style("stroke", function (d) { return d3.rgb(d.color).darker(2); })//较深
          .append("title")
          .text(function (d) { return d.name + "\n" + d.value; });
        //(8)文字
        node.append("text")
          .attr("x", -6)
          .attr("y", function (d) { return d.dy / 2; })
          .attr("dy", ".35em")
          .attr("id", "san")
          .attr("text-anchor", "end")//文字在左边（中轴右边的）
          .attr("transform", null)
          .text(function (d) { return d.name; })
          .filter(function (d) { return d.x < width / 2; })//除去在中轴左边的 
          .attr("x", 6 + sankey.nodeWidth())
          .attr("text-anchor", "start");//文字在右边
        //(9)拖动
        function dragmove(d) {
          d3.select(this).attr("transform", "translate(" + d.x + "," +
            (d.y = //下面的纵坐标调整值是怎么计算的？
              Math.max(0,
                Math.min(
                  height - d.dy,
                  d3.event.y
                ))) + ")");
          sankey.relayout();//重新布局,线上下的位置调整
          link.attr("d", path);//更新路径
        }
      })
    }
    else if (size == "x") {
      var sankey = d3.sankey()
        .nodeWidth(15)//每个资源块的水平像素宽度
        .nodePadding(10)//资源块间的纵向间距
        .size([width, height]);

      var path = sankey.link();
      d3.json("result/n/sankey.json", function (a) {
        var nodes = [];
        var links = [];
        var name = ["a", "b", "c", "d", "e", "f", "g"];
        for (var j = 0; j < name.length; j++) {
          for (var i = 1; i < 11; i++) {
            nodes.push({ name: name[j] + String(i) });
          }
        }
        links = a.links;
        sankey
          .nodes(nodes)
          .links(links)
          .layout(32);

        var link = svg.append("g").selectAll(".link")
          .data(links)
          .enter().append("path")
          .attr("class", "link")
          .attr("id", "san")
          .attr("d", path)//链接的路径设置已经被sankey封装了，这里调用之后就可以生成连线呢的路径
          //下面这句生成线的宽度，//线的宽度按照线端点两端块较小者扩宽，但为啥偏移max(1, d.dy）？
          .style("stroke-width", function (d) {
            return Math.max(1, d.dy);
          })
          .sort(function (a, b) { return b.dy - a.dy; });//这句去掉效果一样不知为啥？
        //(5)sankey设置链接提示
        link.append("title")
          .text(function (d) { return d.source.name + " → " + d.target.name + "\n" + d.value; });
        //(6)拖动
        var node = svg.append("g").selectAll(".node")
          .data(nodes)
          .enter().append("g")
          .attr("class", "node")
          .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; })
          .call(d3.drag()
            .on("drag", dragmove));
        //(7)块
        node.append("rect")
          .attr("id", "san")
          .attr("height", function (d) { return d.dy; })
          .attr("width", sankey.nodeWidth())//刚才设置的块的宽度
          .style("fill", function (d) { return color[parseInt(d.name.substr(1)) - 1]; })
          .style("stroke", function (d) { return d3.rgb(d.color).darker(2); })//较深
          .append("title")
          .text(function (d) { return d.name + "\n" + d.value; });
        //(8)文字
        node.append("text")
          .attr("x", -6)
          .attr("y", function (d) { return d.dy / 2; })
          .attr("dy", ".35em")
          .attr("id", "san")
          .attr("text-anchor", "end")//文字在左边（中轴右边的）
          .attr("transform", null)
          .text(function (d) { return d.name; })
          .filter(function (d) { return d.x < width / 2; })//除去在中轴左边的 
          .attr("x", 6 + sankey.nodeWidth())
          .attr("text-anchor", "start");//文字在右边
        //(9)拖动
        function dragmove(d) {
          d3.select(this).attr("transform", "translate(" + d.x + "," +
            (d.y = //下面的纵坐标调整值是怎么计算的？
              Math.max(0,
                Math.min(
                  height - d.dy,
                  d3.event.y
                ))) + ")");
          sankey.relayout();//重新布局,线上下的位置调整
          link.attr("d", path);//更新路径
        }
      })
    }
    else {
      var sankey = d3.sankey()
        .nodeWidth(15)//每个资源块的水平像素宽度
        .nodePadding(5)//资源块间的纵向间距
        .size([width, height]);

      var path = sankey.link();
      d3.json("result/l/sankey.json", function (a) {
        var nodes = [];
        var links = [];
        var name = ["a", "b", "c", "d", "e", "f", "g"];
        for (var j = 0; j < name.length; j++) {
          for (var i = 1; i < 18; i++) {
            nodes.push({ name: name[j] + String(i) });
          }
        }
        links = a.links;
        console.log(a);
        console.log(nodes);
        console.log(links)
        sankey
          .nodes(nodes)
          .links(links)
          .layout(32);

        var link = svg.append("g").selectAll(".link")
          .data(links)
          .enter().append("path")
          .attr("class", "link")
          .attr("id", "san")
          .attr("d", path)//链接的路径设置已经被sankey封装了，这里调用之后就可以生成连线呢的路径
          //下面这句生成线的宽度，//线的宽度按照线端点两端块较小者扩宽，但为啥偏移max(1, d.dy）？
          .style("stroke-width", function (d) {
            return Math.max(1, d.dy);
          })
          .sort(function (a, b) { return b.dy - a.dy; });//这句去掉效果一样不知为啥？
        //(5)sankey设置链接提示
        link.append("title")
          .text(function (d) { return d.source.name + " → " + d.target.name + "\n" + d.value; });
        //(6)拖动
        var node = svg.append("g").selectAll(".node")
          .data(nodes)
          .enter().append("g")
          .attr("class", "node")
          .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; })
          .call(d3.drag()
            .on("drag", dragmove));
        //(7)块
        node.append("rect")
          .attr("id", "san")
          .attr("height", function (d) { return d.dy; })
          .attr("width", sankey.nodeWidth())//刚才设置的块的宽度
          .style("fill", function (d) { return color[parseInt(d.name.substr(1)) - 1]; })
          .style("stroke", function (d) { return d3.rgb(d.color).darker(2); })//较深
          .append("title")
          .text(function (d) { return d.name + "\n" + d.value; });
        //(8)文字
        node.append("text")
          .attr("x", -6)
          .attr("y", function (d) { return d.dy / 2; })
          .attr("dy", ".35em")
          .attr("id", "san")
          .attr("text-anchor", "end")//文字在左边（中轴右边的）
          .attr("transform", null)
          .text(function (d) { return d.name; })
          .filter(function (d) { return d.x < width / 2; })//除去在中轴左边的 
          .attr("x", 6 + sankey.nodeWidth())
          .attr("text-anchor", "start");//文字在右边
        //(9)拖动
        function dragmove(d) {
          d3.select(this).attr("transform", "translate(" + d.x + "," +
            (d.y = //下面的纵坐标调整值是怎么计算的？
              Math.max(0,
                Math.min(
                  height - d.dy,
                  d3.event.y
                ))) + ")");
          sankey.relayout();//重新布局,线上下的位置调整
          link.attr("d", path);//更新路径
        }
      })
    }
  }
  else {
    var size = document.getElementById("title1").innerHTML;
    size = size.substr(5, 1);
    a = document.getElementById("sankey");
    a.style["opacity"] = 0;
    a.style["z-index"] = 1;
    b = document.getElementById("pp");
    b.style["opacity"] = 1;
    b.style["z-index"] = 10;
    if (size == "小") {
      document.getElementById("t2").innerHTML = "le->lle->node2vec->sdne->gf->deepwalk";
      d3.csv("data1/p1.csv", function (a) {
        var data = [];
        for (i = 0; i < 3; i++) {
          data.push([])
        }
        console.log(data);
        for (i = 0; i < a.length; i++) {
          console.log(a[i])
          data[parseInt(a[i].com)].push([parseFloat(a[i].v), a[i].rad]);
        }
        for (i = 0; i < data.length; i++) {
          data[i].push([data[i][0][0], "le"]);
        }
        console.log(data)
        option = {
          title: {
            text: '类别密度'
          },
          legend: {
            data: ['line']
          },
          polar: {},
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            textStyle: {
              fontSize: 12,
            },
            formatter: '{a0}: {c0}<br />{a1}: {c1}<br />{a2}: {c2}'
          },
          angleAxis: {
            type: 'category',
            data: ["le", "lle", "node2vec", "sdne", "gf", "deepwalk"],
            startAngle: 0
          },
          radiusAxis: {
          },
          series: [{
            coordinateSystem: 'polar',
            name: 'cluster1',
            type: 'line',
            data: data[0],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[0],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster2',
            type: 'line',
            data: data[1],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[1],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster3',
            type: 'line',
            data: data[2],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[2],//折线的颜色
                }
              }
            }
          },
          ]
        };
        myChart1.setOption(option);
      })
      d3.csv("data1/p2.csv", function (a) {
        var data = [];
        for (i = 0; i < 3; i++) {
          data.push([])
        }
        console.log(data);
        for (i = 0; i < a.length; i++) {
          console.log(a[i])
          data[parseInt(a[i].com)].push([parseFloat(a[i].v), a[i].rad]);
        }
        for (i = 0; i < data.length; i++) {
          data[i].push([data[i][0][0], "le"]);
        }
        console.log(data)
        option = {
          title: {
            text: '中心距离'
          },
          legend: {
            data: ['line']
          },
          polar: {},
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            textStyle: {
              fontSize: 12,
            },
            formatter: '{a0}: {c0}<br />{a1}: {c1}<br />{a2}: {c2}'
          },
          angleAxis: {
            type: 'category',
            data: ["le", "lle", "node2vec", "sdne", "gf", "deepwalk"],
            startAngle: 0
          },
          radiusAxis: {
          },
          series: [{
            coordinateSystem: 'polar',
            name: 'cluster1',
            type: 'line',
            data: data[0],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[0],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster2',
            type: 'line',
            data: data[1],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[1],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster3',
            type: 'line',
            data: data[2],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[2],//折线的颜色
                }
              }
            }
          },
          ]
        };
        myChart2.setOption(option);
      })
    }
    else if (size == "中") {
      document.getElementById("t2").innerHTML = "lle->le->sdne->deepwalk->gf->node2vec";
      d3.csv("result/n/p1.csv", function (a) {
        var data = [];

        for (i = 0; i < 10; i++) {
          data.push([])
        }
        console.log(data);
        for (i = 0; i < a.length; i++) {
          data[parseInt(a[i].com)].push([parseFloat(a[i].v), a[i].rad]);
        }
        for (i = 0; i < data.length; i++) {
          data[i].push([data[i][0][0], "lle"]);
        }
        console.log(data)
        option = {
          title: {
            text: '类别密度'
          },
          legend: {
            data: ['line']
          },
          polar: {},
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            textStyle: {
              fontSize: 9,
            },
            formatter: '{a0}: {c0}<br />{a1}: {c1}<br />{a2}: {c2}<br />{a3}: {c3}<br />{a4}: {c4}<br />{a5}: {c5}<br />{a6}: {c6}<br />{a7}: {c7}<br />{a8}: {c8}<br />{a9}: {c9}'
          },

          angleAxis: {
            type: 'category',
            data: ["lle", "le", "sdne", "deepwalk", "gf", "node2vec"],
            startAngle: 0
          },
          radiusAxis: {
          },
          series: [{
            coordinateSystem: 'polar',
            name: 'cluster1',
            type: 'line',
            data: data[0],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[0],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster2',
            type: 'line',
            data: data[1],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[1],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster3',
            type: 'line',
            data: data[2],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[2],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster4',
            type: 'line',
            data: data[3],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[3],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster5',
            type: 'line',
            data: data[4],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[4],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster6',
            type: 'line',
            data: data[5],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[5],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster7',
            type: 'line',
            data: data[6],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[6],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster8',
            type: 'line',
            data: data[7],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[7],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster9',
            type: 'line',
            data: data[8],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[8],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster10',
            type: 'line',
            data: data[9],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[9],//折线的颜色
                }
              }
            }
          },
          ]
        };
        myChart1.setOption(option);
      })
      d3.csv("result/n/p2.csv", function (a) {
        var data = [];
        for (i = 0; i < 10; i++) {
          data.push([])
        }
        console.log(data);
        for (i = 0; i < a.length; i++) {
          console.log(a[i])
          data[parseInt(a[i].com)].push([parseFloat(a[i].v), a[i].rad]);
        }
        for (i = 0; i < data.length; i++) {
          data[i].push([data[i][0][0], "lle"]);
        }
        console.log(data)
        option = {
          title: {
            text: '中心距离'
          },
          legend: {
            data: ['line']
          },
          polar: {},
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            textStyle: {
              fontSize: 9,
            },
            formatter: '{a0}: {c0}<br />{a1}: {c1}<br />{a2}: {c2}<br />{a3}: {c3}<br />{a4}: {c4}<br />{a5}: {c5}<br />{a6}: {c6}<br />{a7}: {c7}<br />{a8}: {c8}<br />{a9}: {c9}'
          },
          angleAxis: {
            type: 'category',
            data: ["lle", "le", "sdne", "deepwalk", "gf", "node2vec"],
            startAngle: 0
          },
          radiusAxis: {
          },
          series: [{
            coordinateSystem: 'polar',
            name: 'cluster1',
            type: 'line',
            data: data[0],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[0],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster2',
            type: 'line',
            data: data[1],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[1],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster3',
            type: 'line',
            data: data[2],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[2],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster4',
            type: 'line',
            data: data[3],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[3],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster5',
            type: 'line',
            data: data[4],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[4],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster6',
            type: 'line',
            data: data[5],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[5],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster7',
            type: 'line',
            data: data[6],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[6],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster8',
            type: 'line',
            data: data[7],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[7],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster9',
            type: 'line',
            data: data[8],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[8],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster10',
            type: 'line',
            data: data[9],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[9],//折线的颜色
                }
              }
            }
          },
          ]
        };
        myChart2.setOption(option);
      })
    }
    else {
      document.getElementById("t2").innerHTML = "lle->le->sdne->gf->deepwalk->node2vec";
      d3.csv("result/l/p1.csv", function (a) {
        var data = [];

        for (i = 0; i < 17; i++) {
          data.push([])
        }
        console.log(data);
        for (i = 0; i < a.length; i++) {
          data[parseInt(a[i].com)].push([parseFloat(a[i].v), a[i].rad]);
        }
        for (i = 0; i < data.length; i++) {
          data[i].push([data[i][0][0], "lle"]);
        }
        console.log(data)
        option = {
          title: {
            text: '类别密度'
          },
          legend: {
            data: ['line']
          },
          polar: {},
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            textStyle: {
              fontSize: 9,
            },
            formatter: '{a0}: {c0}<br />{a1}: {c1}<br />{a2}: {c2}<br />{a3}: {c3}<br />{a4}: {c4}<br />{a5}: {c5}<br />{a6}: {c6}<br />{a7}: {c7}<br />{a8}: {c8}<br />{a9}: {c9}<br />{a10}: {c10}<br />{a11}: {c11}<br />{a12}: {c12}<br />{a13}: {c13}<br />{a14}: {c14}<br />{a15}: {c15}<br />{a16}: {c16}'
          },

          angleAxis: {
            type: 'category',
            data: ["lle", "le", "sdne", "gf", "deepwalk", "node2vec"],
            startAngle: 0
          },
          radiusAxis: {
          },
          series: [{
            coordinateSystem: 'polar',
            name: 'cluster1',
            type: 'line',
            data: data[0],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[0],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster2',
            type: 'line',
            data: data[1],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[1],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster3',
            type: 'line',
            data: data[2],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[2],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster4',
            type: 'line',
            data: data[3],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[3],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster5',
            type: 'line',
            data: data[4],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[4],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster6',
            type: 'line',
            data: data[5],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[5],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster7',
            type: 'line',
            data: data[6],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[6],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster8',
            type: 'line',
            data: data[7],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[7],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster9',
            type: 'line',
            data: data[8],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[8],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster10',
            type: 'line',
            data: data[9],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[9],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster11',
            type: 'line',
            data: data[10],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[10],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster12',
            type: 'line',
            data: data[11],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[11],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster13',
            type: 'line',
            data: data[12],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[12],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster14',
            type: 'line',
            data: data[13],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[13],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster15',
            type: 'line',
            data: data[14],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[14],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster16',
            type: 'line',
            data: data[15],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[15],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster17',
            type: 'line',
            data: data[16],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[16],//折线的颜色
                }
              }
            }
          },
          ]
        };
        myChart1.setOption(option);
      })
      d3.csv("result/l/p2.csv", function (a) {
        var data = [];

        for (i = 0; i < 17; i++) {
          data.push([])
        }
        console.log(data);
        for (i = 0; i < a.length; i++) {
          data[parseInt(a[i].com)].push([parseFloat(a[i].v), a[i].rad]);
        }
        for (i = 0; i < data.length; i++) {
          data[i].push([data[i][0][0], "lle"]);
        }
        console.log(data)
        option = {
          title: {
            text: '中心距离'
          },
          legend: {
            data: ['line']
          },
          polar: {},
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            textStyle: {
              fontSize: 9,
            },
            formatter: '{a0}: {c0}<br />{a1}: {c1}<br />{a2}: {c2}<br />{a3}: {c3}<br />{a4}: {c4}<br />{a5}: {c5}<br />{a6}: {c6}<br />{a7}: {c7}<br />{a8}: {c8}<br />{a9}: {c9}<br />{a10}: {c10}<br />{a11}: {c11}<br />{a12}: {c12}<br />{a13}: {c13}<br />{a14}: {c14}<br />{a15}: {c15}<br />{a16}: {c16}'
          },

          angleAxis: {
            type: 'category',
            data: ["lle", "le", "sdne", "gf", "deepwalk", "node2vec"],
            startAngle: 0
          },
          radiusAxis: {
          },
          series: [{
            coordinateSystem: 'polar',
            name: 'cluster1',
            type: 'line',
            data: data[0],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[0],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster2',
            type: 'line',
            data: data[1],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[1],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster3',
            type: 'line',
            data: data[2],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[2],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster4',
            type: 'line',
            data: data[3],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[3],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster5',
            type: 'line',
            data: data[4],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[4],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster6',
            type: 'line',
            data: data[5],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[5],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster7',
            type: 'line',
            data: data[6],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[6],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster8',
            type: 'line',
            data: data[7],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[7],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster9',
            type: 'line',
            data: data[8],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[8],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster10',
            type: 'line',
            data: data[9],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[9],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster11',
            type: 'line',
            data: data[10],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[10],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster12',
            type: 'line',
            data: data[11],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[11],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster13',
            type: 'line',
            data: data[12],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[12],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster14',
            type: 'line',
            data: data[13],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[13],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster15',
            type: 'line',
            data: data[14],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[14],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster16',
            type: 'line',
            data: data[15],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[15],//折线的颜色
                }
              }
            }
          },
          {
            coordinateSystem: 'polar',
            name: 'cluster17',
            type: 'line',
            data: data[16],
            itemStyle: {
              normal: {
                lineStyle: {
                  color: color[16],//折线的颜色
                }
              }
            }
          },
          ]
        };
        myChart2.setOption(option);
      })
    }
  }

}

function setsize(size) {
  document.getElementById("t2").innerHTML = "桑基图和平行坐标";
  if (size == 1) {
    app.stage.removeChildren();
    var links = new PIXI.Graphics();
    app.stage.addChild(links);
    document.getElementById("title1").innerHTML = "样本规模:小";
    d3.selectAll(".top").remove();
    d3.selectAll("#san").remove();
    a = document.getElementById("sankey");
    a.style["opacity"] = 0;
    b = document.getElementById("pp");
    b.style["opacity"] = 0;
    d3.csv("data1/node.csv", function (f) {
      d3.csv("data1/link.csv", function (d) {
        data = [];
        for (var i = 0; i < d.length; i++) {
          data.push({ source: parseInt(d[i].source), target: parseInt(d[i].target) });
        }
        console.log(data,f)
        var simulation = d3.forceSimulation(f)
          .force("charge", d3.forceManyBody())
          .force("link", d3.forceLink(data).distance(10))
          .force("center", d3.forceCenter(500, 500));
        simulation.nodes(f).on("tick", ticked);
        simulation.force('link').links(data);
        function ticked() {
          f.forEach((i) => {
            i.circle.position = new PIXI.Point(i.x, i.y)
          })
          links.clear()
          links.alpha = 1//
          data.forEach((i) => {
            links.lineStyle(1, 0x808080, 1)
            links.moveTo(i.source.x, i.source.y)
            links.lineTo(i.target.x, i.target.y)
          })
          links.endFill()
          app.stage.scale.set(0.4, 0.4)
        }
        for (var i = 0; i < f.length; i++) {
          f[i].circle = new PIXI.Graphics;
          f[i].circle.beginFill(parseInt(color[parseInt(f[i].tag)].replace("#", "0x")));
          f[i].circle.drawCircle(0, 0, 6);
          f[i].circle.endFill();
          f[i].circle.x = f[i].x + 400;
          f[i].circle.y = f[i].y + 400;
          app.stage.addChild(f[i].circle);
        }

        console.log(data);
        console.log(f);
      })
    })
  }
  else if (size == 2) {
    app.stage.removeChildren();
    var links = new PIXI.Graphics();
    app.stage.addChild(links);
    document.getElementById("title1").innerHTML = "样本规模:中";
    d3.selectAll(".top").remove();
    d3.selectAll("#san").remove();
    a = document.getElementById("sankey");
    a.style["opacity"] = 0;
    b = document.getElementById("pp");
    b.style["opacity"] = 0;
    d3.csv("result/n/node.csv", function (f) {
      d3.csv("result/n/link.csv", function (d) {
        data = [];
        for (var i = 0; i < d.length; i++) {
          data.push({ source: parseInt(d[i].source), target: parseInt(d[i].target) });
        }
        var simulation = d3.forceSimulation(f)
          .force("charge", d3.forceManyBody())
          .force("link", d3.forceLink(data).distance(10))
          .force("center", d3.forceCenter(500, 500));
        simulation.nodes(f).on("tick", ticked);
        simulation.force('link').links(data);
        function ticked() {
          f.forEach((i) => {
            i.circle.position = new PIXI.Point(i.x + 100, i.y)
          })
          links.clear()
          links.alpha = 0.2
          data.forEach((i) => {
            links.lineStyle(1, 0x808080, 1)
            links.moveTo(i.source.x + 100, i.source.y)
            links.lineTo(i.target.x + 100, i.target.y)
          })
          links.endFill()
          app.stage.scale.set(0.35, 0.35)
        }
        for (var i = 0; i < f.length; i++) {
          f[i].circle = new PIXI.Graphics;
          f[i].circle.beginFill(parseInt(color[parseInt(f[i].tag)].replace("#", "0x")));
          f[i].circle.drawCircle(0, 0, 6);
          f[i].circle.endFill();
          f[i].circle.x = f[i].x;
          f[i].circle.y = f[i].y;
          app.stage.addChild(f[i].circle);
        }

        console.log(data);
        console.log(f);
      })
    })
  }
  else {
    app.stage.removeChildren();
    var links = new PIXI.Graphics();
    app.stage.addChild(links);
    document.getElementById("title1").innerHTML = "样本规模:大";
    d3.selectAll(".top").remove();
    d3.selectAll("#san").remove();
    a = document.getElementById("sankey");
    a.style["opacity"] = 0;
    b = document.getElementById("pp");
    b.style["opacity"] = 0;
    d3.csv("result/l/node.csv", function (f) {
      d3.csv("result/l/link.csv", function (d) {
        data = [];
        for (var i = 0; i < d.length; i++) {
          data.push({ source: parseInt(d[i].source), target: parseInt(d[i].target) });
        }
        var simulation = d3.forceSimulation(f)
          .force("charge", d3.forceManyBody())
          .force("link", d3.forceLink(data).distance(10))
          .force("center", d3.forceCenter(500, 500));
        simulation.nodes(f).on("tick", ticked);
        simulation.force('link').links(data);
        function ticked() {
          f.forEach((i) => {
            i.circle.position = new PIXI.Point(i.x + 350, i.y + 250)
          })
          links.clear()
          links.alpha = 0.1
          data.forEach((i) => {
            links.lineStyle(1, 0x808080, 1)
            links.moveTo(i.source.x + 350, i.source.y + 250)
            links.lineTo(i.target.x + 350, i.target.y + 250)
          })
          links.endFill()
          app.stage.scale.set(0.2, 0.2)
        }
        for (var i = 0; i < f.length; i++) {
          f[i].circle = new PIXI.Graphics;
          f[i].circle.beginFill(parseInt(color[parseInt(f[i].tag)].replace("#", "0x")));
          f[i].circle.drawCircle(0, 0, 6);
          f[i].circle.endFill();
          f[i].circle.x = f[i].x;
          f[i].circle.y = f[i].y;
          app.stage.addChild(f[i].circle);
        }

        console.log(data);
        console.log(f);
      })
    })
  }
}

function drawtop(e) {
  r = 3
  if (e == 1) {
    var size = document.getElementById("title1").innerHTML;
    size = size.substr(5, 1);
    console.log(size);
    var data = {
      max: 50,
      data: []
    };
    h1.setData(data);
    h2.setData(data);
    h3.setData(data);
    h4.setData(data);
    h5.setData(data);
    h6.setData(data);

    if (size == "小") {
      d3.csv("data1/dw.csv", function (d) {
        maxz = (Math.max.apply(Math, d.map(function(o) {return o.x})))*3/2
        minz = (Math.min.apply(Math, d.map(function(o) {return o.x})))*3/2
        var linear = d3.scaleLinear()
          .domain([minz, maxz])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g1.append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", 3)
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              return color[parseInt(d[i].com)];
            });
        }
      });
      d3.csv("data1/gf.csv", function (d) {
        maxz = (Math.max.apply(Math, d.map(function(o) {return o.x})))*5/2
        minz = (Math.min.apply(Math, d.map(function(o) {return o.x})))*5/2
        console.log(maxz,minz)
        var linear = d3.scaleLinear()
          .domain([minz, maxz])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g2.append("circle")
            .attr("cx", linear(d[i].x-8))
            .attr("cy", linear(d[i].y)-250)
            .attr("r", 3)
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              return color[parseInt(d[i].com)];
            });
        }
      });
      d3.csv("data1/sdne.csv", function (d) {
        maxz = (Math.max.apply(Math, d.map(function(o) {return o.x})))*3/2
        minz = (Math.min.apply(Math, d.map(function(o) {return o.x})))*3/2
        var linear = d3.scaleLinear()
          .domain([minz, maxz])
          .range([0, 240]);
        for (var i = 0; i < d.length; i++) {
          g3.append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", 3)
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              return color[parseInt(d[i].com)];
            });
        }
      });
      d3.csv("data1/lap.csv", function (d) {
        maxz = (Math.max.apply(Math, d.map(function(o) {return o.x})))*3/2
        minz = (Math.min.apply(Math, d.map(function(o) {return o.x})))*3/2
        var linear = d3.scaleLinear()
          .domain([minz, maxz])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g4.append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y)+80)
            .attr("r", r)
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              return color[parseInt(d[i].com)];
            });
        }
      });
      d3.csv("data1/n2v.csv", function (d) {
        maxz = (Math.max.apply(Math, d.map(function(o) {return o.x})))*3/2
        minz = (Math.min.apply(Math, d.map(function(o) {return o.x})))*3/2
        var linear = d3.scaleLinear()
          .domain([minz, maxz])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g5.append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", 3)
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              return color[parseInt(d[i].com)];
            });
        }
      });
      d3.csv("data1/lle.csv", function (d) {
        maxz = (Math.max.apply(Math, d.map(function(o) {return o.x})))*3/2
        minz = (Math.min.apply(Math, d.map(function(o) {return o.x})))*3/2
        var linear = d3.scaleLinear()
          .domain([minz, maxz])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g6.append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y)-100)
            .attr("r", r)
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              return color[parseInt(d[i].com)];
            });
        }
      });

    }
    else if (size == "中") {

      d3.csv("result/n/dw.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g1.append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", 3)
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              return color[parseInt(d[i].com)];
            });
        }
      });

      d3.csv("result/n/gf.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g2.append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", 3)
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              return color[parseInt(d[i].com)];
            });
        }
      });

      d3.csv("result/n/sdne.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g3.append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", 3)
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              return color[parseInt(d[i].com)];
            });
        }
      });

      d3.csv("result/n/lap.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g4.append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", 3)
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              return color[parseInt(d[i].com)];
            });
        }
      });


      d3.csv("result/n/n2v.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g5.append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", 3)
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              return color[parseInt(d[i].com)];
            });
        }
      });

      d3.csv("result/n/lle.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g6.append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", 3)
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              return color[parseInt(d[i].com)];
            });
        }
      });

    }
    else {

      d3.csv("result/l/dw.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g1.append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", 3)
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              return color[parseInt(d[i].com)];
            });
        }
      });

      d3.csv("result/l/gf.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g2.append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", 3)
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              return color[parseInt(d[i].com)];
            });
        }
      });

      d3.csv("result/l/sdne.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g3.append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", 3)
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              return color[parseInt(d[i].com)];
            });
        }
      });

      d3.csv("result/l/lap.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 230]);

        for (var i = 0; i < d.length; i++) {
          g4.append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", 3)
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              return color[parseInt(d[i].com)];
            });
        }
      });


      d3.csv("result/l/n2v.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g5.append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", 3)
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              return color[parseInt(d[i].com)];
            });
        }
      });

      d3.csv("result/l/lle.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g6.append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", 3)
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              return color[parseInt(d[i].com)];
            });
        }
      });
    }
  }
  else if (e == 2) {
    var size = document.getElementById("title1").innerHTML;
    size = size.substr(5, 1);
    console.log(size);
    var data = {
      max: 50,
      data: []
    };
    h1.setData(data);
    h2.setData(data);
    h3.setData(data);
    h4.setData(data);
    h5.setData(data);
    h6.setData(data);
    d3.selectAll(".top").attr("fill", function () {
      temp = this.id;
      // temp = temp.split(",");
      // temp = temp[0];
      console.log(temp)
      return color[parseInt(temp)];
    });
  }
  else {
    var size = document.getElementById("title1").innerHTML;
    size = size.substr(5, 1);
    console.log(size);
    d3.selectAll(".top").remove();
    if (size == "小") {
      d3.csv("data1/dw.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);
        var points = [];
        for (var i = 0; i < d.length; i++) {
          var point = {
            x: parseInt(linear(d[i].x)),
            y: parseInt(linear(d[i].y)),
            value: parseInt(parseFloat(d[i].H) * 100),
            radius: 5
          };
          points.push(point);
        }
        console.log(points);
        var data = {
          max: 50,
          data: points
        };
        h1.setData(data);
      })

      d3.csv("data1/lle.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);
        var points = [];
        for (var i = 0; i < d.length; i++) {
          var point = {
            x: parseInt(linear(d[i].x)),
            y: parseInt(linear(d[i].y)),
            value: parseInt(parseFloat(d[i].H) * 100),
            radius: 5
          };
          points.push(point);
        }
        console.log(points);
        var data = {
          max: 50,
          data: points
        };
        h6.setData(data);
      })

      d3.csv("data1/gf.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);
        var points = [];
        for (var i = 0; i < d.length; i++) {
          var point = {
            x: parseInt(linear(d[i].x)),
            y: parseInt(linear(d[i].y)),
            value: parseInt(parseFloat(d[i].H) * 100),
            radius: 5
          };
          points.push(point);
        }
        console.log(points);
        var data = {
          max: 50,
          data: points
        };
        h2.setData(data);
      })

      d3.csv("data1/sdne.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);
        var points = [];
        for (var i = 0; i < d.length; i++) {
          var point = {
            x: parseInt(linear(d[i].x)),
            y: parseInt(linear(d[i].y)),
            value: parseInt(parseFloat(d[i].H) * 100),
            radius: 5
          };
          points.push(point);
        }
        console.log(points);
        var data = {
          max: 50,
          data: points
        };
        h3.setData(data);
      })


      d3.csv("data1/lap.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);
        var points = [];
        for (var i = 0; i < d.length; i++) {
          var point = {
            x: parseInt(linear(d[i].x)),
            y: parseInt(linear(d[i].y)),
            value: parseInt(parseFloat(d[i].H) * 100),
            radius: 5
          };
          points.push(point);
        }
        console.log(points);
        var data = {
          max: 50,
          data: points
        };
        h4.setData(data);
      })

      d3.csv("data1/n2v.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);
        var points = [];
        for (var i = 0; i < d.length; i++) {
          var point = {
            x: parseInt(linear(d[i].x)),
            y: parseInt(linear(d[i].y)),
            value: parseInt(parseFloat(d[i].H) * 100),
            radius: 5
          };
          points.push(point);
        }
        console.log(points);
        var data = {
          max: 50,
          data: points
        };
        h5.setData(data);
      })
    }
    else if (size == "中") {
      d3.csv("result/n/dw.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);
        var points = [];
        for (var i = 0; i < d.length; i++) {
          var point = {
            x: parseInt(linear(d[i].x)),
            y: parseInt(linear(d[i].y)),
            value: parseInt(parseFloat(d[i].H) * 100),
            radius: 5
          };
          points.push(point);
        }
        console.log(points);
        var data = {
          max: 50,
          data: points
        };
        h1.setData(data);
      })

      d3.csv("result/n/lle.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);
        var points = [];
        for (var i = 0; i < d.length; i++) {
          var point = {
            x: parseInt(linear(d[i].x)),
            y: parseInt(linear(d[i].y)),
            value: parseInt(parseFloat(d[i].H) * 100),
            radius: 5
          };
          points.push(point);
        }
        console.log(points);
        var data = {
          max: 50,
          data: points
        };
        h6.setData(data);
      })

      d3.csv("result/n/gf.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);
        var points = [];
        for (var i = 0; i < d.length; i++) {
          var point = {
            x: parseInt(linear(d[i].x)),
            y: parseInt(linear(d[i].y)),
            value: parseInt(parseFloat(d[i].H) * 100),
            radius: 5
          };
          points.push(point);
        }
        console.log(points);
        var data = {
          max: 50,
          data: points
        };
        h2.setData(data);
      })

      d3.csv("result/n/sdne.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);
        var points = [];
        for (var i = 0; i < d.length; i++) {
          var point = {
            x: parseInt(linear(d[i].x)),
            y: parseInt(linear(d[i].y)),
            value: parseInt(parseFloat(d[i].H) * 100),
            radius: 5
          };
          points.push(point);
        }
        console.log(points);
        var data = {
          max: 50,
          data: points
        };
        h3.setData(data);
      })


      d3.csv("result/n/lap.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);
        var points = [];
        for (var i = 0; i < d.length; i++) {
          var point = {
            x: parseInt(linear(d[i].x)),
            y: parseInt(linear(d[i].y)),
            value: parseInt(parseFloat(d[i].H) * 100),
            radius: 5
          };
          points.push(point);
        }
        console.log(points);
        var data = {
          max: 50,
          data: points
        };
        h4.setData(data);
      })

      d3.csv("result/n/n2v.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);
        var points = [];
        for (var i = 0; i < d.length; i++) {
          var point = {
            x: parseInt(linear(d[i].x)),
            y: parseInt(linear(d[i].y)),
            value: parseInt(parseFloat(d[i].H) * 100),
            radius: 5
          };
          points.push(point);
        }
        console.log(points);
        var data = {
          max: 50,
          data: points
        };
        h5.setData(data);
      })
    }
    else {
      d3.csv("result/l/dw.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);
        var points = [];
        for (var i = 0; i < d.length; i++) {
          var point = {
            x: parseInt(linear(d[i].x)),
            y: parseInt(linear(d[i].y)),
            value: parseInt(parseFloat(d[i].H) * 100),
            radius: 5
          };
          points.push(point);
        }
        console.log(points);
        var data = {
          max: 50,
          data: points
        };
        h1.setData(data);
      })

      d3.csv("result/l/lle.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);
        var points = [];
        for (var i = 0; i < d.length; i++) {
          var point = {
            x: parseInt(linear(d[i].x)),
            y: parseInt(linear(d[i].y)),
            value: parseInt(parseFloat(d[i].H) * 100),
            radius: 5
          };
          points.push(point);
        }
        console.log(points);
        var data = {
          max: 50,
          data: points
        };
        h6.setData(data);
      })

      d3.csv("result/l/gf.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);
        var points = [];
        for (var i = 0; i < d.length; i++) {
          var point = {
            x: parseInt(linear(d[i].x)),
            y: parseInt(linear(d[i].y)),
            value: parseInt(parseFloat(d[i].H) * 100),
            radius: 5
          };
          points.push(point);
        }
        console.log(points);
        var data = {
          max: 50,
          data: points
        };
        h2.setData(data);
      })

      d3.csv("result/l/sdne.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);
        var points = [];
        for (var i = 0; i < d.length; i++) {
          var point = {
            x: parseInt(linear(d[i].x)),
            y: parseInt(linear(d[i].y)),
            value: parseInt(parseFloat(d[i].H) * 100),
            radius: 5
          };
          points.push(point);
        }
        console.log(points);
        var data = {
          max: 50,
          data: points
        };
        h3.setData(data);
      })


      d3.csv("result/l/lap.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 230]);
        var points = [];
        for (var i = 0; i < d.length; i++) {
          var point = {
            x: parseInt(linear(d[i].x)),
            y: parseInt(linear(d[i].y)),
            value: parseInt(parseFloat(d[i].H) * 100),
            radius: 5
          };
          points.push(point);
        }
        console.log(points);
        var data = {
          max: 50,
          data: points
        };
        h4.setData(data);
      })

      d3.csv("result/l/n2v.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);
        var points = [];
        for (var i = 0; i < d.length; i++) {
          var point = {
            x: parseInt(linear(d[i].x)),
            y: parseInt(linear(d[i].y)),
            value: parseInt(parseFloat(d[i].H) * 100),
            radius: 5
          };
          points.push(point);
        }
        console.log(points)
        var data = {
          max: 50,
          data: points
        };
        h5.setData(data);
      })
    }
  }
}



function makepoint(t) {
  app.stage.removeChildren();
  var links = new PIXI.Graphics();
  app.stage.addChild(links);
  d3.selectAll(".top").remove();
  var linear = d3.scaleLinear()
    .domain([-70, 70])
    .range([0, 240]);


  function forcedraw1(i) {
    if (i == "0") {
      return 0xAAAAAA;
    }
    else {
      return 0xFF0000;
    }
  }
  function forcedraw_nextnode_n(i, ba, li, li_2) {
    if (i.id == ba) {
      return 0xffff00
    }
    else if (li.indexOf(parseInt(i.id)) != -1) {
      return 0xFF0000;
    }
    if (li_2.indexOf(parseInt(i.id)) != -1) {
      return 0x00FF00;
    }
    else {
      return 0xAAAAAA;
    }
  }
  function forcedraw2(i) {
    if (i.source.du != "0" || i.target.du != "0") {
      return 0xFF0000;
    }
    else {
      return 0xAAAAAA;
    }
  }

  function forcedraw_nextnode_l(i, ba, li_1, li_2) {
    if (i.source.id == ba || i.target.id == ba) {
      return 0xFF0000;
    }
    else if (li_1.indexOf(parseInt(i.source.id)) != -1 && li_2.indexOf(parseInt(i.target.id)) != -1) {
      return 0x0000FF
    }
    else {
      return 0xAAAAAA;
    }
  }
  function cuxi_nextnode_l(i, ba, li_1, li_2) {
    if (i.source.id == ba || i.target.id == ba) {
      return 8;
    }
    else if (li_1.indexOf(parseInt(i.source.id)) != -1 && li_2.indexOf(parseInt(i.target.id)) != -1) {
      return 3
    }
    else {
      return 0.5;
    }
  }

  function forcedraw3(i) {
    if (i.source.xin != "0" || i.target.xin != "0") {
      return 0xFF0000;
    }
    else {
      return 0xAAAAAA;
    }
  }

  function cuxi1(i) {
    if (i.source.du != "0" || i.target.du != "0") {
      return 3;
    }
    else {
      return 1;
    }
  }

  function cuxi2(i) {
    if (i.source.xin != "0" || i.target.xin != "0") {
      return 3;
    }
    else {
      return 1;
    }
  }


  if (t == 1) {
    var size = document.getElementById("title1").innerHTML;
    size = size.substr(5, 1);
    console.log(size);
    if (size == "小") {
      d3.csv("data1/node.csv", function (f) {
        d3.csv("data1/link.csv", function (d) {
          data = [];
          for (var i = 0; i < d.length; i++) {
            data.push({ source: parseInt(d[i].source), target: parseInt(d[i].target) });
          }
          var simulation = d3.forceSimulation(f)
            .force("charge", d3.forceManyBody())
            .force("link", d3.forceLink(data).distance(10))
            .force("center", d3.forceCenter(500, 500));
          simulation.nodes(f).on("tick", ticked);
          simulation.force('link').links(data);
          function ticked() {
            f.forEach((i) => {
              i.circle.position = new PIXI.Point(i.x, i.y)
            })
            links.clear()
            links.alpha = 0.1
            data.forEach((i) => {
              links.lineStyle(cuxi1(i), forcedraw2(i), 1)
              links.moveTo(i.source.x, i.source.y)
              links.lineTo(i.target.x, i.target.y)
            })
            links.endFill()
            app.stage.scale.set(0.4, 0.4)
          }
          for (var i = 0; i < f.length; i++) {
            f[i].circle = new PIXI.Graphics;
            f[i].circle.beginFill(forcedraw1(f[i].du));
            f[i].circle.drawCircle(0, 0, 6);
            f[i].circle.endFill();
            f[i].circle.x = f[i].x + 400;
            f[i].circle.y = f[i].y + 400;
            app.stage.addChild(f[i].circle);
          }

          console.log(data);
          console.log(f);
        })
      })
      d3.csv("data1/dw1.csv", function (d) {
        for (i = 0; i < d.length; i++) {
          g1.append("line")
            .attr("x1", linear(parseFloat(d[i].x1)))
            .attr("y1", linear(parseFloat(d[i].y1)))
            .attr("x2", linear(parseFloat(d[i].x2)))
            .attr("y2", linear(parseFloat(d[i].y2)))
            .attr("class", "top")
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.1)
            .attr("stroke", function () {
              if (d[i].d == "0")
                return "#AAAAAA"
              else
                return "orange"
            })
        }
      })
      d3.csv("data1/gf1.csv", function (d) {
        for (i = 0; i < d.length; i++) {
          g2.append("line")
            .attr("x1", linear(parseFloat(d[i].x1)))
            .attr("y1", linear(parseFloat(d[i].y1)))
            .attr("x2", linear(parseFloat(d[i].x2)))
            .attr("y2", linear(parseFloat(d[i].y2)))
            .attr("class", "top")
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.1)
            .attr("stroke", function () {
              if (d[i].d == "0")
                return "#AAAAAA"
              else
                return "orange"
            })
        }
      })
      d3.csv("data1/sdne1.csv", function (d) {
        for (i = 0; i < d.length; i++) {
          g3.append("line")
            .attr("x1", linear(parseFloat(d[i].x1)))
            .attr("y1", linear(parseFloat(d[i].y1)))
            .attr("x2", linear(parseFloat(d[i].x2)))
            .attr("y2", linear(parseFloat(d[i].y2)))
            .attr("class", "top")
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.1)
            .attr("stroke", function () {
              if (d[i].d == "0")
                return "#AAAAAA"
              else
                return "orange"
            })
        }
      })
      d3.csv("data1/lap1.csv", function (d) {
        for (i = 0; i < d.length; i++) {
          g4.append("line")
            .attr("x1", linear(parseFloat(d[i].x1)))
            .attr("y1", linear(parseFloat(d[i].y1)))
            .attr("x2", linear(parseFloat(d[i].x2)))
            .attr("y2", linear(parseFloat(d[i].y2)))
            .attr("class", "top")
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.1)
            .attr("stroke", function () {
              if (d[i].d == "0")
                return "#AAAAAA"
              else
                return "orange"
            })
        }
      })
      d3.csv("data1/n2v1.csv", function (d) {
        for (i = 0; i < d.length; i++) {
          g5.append("line")
            .attr("x1", linear(parseFloat(d[i].x1)))
            .attr("y1", linear(parseFloat(d[i].y1)))
            .attr("x2", linear(parseFloat(d[i].x2)))
            .attr("y2", linear(parseFloat(d[i].y2)))
            .attr("class", "top")
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.1)
            .attr("stroke", function () {
              if (d[i].d == "0")
                return "#AAAAAA"
              else
                return "orange"
            })
        }
      })
      d3.csv("data1/lle1.csv", function (d) {
        for (i = 0; i < d.length; i++) {
          g6.append("line")
            .attr("x1", linear(parseFloat(d[i].x1)))
            .attr("y1", linear(parseFloat(d[i].y1)))
            .attr("x2", linear(parseFloat(d[i].x2)))
            .attr("y2", linear(parseFloat(d[i].y2)))
            .attr("class", "top")
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.1)
            .attr("stroke", function () {
              if (d[i].d == "0")
                return "#AAAAAA"
              else
                return "orange"
            })
        }
      })
      d3.csv("data1/lle.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g6.append("g").append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", function () {
              if (d[i].du == "0")
                return 1
              else
                return 3
            })
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              if (d[i].du == "0")
                return "#AAAAAA"
              else
                return "#FF0000"
            });
        }
      });
      d3.csv("data1/dw.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g1.append("g")
            .append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", function () {
              if (d[i].du == "0")
                return 1
              else
                return 3
            })
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              if (d[i].du == "0")
                return "#AAAAAA"
              else
                return "#FF0000"
            });
        }
      });
      d3.csv("data1/gf.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g2.append("g").append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", function () {
              if (d[i].du == "0")
                return 1
              else
                return 3
            })
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              if (d[i].du == "0")
                return "#AAAAAA"
              else
                return "#FF0000"
            });
        }
      });
      d3.csv("data1/sdne.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g3.append("g").append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", function () {
              if (d[i].du == "0")
                return 1
              else
                return 3
            })
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              if (d[i].du == "0")
                return "#AAAAAA"
              else
                return "#FF0000"
            });
        }
      });
      d3.csv("data1/lap.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g4.append("g").append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", function () {
              if (d[i].du == "0")
                return 1
              else
                return 3
            })
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              if (d[i].du == "0")
                return "#AAAAAA"
              else
                return "#FF0000"
            });
        }
      });
      d3.csv("data1/n2v.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g5.append("g").append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", function () {
              if (d[i].du == "0")
                return 1
              else
                return 3
            })
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              if (d[i].du == "0")
                return "#AAAAAA"
              else
                return "#FF0000"
            });
        }
      });
    }
    else if (size == "中") {
      d3.csv("result/n/node.csv", function (f) {
        d3.csv("result/n/link.csv", function (d) {
          data = [];
          for (var i = 0; i < d.length; i++) {
            data.push({ source: parseInt(d[i].source), target: parseInt(d[i].target) });
          }
          var simulation = d3.forceSimulation(f)
            .force("charge", d3.forceManyBody())
            .force("link", d3.forceLink(data).distance(10))
            .force("center", d3.forceCenter(500, 500));
          simulation.nodes(f).on("tick", ticked);
          simulation.force('link').links(data);
          function ticked() {
            f.forEach((i) => {
              i.circle.position = new PIXI.Point(i.x + 100, i.y)
            })
            links.clear()
            links.alpha = 0.1
            data.forEach((i) => {
              links.lineStyle(cuxi1(i), forcedraw2(i), 1)
              links.moveTo(i.source.x + 100, i.source.y)
              links.lineTo(i.target.x + 100, i.target.y)
            })
            links.endFill()
            app.stage.scale.set(0.35, 0.35)
          }
          for (var i = 0; i < f.length; i++) {
            f[i].circle = new PIXI.Graphics;
            f[i].circle.beginFill(forcedraw1(f[i].du));
            f[i].circle.drawCircle(0, 0, 6);
            f[i].circle.endFill();
            f[i].circle.x = f[i].x + 400;
            f[i].circle.y = f[i].y + 400;
            app.stage.addChild(f[i].circle);
          }

          console.log(data);
          console.log(f);
        })
      })

      d3.csv("result/n/dw1.csv", function (d) {
        for (i = 0; i < d.length; i++) {
          g1.append("line")
            .attr("x1", linear(parseFloat(d[i].x1)))
            .attr("y1", linear(parseFloat(d[i].y1)))
            .attr("x2", linear(parseFloat(d[i].x2)))
            .attr("y2", linear(parseFloat(d[i].y2)))
            .attr("class", "top")
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.1)
            .attr("stroke", function () {
              if (d[i].d == "0")
                return "#AAAAAA"
              else
                return "orange"
            })
        }
      })


      d3.csv("result/n/gf1.csv", function (d) {
        for (i = 0; i < d.length; i++) {
          g2.append("line")
            .attr("x1", linear(parseFloat(d[i].x1)))
            .attr("y1", linear(parseFloat(d[i].y1)))
            .attr("x2", linear(parseFloat(d[i].x2)))
            .attr("y2", linear(parseFloat(d[i].y2)))
            .attr("class", "top")
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.1)
            .attr("stroke", function () {
              if (d[i].d == "0")
                return "#AAAAAA"
              else
                return "orange"
            })
        }
      })


      d3.csv("result/n/sdne1.csv", function (d) {
        for (i = 0; i < d.length; i++) {
          g3.append("line")
            .attr("x1", linear(parseFloat(d[i].x1)))
            .attr("y1", linear(parseFloat(d[i].y1)))
            .attr("x2", linear(parseFloat(d[i].x2)))
            .attr("y2", linear(parseFloat(d[i].y2)))
            .attr("class", "top")
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.1)
            .attr("stroke", function () {
              if (d[i].d == "0")
                return "#AAAAAA"
              else
                return "orange"
            })
        }
      })



      d3.csv("result/n/lap1.csv", function (d) {
        for (i = 0; i < d.length; i++) {
          g4.append("line")
            .attr("x1", linear(parseFloat(d[i].x1)))
            .attr("y1", linear(parseFloat(d[i].y1)))
            .attr("x2", linear(parseFloat(d[i].x2)))
            .attr("y2", linear(parseFloat(d[i].y2)))
            .attr("class", "top")
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.1)
            .attr("stroke", function () {
              if (d[i].d == "0")
                return "#AAAAAA"
              else
                return "orange"
            })
        }
      })



      d3.csv("result/n/n2v1.csv", function (d) {
        for (i = 0; i < d.length; i++) {
          g5.append("line")
            .attr("x1", linear(parseFloat(d[i].x1)))
            .attr("y1", linear(parseFloat(d[i].y1)))
            .attr("x2", linear(parseFloat(d[i].x2)))
            .attr("y2", linear(parseFloat(d[i].y2)))
            .attr("class", "top")
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.1)
            .attr("stroke", function () {
              if (d[i].d == "0")
                return "#AAAAAA"
              else
                return "orange"
            })
        }
      })




      d3.csv("result/n/lle1.csv", function (d) {
        for (i = 0; i < d.length; i++) {
          g6.append("line")
            .attr("x1", linear(parseFloat(d[i].x1)))
            .attr("y1", linear(parseFloat(d[i].y1)))
            .attr("x2", linear(parseFloat(d[i].x2)))
            .attr("y2", linear(parseFloat(d[i].y2)))
            .attr("class", "top")
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.1)
            .attr("stroke", function () {
              if (d[i].d == "0")
                return "#AAAAAA"
              else
                return "orange"
            })
        }
      })

      d3.csv("result/n/lle.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g6.append("g").append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", function () {
              if (d[i].du == "0")
                return 1
              else
                return 3
            })
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              if (d[i].du == "0")
                return "#AAAAAA"
              else
                return "#FF0000"
            });
        }
      });
      d3.csv("result/n/dw.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g1.append("g")
            .append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", function () {
              if (d[i].du == "0")
                return 1
              else
                return 3
            })
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              if (d[i].du == "0")
                return "#AAAAAA"
              else
                return "#FF0000"
            });
        }
      });
      d3.csv("result/n/gf.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g2.append("g").append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", function () {
              if (d[i].du == "0")
                return 1
              else
                return 3
            })
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              if (d[i].du == "0")
                return "#AAAAAA"
              else
                return "#FF0000"
            });
        }
      });
      d3.csv("result/n/sdne.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g3.append("g").append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", function () {
              if (d[i].du == "0")
                return 1
              else
                return 3
            })
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              if (d[i].du == "0")
                return "#AAAAAA"
              else
                return "#FF0000"
            });
        }
      });
      d3.csv("result/n/lap.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g4.append("g").append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", function () {
              if (d[i].du == "0")
                return 1
              else
                return 3
            })
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              if (d[i].du == "0")
                return "#AAAAAA"
              else
                return "#FF0000"
            });
        }
      });
      d3.csv("result/n/n2v.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g5.append("g").append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", function () {
              if (d[i].du == "0")
                return 1
              else
                return 3
            })
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              if (d[i].du == "0")
                return "#AAAAAA"
              else
                return "#FF0000"
            });
        }
      });
    }
    else {
      d3.csv("result/l/node.csv", function (f) {
        d3.csv("result/l/link.csv", function (d) {
          data = [];
          for (var i = 0; i < d.length; i++) {
            data.push({ source: parseInt(d[i].source), target: parseInt(d[i].target) });
          }
          var simulation = d3.forceSimulation(f)
            .force("charge", d3.forceManyBody())
            .force("link", d3.forceLink(data).distance(10))
            .force("center", d3.forceCenter(500, 500));
          simulation.nodes(f).on("tick", ticked);
          simulation.force('link').links(data);
          function ticked() {
            f.forEach((i) => {
              i.circle.position = new PIXI.Point(i.x + 350, i.y + 250)
            })
            links.clear()
            links.alpha = 0.1
            data.forEach((i) => {
              links.lineStyle(cuxi1(i), forcedraw2(i), 1)
              links.moveTo(i.source.x + 350, i.source.y + 250)
              links.lineTo(i.target.x + 350, i.target.y + 250)
            })
            links.endFill()
            app.stage.scale.set(0.2, 0.2)
          }
          for (var i = 0; i < f.length; i++) {
            f[i].circle = new PIXI.Graphics;
            f[i].circle.beginFill(forcedraw1(f[i].du));
            f[i].circle.drawCircle(0, 0, 6);
            f[i].circle.endFill();
            f[i].circle.x = f[i].x + 400;
            f[i].circle.y = f[i].y + 400;
            app.stage.addChild(f[i].circle);
          }

          console.log(data);
          console.log(f);
        })
      })

      d3.csv("result/l/dw1.csv", function (d) {
        for (i = 0; i < d.length; i++) {
          g1.append("line")
            .attr("x1", linear(parseFloat(d[i].x1)))
            .attr("y1", linear(parseFloat(d[i].y1)))
            .attr("x2", linear(parseFloat(d[i].x2)))
            .attr("y2", linear(parseFloat(d[i].y2)))
            .attr("class", "top")
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.1)
            .attr("stroke", function () {
              if (d[i].d == "0")
                return "#AAAAAA"
              else
                return "orange"
            })
        }
      })


      d3.csv("result/l/gf1.csv", function (d) {
        for (i = 0; i < d.length; i++) {
          g2.append("line")
            .attr("x1", linear(parseFloat(d[i].x1)))
            .attr("y1", linear(parseFloat(d[i].y1)))
            .attr("x2", linear(parseFloat(d[i].x2)))
            .attr("y2", linear(parseFloat(d[i].y2)))
            .attr("class", "top")
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.1)
            .attr("stroke", function () {
              if (d[i].d == "0")
                return "#AAAAAA"
              else
                return "orange"
            })
        }
      })


      d3.csv("result/l/sdne1.csv", function (d) {
        for (i = 0; i < d.length; i++) {
          g3.append("line")
            .attr("x1", linear(parseFloat(d[i].x1)))
            .attr("y1", linear(parseFloat(d[i].y1)))
            .attr("x2", linear(parseFloat(d[i].x2)))
            .attr("y2", linear(parseFloat(d[i].y2)))
            .attr("class", "top")
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.1)
            .attr("stroke", function () {
              if (d[i].d == "0")
                return "#AAAAAA"
              else
                return "orange"
            })
        }
      })



      d3.csv("result/l/lap1.csv", function (d) {
        for (i = 0; i < d.length; i++) {
          g4.append("line")
            .attr("x1", linear(parseFloat(d[i].x1)))
            .attr("y1", linear(parseFloat(d[i].y1)))
            .attr("x2", linear(parseFloat(d[i].x2)))
            .attr("y2", linear(parseFloat(d[i].y2)))
            .attr("class", "top")
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.1)
            .attr("stroke", function () {
              if (d[i].d == "0")
                return "#AAAAAA"
              else
                return "orange"
            })
        }
      })



      d3.csv("result/l/n2v1.csv", function (d) {
        for (i = 0; i < d.length; i++) {
          g5.append("line")
            .attr("x1", linear(parseFloat(d[i].x1)))
            .attr("y1", linear(parseFloat(d[i].y1)))
            .attr("x2", linear(parseFloat(d[i].x2)))
            .attr("y2", linear(parseFloat(d[i].y2)))
            .attr("class", "top")
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.1)
            .attr("stroke", function () {
              if (d[i].d == "0")
                return "#AAAAAA"
              else
                return "orange"
            })
        }
      })




      d3.csv("result/l/lle1.csv", function (d) {
        for (i = 0; i < d.length; i++) {
          g6.append("line")
            .attr("x1", linear(parseFloat(d[i].x1)))
            .attr("y1", linear(parseFloat(d[i].y1)))
            .attr("x2", linear(parseFloat(d[i].x2)))
            .attr("y2", linear(parseFloat(d[i].y2)))
            .attr("class", "top")
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.1)
            .attr("stroke", function () {
              if (d[i].d == "0")
                return "#AAAAAA"
              else
                return "orange"
            })
        }
      })

      d3.csv("result/l/lle.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g6.append("g").append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", function () {
              if (d[i].du == "0")
                return 1
              else
                return 3
            })
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              if (d[i].du == "0")
                return "#AAAAAA"
              else
                return "#FF0000"
            });
        }
      });

      d3.csv("result/l/dw.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g1.append("g")
            .append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", function () {
              if (d[i].du == "0")
                return 1
              else
                return 3
            })
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              if (d[i].du == "0")
                return "#AAAAAA"
              else
                return "#FF0000"
            });
        }
      });
      d3.csv("result/l/gf.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g2.append("g").append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", function () {
              if (d[i].du == "0")
                return 1
              else
                return 3
            })
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              if (d[i].du == "0")
                return "#AAAAAA"
              else
                return "#FF0000"
            });
        }
      });
      d3.csv("result/l/sdne.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g3.append("g").append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", function () {
              if (d[i].du == "0")
                return 1
              else
                return 3
            })
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              if (d[i].du == "0")
                return "#AAAAAA"
              else
                return "#FF0000"
            });
        }
      });
      d3.csv("result/l/lap.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g4.append("g").append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", function () {
              if (d[i].du == "0")
                return 1
              else
                return 3
            })
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              if (d[i].du == "0")
                return "#AAAAAA"
              else
                return "#FF0000"
            });
        }
      });
      d3.csv("result/l/n2v.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g5.append("g").append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", function () {
              if (d[i].du == "0")
                return 1
              else
                return 3
            })
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              if (d[i].du == "0")
                return "#AAAAAA"
              else
                return "#FF0000"
            });
        }
      });
    }
  }
  else if (t == 2) {
    var size = document.getElementById("title1").innerHTML;
    size = size.substr(5, 1);
    console.log(size);
    if (size == "小") {
      d3.csv("data1/node.csv", function (f) {
        d3.csv("data1/link.csv", function (d) {
          data = [];
          for (var i = 0; i < d.length; i++) {
            data.push({ source: parseInt(d[i].source), target: parseInt(d[i].target) });
          }
          var simulation = d3.forceSimulation(f)
            .force("charge", d3.forceManyBody())
            .force("link", d3.forceLink(data).distance(10))
            .force("center", d3.forceCenter(500, 500));
          simulation.nodes(f).on("tick", ticked);
          simulation.force('link').links(data);
          function ticked() {
            f.forEach((i) => {
              i.circle.position = new PIXI.Point(i.x, i.y)
            })
            links.clear()
            links.alpha = 0.1
            data.forEach((i) => {
              links.lineStyle(cuxi2(i), forcedraw3(i), 1)
              links.moveTo(i.source.x, i.source.y)
              links.lineTo(i.target.x, i.target.y)
            })
            links.endFill()
            app.stage.scale.set(0.4, 0.4)
          }
          for (var i = 0; i < f.length; i++) {
            f[i].circle = new PIXI.Graphics;
            f[i].circle.beginFill(forcedraw1(f[i].xin));
            f[i].circle.drawCircle(0, 0, 6);
            f[i].circle.endFill();
            f[i].circle.x = f[i].x + 400;
            f[i].circle.y = f[i].y + 400;
            app.stage.addChild(f[i].circle);
          }

          console.log(data);
          console.log(f);
        })
      })
      d3.csv("data1/dw1.csv", function (d) {
        for (i = 0; i < d.length; i++) {
          g1.append("line")
            .attr("x1", linear(parseFloat(d[i].x1)))
            .attr("y1", linear(parseFloat(d[i].y1)))
            .attr("x2", linear(parseFloat(d[i].x2)))
            .attr("y2", linear(parseFloat(d[i].y2)))
            .attr("class", "top")
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.1)
            .attr("stroke", function () {
              if (d[i].x == "0")
                return "#AAAAAA"
              else
                return "orange"
            })
        }
      })
      d3.csv("data1/gf1.csv", function (d) {
        for (i = 0; i < d.length; i++) {
          g2.append("line")
            .attr("x1", linear(parseFloat(d[i].x1)))
            .attr("y1", linear(parseFloat(d[i].y1)))
            .attr("x2", linear(parseFloat(d[i].x2)))
            .attr("y2", linear(parseFloat(d[i].y2)))
            .attr("class", "top")
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.1)
            .attr("stroke", function () {
              if (d[i].x == "0")
                return "#AAAAAA"
              else
                return "orange"
            })
        }
      })
      d3.csv("data1/sdne1.csv", function (d) {
        for (i = 0; i < d.length; i++) {
          g3.append("line")
            .attr("x1", linear(parseFloat(d[i].x1)))
            .attr("y1", linear(parseFloat(d[i].y1)))
            .attr("x2", linear(parseFloat(d[i].x2)))
            .attr("y2", linear(parseFloat(d[i].y2)))
            .attr("class", "top")
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.1)
            .attr("stroke", function () {
              if (d[i].x == "0")
                return "#AAAAAA"
              else
                return "orange"
            })
        }
      })
      d3.csv("data1/lap1.csv", function (d) {
        for (i = 0; i < d.length; i++) {
          g4.append("line")
            .attr("x1", linear(parseFloat(d[i].x1)))
            .attr("y1", linear(parseFloat(d[i].y1)))
            .attr("x2", linear(parseFloat(d[i].x2)))
            .attr("y2", linear(parseFloat(d[i].y2)))
            .attr("class", "top")
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.1)
            .attr("stroke", function () {
              if (d[i].x == "0")
                return "#AAAAAA"
              else
                return "orange"
            })
        }
      })
      d3.csv("data1/n2v1.csv", function (d) {
        for (i = 0; i < d.length; i++) {
          g5.append("line")
            .attr("x1", linear(parseFloat(d[i].x1)))
            .attr("y1", linear(parseFloat(d[i].y1)))
            .attr("x2", linear(parseFloat(d[i].x2)))
            .attr("y2", linear(parseFloat(d[i].y2)))
            .attr("class", "top")
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.1)
            .attr("stroke", function () {
              if (d[i].x == "0")
                return "#AAAAAA"
              else
                return "orange"
            })
        }
      })
      d3.csv("data1/lle1.csv", function (d) {
        for (i = 0; i < d.length; i++) {
          g6.append("line")
            .attr("x1", linear(parseFloat(d[i].x1)))
            .attr("y1", linear(parseFloat(d[i].y1)))
            .attr("x2", linear(parseFloat(d[i].x2)))
            .attr("y2", linear(parseFloat(d[i].y2)))
            .attr("class", "top")
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.1)
            .attr("stroke", function () {
              if (d[i].x == "0")
                return "#AAAAAA"
              else
                return "orange"
            })
        }
      })
      d3.csv("data1/lle.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g6.append("g").append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", function () {
              if (d[i].xin == "0")
                return 1
              else
                return 3
            })
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              if (d[i].xin == "0")
                return "#AAAAAA"
              else
                return "#FF0000"
            });
        }
      });
      d3.csv("data1/dw.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g1.append("g")
            .append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", function () {
              if (d[i].xin == "0")
                return 1
              else
                return 3
            })
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              if (d[i].xin == "0")
                return "#AAAAAA"
              else
                return "#FF0000"
            });
        }
      });
      d3.csv("data1/gf.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g2.append("g").append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", function () {
              if (d[i].xin == "0")
                return 1
              else
                return 3
            })
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              if (d[i].xin == "0")
                return "#AAAAAA"
              else
                return "#FF0000"
            });
        }
      });
      d3.csv("data1/sdne.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g3.append("g").append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", function () {
              if (d[i].xin == "0")
                return 1
              else
                return 3
            })
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              if (d[i].xin == "0")
                return "#AAAAAA"
              else
                return "#FF0000"
            });
        }
      });
      d3.csv("data1/lap.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g4.append("g").append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", function () {
              if (d[i].xin == "0")
                return 1
              else
                return 3
            })
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              if (d[i].xin == "0")
                return "#AAAAAA"
              else
                return "#FF0000"
            });
        }
      });
      d3.csv("data1/n2v.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g5.append("g").append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", function () {
              if (d[i].xin == "0")
                return 1
              else
                return 3
            })
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              if (d[i].xin == "0")
                return "#AAAAAA"
              else
                return "#FF0000"
            });
        }
      });


    }
    else if (size == "中") {
      d3.csv("result/n/node.csv", function (f) {
        d3.csv("result/n/link.csv", function (d) {
          data = [];
          for (var i = 0; i < d.length; i++) {
            data.push({ source: parseInt(d[i].source), target: parseInt(d[i].target) });
          }
          var simulation = d3.forceSimulation(f)
            .force("charge", d3.forceManyBody())
            .force("link", d3.forceLink(data).distance(10))
            .force("center", d3.forceCenter(500, 500));
          simulation.nodes(f).on("tick", ticked);
          simulation.force('link').links(data);
          function ticked() {
            f.forEach((i) => {
              i.circle.position = new PIXI.Point(i.x + 100, i.y)
            })
            links.clear()
            links.alpha = 0.1
            data.forEach((i) => {
              links.lineStyle(cuxi2(i), forcedraw3(i), 1)
              links.moveTo(i.source.x + 100, i.source.y)
              links.lineTo(i.target.x + 100, i.target.y)
            })
            links.endFill()
            app.stage.scale.set(0.35, 0.35)
          }
          for (var i = 0; i < f.length; i++) {
            f[i].circle = new PIXI.Graphics;
            f[i].circle.beginFill(forcedraw1(f[i].xin));
            f[i].circle.drawCircle(0, 0, 6);
            f[i].circle.endFill();
            f[i].circle.x = f[i].x + 400;
            f[i].circle.y = f[i].y + 400;
            app.stage.addChild(f[i].circle);
          }

          console.log(data);
          console.log(f);
        })
      })


      d3.csv("result/l/dw1.csv", function (d) {
        for (i = 0; i < d.length; i++) {
          g1.append("line")
            .attr("x1", linear(parseFloat(d[i].x1)))
            .attr("y1", linear(parseFloat(d[i].y1)))
            .attr("x2", linear(parseFloat(d[i].x2)))
            .attr("y2", linear(parseFloat(d[i].y2)))
            .attr("class", "top")
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.1)
            .attr("stroke", function () {
              if (d[i].x == "0")
                return "#AAAAAA"
              else
                return "orange"
            })
        }
      })
      d3.csv("result/n/gf1.csv", function (d) {
        for (i = 0; i < d.length; i++) {
          g2.append("line")
            .attr("x1", linear(parseFloat(d[i].x1)))
            .attr("y1", linear(parseFloat(d[i].y1)))
            .attr("x2", linear(parseFloat(d[i].x2)))
            .attr("y2", linear(parseFloat(d[i].y2)))
            .attr("class", "top")
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.1)
            .attr("stroke", function () {
              if (d[i].x == "0")
                return "#AAAAAA"
              else
                return "orange"
            })
        }
      })
      d3.csv("result/n/sdne1.csv", function (d) {
        for (i = 0; i < d.length; i++) {
          g3.append("line")
            .attr("x1", linear(parseFloat(d[i].x1)))
            .attr("y1", linear(parseFloat(d[i].y1)))
            .attr("x2", linear(parseFloat(d[i].x2)))
            .attr("y2", linear(parseFloat(d[i].y2)))
            .attr("class", "top")
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.1)
            .attr("stroke", function () {
              if (d[i].x == "0")
                return "#AAAAAA"
              else
                return "orange"
            })
        }
      })
      d3.csv("result/n/lap1.csv", function (d) {
        for (i = 0; i < d.length; i++) {
          g4.append("line")
            .attr("x1", linear(parseFloat(d[i].x1)))
            .attr("y1", linear(parseFloat(d[i].y1)))
            .attr("x2", linear(parseFloat(d[i].x2)))
            .attr("y2", linear(parseFloat(d[i].y2)))
            .attr("class", "top")
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.1)
            .attr("stroke", function () {
              if (d[i].x == "0")
                return "#AAAAAA"
              else
                return "orange"
            })
        }
      })
      d3.csv("result/n/n2v1.csv", function (d) {
        for (i = 0; i < d.length; i++) {
          g5.append("line")
            .attr("x1", linear(parseFloat(d[i].x1)))
            .attr("y1", linear(parseFloat(d[i].y1)))
            .attr("x2", linear(parseFloat(d[i].x2)))
            .attr("y2", linear(parseFloat(d[i].y2)))
            .attr("class", "top")
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.1)
            .attr("stroke", function () {
              if (d[i].x == "0")
                return "#AAAAAA"
              else
                return "orange"
            })
        }
      })
      d3.csv("result/n/lle1.csv", function (d) {
        for (i = 0; i < d.length; i++) {
          g6.append("line")
            .attr("x1", linear(parseFloat(d[i].x1)))
            .attr("y1", linear(parseFloat(d[i].y1)))
            .attr("x2", linear(parseFloat(d[i].x2)))
            .attr("y2", linear(parseFloat(d[i].y2)))
            .attr("class", "top")
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.1)
            .attr("stroke", function () {
              if (d[i].x == "0")
                return "#AAAAAA"
              else
                return "orange"
            })
        }
      })
      d3.csv("result/n/lle.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g6.append("g").append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", function () {
              if (d[i].xin == "0")
                return 1
              else
                return 3
            })
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              if (d[i].xin == "0")
                return "#AAAAAA"
              else
                return "#FF0000"
            });

        }
      });
      d3.csv("result/n/dw.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g1.append("g")
            .append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", function () {
              if (d[i].xin == "0")
                return 1
              else
                return 3
            })
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              if (d[i].xin == "0")
                return "#AAAAAA"
              else
                return "#FF0000"
            });
        }
      });
      d3.csv("result/n/gf.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g2.append("g").append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", function () {
              if (d[i].xin == "0")
                return 1
              else
                return 3
            })
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              if (d[i].xin == "0")
                return "#AAAAAA"
              else
                return "#FF0000"
            });
        }
      });
      d3.csv("result/n/sdne.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g3.append("g").append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", function () {
              if (d[i].xin == "0")
                return 1
              else
                return 3
            })
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              if (d[i].xin == "0")
                return "#AAAAAA"
              else
                return "#FF0000"
            });
        }
      });
      d3.csv("result/n/lap.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g4.append("g").append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", function () {
              if (d[i].xin == "0")
                return 1
              else
                return 3
            })
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              if (d[i].xin == "0")
                return "#AAAAAA"
              else
                return "#FF0000"
            });
        }
      });

      d3.csv("result/n/n2v.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g5.append("g").append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", function () {
              if (d[i].xin == "0")
                return 1
              else
                return 3
            })
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              if (d[i].xin == "0")
                return "#AAAAAA"
              else
                return "#FF0000"
            });
        }
      });
    }
    else {
      d3.csv("result/l/node.csv", function (f) {
        d3.csv("result/l/link.csv", function (d) {
          data = [];
          for (var i = 0; i < d.length; i++) {
            data.push({ source: parseInt(d[i].source), target: parseInt(d[i].target) });
          }
          var simulation = d3.forceSimulation(f)
            .force("charge", d3.forceManyBody())
            .force("link", d3.forceLink(data).distance(10))
            .force("center", d3.forceCenter(500, 500));
          simulation.nodes(f).on("tick", ticked);
          simulation.force('link').links(data);
          function ticked() {
            f.forEach((i) => {
              i.circle.position = new PIXI.Point(i.x + 350, i.y + 250)
            })
            links.clear()
            links.alpha = 0.1
            data.forEach((i) => {
              links.lineStyle(cuxi2(i), forcedraw3(i), 1)
              links.moveTo(i.source.x + 350, i.source.y + 250)
              links.lineTo(i.target.x + 350, i.target.y + 250)
            })
            links.endFill()
            app.stage.scale.set(0.2, 0.2)
          }
          for (var i = 0; i < f.length; i++) {
            f[i].circle = new PIXI.Graphics;
            f[i].circle.beginFill(forcedraw1(f[i].xin));
            f[i].circle.drawCircle(0, 0, 6);
            f[i].circle.endFill();
            f[i].circle.x = f[i].x + 400;
            f[i].circle.y = f[i].y + 400;
            app.stage.addChild(f[i].circle);
          }

          console.log(data);
          console.log(f);
        })
      })

      d3.csv("result/l/dw1.csv", function (d) {
        for (i = 0; i < d.length; i++) {
          g1.append("line")
            .attr("x1", linear(parseFloat(d[i].x1)))
            .attr("y1", linear(parseFloat(d[i].y1)))
            .attr("x2", linear(parseFloat(d[i].x2)))
            .attr("y2", linear(parseFloat(d[i].y2)))
            .attr("class", "top")
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.1)
            .attr("stroke", function () {
              if (d[i].x == "0")
                return "#AAAAAA"
              else
                return "orange"
            })
        }
      })


      d3.csv("result/l/gf1.csv", function (d) {
        for (i = 0; i < d.length; i++) {
          g2.append("line")
            .attr("x1", linear(parseFloat(d[i].x1)))
            .attr("y1", linear(parseFloat(d[i].y1)))
            .attr("x2", linear(parseFloat(d[i].x2)))
            .attr("y2", linear(parseFloat(d[i].y2)))
            .attr("class", "top")
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.1)
            .attr("stroke", function () {
              if (d[i].x == "0")
                return "#AAAAAA"
              else
                return "orange"
            })
        }
      })


      d3.csv("result/l/sdne1.csv", function (d) {
        for (i = 0; i < d.length; i++) {
          g3.append("line")
            .attr("x1", linear(parseFloat(d[i].x1)))
            .attr("y1", linear(parseFloat(d[i].y1)))
            .attr("x2", linear(parseFloat(d[i].x2)))
            .attr("y2", linear(parseFloat(d[i].y2)))
            .attr("class", "top")
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.1)
            .attr("stroke", function () {
              if (d[i].x == "0")
                return "#AAAAAA"
              else
                return "orange"
            })
        }
      })



      d3.csv("result/l/lap1.csv", function (d) {
        for (i = 0; i < d.length; i++) {
          g4.append("line")
            .attr("x1", linear(parseFloat(d[i].x1)))
            .attr("y1", linear(parseFloat(d[i].y1)))
            .attr("x2", linear(parseFloat(d[i].x2)))
            .attr("y2", linear(parseFloat(d[i].y2)))
            .attr("class", "top")
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.1)
            .attr("stroke", function () {
              if (d[i].x == "0")
                return "#AAAAAA"
              else
                return "orange"
            })
        }
      })



      d3.csv("result/l/n2v1.csv", function (d) {
        for (i = 0; i < d.length; i++) {
          g5.append("line")
            .attr("x1", linear(parseFloat(d[i].x1)))
            .attr("y1", linear(parseFloat(d[i].y1)))
            .attr("x2", linear(parseFloat(d[i].x2)))
            .attr("y2", linear(parseFloat(d[i].y2)))
            .attr("class", "top")
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.1)
            .attr("stroke", function () {
              if (d[i].x == "0")
                return "#AAAAAA"
              else
                return "orange"
            })
        }
      })




      d3.csv("result/l/lle1.csv", function (d) {
        for (i = 0; i < d.length; i++) {
          g6.append("line")
            .attr("x1", linear(parseFloat(d[i].x1)))
            .attr("y1", linear(parseFloat(d[i].y1)))
            .attr("x2", linear(parseFloat(d[i].x2)))
            .attr("y2", linear(parseFloat(d[i].y2)))
            .attr("class", "top")
            .attr("stroke-width", 1)
            .attr("stroke-opacity", 0.1)
            .attr("stroke", function () {
              if (d[i].x == "0")
                return "#AAAAAA"
              else
                return "orange"
            })
        }
      })


      d3.csv("result/l/dw.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g1.append("g")
            .append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", function () {
              if (d[i].xin == "0")
                return 1
              else
                return 3
            })
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              if (d[i].xin == "0")
                return "#AAAAAA"
              else
                return "#FF0000"
            });
        }
      });
      d3.csv("result/l/gf.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g2.append("g").append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", function () {
              if (d[i].xin == "0")
                return 1
              else
                return 3
            })
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              if (d[i].xin == "0")
                return "#AAAAAA"
              else
                return "#FF0000"
            });
        }
      });
      d3.csv("result/l/sdne.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g3.append("g").append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", function () {
              if (d[i].xin == "0")
                return 1
              else
                return 3
            })
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              if (d[i].xin == "0")
                return "#AAAAAA"
              else
                return "#FF0000"
            });
        }
      });
      d3.csv("result/l/n2v.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g5.append("g").append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", function () {
              if (d[i].xin == "0")
                return 1
              else
                return 3
            })
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              if (d[i].xin == "0")
                return "#AAAAAA"
              else
                return "#FF0000"
            });
        }
      });

      d3.csv("result/l/lap.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g4.append("g").append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", function () {
              if (d[i].xin == "0")
                return 1
              else
                return 3
            })
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              if (d[i].xin == "0")
                return "#AAAAAA"
              else
                return "#FF0000"
            });
        }
      });
      d3.csv("result/l/lle.csv", function (d) {
        var linear = d3.scaleLinear()
          .domain([-70, 70])
          .range([0, 240]);

        for (var i = 0; i < d.length; i++) {
          g6.append("g").append("circle")
            .attr("cx", linear(d[i].x))
            .attr("cy", linear(d[i].y))
            .attr("r", function () {
              if (d[i].xin == "0")
                return 1
              else
                return 3
            })
            .attr("id", d[i].tag + "," + d[i].com)
            .attr("class", "top")
            .attr("fill", function () {
              if (d[i].xin == "0")
                return "#AAAAAA"
              else
                return "#FF0000"
            });
        }
      });
    }
  }
  else {
    var size = document.getElementById("title1").innerHTML;
    size = size.substr(5, 1);
    base = 0
    if (size == "小") {
      d3.csv("data1/node.csv", function (f) {
        d3.csv("data1/link.csv", function (d) {
          data = [];
          for (var i = 0; i < d.length; i++) {
            data.push({ source: parseInt(d[i].source), target: parseInt(d[i].target) });
          }
          var simulation = d3.forceSimulation(f)
            .force("charge", d3.forceManyBody())
            .force("link", d3.forceLink(data).distance(10))
            .force("center", d3.forceCenter(500, 500));
          simulation.nodes(f).on("tick", ticked);
          simulation.force('link').links(data);
          const one = []
          const two = []
          data.forEach((i) => {
            if (i.source.id == base) {
              if (one.indexOf(parseInt(i.target.id)) == -1) {
                one.push(parseInt(i.target.id));
              }
            }
          })
          data.forEach((i) => {
            if (one.indexOf(parseInt(i.source.id)) != -1) {
              if (two.indexOf(parseInt(i.target.id)) == -1) {
                two.push(parseInt(i.target.id));
              }
            }
          })
          console.log(two)
          function ticked() {
            f.forEach((i) => {
              i.circle.position = new PIXI.Point(i.x, i.y)
            })
            links.clear()
            links.alpha = 0.1
            j = 0
            data.forEach((i) => {
              links.lineStyle(cuxi_nextnode_l(i, base, one, two), forcedraw_nextnode_l(i, base, one, two), 1)
              links.moveTo(i.source.x, i.source.y)
              links.lineTo(i.target.x, i.target.y)
            })
            links.endFill()
            app.stage.scale.set(0.4, 0.4)
          }
          console.log(one)
          for (var i = 0; i < f.length; i++) {
            f[i].circle = new PIXI.Graphics;
            f[i].circle.beginFill(forcedraw_nextnode_n(f[i], base, one, two));
            f[i].circle.drawCircle(0, 0, 6);
            f[i].circle.endFill();
            f[i].circle.x = f[i].x + 400;
            f[i].circle.y = f[i].y + 400;
            app.stage.addChild(f[i].circle);
          }

          console.log(data);
          console.log(f);
          d3.csv("data1/dw1.csv", function (d) {
            for (i = 0; i < d.length; i++) {
              g1.append("line")
                .attr("x1", linear(parseFloat(d[i].x1)))
                .attr("y1", linear(parseFloat(d[i].y1)))
                .attr("x2", linear(parseFloat(d[i].x2)))
                .attr("y2", linear(parseFloat(d[i].y2)))
                .attr("class", "top")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 0.1)
                .attr("stroke", function () {
                  // console.log(d[i])
                  // if (d[i].source.id == ba || d[i].target.id == ba) {
                  //   return "#FF0000";
                  // }
                  // else if (one.indexOf(parseInt(d[i].source.id)) != -1 && two.indexOf(parseInt(d[i].target.id)) != -1) {
                  //   return "#0000FF"
                  // }
                  // else {
                  return "#AAAAAA";
                  // }
                })
            }
          })
          d3.csv("data1/dw.csv", function (d) {
            var linear = d3.scaleLinear()
              .domain([-70, 70])
              .range([0, 240]);

            for (var i = 0; i < d.length; i++) {
              g1.append("g")
                .append("circle")
                .attr("cx", linear(d[i].x))
                .attr("cy", linear(d[i].y))
                .attr("r", function () {
                  if (d[i].id == base) {
                    return 5
                  }
                  else if (one.indexOf(parseInt(d[i].id)) != -1) {
                    return 3;
                  }
                  if (two.indexOf(parseInt(d[i].id)) != -1) {
                    return 2;
                  }
                  else {
                    return 1;
                  }
                })
                .attr("id", d[i].tag + "," + d[i].com)
                .attr("class", "top")
                .attr("fill", function () {
                  if (d[i].id == base) {
                    return "#000000"
                  }
                  else if (one.indexOf(parseInt(d[i].id)) != -1) {
                    return "#FF0000";
                  }
                  if (two.indexOf(parseInt(d[i].id)) != -1) {
                    return "#00FF00";
                  }
                  else {
                    return "#AAAAAA";
                  }
                });
            }
          });
          d3.csv("data1/gf1.csv", function (d) {
            for (i = 0; i < d.length; i++) {
              g2.append("line")
                .attr("x1", linear(parseFloat(d[i].x1)))
                .attr("y1", linear(parseFloat(d[i].y1)))
                .attr("x2", linear(parseFloat(d[i].x2)))
                .attr("y2", linear(parseFloat(d[i].y2)))
                .attr("class", "top")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 0.1)
                .attr("stroke", function () {
                  // if (d[i].d == "0")
                  return "#AAAAAA"
                  // else
                  //   return "orange"
                })
            }
          })
          d3.csv("data1/sdne1.csv", function (d) {
            for (i = 0; i < d.length; i++) {
              g3.append("line")
                .attr("x1", linear(parseFloat(d[i].x1)))
                .attr("y1", linear(parseFloat(d[i].y1)))
                .attr("x2", linear(parseFloat(d[i].x2)))
                .attr("y2", linear(parseFloat(d[i].y2)))
                .attr("class", "top")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 0.1)
                .attr("stroke", function () {
                  // if (d[i].d == "0")
                  return "#AAAAAA"
                  // else
                  //   return "orange"
                })
            }
          })
          d3.csv("data1/lap1.csv", function (d) {
            for (i = 0; i < d.length; i++) {
              g4.append("line")
                .attr("x1", linear(parseFloat(d[i].x1)))
                .attr("y1", linear(parseFloat(d[i].y1)))
                .attr("x2", linear(parseFloat(d[i].x2)))
                .attr("y2", linear(parseFloat(d[i].y2)))
                .attr("class", "top")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 0.1)
                .attr("stroke", function () {
                  // if (d[i].d == "0")
                  return "#AAAAAA"
                  // else
                  // return "orange"
                })
            }
          })
          d3.csv("data1/n2v1.csv", function (d) {
            for (i = 0; i < d.length; i++) {
              g5.append("line")
                .attr("x1", linear(parseFloat(d[i].x1)))
                .attr("y1", linear(parseFloat(d[i].y1)))
                .attr("x2", linear(parseFloat(d[i].x2)))
                .attr("y2", linear(parseFloat(d[i].y2)))
                .attr("class", "top")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 0.1)
                .attr("stroke", function () {
                  // if (d[i].d == "0")
                  return "#AAAAAA"
                  // else
                  //   return "orange"
                })
            }
          })
          d3.csv("data1/lle1.csv", function (d) {
            for (i = 0; i < d.length; i++) {
              g6.append("line")
                .attr("x1", linear(parseFloat(d[i].x1)))
                .attr("y1", linear(parseFloat(d[i].y1)))
                .attr("x2", linear(parseFloat(d[i].x2)))
                .attr("y2", linear(parseFloat(d[i].y2)))
                .attr("class", "top")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 0.1)
                .attr("stroke", function () {
                  // if (d[i].d == "0")
                  return "#AAAAAA"
                  // else
                  //   return "orange"
                })
            }
          })
          d3.csv("data1/lle.csv", function (d) {
            var linear = d3.scaleLinear()
              .domain([-70, 70])
              .range([0, 240]);

            for (var i = 0; i < d.length; i++) {
              g6.append("g").append("circle")
                .attr("cx", linear(d[i].x))
                .attr("cy", linear(d[i].y))
                .attr("r", function () {
                  if (d[i].id == base) {
                    return 5
                  }
                  else if (one.indexOf(parseInt(d[i].id)) != -1) {
                    return 3;
                  }
                  if (two.indexOf(parseInt(d[i].id)) != -1) {
                    return 2;
                  }
                  else {
                    return 1;
                  }
                })
                .attr("id", d[i].tag + "," + d[i].com)
                .attr("class", "top")
                .attr("fill", function () {
                  if (d[i].id == base) {
                    return "#000000"
                  }
                  else if (one.indexOf(parseInt(d[i].id)) != -1) {
                    return "#FF0000";
                  }
                  if (two.indexOf(parseInt(d[i].id)) != -1) {
                    return "#00FF00";
                  }
                  else {
                    return "#AAAAAA";
                  }
                });
            }
          });

          d3.csv("data1/gf.csv", function (d) {
            var linear = d3.scaleLinear()
              .domain([-70, 70])
              .range([0, 240]);

            for (var i = 0; i < d.length; i++) {
              g2.append("g").append("circle")
                .attr("cx", linear(d[i].x))
                .attr("cy", linear(d[i].y))
                .attr("r", function () {
                  if (d[i].id == base) {
                    return 5
                  }
                  else if (one.indexOf(parseInt(d[i].id)) != -1) {
                    return 3;
                  }
                  if (two.indexOf(parseInt(d[i].id)) != -1) {
                    return 2;
                  }
                  else {
                    return 1;
                  }
                })
                .attr("id", d[i].tag + "," + d[i].com)
                .attr("class", "top")
                .attr("fill", function () {
                  if (d[i].id == base) {
                    return "#000000"
                  }
                  else if (one.indexOf(parseInt(d[i].id)) != -1) {
                    return "#FF0000";
                  }
                  if (two.indexOf(parseInt(d[i].id)) != -1) {
                    return "#00FF00";
                  }
                  else {
                    return "#AAAAAA";
                  }
                });
            }
          });
          d3.csv("data1/sdne.csv", function (d) {
            var linear = d3.scaleLinear()
              .domain([-70, 70])
              .range([0, 240]);

            for (var i = 0; i < d.length; i++) {
              g3.append("g").append("circle")
                .attr("cx", linear(d[i].x))
                .attr("cy", linear(d[i].y))
                .attr("r", function () {
                  if (d[i].id == base) {
                    return 5
                  }
                  else if (one.indexOf(parseInt(d[i].id)) != -1) {
                    return 3;
                  }
                  if (two.indexOf(parseInt(d[i].id)) != -1) {
                    return 2;
                  }
                  else {
                    return 1;
                  }
                })
                .attr("id", d[i].tag + "," + d[i].com)
                .attr("class", "top")
                .attr("fill", function () {
                  if (d[i].id == base) {
                    return "#000000"
                  }
                  else if (one.indexOf(parseInt(d[i].id)) != -1) {
                    return "#FF0000";
                  }
                  if (two.indexOf(parseInt(d[i].id)) != -1) {
                    return "#00FF00";
                  }
                  else {
                    return "#AAAAAA";
                  }
                });
            }
          });
          d3.csv("data1/lap.csv", function (d) {
            var linear = d3.scaleLinear()
              .domain([-70, 70])
              .range([0, 240]);

            for (var i = 0; i < d.length; i++) {
              g4.append("g").append("circle")
                .attr("cx", linear(d[i].x))
                .attr("cy", linear(d[i].y))
                .attr("r", function () {
                  if (d[i].id == base) {
                    return 5
                  }
                  else if (one.indexOf(parseInt(d[i].id)) != -1) {
                    return 3;
                  }
                  if (two.indexOf(parseInt(d[i].id)) != -1) {
                    return 2;
                  }
                  else {
                    return 1;
                  }
                })
                .attr("id", d[i].tag + "," + d[i].com)
                .attr("class", "top")
                .attr("fill", function () {
                  if (d[i].id == base) {
                    return "#000000"
                  }
                  else if (one.indexOf(parseInt(d[i].id)) != -1) {
                    return "#FF0000";
                  }
                  if (two.indexOf(parseInt(d[i].id)) != -1) {
                    return "#00FF00";
                  }
                  else {
                    return "#AAAAAA";
                  }
                });
            }
          });
          d3.csv("data1/n2v.csv", function (d) {
            var linear = d3.scaleLinear()
              .domain([-70, 70])
              .range([0, 240]);

            for (var i = 0; i < d.length; i++) {
              g5.append("g").append("circle")
                .attr("cx", linear(d[i].x))
                .attr("cy", linear(d[i].y))
                .attr("r", function () {
                  if (d[i].id == base) {
                    return 5
                  }
                  else if (one.indexOf(parseInt(d[i].id)) != -1) {
                    return 3;
                  }
                  if (two.indexOf(parseInt(d[i].id)) != -1) {
                    return 2;
                  }
                  else {
                    return 1;
                  }
                })
                .attr("id", d[i].tag + "," + d[i].com)
                .attr("class", "top")
                .attr("fill", function () {
                  if (d[i].id == base) {
                    return "#000000"
                  }
                  else if (one.indexOf(parseInt(d[i].id)) != -1) {
                    return "#FF0000";
                  }
                  if (two.indexOf(parseInt(d[i].id)) != -1) {
                    return "#00FF00";
                  }
                  else {
                    return "#AAAAAA";
                  }
                });
            }
          });
        })
      })

      // 

    }
    else if (size == "中")  {
      d3.csv("result/n//node.csv", function (f) {
        d3.csv("result/n//link.csv", function (d) {
          data = [];
          for (var i = 0; i < d.length; i++) {
            data.push({ source: parseInt(d[i].source), target: parseInt(d[i].target) });
          }
          var simulation = d3.forceSimulation(f)
            .force("charge", d3.forceManyBody())
            .force("link", d3.forceLink(data).distance(10))
            .force("center", d3.forceCenter(500, 500));
          simulation.nodes(f).on("tick", ticked);
          simulation.force('link').links(data);
          const one = []
          const two = []
          data.forEach((i) => {
            if (i.source.id == base) {
              if (one.indexOf(parseInt(i.target.id)) == -1) {
                one.push(parseInt(i.target.id));
              }
            }
          })
          data.forEach((i) => {
            if (one.indexOf(parseInt(i.source.id)) != -1) {
              if (two.indexOf(parseInt(i.target.id)) == -1) {
                two.push(parseInt(i.target.id));
              }
            }
          })
          console.log(two)
          function ticked() {
            f.forEach((i) => {
              i.circle.position = new PIXI.Point(i.x + 100, i.y)
            })
            links.clear()
            links.alpha = 0.1
            j = 0
            data.forEach((i) => {
              links.lineStyle(cuxi_nextnode_l(i, base, one, two), forcedraw_nextnode_l(i, base, one, two), 1)
              links.moveTo(i.source.x + 100, i.source.y)
              links.lineTo(i.target.x + 100, i.target.y)
            })
            links.endFill()
            app.stage.scale.set(0.35, 0.35)
          }
          console.log(one)
          for (var i = 0; i < f.length; i++) {
            f[i].circle = new PIXI.Graphics;
            f[i].circle.beginFill(forcedraw_nextnode_n(f[i], base, one, two));
            f[i].circle.drawCircle(0, 0, 6);
            f[i].circle.endFill();
            f[i].circle.x = f[i].x + 400;
            f[i].circle.y = f[i].y + 400;
            app.stage.addChild(f[i].circle);
          }

          console.log(data);
          console.log(f);
          d3.csv("result/n//dw1.csv", function (d) {
            for (i = 0; i < d.length; i++) {
              g1.append("line")
                .attr("x1", linear(parseFloat(d[i].x1)))
                .attr("y1", linear(parseFloat(d[i].y1)))
                .attr("x2", linear(parseFloat(d[i].x2)))
                .attr("y2", linear(parseFloat(d[i].y2)))
                .attr("class", "top")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 0.1)
                .attr("stroke", function () {
                  // console.log(d[i])
                  // if (d[i].source.id == ba || d[i].target.id == ba) {
                  //   return "#FF0000";
                  // }
                  // else if (one.indexOf(parseInt(d[i].source.id)) != -1 && two.indexOf(parseInt(d[i].target.id)) != -1) {
                  //   return "#0000FF"
                  // }
                  // else {
                  return "#AAAAAA";
                  // }
                })
            }
          })
          d3.csv("result/n//dw.csv", function (d) {
            var linear = d3.scaleLinear()
              .domain([-70, 70])
              .range([0, 240]);

            for (var i = 0; i < d.length; i++) {
              g1.append("g")
                .append("circle")
                .attr("cx", linear(d[i].x))
                .attr("cy", linear(d[i].y))
                .attr("r", function () {
                  if (d[i].id == base) {
                    return 5
                  }
                  else if (one.indexOf(parseInt(d[i].id)) != -1) {
                    return 3;
                  }
                  if (two.indexOf(parseInt(d[i].id)) != -1) {
                    return 2;
                  }
                  else {
                    return 1;
                  }
                })
                .attr("id", d[i].tag + "," + d[i].com)
                .attr("class", "top")
                .attr("fill", function () {
                  if (d[i].id == base) {
                    return "#000000"
                  }
                  else if (one.indexOf(parseInt(d[i].id)) != -1) {
                    return "#FF0000";
                  }
                  if (two.indexOf(parseInt(d[i].id)) != -1) {
                    return "#00FF00";
                  }
                  else {
                    return "#AAAAAA";
                  }
                });
            }
          });
          d3.csv("result/n//gf1.csv", function (d) {
            for (i = 0; i < d.length; i++) {
              g2.append("line")
                .attr("x1", linear(parseFloat(d[i].x1)))
                .attr("y1", linear(parseFloat(d[i].y1)))
                .attr("x2", linear(parseFloat(d[i].x2)))
                .attr("y2", linear(parseFloat(d[i].y2)))
                .attr("class", "top")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 0.1)
                .attr("stroke", function () {
                  // if (d[i].d == "0")
                  return "#AAAAAA"
                  // else
                  //   return "orange"
                })
            }
          })
          d3.csv("result/n//sdne1.csv", function (d) {
            for (i = 0; i < d.length; i++) {
              g3.append("line")
                .attr("x1", linear(parseFloat(d[i].x1)))
                .attr("y1", linear(parseFloat(d[i].y1)))
                .attr("x2", linear(parseFloat(d[i].x2)))
                .attr("y2", linear(parseFloat(d[i].y2)))
                .attr("class", "top")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 0.1)
                .attr("stroke", function () {
                  // if (d[i].d == "0")
                  return "#AAAAAA"
                  // else
                  //   return "orange"
                })
            }
          })
          d3.csv("result/n//lap1.csv", function (d) {
            for (i = 0; i < d.length; i++) {
              g4.append("line")
                .attr("x1", linear(parseFloat(d[i].x1)))
                .attr("y1", linear(parseFloat(d[i].y1)))
                .attr("x2", linear(parseFloat(d[i].x2)))
                .attr("y2", linear(parseFloat(d[i].y2)))
                .attr("class", "top")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 0.1)
                .attr("stroke", function () {
                  // if (d[i].d == "0")
                  return "#AAAAAA"
                  // else
                  // return "orange"
                })
            }
          })
          d3.csv("result/n//n2v1.csv", function (d) {
            for (i = 0; i < d.length; i++) {
              g5.append("line")
                .attr("x1", linear(parseFloat(d[i].x1)))
                .attr("y1", linear(parseFloat(d[i].y1)))
                .attr("x2", linear(parseFloat(d[i].x2)))
                .attr("y2", linear(parseFloat(d[i].y2)))
                .attr("class", "top")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 0.1)
                .attr("stroke", function () {
                  // if (d[i].d == "0")
                  return "#AAAAAA"
                  // else
                  //   return "orange"
                })
            }
          })
          d3.csv("result/n//lle1.csv", function (d) {
            for (i = 0; i < d.length; i++) {
              g6.append("line")
                .attr("x1", linear(parseFloat(d[i].x1)))
                .attr("y1", linear(parseFloat(d[i].y1)))
                .attr("x2", linear(parseFloat(d[i].x2)))
                .attr("y2", linear(parseFloat(d[i].y2)))
                .attr("class", "top")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 0.1)
                .attr("stroke", function () {
                  // if (d[i].d == "0")
                  return "#AAAAAA"
                  // else
                  //   return "orange"
                })
            }
          })
          d3.csv("result/n//lle.csv", function (d) {
            var linear = d3.scaleLinear()
              .domain([-70, 70])
              .range([0, 240]);

            for (var i = 0; i < d.length; i++) {
              g6.append("g").append("circle")
                .attr("cx", linear(d[i].x))
                .attr("cy", linear(d[i].y))
                .attr("r", function () {
                  if (d[i].id == base) {
                    return 5
                  }
                  else if (one.indexOf(parseInt(d[i].id)) != -1) {
                    return 3;
                  }
                  if (two.indexOf(parseInt(d[i].id)) != -1) {
                    return 2;
                  }
                  else {
                    return 1;
                  }
                })
                .attr("id", d[i].tag + "," + d[i].com)
                .attr("class", "top")
                .attr("fill", function () {
                  if (d[i].id == base) {
                    return "#000000"
                  }
                  else if (one.indexOf(parseInt(d[i].id)) != -1) {
                    return "#FF0000";
                  }
                  if (two.indexOf(parseInt(d[i].id)) != -1) {
                    return "#00FF00";
                  }
                  else {
                    return "#AAAAAA";
                  }
                });
            }
          });

          d3.csv("result/n//gf.csv", function (d) {
            var linear = d3.scaleLinear()
              .domain([-70, 70])
              .range([0, 240]);

            for (var i = 0; i < d.length; i++) {
              g2.append("g").append("circle")
                .attr("cx", linear(d[i].x))
                .attr("cy", linear(d[i].y))
                .attr("r", function () {
                  if (d[i].id == base) {
                    return 5
                  }
                  else if (one.indexOf(parseInt(d[i].id)) != -1) {
                    return 3;
                  }
                  if (two.indexOf(parseInt(d[i].id)) != -1) {
                    return 2;
                  }
                  else {
                    return 1;
                  }
                })
                .attr("id", d[i].tag + "," + d[i].com)
                .attr("class", "top")
                .attr("fill", function () {
                  if (d[i].id == base) {
                    return "#000000"
                  }
                  else if (one.indexOf(parseInt(d[i].id)) != -1) {
                    return "#FF0000";
                  }
                  if (two.indexOf(parseInt(d[i].id)) != -1) {
                    return "#00FF00";
                  }
                  else {
                    return "#AAAAAA";
                  }
                });
            }
          });
          d3.csv("result/n//sdne.csv", function (d) {
            var linear = d3.scaleLinear()
              .domain([-70, 70])
              .range([0, 240]);

            for (var i = 0; i < d.length; i++) {
              g3.append("g").append("circle")
                .attr("cx", linear(d[i].x))
                .attr("cy", linear(d[i].y))
                .attr("r", function () {
                  if (d[i].id == base) {
                    return 5
                  }
                  else if (one.indexOf(parseInt(d[i].id)) != -1) {
                    return 3;
                  }
                  if (two.indexOf(parseInt(d[i].id)) != -1) {
                    return 2;
                  }
                  else {
                    return 1;
                  }
                })
                .attr("id", d[i].tag + "," + d[i].com)
                .attr("class", "top")
                .attr("fill", function () {
                  if (d[i].id == base) {
                    return "#000000"
                  }
                  else if (one.indexOf(parseInt(d[i].id)) != -1) {
                    return "#FF0000";
                  }
                  if (two.indexOf(parseInt(d[i].id)) != -1) {
                    return "#00FF00";
                  }
                  else {
                    return "#AAAAAA";
                  }
                });
            }
          });
          d3.csv("result/n//lap.csv", function (d) {
            var linear = d3.scaleLinear()
              .domain([-70, 70])
              .range([0, 240]);

            for (var i = 0; i < d.length; i++) {
              g4.append("g").append("circle")
                .attr("cx", linear(d[i].x))
                .attr("cy", linear(d[i].y))
                .attr("r", function () {
                  if (d[i].id == base) {
                    return 5
                  }
                  else if (one.indexOf(parseInt(d[i].id)) != -1) {
                    return 3;
                  }
                  if (two.indexOf(parseInt(d[i].id)) != -1) {
                    return 2;
                  }
                  else {
                    return 1;
                  }
                })
                .attr("id", d[i].tag + "," + d[i].com)
                .attr("class", "top")
                .attr("fill", function () {
                  if (d[i].id == base) {
                    return "#000000"
                  }
                  else if (one.indexOf(parseInt(d[i].id)) != -1) {
                    return "#FF0000";
                  }
                  if (two.indexOf(parseInt(d[i].id)) != -1) {
                    return "#00FF00";
                  }
                  else {
                    return "#AAAAAA";
                  }
                });
            }
          });
          d3.csv("result/n//n2v.csv", function (d) {
            var linear = d3.scaleLinear()
              .domain([-70, 70])
              .range([0, 240]);

            for (var i = 0; i < d.length; i++) {
              g5.append("g").append("circle")
                .attr("cx", linear(d[i].x))
                .attr("cy", linear(d[i].y))
                .attr("r", function () {
                  if (d[i].id == base) {
                    return 5
                  }
                  else if (one.indexOf(parseInt(d[i].id)) != -1) {
                    return 3;
                  }
                  if (two.indexOf(parseInt(d[i].id)) != -1) {
                    return 2;
                  }
                  else {
                    return 1;
                  }
                })
                .attr("id", d[i].tag + "," + d[i].com)
                .attr("class", "top")
                .attr("fill", function () {
                  if (d[i].id == base) {
                    return "#000000"
                  }
                  else if (one.indexOf(parseInt(d[i].id)) != -1) {
                    return "#FF0000";
                  }
                  if (two.indexOf(parseInt(d[i].id)) != -1) {
                    return "#00FF00";
                  }
                  else {
                    return "#AAAAAA";
                  }
                });
            }
          });
        })
      })

      // 

    }
    else   {
      d3.csv("result/l/node.csv", function (f) {
        d3.csv("result/l/link.csv", function (d) {
          data = [];
          for (var i = 0; i < d.length; i++) {
            data.push({ source: parseInt(d[i].source), target: parseInt(d[i].target) });
          }
          var simulation = d3.forceSimulation(f)
            .force("charge", d3.forceManyBody())
            .force("link", d3.forceLink(data).distance(10))
            .force("center", d3.forceCenter(500, 500));
          simulation.nodes(f).on("tick", ticked);
          simulation.force('link').links(data);
          const one = []
          const two = []
          data.forEach((i) => {
            if (i.source.id == base) {
              if (one.indexOf(parseInt(i.target.id)) == -1) {
                one.push(parseInt(i.target.id));
              }
            }
          })
          data.forEach((i) => {
            if (one.indexOf(parseInt(i.source.id)) != -1) {
              if (two.indexOf(parseInt(i.target.id)) == -1) {
                two.push(parseInt(i.target.id));
              }
            }
          })
          console.log(two)
          function ticked() {
            f.forEach((i) => {
              i.circle.position = new PIXI.Point(i.x + 350, i.y + 250)
            })
            links.clear()
            links.alpha = 0.1
            j = 0
            data.forEach((i) => {
              links.lineStyle(cuxi_nextnode_l(i, base, one, two), forcedraw_nextnode_l(i, base, one, two), 1)
              links.moveTo(i.source.x + 350, i.source.y + 250)
              links.lineTo(i.target.x + 350, i.target.y + 250)
            })
            links.endFill()
            app.stage.scale.set(0.2, 0.2)
          }
          console.log(one)
          for (var i = 0; i < f.length; i++) {
            f[i].circle = new PIXI.Graphics;
            f[i].circle.beginFill(forcedraw_nextnode_n(f[i], base, one, two));
            f[i].circle.drawCircle(0, 0, 6);
            f[i].circle.endFill();
            f[i].circle.x = f[i].x + 400;
            f[i].circle.y = f[i].y + 400;
            app.stage.addChild(f[i].circle);
          }

          console.log(data);
          console.log(f);
          d3.csv("result/l/dw1.csv", function (d) {
            for (i = 0; i < d.length; i++) {
              g1.append("line")
                .attr("x1", linear(parseFloat(d[i].x1)))
                .attr("y1", linear(parseFloat(d[i].y1)))
                .attr("x2", linear(parseFloat(d[i].x2)))
                .attr("y2", linear(parseFloat(d[i].y2)))
                .attr("class", "top")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 0.1)
                .attr("stroke", function () {
                  // console.log(d[i])
                  // if (d[i].source.id == ba || d[i].target.id == ba) {
                  //   return "#FF0000";
                  // }
                  // else if (one.indexOf(parseInt(d[i].source.id)) != -1 && two.indexOf(parseInt(d[i].target.id)) != -1) {
                  //   return "#0000FF"
                  // }
                  // else {
                  return "#AAAAAA";
                  // }
                })
            }
          })
          d3.csv("result/l/dw.csv", function (d) {
            var linear = d3.scaleLinear()
              .domain([-70, 70])
              .range([0, 240]);

            for (var i = 0; i < d.length; i++) {
              g1.append("g")
                .append("circle")
                .attr("cx", linear(d[i].x))
                .attr("cy", linear(d[i].y))
                .attr("r", function () {
                  if (d[i].id == base) {
                    return 5
                  }
                  else if (one.indexOf(parseInt(d[i].id)) != -1) {
                    return 3;
                  }
                  if (two.indexOf(parseInt(d[i].id)) != -1) {
                    return 2;
                  }
                  else {
                    return 1;
                  }
                })
                .attr("id", d[i].tag + "," + d[i].com)
                .attr("class", "top")
                .attr("fill", function () {
                  if (d[i].id == base) {
                    return "#000000"
                  }
                  else if (one.indexOf(parseInt(d[i].id)) != -1) {
                    return "#FF0000";
                  }
                  if (two.indexOf(parseInt(d[i].id)) != -1) {
                    return "#00FF00";
                  }
                  else {
                    return "#AAAAAA";
                  }
                });
            }
          });
          d3.csv("result/l/gf1.csv", function (d) {
            for (i = 0; i < d.length; i++) {
              g2.append("line")
                .attr("x1", linear(parseFloat(d[i].x1)))
                .attr("y1", linear(parseFloat(d[i].y1)))
                .attr("x2", linear(parseFloat(d[i].x2)))
                .attr("y2", linear(parseFloat(d[i].y2)))
                .attr("class", "top")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 0.1)
                .attr("stroke", function () {
                  // if (d[i].d == "0")
                  return "#AAAAAA"
                  // else
                  //   return "orange"
                })
            }
          })
          d3.csv("result/l/sdne1.csv", function (d) {
            for (i = 0; i < d.length; i++) {
              g3.append("line")
                .attr("x1", linear(parseFloat(d[i].x1)))
                .attr("y1", linear(parseFloat(d[i].y1)))
                .attr("x2", linear(parseFloat(d[i].x2)))
                .attr("y2", linear(parseFloat(d[i].y2)))
                .attr("class", "top")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 0.1)
                .attr("stroke", function () {
                  // if (d[i].d == "0")
                  return "#AAAAAA"
                  // else
                  //   return "orange"
                })
            }
          })
          d3.csv("result/l/lap1.csv", function (d) {
            for (i = 0; i < d.length; i++) {
              g4.append("line")
                .attr("x1", linear(parseFloat(d[i].x1)))
                .attr("y1", linear(parseFloat(d[i].y1)))
                .attr("x2", linear(parseFloat(d[i].x2)))
                .attr("y2", linear(parseFloat(d[i].y2)))
                .attr("class", "top")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 0.1)
                .attr("stroke", function () {
                  // if (d[i].d == "0")
                  return "#AAAAAA"
                  // else
                  // return "orange"
                })
            }
          })
          d3.csv("result/l/n2v1.csv", function (d) {
            for (i = 0; i < d.length; i++) {
              g5.append("line")
                .attr("x1", linear(parseFloat(d[i].x1)))
                .attr("y1", linear(parseFloat(d[i].y1)))
                .attr("x2", linear(parseFloat(d[i].x2)))
                .attr("y2", linear(parseFloat(d[i].y2)))
                .attr("class", "top")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 0.1)
                .attr("stroke", function () {
                  // if (d[i].d == "0")
                  return "#AAAAAA"
                  // else
                  //   return "orange"
                })
            }
          })
          d3.csv("result/l/lle1.csv", function (d) {
            for (i = 0; i < d.length; i++) {
              g6.append("line")
                .attr("x1", linear(parseFloat(d[i].x1)))
                .attr("y1", linear(parseFloat(d[i].y1)))
                .attr("x2", linear(parseFloat(d[i].x2)))
                .attr("y2", linear(parseFloat(d[i].y2)))
                .attr("class", "top")
                .attr("stroke-width", 1)
                .attr("stroke-opacity", 0.1)
                .attr("stroke", function () {
                  // if (d[i].d == "0")
                  return "#AAAAAA"
                  // else
                  //   return "orange"
                })
            }
          })
          d3.csv("result/l/lle.csv", function (d) {
            var linear = d3.scaleLinear()
              .domain([-70, 70])
              .range([0, 240]);

            for (var i = 0; i < d.length; i++) {
              g6.append("g").append("circle")
                .attr("cx", linear(d[i].x))
                .attr("cy", linear(d[i].y))
                .attr("r", function () {
                  if (d[i].id == base) {
                    return 5
                  }
                  else if (one.indexOf(parseInt(d[i].id)) != -1) {
                    return 3;
                  }
                  if (two.indexOf(parseInt(d[i].id)) != -1) {
                    return 2;
                  }
                  else {
                    return 1;
                  }
                })
                .attr("id", d[i].tag + "," + d[i].com)
                .attr("class", "top")
                .attr("fill", function () {
                  if (d[i].id == base) {
                    return "#000000"
                  }
                  else if (one.indexOf(parseInt(d[i].id)) != -1) {
                    return "#FF0000";
                  }
                  if (two.indexOf(parseInt(d[i].id)) != -1) {
                    return "#00FF00";
                  }
                  else {
                    return "#AAAAAA";
                  }
                });
            }
          });

          d3.csv("result/l/gf.csv", function (d) {
            var linear = d3.scaleLinear()
              .domain([-70, 70])
              .range([0, 240]);

            for (var i = 0; i < d.length; i++) {
              g2.append("g").append("circle")
                .attr("cx", linear(d[i].x))
                .attr("cy", linear(d[i].y))
                .attr("r", function () {
                  if (d[i].id == base) {
                    return 5
                  }
                  else if (one.indexOf(parseInt(d[i].id)) != -1) {
                    return 3;
                  }
                  if (two.indexOf(parseInt(d[i].id)) != -1) {
                    return 2;
                  }
                  else {
                    return 1;
                  }
                })
                .attr("id", d[i].tag + "," + d[i].com)
                .attr("class", "top")
                .attr("fill", function () {
                  if (d[i].id == base) {
                    return "#000000"
                  }
                  else if (one.indexOf(parseInt(d[i].id)) != -1) {
                    return "#FF0000";
                  }
                  if (two.indexOf(parseInt(d[i].id)) != -1) {
                    return "#00FF00";
                  }
                  else {
                    return "#AAAAAA";
                  }
                });
            }
          });
          d3.csv("result/l/sdne.csv", function (d) {
            var linear = d3.scaleLinear()
              .domain([-70, 70])
              .range([0, 240]);

            for (var i = 0; i < d.length; i++) {
              g3.append("g").append("circle")
                .attr("cx", linear(d[i].x))
                .attr("cy", linear(d[i].y))
                .attr("r", function () {
                  if (d[i].id == base) {
                    return 5
                  }
                  else if (one.indexOf(parseInt(d[i].id)) != -1) {
                    return 3;
                  }
                  if (two.indexOf(parseInt(d[i].id)) != -1) {
                    return 2;
                  }
                  else {
                    return 1;
                  }
                })
                .attr("id", d[i].tag + "," + d[i].com)
                .attr("class", "top")
                .attr("fill", function () {
                  if (d[i].id == base) {
                    return "#000000"
                  }
                  else if (one.indexOf(parseInt(d[i].id)) != -1) {
                    return "#FF0000";
                  }
                  if (two.indexOf(parseInt(d[i].id)) != -1) {
                    return "#00FF00";
                  }
                  else {
                    return "#AAAAAA";
                  }
                });
            }
          });
          d3.csv("result/l/lap.csv", function (d) {
            var linear = d3.scaleLinear()
              .domain([-70, 70])
              .range([0, 240]);

            for (var i = 0; i < d.length; i++) {
              g4.append("g").append("circle")
                .attr("cx", linear(d[i].x))
                .attr("cy", linear(d[i].y))
                .attr("r", function () {
                  if (d[i].id == base) {
                    return 5
                  }
                  else if (one.indexOf(parseInt(d[i].id)) != -1) {
                    return 3;
                  }
                  if (two.indexOf(parseInt(d[i].id)) != -1) {
                    return 2;
                  }
                  else {
                    return 1;
                  }
                })
                .attr("id", d[i].tag + "," + d[i].com)
                .attr("class", "top")
                .attr("fill", function () {
                  if (d[i].id == base) {
                    return "#000000"
                  }
                  else if (one.indexOf(parseInt(d[i].id)) != -1) {
                    return "#FF0000";
                  }
                  if (two.indexOf(parseInt(d[i].id)) != -1) {
                    return "#00FF00";
                  }
                  else {
                    return "#AAAAAA";
                  }
                });
            }
          });
          d3.csv("result/l/n2v.csv", function (d) {
            var linear = d3.scaleLinear()
              .domain([-70, 70])
              .range([0, 240]);

            for (var i = 0; i < d.length; i++) {
              g5.append("g").append("circle")
                .attr("cx", linear(d[i].x))
                .attr("cy", linear(d[i].y))
                .attr("r", function () {
                  if (d[i].id == base) {
                    return 5
                  }
                  else if (one.indexOf(parseInt(d[i].id)) != -1) {
                    return 3;
                  }
                  if (two.indexOf(parseInt(d[i].id)) != -1) {
                    return 2;
                  }
                  else {
                    return 1;
                  }
                })
                .attr("id", d[i].tag + "," + d[i].com)
                .attr("class", "top")
                .attr("fill", function () {
                  if (d[i].id == base) {
                    return "#000000"
                  }
                  else if (one.indexOf(parseInt(d[i].id)) != -1) {
                    return "#FF0000";
                  }
                  if (two.indexOf(parseInt(d[i].id)) != -1) {
                    return "#00FF00";
                  }
                  else {
                    return "#AAAAAA";
                  }
                });
            }
          });
        })
      })

      // 

    }

  }
}
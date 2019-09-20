// let tooltip = d3.select('#downleftbody')
// .append('div')
// .style('position', 'absolute')
// .style('z-index', '30')
// .style('color', '#666')
// .style('visibility', 'hidden')   // 是否可见（一开始设置为隐藏）
// .style('font-size', '12px')
// .style('font-weight', 'bold')
// .text('')
// let tooltip2 = d3.select('#downleftbody')
// .append('div')
// .style('position', 'absolute')
// .style('z-index', '30')
// .style('color', '#666')
// .style('visibility', 'hidden')   // 是否可见（一开始设置为隐藏）
// .style('font-size', '12px')
// .style('font-weight', 'bold')
// .text('')
var cc = [1, 2, 3, 4, 5, 6, 7]
var colora = d3.interpolate('#ccff90', '#00e676');		//颜色插值函数
var linear = d3.scale.linear()
    .domain([50, 300])
    .range([0, 1]);
var colorb = d3.interpolate('#ffcdd2', '#d50000');		//颜色插值函数

var colorc = d3.interpolate('#bcaaa4', '#6d4c41');		//颜色插值函数

var colord = d3.interpolate('#9e9e9e', '#212121');		//颜色插值函数

var colore = d3.interpolate('#f5f5f5', '#e0e0e0');		//颜色插值函数

var colorf = d3.interpolate('#fff176', '#fbc02d');		//颜色插值函数

var colorg = d3.interpolate('#b3e5fc', '#01579b');		//颜色插值函数
function pack(name, data, day, namelist, idlist) {
    var z = JSON.parse(JSON.stringify(data))
    var id = namelist[name] + '';
    if (id.length == 1 || name == "tea") {
        zz = z[day]
    }
    else if (id.length == 3) {
        zz = z[day]["children"].find(function (x) { return x.name == idlist[id[0]]; })
    }
    else if (id.length == 5) {
        j = id[0] + id[1] + id[2]
        zz = z[day]["children"].find(function (x) { return x.name == idlist[id[0]]; })["children"].find(function (x) { return x.name == idlist[j]; })
    }
    d3.select("#downleftbody").select("svg").remove();
    var width = document.getElementById("downleftbody").clientWidth;
    var height = document.getElementById("downleftbody").clientHeight;
    var svg = d3.select("#downleftbody").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")

    var pack = d3.layout.pack()
        .size([width, height])
        .value(function (d) { return parseFloat(d.index) / 100; })
        .sort(function (a, b) { return b.value - a.value; });


    var nodes = pack.nodes(zz);

    svg.selectAll("rect")
        .data(cc)
        .enter()
        .append("rect")
        .attr("x", 10)//每个矩形的起始x坐标
        .attr("y", function (i) {
            return i * 25
        })
        .attr("width", 15)
        .attr("height", 15)
        //每个矩形的高度
        .attr("fill", function (d) {
            switch (d) {
                case 1: return '#f48fb1'; break;
                case 2: return '#ce93d8'; break;
                case 3: return '#fff176'; break;
                case 4: return '#90caf9'; break;
                case 5: return '#80cbc4'; break;
                case 6: return '#a5d6a7'; break;
                case 7: return '#ffcc80'; break;
            };
        });//填充颜色
    svg.selectAll("text")
        .data(cc)
        .enter().append("text")
        .attr("x", 30)
        .attr("y", function (i) {
            return i * 25
        })
        .attr("dx", 10)
        .attr("dy", 15)
        .attr("text-anchor", "begin")
        .attr("font-size", 14)
        .attr("fill", "gray")
        .text(function (d) {
            switch (d) {
                case 1: return "绿茶类"; break;
                case 2: return "红茶类"; break;
                case 3: return "乌龙茶类"; break;
                case 4: return "黑茶类"; break;
                case 5: return "白茶类"; break;
                case 6: return "黄茶类"; break;
                case 7: return "花茶类"; break;
            };
        });
    svg.selectAll(".node")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("class", "node")
        .attr("id", function (d) {
            return d.name;
        })
        .style("stroke", function (d) {
            if (d.name == "tea叶") {
                return "gray"
            }
            if (d.name == name) {
                return 'black'
            }
        })
        .style("stroke-dasharray", "10,10")
        .style("fill", function (d) {
            if (d.name == "tea叶") {
                return "rgb(224,224,224)"
            }
            if (d.name == "tea") {
                return "transparent"
            }
            else {
                if (d.index != "") {
                    var z = namelist[d.name] + "";
                    switch (z[0]) {
                        case '1': return '#f48fb1'; break;
                        case '2': return '#ce93d8'; break;
                        case '3': return '#fff176'; break;
                        case '4': return '#90caf9'; break;
                        case '5': return '#80cbc4'; break;
                        case '6': return '#a5d6a7'; break;
                        case '7': return '#ffcc80'; break;
                    };
                }
                else {
                    return "transparent"
                }
            }

        })
        .attr("fill-opacity", "0.4")
        .attr("cx", function (d) {
            return d.x;
        })
        .attr("cy", function (d) {
            return d.y;
        })
        .attr("r", function (d) {
            return d.r;
        })
        .on('mouseover', function (d, i) {
            d3.select('#' + this.id).style('fill-opacity', 0.8);
            d3.select('#dialog1')
                .attr('text-anchor', 'middle')
                .style('opacity', '1')
            var dname;
            if (d.name == 'tea叶') {
                dname = '茶'
            }
            else {
                dname = d.name;
            }
            var b = namelist[dname] + "";
            var dd = []
            var i, j;
            if (b == 0) {
                dd = DATAALL;
                // aa=NEW_DATAALL;
                CURRENT_NAME = 'tea';
            }
            if (b.length == 1) {
                for (i in DATAFIR) {
                    for (j in DATAFIR[i]) {
                        if (b == DATAFIR[i][j][2]) {
                            dd = DATAFIR[i];
                            break;
                        }
                    }

                }

            }
            if (b.length == 3) {
                for (i in DATASEC) {
                    for (j in DATASEC[i]) {
                        if (b == DATASEC[i][j][2]) {
                            dd = DATASEC[i];
                            break;
                        }
                    }
                }

            }
            if (b.length == 5) {
                for (i in DATATHR) {
                    for (j in DATATHR[i]) {
                        if (b == DATATHR[i][j][2]) {
                            dd = DATATHR[i];
                            break;
                        }
                    }
                }

            }

            draw1(dd);

            if (d.name != "tea叶") {
                return tooltip.style('visibility', 'visible').text("O " + d.name + " index: " + d.index)
            }
        })
        .on('mousemove', function (d, i) {
            return tooltip.style('top', (event.pageY - 10) + 'px').style('left', (event.pageX + 10) + 'px')
        })
        .on('mouseout', function (d, i) {
            d3.select('#' + this.id).style('fill-opacity', 0.4);
            d3.select('#dialog1')
                .attr('text-anchor', 'middle')
                .style('opacity', '0')
            return tooltip.style('visibility', 'hidden')
        })
        .on("click", function (d) {
            name = d.name;

            pack(name, GLOBAL_DATA, CURRENT_DATE, namelist, idlist);

        })



    // svg.selectAll("text")
    // .data(nodes)
    // .enter()
    // .append("text")
    // .attr("font-size", "10px")
    // .attr("fill", "white")
    // .attr("fill-opacity", function(d) {
    //     if (d.depth == 2)
    //         return "0.9";
    //     else
    //         return "0";
    // })
    // .attr("x", function(d) {
    //     return d.x;
    // })
    // .attr("y", function(d) {
    //     return d.y;
    // })
    // .attr("dx", -12)
    // .attr("dy", 1)
    // .text(function(d) {
    //     return d.name;
    // });
}
//  pack("tea",GLOBAL_DATA ,CURRENT_DATE,namelist,idlist)
// function drawbasetree(name,data,day,namelist,idlist){
//     var z = JSON.parse(JSON.stringify(data))
//     var id = namelist[name]+'';
//     if(id.length==1||name=="tea"){
//         zz=z[day]
//     }
//     else if(id.length==3){
//          zz=z[day]["children"].find(function (x) { return x.name == idlist[id[0]];})
//     }
//     else if(id.length==5){
//         j=id[0]+id[1]+id[2]
//         zz=z[day]["children"].find(function (x) { return x.name == idlist[id[0]];})["children"].find(function (x) { return x.name == idlist[j];})
//     }
//     d3.select("#downleftbody").select("svg").remove();
//     // var width = document.getElementById("centerdownbody1").clientWidth;

//     // var height = document.getElementById("centerdownbody1").clientHeight;
//     var width = document.getElementById("downleftbody").clientWidth;
//     var height = document.getElementById("downleftbody").clientHeight;
//     var svg = d3.select("#downleftbody").append("svg")
//         .attr("width", width)
//         .attr("height", height)
//         .append("g")

//     // var color = d3.scale.category20();

//     //(1)冰柱布局
//     var partition = d3.layout.partition()//递归分割节点树到一个旭日或冰柱。
//         .size([width, height])//在x和y指定的布局大小。
//         .value(function(d) { 
//             if (d.base != "") {
//                 return parseFloat(d.base                      );
//             }
//             else return 1;
//          });

//       var nodes = partition.nodes(zz);//计算分区布局并返回节点的数组。
//     //(2)设置文字和节点Zoomable Sunburst
//       svg.selectAll(".node")
//           .data(nodes)
//         .enter().append("rect")
//           .attr("class", "node")
//           .attr("id",function(d){
//               return d.name;
//           })
//           .attr("x", function(d) {
//              return d.x; })
//           .attr("y", function(d) { return d.y; })
//           .attr("width", function(d) { return d.dx; })
//           .attr("height", function(d) { return d.dy; })
//           .style("stroke-width",function(d){
//             if(d.name==name){
//                 return '1px'
//             }
//             else{
//                 return '0.5px'
//             }
//           })
//           .style("stroke",function(d){
//             if(d.name==name){
//                 return 'black'
//             }
//             else{
//                 return 'white'
//             }
//           })
//           .style("fill-opacity",function(d){
//               if(d.name==name){
//                   return 1.0
//               }
//               else{
//                   return 0.6
//               }
//           })
//           .style("fill", function(d) {
//               if(d.name=="tea叶"){
//                   return "#eee"
//               }
//               else{
//                 if(d.base!=""){
//                  var z=namelist[d.name]+"";
//                  switch(z[0]){
//                     case '1':return '#f48fb1';break;
//                     case '2':return '#ce93d8';break;
//                     case '3':return '#fff176';break;
//                     case '4':return '#90caf9';break;
//                     case '5':return '#80cbc4';break;
//                     case '6':return '#a5d6a7';break;
//                     case '7':return '#ffcc80';break;
//                 };
//             }
//         }
//     }

//             )
//             .on('mouseover', function (d, i) {
//                 d3.select('#'+this.id).style('fill-opacity',function(d){
//                     if(this.id==name){
//                         return 1.0;
//                     }
//                     else{
//                         return 0.8;
//                     }
//                 });
//                 if(d.name!="tea叶"){
//                 return tooltip2.style('visibility', 'visible').text("O "+d.name+" base: "+d.base)
//                 }
//               })
//               .on('mousemove', function (d, i) {
//                 return tooltip2.style('top', (event.pageY-10)+'px').style('left',(event.pageX+10)+'px')
//               })
//               .on('mouseout', function (d, i) {
//                 d3.select('#'+this.id).style('fill-opacity',function(d){
//                     if(this.id==name){
//                         return 1.0;
//                     }
//                     else{
//                         return 0.6;
//                     }
//                 });
//                 return tooltip2.style('visibility', 'hidden')
//               })
//               .on("click",function(d){
//                   name=d.name;
//                  drawbasetree(name,GLOBAL_DATA,CURRENT_DATE,namelist,idlist);

//               })
//   svg.selectAll(".label")
//       .data(nodes.filter(function(d) { 
//           return d.dx > 6; 
//       }))
//     .enter().append("text")
//       .attr("class", "label")
//       .style("font-size","10px")
//       .attr("dy", ".35em")
//       .attr("transform", function(d) { 
//           return "translate(" + (d.x + d.dx / 2) + "," + (d.y + d.dy / 2) + ")rotate(90)"; 
//       })
//       .text(function(d) { return d.name; });

// }

function draw1(data) {
        ww = document.getElementById("downmiddlebody").clientWidth - 30;
        hh = document.getElementById("downmiddlebody").clientHeight - 10;
    var w1;
    var h1;
   
        w1 = ww - 5;
        h1 = hh - 5;
    
    // var div02 = d3.select("#centerupbody").append('div')
    //         .attr("class", "tooltip02")
    //         .style("opacity", 0);

    var margin = { top: 20, right: 20, bottom: 20, left: 20 };
    var padding = 50;
    width = w1,
        height = h1;
    var format = d3.time.format("%Y-%m-%d");
    var xDomain = d3.extent(data, function (d) {
        return format.parse(d[0]);
    })
    var yDomain = d3.extent(data, function (d) {
        return d[1];
    });

    var xScale = d3.time.scale().range([0, width]).domain(xDomain);
    var yScale = d3.scale.linear().range([height, 0]).domain([0, d3.max(data, function (d) { return d[1]; })]);

    var xAxis = d3.svg.axis().scale(xScale).orient('bottom');
    var yAxis = d3.svg.axis().scale(yScale).orient('left');

    var line = d3.svg.line()
        .x(function (d) {
            return xScale(format.parse(d[0]));
        })
        .y(function (d) {
            return yScale(d[1]);
        })
        .interpolate('cardinal');

    var area = d3.svg.area()
        .x(function (d) {
            return xScale(format.parse(d[0]));
        })
        .y0(function (d) {
            return yScale(d[1]);
        })
        .y1(height)
        .interpolate('cardinal');

    var g = d3.select('.svgt').append('g').attr('transform','translate(' + margin.left + ', ' + margin.top + ')')

     

    // g.append('path')
    //     .datum(data)
    //     .attr('class', 'area')
    //     .attr('d', area);

    // g.append('g')
    //     .attr('class', 'x axis')
    //     .attr('transform', 'translate(0, ' + height + ')')
    //     .call(xAxis);

    // g.append('g')
    //     .attr('class', 'y axis')
    //     .call(yAxis)
    //     .append('text')
    //     .attr('transform', 'rotate(-90)')
    //     .attr('y', 6)
    //     .attr('dy', '.71em')
    //     .attr('text-anchor', 'end')
    //     .text("Index");

    g.append('path')
        .datum(data)
        .attr('class', 'line')
        .attr('d', line);


    g.selectAll('circle').data(data).enter().append('circle')
        .attr('cx', function (d) {
            return xScale(format.parse(d[0]));
        })
        .attr('cy', function (d) {
            return yScale(d[1]);
        })
        .attr('r', function (d) {

            if (d[0] == CURRENT_DATE) {
                return 4;
            } else {
                return 0
            }
        })

        .attr('class', 'circle')
        .attr('id', function (d) {
            return d[0];
        })
        .attr('fill', function (d) {
            if (d[0] == CURRENT_DATE) {
                return 'white';
            }

        });
}
function trees(name, data, day, namelist, idlist) {
    var z = JSON.parse(JSON.stringify(data))

    var id = namelist[name] + '';
    if (id.length == 1 || name == "tea") {
        zz = z[day]
    }
    else if (id.length == 3) {
        zz = z[day]["children"].find(function (x) { return x.name == idlist[id[0]]; })
    }
    else if (id.length == 5) {
        j = id[0] + id[1] + id[2]
        zz = z[day]["children"].find(function (x) { return x.name == idlist[id[0]]; })["children"].find(function (x) { return x.name == idlist[j]; })
    }

    d3.select("#downmiddlebody").select("svg").remove();
    // var width = document.getElementById("centerdownbody1").clientWidth;

    // var height = document.getElementById("centerdownbody1").clientHeight;
    var width = document.getElementById("downmiddlebody").clientWidth;
    var height = document.getElementById("downmiddlebody").clientHeight;
    var svg = d3.select("#downmiddlebody").append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr('class', 'svgt')
        .append("g")
        .style('display', 'block')

    // var color = d3.scale.category20c();//20种颜色

    //(1)填充树
    var treemap = d3.layout.treemap()
        .size([width, height])
        .padding(2)
        .value(function (d) {
            if (d.index != "") {
                return (parseFloat(d.index));
            }
            else return 0;
        })
        .sort(function (a, b) { return b.value - a.value; });
    var root = d3.layout.hierarchy(zz)

    var nodes = treemap.nodes(zz);
    var links = treemap.links(nodes);
    NODE = nodes;


    var groups = svg.selectAll("g")
        .data(nodes.filter(function (d) {
            if (id.length == 1 || name == "tea叶") {

                return d.parent;
            }
            else if (id.length == 3) {

                return d.parent;
            }
            else if (id.length == 5) {

                return d.parent;
            }
        }))
        .enter()
        .append("g");

    var rects = groups.append("rect")
        .attr("class", "nodeRect")
        .attr("id", function (d) {
            return d.name;
        })
        .attr("x", function (d) { return d.x; })
        .attr("y", function (d) { return d.y; })
        .attr("width", function (d) { return d.dx; })
        .attr("height", function (d) { return d.dy; })
        .style('stroke', 'white')
        .style("fill", function (d) {
            if (d.name == "tea" || d.name == "tea叶") {
                return "gray"
            }
            else {
                if (d.index != "") {
                    var z = namelist[d.name] + "";
                    switch (z[0]) {
                        case '1': return colora(linear(parseFloat(d.index))); break;
                        case '2': return colorb(linear(parseFloat(d.index))); break;
                        case '3': return colorc(linear(parseFloat(d.index))); break;
                        case '4': return colord(linear(parseFloat(d.index))); break;
                        case '5': return colore(linear(parseFloat(d.index))); break;
                        case '6': return colorf(linear(parseFloat(d.index))); break;
                        case '7': return colorg(linear(parseFloat(d.index))); break;
                    };
                }
                else {
                    return "transparent"
                }
            }

        })
        .on('mouseover', function (d, i) {
            d3.select('#' + this.id).style('fill-opacity', function (d) {
                return 0.8;
            });
            var b = namelist[name] + "";
            var dd = []
            var aa = []
            var i, j;
            if (b == 0) {
                dd = DATAALL;
                // aa=NEW_DATAALL;
                CURRENT_NAME = 'tea';
            }
            if (b.length == 1) {
                for (i in DATAFIR) {
                    for (j in DATAFIR[i]) {
                        if (b == DATAFIR[i][j][2]) {
                            dd = DATAFIR[i];
                            break;
                        }
                    }
        
                }
                for (i in NEW_DATAFIR) {
                    for (j in NEW_DATAFIR[i]) {
                        if (b == NEW_DATAFIR[i][j][2]) {
                            aa = NEW_DATAFIR[i];
                            break;
                        }
                    }
        
                }
            }
            if (b.length == 3) {
                for (i in DATASEC) {
                    for (j in DATASEC[i]) {
                        if (b == DATASEC[i][j][2]) {
                            dd = DATASEC[i];
                            break;
                        }
                    }
                }
                for (i in NEW_DATASEC) {
                    for (j in NEW_DATASEC[i]) {
                        if (b == NEW_DATASEC[i][j][2]) {
                            aa = NEW_DATASEC[i];
                            break;
                        }
                    }
        
                }
            }
            if (b.length == 5) {
                for (i in DATATHR) {
                    for (j in DATATHR[i]) {
                        if (b == DATATHR[i][j][2]) {
                            dd = DATATHR[i];
                            break;
                        }
                    }
                }
                for (i in NEW_DATATHR) {
                    for (j in NEW_DATATHR[i]) {
                        if (b == NEW_DATATHR[i][j][2]) {
                            aa = NEW_DATATHR[i];
                            break;
                        }
                    }
        
                }
            }
            
        
            draw1(dd);

            if (d.name != "tea叶") {
                return tooltip2.style('visibility', 'visible').text("O "  + " index: " + d.index)
            }
        })
        .on('mousemove', function (d, i) {
            return tooltip2.style('top', (event.pageY - 10) + 'px').style('left', (event.pageX + 10) + 'px')

        })
        .on('mouseout', function (d, i) {
            d3.select('#' + this.id).style('fill-opacity', function (d) {
                return 1.0;
            });
            return tooltip2.style('visibility', 'hidden')
        })
        .on("click", function (d) {
            name = d.name;
            trees(name, GLOBAL_DATA, CURRENT_DATE, namelist, idlist);
        })
        var texts = groups.append("text")
				.attr("class","nodeName")
				.attr("x",function(d){ return d.x; })
				.attr("y",function(d){ return d.y; })
				.attr("dx","0.5em")
                .attr("dy","1.5em")
                .style('font-size','12px')
				.text(function(d){
                    if(d.value != ""&&d.depth==3){
                    return d.name; 
                    }
				});
    var b = namelist[name] + "";
    var dd = []
    var aa = []
    var i, j;
    if (b == 0) {
        dd = DATAALL;
        // aa=NEW_DATAALL;
        CURRENT_NAME = 'tea';
    }
    if (b.length == 1) {
        for (i in DATAFIR) {
            for (j in DATAFIR[i]) {
                if (b == DATAFIR[i][j][2]) {
                    dd = DATAFIR[i];
                    break;
                }
            }

        }
        for (i in NEW_DATAFIR) {
            for (j in NEW_DATAFIR[i]) {
                if (b == NEW_DATAFIR[i][j][2]) {
                    aa = NEW_DATAFIR[i];
                    break;
                }
            }

        }
    }
    if (b.length == 3) {
        for (i in DATASEC) {
            for (j in DATASEC[i]) {
                if (b == DATASEC[i][j][2]) {
                    dd = DATASEC[i];
                    break;
                }
            }
        }
        for (i in NEW_DATASEC) {
            for (j in NEW_DATASEC[i]) {
                if (b == NEW_DATASEC[i][j][2]) {
                    aa = NEW_DATASEC[i];
                    break;
                }
            }

        }
    }
    if (b.length == 5) {
        for (i in DATATHR) {
            for (j in DATATHR[i]) {
                if (b == DATATHR[i][j][2]) {
                    dd = DATATHR[i];
                    break;
                }
            }
        }
        for (i in NEW_DATATHR) {
            for (j in NEW_DATATHR[i]) {
                if (b == NEW_DATATHR[i][j][2]) {
                    aa = NEW_DATATHR[i];
                    break;
                }
            }

        }
    }
    

    draw1(dd);




}


d3.csv("../data/facebook_node_x_y.csv", function(error,nodeData){
    // d3.json(filePath+"_role.json",function(roleData){
        console.log(nodeData)
    svg = d3.select("body").append("svg").attr("width",'520px').attr("height","520px")
        let allNodes=[];
        for(var i=0;i<nodeData.length;i++){
            nodeData[i].x=parseFloat(nodeData[i].x);
            nodeData[i].y=parseFloat(nodeData[i].y);
            allNodes.push([nodeData[i].x,nodeData[i].y])
        }
        var x_max=d3.max(nodeData,d=>{
            return d.x;
        })
        var x_min=d3.min(nodeData,d=>{
            return d.x;
        })
        var y_max=d3.max(nodeData,d=>{
            return d.y;
        })
        var y_min=d3.min(nodeData,d=>{
            return d.y;
        })
        
        console.log(x_max,x_min,y_max,y_min)
        

        // var rolearr=[];
        // var color_role={};
        // for(var i in roleData){
        //     if(rolearr.indexOf(roleData[i])<0){
        //         rolearr.push(roleData[i]);
        //     }
            
        // }
        // console.log("rolearr",rolearr)
        // for(var i=0;i<rolearr.length;i++){
        //     color_role[rolearr[i]]=color[i];
        // }
        // console.log("color_role:",color_role)
    width = 500
    height = 500 

var formatPercent = d3.format(".0%");

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(formatPercent);
    svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

        var width = svg.attr("width");
        var height = svg.attr("height");
    
               function scax(a) {
           return (a - x_min) / (x_max-x_min) * 500
        }
        function scay(a){
            return (a - y_min) / (y_max-y_min) * 500
        }
        svg.append("g").selectAll("circle").data(nodeData).enter()
            .append("circle")
            .attr("cx",d=>{
                return scax(d.x);
            })
            .attr("cy",d=>{
                return scay(d.y);
            })
            .attr("r",2)
            .attr("fill",'red')
            .attr("id",(d,i)=>"node_"+d.id)
            // .attr("fill",d=>{
            //     return color_role[roleData[d.id]];
            // });
        })
    // })
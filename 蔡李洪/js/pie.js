d3.csv("../data/data.csv",type,function(data){

    width = 400,
    height = 400;

    var svg = d3.select("#container")
    .append("svg")
    .attr({
        "width":width,
        "height":height
    })
    
    var g = svg.append("g")
    .attr("transform","translate(200, 200)")
    
    var arc_generator = d3.svg.arc()
    .innerRadius(100)//设置内半径
    .outerRadius(200)//设置外半径
    
    
    var angle_data = d3.layout.pie()
    .value(function(d){return d.population;})
    
    console.log(angle_data(data));
    
    var color = d3.scale.category10();
    
    g.selectAll("path")
    .data(angle_data(data))
    .enter()
    .append("path")
    .attr("d", arc_generator)
    .style("fill",function(d,i){return color(i)})//给不同的扇形区填充不同的颜色
    
    g.selectAll("text")//给每个扇形去添加对应文字
    .data(angle_data(data))
    .enter()
    .append("text")
    .text(function(d){return d.data.education})
    .attr("transform",function(d){return "translate("+arc_generator.centroid(d)+")"})//调成每个文字的对应位置
    .attr("text-anchor","middle")//是文字居中
});

function type(d) {
    d.population =+ d.population;
    return d;
}
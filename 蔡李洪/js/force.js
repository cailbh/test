
d3.json("../data/test.json", function(error, root) {
    console.log(root)
    console.log(11)
    let outData=[];
    for(var i=0;i<root.length;i++){
        outData.push({source:{x:root[i]['x'], y:root[i].y},
            target:{x:Nodes[Edges[i].target].x,y:Nodes[Edges[i].target].y}});
    }
    console.log(outData)
    let NodeLinkNodes=getNodeLinkNode(svgId,Nodes);
    let NodeLinkLinks=getNodeLinkLink(NodeLinkNodes.Json,Edges);
    StrokeWidthForce = 1
    d3.select("#svgId")
    .append("g")
    .selectAll("line")
    .data(root)
    .enter()
    .append("line")
    .attr('x1',d=>d.source.x)
    .attr("y1",d=>d.source.y)
    .attr("x2",d=>d.target.x)
    .attr("y2",d=>d.target.y)
    .attr("fill","none")
    .attr("stroke-width",StrokeWidthForce)
    // .attr("stroke",StrokeForce)

    d3.select("#svgId").append("g")
        .selectAll("circle")
        .data(NodeLinkNodes.Array)
        .enter()
        .append("circle")
        .attr("cx",d=>d.x)
        .attr("cy",d=>d.y)
        .attr("r",RadiusCircleForce)
        .attr("fill",FillCircleForce)
});

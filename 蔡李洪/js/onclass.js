/*
 * @Author: ChenShan 
 * @Date: 2019-09-24 20:19:49 
 * @Last Modified by: ChenShan
 * @Last Modified time: 2019-10-08 20:56:19
 */
 var body = d3.select("body");
//  console.log(body);

 var svg = body.append("svg")
                .attr("width",800)
                .attr("height",600)
                .style("border","1px solid black");
// console.log(svg);

// svg.append("circle")
//     .attr("cx",400) //圆心x
//     .attr("cy",300)
//     .attr("r",80)
//     .style("fill","yellow")
//     .style("stroke","black");

var dataset = [
    {name:"China",population:1000,GDP:80,lifespan:70},
    {name:"America",population:800,GDP:100,lifespan:75},
    {name:"Japan",population:400,GDP:60,lifespan:80}
];

var circle = svg.selectAll("circle")
                .data(dataset)
                .enter()
                .append("circle")
                // .attr("cx",(d:Data) => {
                    // return d.GDP * 5;
                // })
                .attr("cx",function(d){
                    return  d.GDP * 5;
                })
                .attr("cy",d => {
                    return 600 - d.lifespan * 7;
                })
                .attr("r",d => {
                    return d.population * 0.1;
                })
                .style("fill", d => {
                    return d.name === "China"
                        ? "red": d.name === "America"
                            ? "blue": "green"
                })
                .style("stroke","black");

run()

function run(){
    //UPDATE TODO 
    svg.selectAll("circle")
        .data(dataset)
        .attr("cx",function(d){
            return  d.GDP * 5;
        })
        .attr("cy",d => {
            return 600 - d.lifespan * 7;
        })
        .attr("r",d => {
            return d.population * 0.1;
        })
        .style("fill", d => {
            return d.name === "China"
                ? "red": d.name === "America"
                    ? "blue": "green"
        })
        .style("stroke","black");

    // ENTER
    svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx",function(d){
            return  d.GDP * 5;
        })
        .attr("cy",d => {
            return 600 - d.lifespan * 7;
        })
        .attr("r",d => {
            return d.population * 0.1;
        })
        .style("fill", d => {
            return d.name === "China"
                ? "red": d.name === "America"
                    ? "blue": "green"
        })
        .style("stroke","black");

    // EXIT
    svg.selectAll("circle")
        .data(dataset)
        .exit()
        .remove();
}
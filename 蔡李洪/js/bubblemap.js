/*
 * @Author: ChenShan 
 * @Date: 2019-10-15 19:32:58 
 * @Last Modified by: ChenShan
 * @Last Modified time: 2019-10-15 20:38:01
 */

  var width = 600, height = 300;
  var padding = { top: 50, right: 50, bottom: 50, left: 50 };
  var main = d3.select('.container svg').append('g')
//   .classed('main')
  .attr('transform', "translate(" + padding.top + ',' + padding.left + ')');
  
var xScale = d3.scale.linear()
.domain([140, 190])
.range([0, width - padding.left - padding.right]);
var yScale = d3.scale.linear()
.domain([40, 120])
.range([height - padding.top - padding.bottom, 0]);
var xAxis = d3.svg.axis()
.scale(xScale)
.orient('bottom');
var yAxis = d3.svg.axis()
.scale(yScale)
.orient('left');
main.append('g')
.attr('class', 'axis')
.attr('transform', 'translate(0,' + (height - padding.top - padding.bottom) + ')')
.call(xAxis);
main.append('g')
.attr('class', 'axis')
.call(yAxis);

// 模拟数据
var dataset = [
    { x: 69, y: 45, weight: 5 },{ x: 30, y: 37, weight: 10 },
    { x: 43, y: 10, weight: 23 },{ x: 54, y: 48, weight: 41 },
    { x: 18, y: 18, weight: 41 },{ x: 88, y: 21, weight: 32 },
    { x: 45, y: 48, weight: 12 },{ x: 14, y: 32, weight: 9 },
    { x: 78, y: 18, weight: 16 },{ x: 13, y: 45, weight: 32 }
   ];
   // 添加x轴和y轴
   var xScale = d3.scale.linear()
    .domain([0, 100])
    .range([0, width - padding.left - padding.right]);
   var yScale = d3.scale.linear()
    .domain([0, 50])
    .range([height - padding.top - padding.bottom, 0]);
   var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom');
   var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient('left');

main.selectAll('.bubble')
 .data(dataset)
 .enter()
 .append('circle')
 .attr('class', 'bubble')
 .attr('cx', function(d) {
  return xScale(d.x);
 })
 .attr('cy', function(d) {
  return yScale(d.y);
 })
 .attr('r', function(d) {
  return d.weight;
 });

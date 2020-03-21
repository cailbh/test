const FILE_name = "CH"
const file_nameli =['WW','SSB','fpp','er','CH','ba'] 
name_CHN = {
   "SP-small":"平均最短路径(大小)", "ACE": "特征向量中心性", "ANB": "中介中心性", "ACC": "紧密中心性", "CC": "网络连通性", "QCS": "社区数量相似性", "SCS": "社区结构稳定性",
    "LCC": "局部群聚系数", "GCC": "全局聚集系数", "DDC": "度分布相似性", "SP": "平均最短路径", "ANB_G": "中介中心性改"
}
s_name_li = {
    "SP": 0, "ANB": 1, "ACC": 2, "CC": 3, "QCS": 4,
    "SCS": 5, "LCC": 6, "GCC": 7, "ANB_G": 8,
}
s_name_li2 = [
    "SP", "ANB", "ACC", "CC", "QCS",
    "SCS", "LCC", "GCC", "ANB_G",
]
s_name_li3 = [
    "SP", "ANB", "ACC", "QCS",
    "SCS", "LCC", "GCC", "ANB_G","SP-small"
]
var mcolor = ['rgb(255,60,60)', 'rgb(255,83,255)', 'rgb(235,135,162)', 'rgb(255,178,101)',
    'rgb(63,151,134)', 'rgb(83,255,255)', 'rgb(0,122,244)',
    'rgb(168,168,255)',];

var mcolor2 = ['rgb(49,27,146)','rgb(57,73,171)', 'rgb(30,136,229)', 'rgb(3,169,244)','rgb(129,212,250)',
    'rgb(79,195,247)', 'rgb(0,172,193)','rgb(0,151,167)', 'rgb(0,96,100)',
    'rgb(0,77,65)',];


// d3.csv("data/CCtj.csv",function(a){
//     console.log(a)
//     // drawbar("network0",a)
// })
function drawbar(win_name,da_li){
    console.log(da_li)
    da = []
    sfn = { 'rate-5': 0, 'rate-10': 1, 'rate-15': 2, 'rate-20': 3, 'rate-25': 4, 'rate-30': 5, 'rate-35': 6 ,'rate-40':7}
    dat = [[], [], [], [], [], [], [],[]]
    // {
    //     name: 'Forest',
    //     type: 'bar',
    //     barGap: 0,
    //     label: labelOption,
    //     data: [320, 332, 301, 334, 390]
    // },
    
    for(i = 0;i<da_li.length;i++){
        if(i!=0){
        dat[sfn[da_li[i]['rate']]].push(parseFloat(da_li[i]['zz']))
        }
       
    }
    for(i in dat){
        da.push({
            
        name: ""+(((i)*5)+5)+"%",
        type: 'bar',
        barGap: "30%",
        data: dat[i],
        color:mcolor2[i]
        })
        console.log(dat[i])
    }
    console.log(da)
    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            show:true,
            data:[ '5%' ,'10%', '15%', '20%', '25%', '30%', '35%','40%'],
            bottom: "25%",
            // x: "left",
            left:"17%",
            padding: 15,                                   //图例内边距，单位px  5  [5, 10]  [5,10,5,10]
            itemGap: 20,
            // orient: 'vertical',  //垂直显示
            align: "left",
            itemWidth: 30,                               //图例标记的图形宽度
            itemHeight: 24,
            textStyle:{
                color: "#333",                           //文字颜色
                fontStyle: "normal",                     //italic斜体  oblique倾斜
                fontWeight: "normal",                    //文字粗细bold   bolder   lighter  100 | 200 | 300 | 400...
                fontFamily: "sans-serif",                //字体系列
                fontSize: 30,
            }     ,
        },
        grid: {
            left: '10%',
            right: '5%',
            bottom: '35%',
            top: "15%",
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            position:'top',
            data:["OUR", "SRW", "ISRW", "RJ", "RNS", "RES", "TIES"],
            boundaryGap: true,
            splitLine: {
                show: true,
                lineStyle: {
                    type: "dotted",               //坐标轴线线的类型，solid，dashed，dotted
                    width: 3,                     //坐标轴线线宽
                    color: "#000",
                    opacity: 0.45,
                }
            },
            axisLine: {
                onZero: false,
                show:false,
                lineStyle: {
                    type: "solid",               //坐标轴线线的类型，solid，dashed，dotted
                    color: "#000",
                    width: 6,                     //坐标轴线线宽
                    opacity: 1,
                }
            },
            axisLabel: {
                show: true,
                textStyle:  {
                    color: "#333",                           //文字颜色
                    fontStyle: "normal",                     //italic斜体  oblique倾斜
                    fontWeight: "normal",                    //文字粗细bold   bolder   lighter  100 | 200 | 300 | 400...
                    fontFamily: "sans-serif",                //字体系列
                    fontSize: 40,
                }     ,
            },
        },
        yAxis: {
            type: 'value',
            gridIndex: 0,
            splitNumber: 5,
            scale:true,
            // name:"%",
            nameTextStyle: {
                fontSize :"40",
                verticalAlign:"bottom"}
                ,
            // min: 1, max: 180,
            // logBase:3,
            // interval:[1,6,10,180],
            splitLine: {
                show: false,
                lineStyle: {
                    type: "dotted",               //坐标轴线线的类型，solid，dashed，dotted
                    width: 3,                     //坐标轴线线宽
                    color: "#000",
                    opacity: 0.45,
                }
            },
            axisLine: {
                onZero: false,
                lineStyle: {
                    type: "solid",               //坐标轴线线的类型，solid，dashed，dotted
                    color: "#000",
                    width: 7,                     //坐标轴线线宽
                    opacity: 1,
                }
            },
            axisLabel: {
                
            formatter:'{value}%',
                show: true,
                textStyle: mytextStyle,
            },
        },
        series: da
    };
    var myChart1 = echarts.init(document.getElementById(win_name));
    myChart1.clear()
    myChart1.setOption(option, true, true);
}
// d3.csv("data/" + file_nameli[0] + "/" + file_nameli[0] + "pm.csv", function (f1) {
//     d3.csv("data/" + file_nameli[1] + "/" + file_nameli[1] + "pm.csv", function (f2) {
//         d3.csv("data/" + file_nameli[2] + "/" + file_nameli[2] + "pm.csv", function (f3) {
//             d3.csv("data/" + file_nameli[3] + "/" + file_nameli[3] + "pm.csv", function (f4) {
//                 d3.csv("data/" + file_nameli[4] + "/" + file_nameli[4] + "pm.csv", function (f5) {
//                     d3.csv("data/" + file_nameli[5] + "/" + file_nameli[5] + "pm.csv", function (f6) {
//                         data_li = [f1, f2, f3, f4, f5]
                        
//                         sfn = { 'OUR': 0, 'SRW': 1, 'ISRW': 2, 'RJ': 3, 'RNS': 4, 'RES': 5, 'TIES': 6 }
//                         dat = [[], [], [], [], [], [], []]
//                         // var data = f1
//                         // for (i = 0; i < data.length; i++) {
//                         //     // console.log(data[i])
//                         //     for (x in s_name_li3) {
//                         //         if (s_name_li3[x] == "ANB") {
//                         //             console.log(1)
//                         //         }
//                         //         else if ((s_name_li3[x] == "ANB_G") || (s_name_li3[x] == "SCS")) {
//                         //             dat[sfn[data[i]['ori']]].push(data[i][s_name_li3[x]])
//                         //         }
//                         //         else {
//                         //             dat[sfn[data[i]['ori']]].push(8 - (data[i][s_name_li3[x]]))
//                         //         }
//                         //     }
//                         // }
//                         sflin = s_name_li3[4]
//                         for(i=0;i<data_li.length;i++){
//                             for(j=0;j<data_li[i].length;j++){
                                
//                                 // if ((sflin == "ANB_G") || (sflin == "SCS")) {
//                                     dat[sfn[data_li[i][j]['ori']]].push(data_li[i][j][sflin])
//                                 // }
//                                 // else {
//                                     // dat[sfn[data_li[i][j]['ori']]].push(8 - (data_li[i][j][sflin]))
//                                 // }
//                             }
//                         }
//                         //  drawbar("network0",data_li)
//                         // drawbox("network0", dat,name_CHN[sflin])
//                     })
//                 })
//             })
//         })
//     })
// })
   mytextStyle = {
        color: "#333",                           //文字颜色
        fontStyle: "normal",                     //italic斜体  oblique倾斜
        fontWeight: "normal",                    //文字粗细bold   bolder   lighter  100 | 200 | 300 | 400...
        fontFamily: "sans-serif",                //字体系列
        fontSize: 40,
    }     
function drawbox(win_name,data,textname){
    mytextStyle = {
        color: "#333",                           //文字颜色
        fontStyle: "normal",                     //italic斜体  oblique倾斜
        fontWeight: "normal",                    //文字粗细bold   bolder   lighter  100 | 200 | 300 | 400...
        fontFamily: "sans-serif",                //字体系列
        fontSize: 40,
    }     

   
    console.log(data)
    var data = echarts.dataTool.prepareBoxplotData(data);
    var myChart = echarts.init(document.getElementById(win_name));
    j=0
    dd = []
    mm = []
    for(i in data["boxData"]){
        j++
        dd.push({
            value:data['boxData'][i],
            itemStyle:{
                borderColor: mcolor[j]
           }
        })
    }
    console.log(data.outliers)
    for(i in data["outliers"]){
        mm.push({
            value:data['outliers'][i],
            itemStyle:{
                color:mcolor[data.outliers[i][0]+1],
                borderColor: mcolor[j]
           }
        })
    }
    console.log(dd,mm)
    option = {
        title: [
          {
            text: textname,
            left: 'center',
            textStyle: {
              fontSize: 40,
              color: 'black',
            },
          },
        ],
        legend: {
            show:true,
            data:[ '5%' ,'10%', '15%', '20%', '25%', '30%', '35%','40%'],
            bottom: "25%",
            // x: "left",
            left:"17%",
            padding: 15,                                   //图例内边距，单位px  5  [5, 10]  [5,10,5,10]
            itemGap: 20,
            // orient: 'vertical',  //垂直显示
            align: "left",
            itemWidth: 35,                               //图例标记的图形宽度
            itemHeight: 34,
            textStyle: mytextStyle
        },
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
            top:"20%",
          left: '10%',
          right: '10%',
          bottom: '15%'
        },
        xAxis: {
          type: 'category',
          position:'top',
          data: ['OUR','SRW','ISRW','RJ','RNS','RES','TIES'],
          boundaryGap: true,
          nameGap: 30,

          splitLine: {
            show: true,
            lineStyle: {
                type: "dotted",               //坐标轴线线的类型，solid，dashed，dotted
                width: 3,                     //坐标轴线线宽
                color: "#000",
                opacity: 0.45,
            }
        },
        axisLine: {
            show:false,
            onZero: false,
            lineStyle: {
                type: "solid",               //坐标轴线线的类型，solid，dashed，dotted
                color: "#000",
                width: 6,                     //坐标轴线线宽
                opacity: 1,
            }
        },
        axisLabel: {
            show: true,
            textStyle: mytextStyle,
        },
        //   splitArea: { //坐标轴在 grid 区域中的分隔区域，默认不显示。
        //     // 			show: true, //是否显示分隔区域
        //     interval: 'auto', //坐标轴分隔区域的显示间隔，在类目轴中有效
        //   },
        //   axisLabel: { //坐标轴刻度标签的相关设置。
        //     // 			formatter: 'expr {value}',  // 使用字符串模板，模板变量为刻度默认标签 {value}						
        //     show: true, //是否显示刻度标签。
        //     interval: 'auto', //坐标轴刻度标签的显示间隔，在类目轴中有效。
        //     color: 'black',

        //   },
        //   splitLine: { //坐标轴在 grid 区域中的分隔线。
        //     // 			show: true, //是否显示分隔线。默认数值轴显示，类目轴不显示。
        //     lineStyle: { //分隔线样式
        //       type: 'dashed', //分隔线线的类型。								
        //     },
        //   },
        //   axisLine: { //坐标轴轴线相关设置。
        //     show: true, //是否显示坐标轴轴线。
        //     onZero: false,//X 轴或者 Y 轴的轴线是否在另一个轴的 0 刻度上，只有在另一个轴为数值轴且包含 0 刻度时有效。
        //     // 			symbol:'arrow', //轴线两边的箭头, 默认不显示箭头，即 'none'
        //     lineStyle: { //轴线样式
        //       width: 2,
        //       color: 'black',
        //       opacity: 1, //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
        //     },
        //   },
          axisTick: { //坐标轴刻度相关设置。
            show: true, //是否显示坐标轴刻度。
            alignWithLabel: true,//类目轴中在 boundaryGap 为 true 的时候有效，可以保证刻度线和标签对齐,default: false							

          }
        },
        yAxis: {
          type: 'value',
        //   name: 'rank',
          splitArea: { //坐标轴在 grid 区域中的分隔区域，默认不显示。
            // 			show: true
          },
          axisLabel: { //坐标轴刻度标签的相关设置。
            //formatter: 'expr {value}',  // 使用字符串模板，模板变量为刻度默认标签 {value}						
            show: true, //是否显示刻度标签。
            // 			interval: 'auto', //坐标轴刻度标签的显示间隔，在类目轴中有效。
            color: 'black',
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            },
          },
          axisLine: {
            show: true, //是否显示坐标轴轴线。
            //onZero:false,//X 轴或者 Y 轴的轴线是否在另一个轴的 0 刻度上，只有在另一个轴为数值轴且包含 0 刻度时有效。
            //symbol:'arrow', //轴线两边的箭头
            lineStyle: {
              width: 2,
              color: 'black',
            },
          },
          axisLabel: {
            show: true,
            textStyle: mytextStyle,
        },
        },
        series: [
          {
            name: 'boxplot',
            type: 'boxplot',
            data: dd,
            itemStyle: { //盒须图样式。
            //   color: '#48C6D4', //boxplot图形的颜色。 默认从全局调色盘 option.color 获取颜色
            //   borderColor: 'rgb(18, 133, 240)', //boxplot图形的描边颜色。支持的颜色格式同 color，不支持回调函数。
              borderWidth: "6.5"
            },
            tooltip: {
              formatter: function (param) {
                return [
                  'Experiment ' + param.name + ': ',
                  'upper: ' + param.data[5],
                  'Q3: ' + param.data[4],
                  'median: ' + param.data[3],
                  'Q1: ' + param.data[2],
                  'lower: ' + param.data[1]
                ].join('<br/>');
              }
            }
          },
          {
            name: 'outlier',
            type: 'scatter',
            data: mm,
            itemStyle: {
            //   color: 'rgb(18, 133, 240)',
            //   borderColor: '#48C6D4',
              borderWidth: "1"
            },
          }
        ]
      };
      myChart.setOption(option)
}
    function qu_log(x){
        // return x
        return Math.log(x*1000)
        return x*x
        // return Math.log(x)
        
        return Math.sqrt(x)
        // return (x*1000)*(x*1000)* (x*1000)*(x*1000)
        
        // return Math.log(Math.log(x))
        return (Math.log(Math.log(x*10000))*10000)*(Math.log(Math.log(x*10000))*10000)
    }
    function hufu(x){
        // return x
        return Math.pow(Math.E, x)/1000
        // return Math.sqrt(x)
        // return Math.pow(Math.E,x)
        
        return x*x
        // return Math.sqrt(Math.sqrt(x))/1000
       
        // return Math.pow(Math.E, Math.pow(Math.E, x))
        return Math.pow(Math.E, Math.pow(Math.E, Math.sqrt(x)/10000))/10000
    }
    console.log(qu_log(1),hufu(qu_log(1)))
namelist = ["ori", "OUR", "SRW", "ISRW", "RJ", "RNS", "RES", "TIES", "BFS", "DFS"]
// d3.json("data/" + FILE_name + "/" + FILE_name + "f" + namelist[0] + "new_Eva.json", function (ori) {
//     d3.json("data/" + FILE_name + "/" + FILE_name + "f" + namelist[1] + "new_Eva.json", function (OUR) {
//         d3.json("data/" + FILE_name + "/" + FILE_name + "f" + namelist[2] + "new_Eva.json", function (SRW) {
//             d3.json("data/" + FILE_name + "/" + FILE_name + "f" + namelist[3] + "new_Eva.json", function (ISRW) {
//                 d3.json("data/" + FILE_name + "/" + FILE_name + "f" + namelist[4] + "new_Eva.json", function (RJ) {
//                     d3.json("data/" + FILE_name + "/" + FILE_name + "f" + namelist[5] + "new_Eva.json", function (RNS) {
//                         d3.json("data/" + FILE_name + "/" + FILE_name + "f" + namelist[6] + "new_Eva.json", function (RES) {
//                             d3.json("data/" + FILE_name + "/" + FILE_name + "f" + namelist[7] + "new_Eva.json", function (TIES) {
//                                 d3.json("data/" + FILE_name + "/" + FILE_name + "bar.json", function (bar) {
//                                         console.log("data/" + FILE_name + "/" + FILE_name + "bar.json",bar)
//                                     rate_li = ['5', '10', '15', '20', '25', '30', '35','40']
//                                 data_li = [ori, OUR, SRW, ISRW, RJ, RNS, RES, TIES]
//                                 da_li = []

//                                 mylineStyle = {
//                                     type: "solid",               //坐标轴线线的类型，solid，dashed，dotted
//                                     width: 4,                     //坐标轴线线宽
//                                     opacity: 1,                   //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形
//                                 };
//                                 nolineStyle = {
//                                     type: "solid",               //坐标轴线线的类型，solid，dashed，dotted
//                                     width: 4,                     //坐标轴线线宽
//                                     opacity: 1,                   //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形
//                                 };
//                                 orilineStyle = {
//                                     type: "dashed",               //坐标轴线线的类型，solid，dashed，dotted
//                                     width: 4,                     //坐标轴线线宽
//                                     opacity: 10,                   //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形
//                                 };
//                             //     for (k = 0; k < 2; k++) {
//                                     k=3
//                                     sf_na = s_name_li2[k]
//                                     sf_chn_na = name_CHN[sf_na]
//                                     da_li = []
//                                     if(k!=4&k!=5&k!=8){
//                                          for (i in data_li[0]) {
//                                         dtm = []
//                                         tm = {
//                                             name: namelist[0],
//                                             type: 'bar',
//                                             symbol: "circle",
//                                             symbolSize: 1,
//                                             markLine: {
//                                                 symbol: ['none', 'none'],//去掉箭头
//                                                 itemStyle: {
//                                                     normal: {
//                                                         lineStyle: {
//                                                             type: "dashed",               //坐标轴线线的类型，solid，dashed，dotted
//                                                             width: 4,                     //坐标轴线线宽
//                                                             opacity: 10,
//                                                         },
//                                                         label: {
//                                                             show: false,
//                                                             position: 'middle'
//                                                         }
//                                                     }
//                                                 },
//                                                 data: [{
//                                                     yAxis: 
//                                                     // Math.log(Math.log(data_li[0][i][sf_na])),
//                                                     qu_log(data_li[0][i][sf_na])
//                                                 },]
//                                             },
//                                             // data: dtm,
//                                             // symbol: "diamond",
//                                             color: mcolor[0],
//                                             large: true,
//                                             // symbolSize: 15,
//                                             largeThreshold: 1000,
//                                             lineStyle: {
//                                                 normal: orilineStyle,
//                                                 emphasis: orilineStyle,
//                                             }
//                                         }
//                                         da_li.push(tm)
//                                     }
//                                     }
                                   

//                                     for (j = 1; j <= 7; j++) {
//                                         dt = []
//                                         for (i in data_li[j]) {
//                                             if (k == 5) {
//                                                 // dt.push(data_li[j][i][sf_na]['sam_av'])
//                                                 dt.push(qu_log((data_li[j][i][sf_na]['sam_av'])))
//                                             }
//                                             else {
//                                                 // dt.push(data_li[j][i][sf_na])
//                                                 // dt.push(Math.log(Math.log(data_li[j][i][sf_na])))
//                                                 dt.push(qu_log(data_li[j][i][sf_na]))
//                                             }
//                                         }
//                                         tm = {
//                                             name: namelist[j],
//                                             type: 'bar',
//                                             data: dt,
//                                             color: mcolor[j],
//                                             large: true,
//                                             symbol: "triangle",
//                                             symbolSize: 15,
//                                             largeThreshold: 1000,
//                                             lineStyle: {
//                                                 normal: nolineStyle,
//                                                 emphasis: nolineStyle,
//                                             }
//                                         }


//                                         if (j == 1) {
//                                             tm.symbol = "pin"
//                                             tm.lineStyle = {                 //图形样式，normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
//                                                 normal: mylineStyle,
//                                                 emphasis: mylineStyle,
//                                             }
//                                         }
//                                         da_li.push(tm)
//                                     }

//                                     // drawline("network" + k, da_li, sf_na, sf_chn_na)
//                                 // }

//                             // }
//                             // drawbar("network0",data_li)
                            
//                         });
//                         });
//                     });
//                 });
//             });
//         });
//     });
// });

// });
d3.json("data/" + FILE_name + "/" + FILE_name + "f" + namelist[0] + "new_Eva.json", function (ori) {
    d3.json("data/" + FILE_name + "/" + FILE_name + "f" + namelist[1] + "new_Eva.json", function (OUR) {
        d3.json("data/" + FILE_name + "/" + FILE_name + "f" + namelist[2] + "new_Eva.json", function (SRW) {
            d3.json("data/" + FILE_name + "/" + FILE_name + "f" + namelist[3] + "new_Eva.json", function (ISRW) {
                d3.json("data/" + FILE_name + "/" + FILE_name + "f" + namelist[4] + "new_Eva.json", function (RJ) {
                    d3.json("data/" + FILE_name + "/" + FILE_name + "f" + namelist[5] + "new_Eva.json", function (RNS) {
                        d3.json("data/" + FILE_name + "/" + FILE_name + "f" + namelist[6] + "new_Eva.json", function (RES) {
                            d3.json("data/" + FILE_name + "/" + FILE_name + "f" + namelist[7] + "new_Eva.json", function (TIES) {
                                d3.json("data/" + FILE_name + "/" + FILE_name + "bar.json", function (bar) {
                                    data_li = [OUR, SRW, ISRW, RJ, RNS, RES, TIES]
                                    rate = "5"
                                    drawleida('network0',data_li,rate)
                                })
                            })
                        })
                    })
                })
            })
        })
    })
})
function drawline(win_name, da_li, sf_na, sf_chn_na, sam_name, sam_rate) {
    // console.log(win_name)
    console.log(da_li)
    data = da_li
    mytextStyle = {
        color: "#333",                           //文字颜色
        fontStyle: "normal",                     //italic斜体  oblique倾斜
        fontWeight: "normal",                    //文字粗细bold   bolder   lighter  100 | 200 | 300 | 400...
        fontFamily: "sans-serif",                //字体系列
        fontSize: 40,
    }               //组件离容器右侧的距离,'20%'
    option = {
        title: {
            text: sf_chn_na,
            // textAlign:"center", 
            extBaseline: "top",
            right: "35%",
            textStyle: {
                color: "#000",                           //文字颜色
                fontStyle: "normal",                     //italic斜体  oblique倾斜
                fontWeight: "bold",                    //文字粗细bold   bolder   lighter  100 | 200 | 300 | 400...
                fontFamily: "sans-serif",                //字体系列
                fontSize: 58,
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: [
                {
                    name: 'ori',
                    icon: 'path://M64 512c0-17.673 14.335-32 32.002-32h191.996C305.672 480 320 494.323 320 512c0 17.673-14.335 32-32.002 32H96.002C78.328 544 64 529.677 64 512z m640 0c0-17.673 14.335-32 32.002-32h191.996C945.672 480 960 494.323 960 512c0 17.673-14.335 32-32.002 32H736.002C718.328 544 704 529.677 704 512z m-320 0c0-17.673 14.335-32 32.002-32h191.996C625.672 480 640 494.323 640 512c0 17.673-14.335 32-32.002 32H416.002C398.328 544 384 529.677 384 512z'
                },
                { name: 'OUR', }, { name: 'SRW', }, { name: 'ISRW', }, { name: 'RJ', }, { name: 'RNS', }, { name: 'RES', }, { name: 'TIES', }
            ],

            // right: "10%",   
            top: "15%",
            x: "right",
            padding: 15,                                   //图例内边距，单位px  5  [5, 10]  [5,10,5,10]
            itemGap: 20,
            orient: 'vertical',  //垂直显示
            align: "left",
            itemWidth: 35,                               //图例标记的图形宽度
            itemHeight: 34,
            textStyle: mytextStyle
            // bottom: "10%",
            // orient: "vertical"
        },

        grid: {
            left: '5%',
            right: '15%',
            bottom: '5%',
            top: "15%",
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['5%', '10%', '15%', '20%', '25%', '30%', '35%', '40%'],
            boundaryGap: true,
            splitLine: {
                show: true,
                lineStyle: {
                    type: "dotted",               //坐标轴线线的类型，solid，dashed，dotted
                    width: 3,                     //坐标轴线线宽
                    color: "#000",
                    opacity: 0.45,
                }
            },
            axisLine: {
                onZero: false,
                lineStyle: {
                    type: "solid",               //坐标轴线线的类型，solid，dashed，dotted
                    color: "#000",
                    width: 6,                     //坐标轴线线宽
                    opacity: 1,
                }
            },
            axisLabel: {
                show: true,
                textStyle: mytextStyle,
            },
        },
        yAxis: {
            type: 'value',
            gridIndex: 0,
            splitNumber: 5,
            scale:true,
            // min: 1, max: 180,
            // logBase:3,
            // interval:[1,6,10,180],
            splitLine: {
                show: false,
                lineStyle: {
                    type: "dotted",               //坐标轴线线的类型，solid，dashed，dotted
                    width: 3,                     //坐标轴线线宽
                    color: "#000",
                    opacity: 0.45,
                }
            },
            axisLine: {
                onZero: false,
                lineStyle: {
                    type: "solid",               //坐标轴线线的类型，solid，dashed，dotted
                    color: "#000",
                    width: 7,                     //坐标轴线线宽
                    opacity: 1,
                }
            },
            axisLabel: {
                show: true,
                textStyle: mytextStyle,
                formatter: function (value) {
                    var item = '';
                    item = item + parseFloat(hufu(value)).toFixed(0)
                    return item
                }
            },
        },
        series: da_li
    };

    var myChart1 = echarts.init(document.getElementById(win_name));
    myChart1.clear()
    myChart1.setOption(option, true, true);
}
function drawleida(win_name,data_li,rate){
     mcolor = ['rgb(255,60,60)', 'rgb(255,83,255)', 'rgb(235,135,162)', 'rgb(255,178,101)',
    'rgb(63,151,134)', 'rgb(83,255,255)', 'rgb(0,122,244)',
    'rgb(168,168,255)',];
    maxli = [-100,-100,-100,-100,-100,-100,-100,-100,-100]
    minli =[ 100, 100, 100, 100, 100, 100, 100, 100, 100]
    s_name_li = [
        "SP", "ACC", "CC", "QCS",
        "SCS", "LCC", "GCC", "ANB_G",
    ]
    dataname_li = ["OUR", "SRW", "ISRW", "RJ", "RNS", "RES", "TIES"]
    name_CHN = {
        "SP-small":"平均最短路径(大小)", "ACE": "特征向量中心性", "ANB": "中介中心性", "ACC": "紧密中心性", "CC": "网络连通性", "QCS": "社区数量相似性", "SCS": "社区结构稳定性",
         "LCC": "局部群聚系数", "GCC": "全局聚集系数", "DDC": "度分布相似性", "SP": "平均最短路径", "ANB_G": "中介中心性改"
     }
     dat = [[], [], [], [], [], [], []]
    for (i = 0; i < data_li.length; i++) {
        for (j in data_li[i]) {
            if (rate == j.substr(5)) {
                for (k = 0; k <= 8; k++) {
                    if (s_name_li[k] == 'SCS') {
                        datmp = data_li[i][j][s_name_li[k]]['sam_av']
                        // console.log(s_name_li[k], data_li[i][j][s_name_li[k]['sam_av']])
                        if (datmp > maxli[k]) {
                            maxli[k] = datmp;
                        }
                        if (datmp < minli[k]) {
                            minli[k] = datmp;
                        }
                        dat[i].push(datmp)
                    }
                    else {
                        datmp = data_li[i][j][s_name_li[k]]
                        if (datmp > maxli[k]) {
                            maxli[k] = datmp;
                        }
                        if (datmp < minli[k]) {
                            minli[k] = datmp;
                        }
                        dat[i].push(datmp)
                    }
                }

            }
        }
     }

     console.log(dat)
     var marge = {
        top: 10,
        right: 10, 
        bottom: 90,
        left: 10
    }
      var width = document.getElementById(win_name).clientWidth
      var height = document.getElementById(win_name).clientHeight
      
      var svg = d3.select("#"+win_name).append('svg').attr('width', width).attr('height', height)
      var g = svg.append("g").attr("transform", "translate("+marge.left+","+marge.top+")")

      var defs = svg.append("defs");

    var filter = defs.append("filter")
      .attr("id", "coolShadow")
      .attr("x", "-100%").attr("y", "-100%") //
      .attr("width", "300%").attr("height", "300%"); //

    filter.append("feMorphology")
      .attr("in", "SourceGraphic")
      .attr("result", "upperLayer")
      .attr("operator", "dilate")
      .attr("radius", "0.2 0.2");

    filter.append("feMorphology")
      .attr("in", "SourceAlpha")
      .attr("result", "enlargedAlpha")
      .attr("operator", "dilate")
      .attr("radius", "0.2 0.2");

    filter.append("feGaussianBlur")
      .attr("in", "enlargedAlpha")
      .attr("result", "bluredAlpha")
      .attr("stdDeviation", "3");

    filter.append("feOffset")
      .attr("in", "bluredAlpha")
      .attr("result", "lowerLayer")
      .attr("dy", "1"); //


    var feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode")
      .attr("in", "lowerLayer");
    feMerge.append("feMergeNode")
      .attr("in", "upperLayer");

      centerpoint = {
          x:(width/2-marge.left/2),
          y:(height/2-marge.left/2)
      }
      radim = 2*Math.PI/s_name_li.length
      var R = (width+height-marge.left-marge.right-marge.top-marge.bottom)/8
      k=5
      for(var i=k;i>=1;i--){
          r = R/k*i
          console.log(r)
      g.append("circle")
      .attr("cx", centerpoint.x)
      .attr("cy", centerpoint.y)
      .attr("r", r)
      .attr("class", "waixain")
      .style("filter", "url(#coolShadow)")
      .attr("fill",function(){
          if(i == 2||(i==4)){
              return '#bbb';
          }
          return 'white'
      })
      .attr("opacity","0.6")
      .attr("stroke","#333")
      .attr("stroke-dasharray","10 5");
      }
    var scalex_li = []
    var scaley_li = []
    for (var i = 0; i < s_name_li.length; i++) {
        g.append("line")
            .attr("id", "L2")
            .attr("x1", centerpoint.x)
            .attr("y1", centerpoint.y)
            .attr("x2", R * Math.sin(radim * i) + centerpoint.x)
            .attr("y2", centerpoint.y - R * Math.cos(radim * i))
            .attr("stroke", "black")
            .attr("stroke-dasharray","10 5")
            .attr("stroke-width", "0.5px");
        g.append("text").attr("class", "kdtext").attr("x", (R * 1.2) * Math.sin(radim * i) + centerpoint.x - 15).attr("y", centerpoint.y - (R * 1.2) * Math.cos(radim * i)).text(s_name_li[i])
        if ((i == 0) || (i == 3) || (i == 2)) {
            var newscax = d3.scaleLinear().domain([maxli[i]*1.1, minli[i]]).range([centerpoint.x, R * Math.sin(radim * i) + centerpoint.x]);
            var newscay = d3.scaleLinear().domain([maxli[i]*1.1, minli[i]]).range([centerpoint.y, centerpoint.y - R * Math.cos(radim * i)]);
            scalex_li.push(newscax)
            scaley_li.push(newscay)
        }
        else {
            var newscax = d3.scaleLinear().domain([minli[i], maxli[i]*1.1]).range([centerpoint.x, R * Math.sin(radim * i) + centerpoint.x]);
            var newscay = d3.scaleLinear().domain([minli[i], maxli[i]*1.1]).range([centerpoint.y, centerpoint.y - R * Math.cos(radim * i)]);
            scalex_li.push(newscax)
            scaley_li.push(newscay)
        }
    }
    for (k in dat) {
        xx = -1, yy = -1, xxx = 0, yyy = 0
        for (var j = 0; j < s_name_li.length; j++) {
           
            if (xx != -1) {
                g.append("line")
                    .attr("id", "L2")
                    .attr("x1", xx)
                    .attr("y1", yy)
                    .attr("x2", scalex_li[j](dat[k][j]))
                    .attr("y2", scaley_li[j](dat[k][j]))
                    .attr("stroke", mcolor[k])
                    .attr("stroke-width", "1.5px");
            }
            else{
                xxx = scalex_li[j](dat[k][j])
                yyy = scaley_li[j](dat[k][j])
            }
            xx = scalex_li[j](dat[k][j])
            yy = scaley_li[j](dat[k][j])
             g.append("circle")
                .attr("cx",xx)
                .attr("cy", yy)
                .attr("r", 3)
                .attr("class", "top")
                .attr("fill", mcolor[k])
                .attr("stroke", mcolor[k])
        }
        if (xx != -1) {
            g.append("line")
                .attr("id", "L2")
                .attr("x1", xx)
                .attr("y1", yy)
                .attr("x2", xxx)
                .attr("y2", yyy)
                .attr("stroke", mcolor[k])
                .attr("stroke-width", "1.5px");
                
        }
    }
    sh = (2*R)/dataname_li.length
    w = sh/2.5
    for(i in dataname_li){
        console.log(dataname_li[i])
        svg.append("rect")
        .attr("x",centerpoint.x+R*1.5)
        .attr("y",centerpoint.y-R+i*sh)
        .attr("id","rect-"+i)
        .attr("width", w)
        .attr("height", w)
        .style("fill",mcolor[i])
        .style("stroke",mcolor[i])
        .attr("class", "rects")
        .style("filter", "url(#coolShadow)")
        svg.append("text").attr("class", "lentext").attr("x",centerpoint.x+R*1.5+w*1.3).attr("y",centerpoint.y-R+i*sh+w).text(dataname_li[i])

    }
}
function drawleida_1(w_n,data_li,rate) {
     mcolor = ['rgb(255,60,60)', 'rgb(255,83,255)', 'rgb(235,135,162)', 'rgb(255,178,101)',
    'rgb(63,151,134)', 'rgb(83,255,255)', 'rgb(0,122,244)',
    'rgb(168,168,255)',];
    maxli = [-100,-100,-100,-100,-100,-100,-100,-100,-100]
    minli =[ 100, 100, 100, 100, 100, 100, 100, 100, 100]
    s_name_li = [
        "SP", "ANB", "ACC", "CC", "QCS",
        "SCS", "LCC", "GCC", "ANB_G",
    ]
    name_CHN = {
        "SP-small":"平均最短路径(大小)", "ACE": "特征向量中心性", "ANB": "中介中心性", "ACC": "紧密中心性", "CC": "网络连通性", "QCS": "社区数量相似性", "SCS": "社区结构稳定性",
         "LCC": "局部群聚系数", "GCC": "全局聚集系数", "DDC": "度分布相似性", "SP": "平均最短路径", "ANB_G": "中介中心性改"
     }
    mychart = echarts.init(document.getElementById(w_n));
    name_li = ["OUR", "SRW", "ISRW", "RJ", "RNS", "RES", "TIES"]
    dat = [[], [], [], [], [], [], [], [], []]
    for (i = 0; i < data_li.length; i++) {
        for (j in data_li[i]) {
            if (rate == j.substr(5)) {
                for (k = 0; k <= 8; k++) {
                    if (s_name_li[k] == 'SCS') {
                        datmp = data_li[i][j][s_name_li[k]]['sam_av']
                        // console.log(s_name_li[k], data_li[i][j][s_name_li[k]['sam_av']])
                        if (datmp > maxli[k]) {
                            maxli[k] = datmp;
                        }

                        dat[i].push(datmp)
                    }
                    else {
                        datmp = data_li[i][j][s_name_li[k]]
                        if (datmp > maxli[k]) {
                            maxli[k] = datmp;
                        }
                        if (datmp < minli[k]) {
                            minli[k] = datmp;
                        }
                        dat[i].push(datmp)
                    }
                }

            }
        }
    }
    val = []
    for (j = 0; j < name_li.length; j++){
        tm = {
            name: name_li[j],
            value: dat[j],
            color:mcolor[j]
        }
        val.push(tm)
    }
                   
    console.log(val)
      pr = [1,2,3,4,5,6]
     option = {
        title: {
            text: '基础雷达图'
        },
        tooltip: {},
        legend: {
            data: name_li,
        },
        radar: {
            shape: 'circle',
            polar: {},
            name: {
                textStyle: {
                    color: '#fff',
                    backgroundColor: '#999',
                    borderRadius: 3,
                    padding: [3, 5]
                }
            },
            indicator: [
                            { name: s_name_li[0], max: maxli[0]*1.5},
                            { name: s_name_li[1], max: maxli[1]*1.5},
                            { name: s_name_li[2], max: maxli[2]*1.5},
                            { name: s_name_li[3], max: maxli[3]*1.5},
                            { name: s_name_li[4], max: maxli[4]*1.5},
                            { name: s_name_li[5], max: maxli[5]*1.5},
                            { name: s_name_li[6], max: maxli[6]*1.5},
                            { name: s_name_li[7], max: maxli[7]*1.5},
                            { name: s_name_li[8], max: maxli[8]*1.5}
                        ]
        },
        series: [{
            name: '预算 vs 开销（Budget vs spending）',
            type: 'radar',
            // areaStyle: {normal: {}},
            data: val
        }]
    };
    //   option = {
    //     title: {
    //       text: '内部节点分布质量'
    //     },
    //     legend: {
    //       data: ['line']
    //     },
    //     // polar: {},
    //     // tooltip: {
    //     //   trigger: 'axis',
    //     //   axisPointer: {
    //     //     type: 'cross'
    //     //   },
    //     //   textStyle: {
    //     //     fontSize: 12,
    //     //   },
    //     //   formatter: '{a0}: {c0}<br />{a1}: {c1}<br />{a2}: {c2}'
    //     // },
    //     // angleAxis: {
    //     //   type: 'category',
    //     //   // data: na_li,
    //     //   splitLine: {                     //坐标轴在 grid 区域中的分隔线。
    //     //     show: true,                  //是否显示分隔线。默认数值轴显示，类目轴不显示。
    //     //     interval: 0,            //坐标轴分隔线的显示间隔，在类目轴中有效。默认会采用标签不重叠的策略间隔显示标签。可以设置成 0 强制显示所有标签。如果设置为 1，表示『隔一个标签显示一个标签』，可以用数值表示间隔的数据，也可以通过回调函数控制。回调函数格式如下：
    //     //   },
    //     //   startAngle: 0,

    //     // },
    //     radar: {
    //         // shape: 'circle',
    //         name: {
    //             textStyle: {
    //                 color: '#fff',
    //                 backgroundColor: '#999',
    //                 borderRadius: 3,
    //                 padding: [3, 5]
    //             }
    //         },
    //         indicator: [
    //             { name: s_name_li[0], max: maxli[0]},
    //             { name: s_name_li[1], max: maxli[1]},
    //             { name: s_name_li[2], max: maxli[2]},
    //             { name: s_name_li[3], max: maxli[3]},
    //             { name: s_name_li[4], max: maxli[4]},
    //             { name: s_name_li[5], max: maxli[5]},
    //             { name: s_name_li[6], max: maxli[6]},
    //             { name: s_name_li[7], max: maxli[7]},
    //             { name: s_name_li[8], max: maxli[8]}
    //         ]
    //     },
    //     // radiusAxis: {
    //     // //   min: -1,
    //     // //   max: 1,
    //     // },
    //     series: [{
    //       coordinateSystem: 'polar',
    //       name: 'cluster1',
    //       type: 'line',
    //       data: dat,
    //       itemStyle: {
    //         normal: {
    //           lineStyle: {
    //             color:'black',//折线的颜色
    //           }
    //         }
    //       }
    //     }
    //     ]
    //   };
        mychart.setOption(option);
      


  }
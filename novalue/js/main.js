const FILE_name = "ba"
name_CHN = {
    "ACE": "特征向量中心性", "ANB": "中介中心性", "ACC": "紧密中心性", "CC": "网络连通性", "QCS": "社区数量相似性", "SCS": "社区结构稳定性",
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
var mcolor = ['rgb(255,60,60)','rgb(173,53,255)', 'rgb(235,135,162)', 'rgb(255,178,101)',
    'rgb(89,196,120)', 'rgb(118,217,219)', 'rgb(0,122,244)',
    'rgb(202,23,155)', ];

namelist = ["ori", "our", "SRW", "ISRW", "RJ", "RNS", "RES", "TIES", "BFS", "DFS"]
d3.json("data/" + FILE_name + "/" + FILE_name + "f" + namelist[0] + "new_Eva.json", function (ori) {
    d3.json("data/" + FILE_name + "/" + FILE_name + "f" + namelist[1] + "new_Eva.json", function (our) {
        d3.json("data/" + FILE_name + "/" + FILE_name + "f" + namelist[2] + "new_Eva.json", function (SRW) {
            d3.json("data/" + FILE_name + "/" + FILE_name + "f" + namelist[3] + "new_Eva.json", function (ISRW) {
                d3.json("data/" + FILE_name + "/" + FILE_name + "f" + namelist[4] + "new_Eva.json", function (RJ) {
                    d3.json("data/" + FILE_name + "/" + FILE_name + "f" + namelist[5] + "new_Eva.json", function (RNS) {
                        d3.json("data/" + FILE_name + "/" + FILE_name + "f" + namelist[6] + "new_Eva.json", function (RES) {
                            d3.json("data/" + FILE_name + "/" + FILE_name + "f" + namelist[7] + "new_Eva.json", function (TIES) {

                                rate_li = ['5', '10', '15', '20', '25', '30', '35']
                                data_li = [ori, our, SRW, ISRW, RJ, RNS, RES, TIES]
                                da_li = []

                                mylineStyle = {
                                    type: "solid",               //坐标轴线线的类型，solid，dashed，dotted
                                    width: 4,                     //坐标轴线线宽
                                    opacity: 1,                   //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形
                                };
                                nolineStyle = {
                                    type: "solid",               //坐标轴线线的类型，solid，dashed，dotted
                                    width: 4,                     //坐标轴线线宽
                                    opacity: 0.41,                   //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形
                                };
                                orilineStyle = {
                                    type: "dashed",               //坐标轴线线的类型，solid，dashed，dotted
                                    width: 4,                     //坐标轴线线宽
                                    opacity: 10,                   //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形
                                };
                                for(k=0;k<2;k++){
                                    sf_na = s_name_li2[k]
                                    sf_chn_na = name_CHN[sf_na]
                                    da_li = []
                                    for (i in data_li[0]) {
                                        dtm = []
                                        for (j = 1; j <= 8; j++) {
                                            // dtm.push(data_li[0][i][sf_na])
                                            dtm.push(Math.log(Math.log(data_li[0][i][sf_na])))
                                        }
                                        tm = {
                                            name: namelist[0],
                                            type: 'line',
                                            data: dtm,
                                            symbol: "diamond",
                                            color: mcolor[0],
                                            large: true,
                                            symbolSize: 15,
                                            largeThreshold: 1000,
                                            lineStyle: {
                                                normal: orilineStyle,
                                                emphasis: orilineStyle,
                                            }
                                        }
                                        da_li.push(tm)
                                    }
    
                                    for (j = 1; j <= 7; j++) {
                                        dt = []
                                        for (i in data_li[j]) {
                                            if(k == 5){
                                                // dt.push(data_li[j][i][sf_na]['sam_av'])
                                                dt.push(Math.log(Math.log(data_li[j][i][sf_na]['sam_av'])))
                                            }
                                            else{
                                                // dt.push(data_li[j][i][sf_na])
                                                dt.push(Math.log(Math.log(data_li[j][i][sf_na])))
                                            }
                                             }
                                        tm = {
                                            name: namelist[j],
                                            type: 'line',
                                            data: dt,
                                            color: mcolor[j],
                                            large: true,
                                            symbol:"triangle",
                                            symbolSize: 15,
                                            largeThreshold: 1000,
                                            lineStyle: {
                                                normal: nolineStyle,
                                                emphasis: nolineStyle,
                                            }
                                        }
    
    
                                        if (j == 1) {
                                            tm.symbol = "pin"
                                            tm.lineStyle = {                 //图形样式，normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                                                normal: mylineStyle,
                                                emphasis: mylineStyle,
                                            }
                                        }
                                        da_li.push(tm)
                                    }

                                    drawline("network"+k, da_li, sf_na, sf_chn_na)
                                }

                            });
                        });
                    });
                });
            });
        });
    });
});


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
            extBaseline:"top",
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
            data: ["ori", "our", "SRW", "ISRW", "RJ", "RNS", "RES", "TIES"],
            // right: "10%",   
            top:"15%",
            x: "right",
            padding:15,                                   //图例内边距，单位px  5  [5, 10]  [5,10,5,10]
            itemGap: 20, 
            orient: 'vertical',  //垂直显示
            align:"left",
            itemWidth:35,                               //图例标记的图形宽度
            itemHeight:34, 
            textStyle:mytextStyle
            // bottom: "10%",
            // orient: "vertical"
        },
        grid: {
            left: '5%',
            right: '15%',
            bottom: '5%',
            top:"15%",
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
            data: ['5%', '10%', '15%', '20%', '25%', '30%', '35%','40%'],
            boundaryGap:true,
            splitLine:{show:true,
            lineStyle:{
                type: "dotted",               //坐标轴线线的类型，solid，dashed，dotted
                width: 3,                     //坐标轴线线宽
                color:"#000",
                opacity: 0.45, 
            }
            },
            axisLine: {
                onZero:false,
                lineStyle: {
                    type: "solid",               //坐标轴线线的类型，solid，dashed，dotted
                    color:"#000",
                    width: 6,                     //坐标轴线线宽
                    opacity: 1, 
                }
            },
            axisLabel: {
                show: true,
                textStyle:mytextStyle,
              },
        },
        yAxis: {
            type: 'value',
            gridIndex: 0, 
            splitNumber:5,
            // min: 1, max: 180,
            // logBase:3,
            // interval:[1,6,10,180],
            splitLine:{show:true,
                lineStyle:{
                    type: "dotted",               //坐标轴线线的类型，solid，dashed，dotted
                    width: 3,                     //坐标轴线线宽
                    color:"#000",
                    opacity: 0.45, 
                }
                },
                axisLine: {
                    onZero:false,
                    lineStyle: {
                        type: "solid",               //坐标轴线线的类型，solid，dashed，dotted
                        color:"#000",
                        width: 6,                     //坐标轴线线宽
                        opacity: 1, 
                    }
                },
                axisLabel: {
                    show: true,
                    textStyle:mytextStyle,
                    formatter:function(value) { 
                        console.log()
                        let item='';
                        item=item+parseFloat(Math.pow(Math.E,Math.pow(Math.E,value))).toFixed(2)
                        return item
                    } 
                  },
        },
        series: data
    };
    
    var myChart1 = echarts.init(document.getElementById(win_name));
    myChart1.clear()
    myChart1.setOption(option,true,true);
}


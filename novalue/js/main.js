const FILE_name = "WW"
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
var mcolor = ['rgb(255,60,60)', 'rgb(255,83,255)', 'rgb(235,135,162)', 'rgb(255,178,101)',
    'rgb(63,151,134)', 'rgb(83,255,255)', 'rgb(0,122,244)',
    'rgb(168,168,255)',];

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
namelist = ["ori", "our", "SRW", "ISRW", "RJ", "RNS", "RES", "TIES", "BFS", "DFS"]
d3.json("data/" + FILE_name + "/" + FILE_name + "f" + namelist[0] + "new_Eva.json", function (ori) {
    d3.json("data/" + FILE_name + "/" + FILE_name + "f" + namelist[1] + "new_Eva.json", function (our) {
        d3.json("data/" + FILE_name + "/" + FILE_name + "f" + namelist[2] + "new_Eva.json", function (SRW) {
            d3.json("data/" + FILE_name + "/" + FILE_name + "f" + namelist[3] + "new_Eva.json", function (ISRW) {
                d3.json("data/" + FILE_name + "/" + FILE_name + "f" + namelist[4] + "new_Eva.json", function (RJ) {
                    d3.json("data/" + FILE_name + "/" + FILE_name + "f" + namelist[5] + "new_Eva.json", function (RNS) {
                        d3.json("data/" + FILE_name + "/" + FILE_name + "f" + namelist[6] + "new_Eva.json", function (RES) {
                            d3.json("data/" + FILE_name + "/" + FILE_name + "f" + namelist[7] + "new_Eva.json", function (TIES) {
                                d3.json("data/" + FILE_name + "/" + FILE_name + "bar.json", function (bar) {
                                        console.log("data/" + FILE_name + "/" + FILE_name + "bar.json",bar)
                                    rate_li = ['5', '10', '15', '20', '25', '30', '35','40']
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
                                    opacity: 1,                   //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形
                                };
                                orilineStyle = {
                                    type: "dashed",               //坐标轴线线的类型，solid，dashed，dotted
                                    width: 4,                     //坐标轴线线宽
                                    opacity: 10,                   //图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形
                                };
                            //     for (k = 0; k < 2; k++) {
                                    k=3
                                    sf_na = s_name_li2[k]
                                    sf_chn_na = name_CHN[sf_na]
                                    da_li = []
                                    if(k!=4&k!=5&k!=8){
                                         for (i in data_li[0]) {
                                        dtm = []
                                        tm = {
                                            name: namelist[0],
                                            type: 'bar',
                                            symbol: "circle",
                                            symbolSize: 1,
                                            markLine: {
                                                symbol: ['none', 'none'],//去掉箭头
                                                itemStyle: {
                                                    normal: {
                                                        lineStyle: {
                                                            type: "dashed",               //坐标轴线线的类型，solid，dashed，dotted
                                                            width: 4,                     //坐标轴线线宽
                                                            opacity: 10,
                                                        },
                                                        label: {
                                                            show: false,
                                                            position: 'middle'
                                                        }
                                                    }
                                                },
                                                data: [{
                                                    yAxis: 
                                                    // Math.log(Math.log(data_li[0][i][sf_na])),
                                                    qu_log(data_li[0][i][sf_na])
                                                },]
                                            },
                                            // data: dtm,
                                            // symbol: "diamond",
                                            color: mcolor[0],
                                            large: true,
                                            // symbolSize: 15,
                                            largeThreshold: 1000,
                                            lineStyle: {
                                                normal: orilineStyle,
                                                emphasis: orilineStyle,
                                            }
                                        }
                                        da_li.push(tm)
                                    }
                                    }
                                   

                                    for (j = 1; j <= 7; j++) {
                                        dt = []
                                        for (i in data_li[j]) {
                                            if (k == 5) {
                                                // dt.push(data_li[j][i][sf_na]['sam_av'])
                                                dt.push(qu_log((data_li[j][i][sf_na]['sam_av'])))
                                            }
                                            else {
                                                // dt.push(data_li[j][i][sf_na])
                                                // dt.push(Math.log(Math.log(data_li[j][i][sf_na])))
                                                dt.push(qu_log(data_li[j][i][sf_na]))
                                            }
                                        }
                                        tm = {
                                            name: namelist[j],
                                            type: 'bar',
                                            data: dt,
                                            color: mcolor[j],
                                            large: true,
                                            symbol: "triangle",
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

                                    drawline("network" + k, da_li, sf_na, sf_chn_na)
                                // }

                            // }
                            
                            
                        });
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
                { name: 'our', }, { name: 'SRW', }, { name: 'ISRW', }, { name: 'RJ', }, { name: 'RNS', }, { name: 'RES', }, { name: 'TIES', }
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

function drawbar(win_name,da_li){
    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data:["our", "SRW", "ISRW", "RJ", "RNS", "RES", "TIES", "BFS", "DFS"]
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['5%', '10%', '15%', '20%', '25%', '30%', '35%', '40%']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: da_li
    };
    var myChart1 = echarts.init(document.getElementById(win_name));
    myChart1.clear()
    myChart1.setOption(option, true, true);
}
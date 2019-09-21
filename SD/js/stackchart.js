var date1 = ["2018-3-1", "2018-3-2", "2018-3-3", "2018-3-4", "2018-3-5", "2018-3-6", "2018-3-7", "2018-3-8",
  "2018-3-9", "2018-3-10", "2018-3-11", "2018-3-12", "2018-3-13", "2018-3-14", "2018-3-15", "2018-3-16", "2018-3-17",
  "2018-3-18", "2018-3-19", "2018-3-20", "2018-3-21", "2018-3-22", "2018-3-23", "2018-3-24", "2018-3-25", "2018-3-26",
  "2018-3-27", "2018-3-28", "2018-3-29", "2018-3-30", "2018-3-31", "2018-4-1", "2018-4-2", "2018-4-3", "2018-4-4", "2018-4-5",
  "2018-4-6", "2018-4-7", "2018-4-8", "2018-4-9", "2018-4-10", "2018-4-11", "2018-4-12", "2018-4-13", "2018-4-14", "2018-4-15",
  "2018-4-16", "2018-4-17", "2018-4-18", "2018-4-19", "2018-4-20"]
var mcolor = ['rgb(255,63,63)', 'rgb(235,135,162)', 'rgb(255,198,201)',
  'rgb(255,178,101)', 'rgb(254,229,205)', 'rgb(255,255,101)', 'rgb(190,183,64)', 'rgb(178,205,101)', 'rgb(101,247,168)',
  'rgb(89,196,120)', 'rgb(63,151,134)', 'rgb(133,134,97)', 'rgb(80,174,189)', 'rgb(118,217,219)', 'rgb(83,255,255)',
  'rgb(214,255,255', 'rgb(141,183,252)', 'rgb(0,122,244)', 'rgb(168,168,255)', 'rgb(134,119,180)', 'rgb(174,73,174)',
  'rgb(168,83,255)', 'rgb(255,83,255)', 'rgb(254,158,214)', 'rgb(255,223,250)', 'rgb(254,110,110)', 'rgb(203,136,69)', 'rgb(165,63,79)'];
dom = document.getElementById("uprightbody");
var myChart1 = echarts.init(dom);
var app = {};

function randomsort(a, b) {
  return Math.random()>.5 ? -1 : 1;
}
function areasort(a,b){
 var suma=0
 var sumb=0
 for (let i = 0; i < a.data.length; i++) {
  suma += a.data[i];
}
for (let i = 0; i < b.data.length; i++) {
sumb += b.data[i];
}
 return suma<sumb;
}

//初始点击，最后点击
//#region 
var triggerAction = function (action, selected) {
  legend = [];

  for (name in selected) {
    if (selected.hasOwnProperty(name)) {
      legend.push({ name: name });
    }
  }
  myChart1.dispatchAction({
    type: action,
    batch: legend
  });
};

var isFirstUnSelect = function (selected) {

  var unSelectedCount = 0;
  for (name in selected) {
    if (!selected.hasOwnProperty(name)) {
      continue;
    }

    if (selected[name] == false) {
      ++unSelectedCount;
    }
  }
  return unSelectedCount == 1;
};

var isAllUnSelected = function (selected) {
  var selectedCount = 0;
  for (name in selected) {
    if (!selected.hasOwnProperty(name)) {
      continue;
    }

    // 所有 selected Object 里面 true 代表 selected， false 代表 unselected
    if (selected[name] == true) {
      ++selectedCount;
    }
  }
  return selectedCount == 0;
};
myChart1.on('legendselectchanged', function (obj) {
  var selected = obj.selected;
  if (selected != undefined) {
    var legend = obj.name;
    var id = NAMELIST[legend]
    var drawname
    if (id.length == 1) {
      drawname = "茶"
    }
    else if (id.length == 3) {
      drawname = IDLIST[id[0]]
    }
    else if (id.length == 5) {
      drawname = IDLIST[id[0] + id[1] + id[2]]
    }
    var temo = {}
    temo['drawname'] = drawname;
    temo['selected'] = selected;
    OPERATING_HISTORY.push(temo)
    // 使用 legendToggleSelect Action 会重新触发 legendselectchanged Event，导致本函数重复运行
    // 使得 无 selected 对象
    // if (selected != undefined) {
    //   if (isFirstUnSelect(selected)) {
    //     triggerAction('legendToggleSelect', selected);
    //   } else if (isAllUnSelected(selected)) {
    //     triggerAction('legendSelect', selected);
    //   }
    // }
  }
});
//#endregion
//新加上鼠标右击事件
myChart1.getZr().on('contextmenu', showMenu);


function showMenu(param) {
  // console.log(myChart1._chartsMap)
  var pointInPixel = [param.offsetX, param.offsetY];
  // if (myChart1.containPixel('grid', pointInPixel)) {
  var fill = param.topTarget.style.fill
  var nu = mcolor.indexOf(fill)
  var iid
  var op = myChart1.getOption();
  if (op.id == 0) {
    iid = (nu + 1) + ''
  }
  else {
    nu = nu + 1;
    if (nu < 10) {
      nu = '0' + nu
    }
    iid = op.id + nu;
  }
  CLICK_NAM = IDLIST[iid]
  var menu = document.getElementById("bg");
  menu.style.left = param.offsetX - 40 + 'px';
  menu.style.top = param.offsetY - 10 + 'px';
  menu.style.display = "block";
  // }
}



//去除默认的鼠标事件
var tree = document.getElementById("upright");
tree.oncontextmenu = function () { return false; };

//delete
var listd = document.getElementById('mnd');
listd.addEventListener('click', function (event) {

  myChart1.dispatchAction({
    type: 'legendUnSelect',       //选中图例。
    name: CLICK_NAM // 图例名称
  });
  menu.style.display = "none";
}, false);
//select

var lists = document.getElementById('mns');
lists.addEventListener('click', function (event) {
  if (NAMELIST[CLICK_NAM].length != 5) {
    drawstack(CLICK_NAM, GLOBAL_DATA, '2018-3-1', '2018-4-20', NAMELIST, IDLIST)
  }
  myChart1.dispatchAction({
    type: 'downplay',       //选中图例。
    name: CLICK_NAM // 图例名称
  });

  menu.style.display = "none";
}, false);

//图上点击
//#region
var menu = document.getElementById("bg");
myChart1.getZr().on('click', function (params) {

  menu.style.display = "none";
  var pointInPixel = [params.offsetX, params.offsetY];
  if (myChart1.containPixel('grid', pointInPixel)) {
    /*此处添加具体执行代码*/
    var fill = params.topTarget.style.fill
    var nu = mcolor.indexOf(fill)
    var iid
    var op = myChart1.getOption();
    if (op.id == 0) {
      iid = (nu + 1) + ''
    }
    else {
      nu = nu + 1;
      if (nu < 10) {
        nu = '0' + nu
      }
      iid = op.id + nu;
    }
    var nam = IDLIST[iid]
    myChart1.dispatchAction({
      type: 'legendUnSelect',       //选中图例。
      name: nam // 图例名称
    });
  }
});
//图上点击
//#region
myChart1.getZr().on('click', function (params) {
  var pointInPixel = [params.offsetX, params.offsetY];
  if (myChart1.containPixel('grid', pointInPixel)) {
    /*此处添加具体执行代码*/
    var fill = params.topTarget.style.fill
    var nu = mcolor.indexOf(fill)
    var iid
    var op = myChart1.getOption();
    if (op.id == 0) {
      iid = (nu + 1) + ''
    }
    else {
      nu = nu + 1;
      if (nu < 10) {
        nu = '0' + nu
      }
      iid = op.id + nu;
    }
    var nam = IDLIST[iid]
    myChart1.dispatchAction({
      type: 'legendUnSelect',       //选中图例。
      name: nam // 图例名称
    });
  }
});
//改变图标
myChart1.getZr().on('mousemove', function (params) {
  var pointInPixel = [params.offsetX, params.offsetY];
  if (myChart1.containPixel('grid', pointInPixel)) {
    myChart1.getZr().setCursorStyle('pointer');
  };
});
myChart1.on('mouseout', function (params) {
  var pointInPixel = [params.offsetX, params.offsetY];
  if (!myChart1.containPixel('grid', pointInPixel)) {
    myChart1.getZr().setCursorStyle('default');
  };
});
//#endregion
//正常点击
myChart1.on('click', function (params) {
  myChart1.dispatchAction({
    type: 'legendUnSelect',       //选中图例。
    name: params.seriesName // 图例名称
  });
})

//#region tooltip
function tipFormatter(prams) {
  var divWarp = $('<div class="BoxWrap"/>');
  var divW = $('<div class="BoxW"/>');
  var divContent = $('<div class = "horn">');
  var divlt = $('<div class = "lt">');
  var divrt = $('<div class = "rt">');
  var divrb = $('<div class = "rb">');
  var divlb = $('<div class = "lb">');
  var divTriangle = $('<div class ="triangle-down hotel-triangle-position">');
  var divFirst
  // prams.forEach(function(item) {
  if (prams.data) {
    var daya = $('<p>').text(' ' + ' 日期 ： ' + prams.name).css({ "color": "rgba(60,65,60,0.7)", "fontSize": "15px" })
    var dat = $('<p>').text(' ' + ' 指数*权重： ' + ' : ' + parseFloat(prams.data).toFixed(2)).css({ "color": "rgba(60,65,60,0.7)", "fontSize": "15px" })
    var span = $('<p>').text(" " + " " + ' O ' + prams.seriesName).css("color", prams.color).css("fontSize", "20px");
    divFirst = divContent.append(span).append(daya).append(dat)
  }
  // });
  divFirst = divContent.append(divlt).append(divrt).append(divrb).append(divlb);
  var div = divWarp.append(divFirst).append(divTriangle);
  var div = divW.append(divWarp)
  return div.html()
}
//#endregion
option = {
  grid: {
    x: '3%',
    x2: '3%'
  },
  id: 0,
  color: mcolor.sort(randomsort),
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(170,200,200,0.7)',
    formatter: function (prams) {
      return tipFormatter(prams);
    },
    padding: [0, 0],
  },
  legend: {
    "icon": "circle",
    "right": "39%",
    "top": '5%',
    "itemGap": 15,
    'itemWidth': 10,
    'orient': 'horizontal',
    temGap: 0,
    itemWidth: 10,
    itemHeight: 10,
    data: [],
    type: 'scroll',
    pageIcons:
    {
      horizontal: ['M0,0L12,-10L12,10z', 'M0,0L-12,-10L-12,10z'],
    },

    pageIconColor: '#6495ed', //翻页下一页的三角按钮颜色
    pageIconInactiveColor: '#aaa', //翻页（即翻页到头时）
    pageIconSize: 11, //翻页按钮大小
    pageFormatter: '',//隐藏翻页的数字
    pageButtonItemGap: -6,//翻页按钮的两个之间的间距
  },
  toolbox: {
    show: true,
    itemSize: 20,                                 //工具栏 icon 的大小
    itemGap: 20,
    right: '5%',
    feature: {
      mark: { show: true },
      myRedo: {
        show: true,
        title: 'Redo',
        icon: 'path://d="M1024 219.648v605.312a32 32 0 0 1-32 32H395.84l221.184-196.992c-21.312-102.208-87.04-174.016-196.992-215.36C310.08 403.264 170.048 454.528 0 598.4c97.28-247.424 229.184-381.696 395.84-402.88 166.656-21.248 313.152 55.936 439.616 231.488L1024 219.648z',
        onclick: function () {

          var peek = OPERATING_REDO.peek()
          OPERATING_HISTORY.push(peek)
          drawstack(peek.drawname, GLOBAL_DATA, '2018-3-1', '2018-4-20', NAMELIST, IDLIST)
          console.log(peek.selected)
          for (i in peek.selected) {
            console.log(peek.selected[i])
            if (peek.selected[i] == true) {
              myChart1.dispatchAction({
                type: 'legendSelect',       //选中图例。
                name: i // 图例名称
              });
            }
            else {
              myChart1.dispatchAction({
                type: 'legendUnSelect',       //选中图例。
                name: i // 图例名称
              });
            }
          }
          OPERATING_REDO.pop()
        }

      },
      myUndo: {
        show: true,
        title: 'Undo',
        icon: 'path://M0 219.648v605.312a32 32 0 0 0 32 32h596.16L407.04 659.968c21.312-102.208 87.04-174.016 196.992-215.36 109.952-41.344 249.984 9.92 420.032 153.728-97.28-247.424-229.184-381.696-395.84-402.88-166.656-21.248-313.152 55.936-439.616 231.488L0 219.648z',
        onclick: function (d) {
          var peek = OPERATING_HISTORY.peek()
          OPERATING_REDO.push(peek)
          drawstack(peek.drawname, GLOBAL_DATA, '2018-3-1', '2018-4-20', NAMELIST, IDLIST)
          console.log(peek.selected)
          for (i in peek.selected) {
            console.log(peek.selected[i])
            if (peek.selected[i] == true) {
              myChart1.dispatchAction({
                type: 'legendSelect',       //选中图例。
                name: i // 图例名称
              });
            }
            else {
              myChart1.dispatchAction({
                type: 'legendUnSelect',       //选中图例。
                name: i // 图例名称
              });
            }
          }
          OPERATING_HISTORY.pop()
        }
      },
      dataView: {
        show: false,
        icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
        // readOnly: false,
        optionToContent: function (opt) {
          let axisData = opt.xAxis[0].data; //坐标数据
          let series = opt.series; //折线图数据
          let tdHeads = '<td style="padding: 0 10px">时间\\名称</td>'; //表头
          let tdBodys = ' '; //数据
          series.forEach(function (item) {
            //组装表头
            tdHeads += `<td style="padding: 0 10px">${item.name}</td>`;
          });
          var table = '<table border="1" style="margin-left:20px;border-collapse:collapse;font-size:14px;text-align:center"><tbody><tr>' + tdHeads + ' </tr>';
          for (let i = 0, l = axisData.length; i < l; i++) {
            for (let j = 0; j < series.length; j++) {
              //组装表数据
              tdBodys += `<td style="padding: 0 10px">${series[j].data[i]}</td>`;
            }
            table += `<tr><td style="padding: 0 10px">${axisData[i]}</td>${tdBodys}</tr>`;
            tdBodys = '';
          }
          table += '</tbody></table>';
          return table;
        }
      },

      magicType: {
        show: true,
        title:{bar:'柱状',line:'折线',stack:'堆叠',tiled:'平铺'},
        // icon:{bar:""} ,
        icon:{
          bar:'image://img/zhuzhuang.png' ,
          line:'image://img/zhexian.png',
          stack:'image://img/duidie.png',
          tiled:'image://img/pingpu.png'
        },
        type: ['bar', 'line', 'stack', 'tiled'],

      },
      //   dataZoom :{                             //数据区域缩放。目前只支持直角坐标系的缩放
      //     show: true,                         //是否显示该工具。
      //     title:"缩放",                       //缩放和还原的标题文本
      //     xAxisIndex:0,                       //指定哪些 xAxis 被控制。如果缺省则控制所有的x轴。如果设置为 false 则不控制任何x轴。如果设置成 3 则控制 axisIndex 为 3 的x轴。如果设置为 [0, 3] 则控制 axisIndex 为 0 和 3 的x轴
      //     yAxisIndex:false,                   //指定哪些 yAxis 被控制。如果缺省则控制所有的y轴。如果设置为 false 则不控制任何y轴。如果设置成 3 则控制 axisIndex 为 3 的y轴。如果设置为 [0, 3] 则控制 axisIndex 为 0 和 3 的y轴
      // },
    }
  },
  calculable: false,
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: date1
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: []
};
function drawstack(name, list, dayleft, dayright, namelist, idlist) {
  var dl;
  var dr;
  var oDate1 = new Date(dayleft);
  var oDate2 = new Date(dayright);
  if (oDate1.getTime() > oDate2.getTime()) {
    dl = dayright;
    dr = dayleft;
  } else {
    dl = dayleft;
    dr = dayright;
  }
  var le = date1.indexOf(dl)
  var ri = date1.indexOf(dr) + 1
  option.xAxis[0]['data'] = date1.slice(le, ri)
  var jage = date1.slice(le, ri)
  $("#myChart1").removeAttr("_echarts_instance_").empty();
  var id = namelist[name] + '';
  var list1 = JSON.parse(JSON.stringify(list))
  var da = []
  var me = []
  option.id = id
  if (id == 0) {
    for (i in list1) {
      if (jage.includes(i) == true) {
        for (j in list1[i]['children']) {
          var na = list1[i]['children'][j].name
          if (da.find(function (x) { return x.name == na }) == null && (na != '茶')) {
            var temo = {}
            temo.name = na;
            temo.type = "line";
            temo.data = []
            temo.stack = '总'
            temo.itemStyle = { normal: { areaStyle: { type: 'default' } } },
              da.push(temo)
            me.push(na)
            da.find(function (x) { return x.name == na }).data.push(parseFloat(list1[i]['children'][j].reweight) * parseFloat(list1[i]['children'][j].index))
          }
          else if (na != '茶') {
            da.find(function (x) { return x.name == na }).data.push(parseFloat(list1[i]['children'][j].reweight) * parseFloat(list1[i]['children'][j].index))
          }
        }
      }

    }
  }
  else if (id.length == 1) {
    for (i in list1) {
      if (jage.includes(i) == true) {
        var tee = list1[i]['children'].find(function (x) { return x.name == idlist[id] })['children']
        for (j in tee) {
          var na = tee[j].name
          if (da.find(function (x) { return x.name == na }) == null && (na != '茶')) {
            var temo = {}
            temo.name = na;
            temo.type = "line";
            temo.stack = '总'
            temo.data = []
            temo.itemStyle = { normal: { areaStyle: { type: 'default' } } },
              da.push(temo)
            me.push(na)
            da.find(function (x) { return x.name == na }).data.push(parseFloat(tee[j].reweight) * parseFloat(tee[j].index) )
          }
          else if (na != '茶') {
            da.find(function (x) { return x.name == na }).data.push(parseFloat(tee[j].reweight) * parseFloat(tee[j].index) )
          }
        }
      }

    }
  }
  else if (id.length == 3) {
    for (i in list1) {
      if (jage.includes(i) == true) {
        var tee = list1[i]['children'].find(function (x) { return x.name == idlist[id[0]] })['children'].find(function (x) { return x.name == idlist[id] })['children']
        for (j in tee) {
          var na = tee[j].name
          if (da.find(function (x) { return x.name == na }) == null && (na != '茶')) {
            var temo = {}
            temo.name = na;
            temo.type = "line";
            temo.stack = '总'
            temo.data = []
            temo.itemStyle = { normal: { areaStyle: { type: 'default' } } },
              da.push(temo)
            me.push(na)
            if (parseFloat(tee[j].reweight) == 0) {
              da.find(function (x) { return x.name == na }).data.push(0)
            }
            else {
              da.find(function (x) { return x.name == na }).data.push(parseFloat(tee[j].reweight) * parseFloat(tee[j].index) )
            }
          }
          else if (na != '茶') {
            if (parseFloat(tee[j].reweight) == 0) {
              da.find(function (x) { return x.name == na }).data.push(0)
            }
            else {
              da.find(function (x) { return x.name == na }).data.push(parseFloat(tee[j].reweight) * parseFloat(tee[j].index) )
            }
          }
        }
      }

    }
  }
  option.legend['data'] = me
  option.series = da.sort(areasort)
  myChart1.setOption(option, true);
  //   } 

}

d3.csv("data/number.csv", function (namedata) {
  d3.csv("data/new_xl.csv", function (iddata) {

    var namelist = {}
    for (i in namedata) {
      namelist[namedata[i].name] = namedata[i].id;
    }
    var idlist = {}
    for (i in namedata) {
      idlist[namedata[i].id] = namedata[i].name;
    }
    IDLIST = idlist
    NAMELIST = namelist
   pro(iddata,date1,"2018-3-1", "name", "dataname", "datavalue", 0);
console.log(GLOBAL_DATA)
    var dall = []
    for (i in GLOBAL_DATA) {
      var x = 0;

      for (j in GLOBAL_DATA[i]['children']) {

        if (isNaN(GLOBAL_DATA[i]['children'][j].index) == false) {
          x = x + (parseFloat(GLOBAL_DATA[i]['children'][j].reweight) * (parseFloat(GLOBAL_DATA[i]['children'][j].index)) / 10000)
        }
      }
      var temo = []
      temo.push(i)
      temo.push(x)
      temo.push(0)
      dall.push(temo)
    }


    var dfir = []
    for (i in GLOBAL_DATA) {
      var x = 0;
      for (j in GLOBAL_DATA[i]['children']) {
        if (dfir[j] == undefined) {
          dfir[j] = []
        }
        if (j != 0) {
          var x = 0;
          for (h in GLOBAL_DATA[i]['children'][j]['children']) {
            if (isNaN(GLOBAL_DATA[i]['children'][j]['children'][h].index) == false) {
              x = x + (parseFloat(GLOBAL_DATA[i]['children'][j]['children'][h].reweight) * (parseFloat(GLOBAL_DATA[i]['children'][j]['children'][h].index)) / 10000)
            }
          }
          var temo = []
          temo.push(i)
          temo.push(x)
          temo.push(j)
          dfir[j].push(temo)
        }

      }
    }
    dfir.shift()

    var dsec = []
    var n = 0
    for (i in IDLIST) {
      if (i.length == 3) {
        if (dsec[n] == undefined) {
          dsec[n] = []
        }

        for (d in date1) {
          var x = 0;
          var findl = GLOBAL_DATA[date1[d]]['children'].find(function (x) { return x.name == IDLIST[i[0]] })['children'].find(function (x) { return x.name == IDLIST[i] })['children']
          for (h in findl) {
            if (isNaN(findl[h].index) != true) {
              x = x + (parseFloat(findl[h].reweight) * (parseFloat(findl[h].index)) / 10000)
            }
          }
          var temo = []
          temo.push(date1[d])
          temo.push(x)
          temo.push(i)
          dsec[n].push(temo)
        }
        n++;
      }
    }

    var dthr = []
    var n = 0
    for (i in IDLIST) {
      if (i.length == 5) {
        if (dthr[n] == undefined) {
          dthr[n] = []
        }

        for (d in date1) {
          var x = 0;
          var findl = GLOBAL_DATA[date1[d]]['children'].find(function (x) { return x.name == IDLIST[i[0]] })['children'].find(function (x) { return x.name == IDLIST[i[0] + i[1] + i[2]] })['children'].find(function (x) { return x.name == IDLIST[i] })
          if (isNaN(findl.index) != true) {
            x = parseFloat(findl.index)
          }
          var temo = []
          temo.push(date1[d])
          temo.push(x)
          temo.push(i)
          dthr[n].push(temo)
        }
        n++;
      }
    }

    DATASEC = JSON.parse(JSON.stringify(dsec))
    DATAALL = JSON.parse(JSON.stringify(dall))
    DATAFIR = JSON.parse(JSON.stringify(dfir))
    DATATHR = JSON.parse(JSON.stringify(dthr))
    //index

  });
});

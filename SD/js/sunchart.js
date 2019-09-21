var date1 = ["2018-3-1", "2018-3-2", "2018-3-3", "2018-3-4", "2018-3-5", "2018-3-6", "2018-3-7", "2018-3-8",
  "2018-3-9", "2018-3-10", "2018-3-11", "2018-3-12", "2018-3-13", "2018-3-14", "2018-3-15", "2018-3-16", "2018-3-17",
  "2018-3-18", "2018-3-19", "2018-3-20", "2018-3-21", "2018-3-22", "2018-3-23", "2018-3-24", "2018-3-25", "2018-3-26",
  "2018-3-27", "2018-3-28", "2018-3-29", "2018-3-30", "2018-3-31", "2018-4-1", "2018-4-2", "2018-4-3", "2018-4-4", "2018-4-5",
  "2018-4-6", "2018-4-7", "2018-4-8", "2018-4-9", "2018-4-10", "2018-4-11", "2018-4-12", "2018-4-13", "2018-4-14", "2018-4-15",
  "2018-4-16", "2018-4-17", "2018-4-18", "2018-4-19", "2018-4-20"]
//tooltip
function tipFormattersun(prams) {
  var divWarp = $('<div class="BoxWrapb"/>');
  var divW = $('<div class="BoxWb"/>');
  var divContent = $('<div class = "hornb">');
  var divlt = $('<div class = "lt">');
  var divrt = $('<div class = "rt">');
  var divrb = $('<div class = "rb">');
  var divlb = $('<div class = "lb">');
  var divTriangle = $('<div class ="triangle-down hotel-triangle-position">');
  var divFirst

  // prams.forEach(function(item) {
  if (prams.data) {
    if (prams.seriesName[7] == 0) {
      var daya = $('<p>').text(' ' + ' 权重 ： ' + parseFloat(prams.value).toFixed(2)).css({ "color": "rgba(60,65,60,0.9)", "fontSize": "18px" })
      // var dat = $('<p>').text(' ' + ' 权重： ' + ' : ' + parseFloat(prams.data.reweight).toFixed(2)).css({ "color": "rgba(60,65,60,0.7)", "fontSize": "15px" })
      var span = $('<p>').text(" " + " " + ' O ' + prams.name).css("color", prams.color).css("fontSize", "22px");
    }
    else if (prams.seriesName[7] == 1) {
      var daya = $('<p>').text(' ' + ' 价格 ： ' + parseFloat(prams.value).toFixed(2)).css({ "color": "rgba(60,65,60,0.9)", "fontSize": "18px" })
      // var dat = $('<p>').text(' ' + ' 权重： ' + ' : ' + parseFloat(prams.data.reweight).toFixed(2)).css({ "color": "rgba(60,65,60,0.7)", "fontSize": "15px" })
      var span = $('<p>').text(" " + " " + ' O ' + prams.name).css("color", prams.color).css("fontSize", "22px");
    }
    divFirst = divContent.append(span).append(daya)
  }
  // });
  divFirst = divContent.append(divlt).append(divrt).append(divrb).append(divlb);
  var div = divWarp.append(divFirst).append(divTriangle);
  var div = divW.append(divWarp)
  return div.html()
}

var colors = ['rgb(110,0,0)', 'rgb(150,0,0)', 'rgb(190,0,0)', 'rgb(255,0,0)'];
var bgColor = '#2E2733';
dom1 = document.getElementById("downrightbody");
var myChart2 = echarts.init(dom1);
var app = {};
option1 = null;
//     data=nodelist["children"]
option1 = {
  color: mcolor,
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(170,200,200,0.7)',
    formatter: function (prams) {

      return tipFormattersun(prams);
    },
    padding: [0, 0],
  },
  series: [
    {
      // 
      center: ['50%', '50%'],
      type: 'sunburst',
      radius: [0, '50%'],
      minAngle: 7,
      label: {
        rotate: 'radial',
        color: "#666",
        opacity: 0
      },
      itemStyle: {
        borderColor: "white",
        borderWidth: 2,
        // color: "rgb(245,208,190)",
        //  color: "transparent"
      },
      levels: [{}, {
        r0: '5%',
        r: "20%",
        itemStyle: {
          //  emphasis: true,
          shadowBlur: 7,
          shadowColor: mcolor[3],
          // color: "rgb(245,208,190)",
        },
        label: {
          rotate: "radial",
          textShadowBlur: 5,
          textShadowColor: '#000',
          // opacity: 0
        }
      }, {
        r0: "20%",
        r: "35%",
        itemStyle: {
          shadowBlur: 10,
          shadowColor: mcolor[3],
          // color: "rgb(245,208,190)",
          // color: 'transparent'
        },
        label: {
          rotate: 'radial',
          // fontSize: 10,
          textShadowBlur: 5,
          textShadowColor: '#000',
          // opacity: 0
          // color: bgColor
        }
      }, {
        r0: "35%",
        r: "45%",
        itemStyle: {
          shadowBlur: 80,
          shadowColor: mcolor[0],
          // color: colors[3],
        },
        label: {
          position: 'outside',
          textShadowBlur: 5,
          textShadowColor: '#000',
          // opacity: 0
        },
        downplay: {
          label: {
            opacity: 0
          }
        }
      }]
    },
    {
      type: 'pie',
      hoverAnimation: false,
      minAngle: 7,
      roseType: 'radius',
      radius: ['50%', '80%'],
      data: [
      ],

    }
  ]
};

function drawsun(name, list, day, namelist, idlist) {
  $("#myChart2").removeAttr("_echarts_instance_").empty();
  var id = namelist[name] + '';
  var list1 = JSON.parse(JSON.stringify(list))
  for (i in list1) {
    for (j in namelist) {
      var fid = namelist[j] + ""
      var tid = fid[0] + fid[1] + fid[2];
      if (fid.length == 5) {
        var vv = list1[i]["children"]
          .find(function (x) { return x.name == idlist[fid[0]]; })["children"]
          .find(function (x) { return x.name == idlist[tid]; })["children"]
          .find(function (x) { return x.name == idlist[fid]; })["reweight"]
        var ww = list1[i]["children"]
          .find(function (x) { return x.name == idlist[fid[0]]; })["children"]
          .find(function (x) { return x.name == idlist[tid]; })["reweight"]
        var xx = list1[i]["children"]
          .find(function (x) { return x.name == idlist[fid[0]]; })["reweight"]
        if (vv != '') {
          list1[i]["children"]
            .find(function (x) { return x.name == idlist[fid[0]]; })["children"]
            .find(function (x) { return x.name == idlist[tid]; })["children"]
            .find(function (x) { return x.name == idlist[fid]; })["value"] = (parseFloat(vv) / 100) * (parseFloat(ww) / 100) * (parseFloat(xx))
        }
        else {
          list1[i]["children"]
            .find(function (x) { return x.name == idlist[fid[0]]; })["children"]
            .find(function (x) { return x.name == idlist[tid]; })["children"]
            .find(function (x) { return x.name == idlist[fid]; })["value"] = 0;
        }
      }
      if (fid.length == 3) {
        var vv = list1[i]["children"]
          .find(function (x) { return x.name == idlist[fid[0]]; })["children"]
          .find(function (x) { return x.name == idlist[tid]; })["reweight"]
        var xx = list1[i]["children"]
          .find(function (x) { return x.name == idlist[fid[0]]; })["reweight"]
        if (vv != '') {
          list1[i]["children"]
            .find(function (x) { return x.name == idlist[fid[0]]; })["children"]
            .find(function (x) { return x.name == idlist[tid]; })["value"] = (parseFloat(vv) / 100) * (parseFloat(xx))
        }
        else {
          list1[i]["children"]
            .find(function (x) { return x.name == idlist[fid[0]]; })["children"]
            .find(function (x) { return x.name == idlist[tid]; })["value"] = 0;
        }
      }
      if (fid.length == 1) {
        var vv = list1[i]["children"]
          .find(function (x) { return x.name == idlist[fid[0]]; })["reweight"]
        if (vv != '') {
          list1[i]["children"]
            .find(function (x) { return x.name == idlist[fid[0]]; })["value"] = parseFloat(vv)
        }
        else {
          list1[i]["children"]
            .find(function (x) { return x.name == idlist[fid[0]]; })["value"] = 0;
        }
      }
    }
  }

  var da = [];
  if (name == "tea") {
    for (i in idlist) {
      if (i.length == 5) {
        var val = list1[day]['children']
          .find(function (x) { return x.name == idlist[i[0]]; })["children"]
          .find(function (x) { return x.name == idlist[i[0] + i[1] + i[2]]; })["children"]
          .find(function (x) { return x.name == idlist[i]; })["price"]
        if (val != null) {
          var temo = {}
          temo["name"] = idlist[i]
          temo['value'] = val
          da.push(temo)
        }

      }
    }
  }

  else if (id.length == 1) {
    for (i in idlist) {
      if (i.length == 5 && i[0] == id) {
        var val = list1[day]['children']
          .find(function (x) { return x.name == idlist[i[0]]; })["children"]
          .find(function (x) { return x.name == idlist[i[0] + i[1] + i[2]]; })["children"]
          .find(function (x) { return x.name == idlist[i]; })["price"]
        if (val != null) {
          var temo = {}
          temo["name"] = idlist[i]
          temo['value'] = val
          da.push(temo)
        }

      }
    }
  }
  else if (id.length == 3) {
    for (i in idlist) {
      if (i.length == 5 && (i[0] + i[1] + i[2]) == id) {
        var val = list1[day]['children']
          .find(function (x) { return x.name == idlist[i[0]]; })["children"]
          .find(function (x) { return x.name == idlist[i[0] + i[1] + i[2]]; })["children"]
          .find(function (x) { return x.name == idlist[i]; })["price"]
        if (val != null) {
          var temo = {}
          temo["name"] = idlist[i]
          temo['value'] = val
          da.push(temo)
        }

      }
    }
  }
  else if (id.length == 5) {
    for (i in idlist) {
      if (i.length == 5 && i == id) {
        var val = list1[day]['children']
          .find(function (x) { return x.name == idlist[i[0]]; })["children"]
          .find(function (x) { return x.name == idlist[i[0] + i[1] + i[2]]; })["children"]
          .find(function (x) { return x.name == idlist[i]; })["price"]
        if (val != null) {
          var temo = {}
          temo["name"] = idlist[i]
          temo['value'] = val
          da.push(temo)
        }

      }
    }
  }
  option1.series[1].data = da

  sid = id[0] + id[1] + id[2]
  if (name == "tea") {
    option1.series[0].data = list1[day]["children"]
  }

  else if (id.length == 1) {
    option1.series[0].data = list1[day]["children"]
      .find(function (x) { return x.name == idlist[id[0]]; })["children"]
  }
  else if (id.length == 3) {
    option1.series[0].data = list1[day]["children"]
      .find(function (x) { return x.name == idlist[id[0]]; })["children"]
      .find(function (x) { return x.name == idlist[sid]; })["children"]
    myChart2.setOption(option1, true);
  }
  else if (id.length == 5) {
    option1.series[0].data = list1[day]["children"]
      .find(function (x) { return x.name == idlist[id[0]]; })["children"]
      .find(function (x) { return x.name == idlist[sid]; })["children"]
  }
  myChart2.setOption(option1, true);
}


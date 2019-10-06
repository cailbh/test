var dd = [];
var j = 0;
var data = [];
//边框的颜色
var linecolor = "#1E90FF";
var textcolor = "#777"
//用于填充的颜色
var fillcolor = "rgba(204, 238, 255, .1)";
var dotcolor = "gray";
var date = ["3-1", "3-2", "3-3", "3-4", "3-5", "3-6", "3-7", "3-8",
        "3-9", "3-10", "3-11", "3-12", "3-13", "3-14", "3-15", "3-16", "3-17",
        "3-18", "3-19", "3-20", "3-21", "3-22", "3-23", "3-24", "3-25", "3-26",
        "3-27", "3-28", "3-29", "3-30", "3-31", "4-1", "4-2", "4-3", "4-4", "4-5",
        "4-6", "4-7", "4-8", "4-9", "4-10", "4-11", "4-12", "4-13", "4-14", "4-15",
        "4-16", "4-17", "4-18", "4-19", "4-20"];
var dateline = [];
var i, j;
for (i in date) {
        for (j in date) {
                var a = [];
                a.push(date[i], 0);
        }
        dateline.push(a);
}

d3.csv("data/number.csv", function (Name_data) {
        d3.csv("data/new_xl.csv", function (newdata) {
                NEWDATA = JSON.parse(JSON.stringify(newdata))
                var namelist = {}
                for (i in Name_data) {
                        namelist[Name_data[i].name] = Name_data[i].id;
                }
                var idlist = {}
                for (i in Name_data) {
                        idlist[Name_data[i].id] = Name_data[i].name;
                }

                var Thirdlist = {}
                var datathr = []
                for (i in newdata) {
                        var name = '';
                        name += newdata[i].三级类别;
                        if (Thirdlist[name] == null) {
                                var tem = []
                                tem.l = 1;
                                if (name != '' && name != "三级类别")
                                        Thirdlist[name] = tem;
                        }
                }

                for (name in Thirdlist) {
                        var j = 0;
                        var dd = [];
                        for (var i in newdata) {
                                var temp = [];
                                if (newdata[i].三级类别 == name) {
                                        temp[0] = date[j];
                                        temp[1] = newdata[i].平均价格 / newdata[i].基期价格;
                                        temp[2] = namelist[newdata[i].三级类别];
                                        j++;
                                        if (temp[1] != 0) {
                                                dd.push(temp);
                                        }

                                }
                        }
                        if (dd.length > 1) {
                                datathr.push(dd);
                        }

                }

                var seclist = {};

                var ab;
                var te = 'sale'
                for (i in newdata) {
                        var s = ""
                        var dd = newdata[i];
                        var name = dd.三级类别
                        var id = namelist[name] + "";
                        s = id[0] + id[1] + id[2];
                        var tt = seclist[s];
                        if (seclist[s] == null) {
                                seclist[s] = {};
                        }
                        if (name == "三级类别") {
                                break;
                        }
                        if (seclist[s][te] == null) {
                                seclist[s][te] = parseInt(dd.三级销售额);

                        }
                        else {

                                seclist[s][te] = parseInt(seclist[s][te]) + parseInt(dd.三级销售额);

                        }

                }
                var te = '3月1日调整权重之和'
                for (i in newdata) {
                        var s = ""
                        var dd = newdata[i];
                        var name = dd.三级类别
                        var id = namelist[dd.三级类别] + "";
                        s = id[0] + id[1] + id[2];
                        var tt = seclist[s];
                        if (name == "三级类别") {
                                var str = dd.a3月1日销售额 + ""
                                te = str[0] + str[1] + str[2] + str[3] + "调整权重之和"
                        }
                        if (tt[te] == null) {
                                if (dd.a3月1日销售额 == "") {
                                        seclist[s][te] = 0
                                }
                                else {
                                        seclist[s][te] = parseInt(dd.三级销售额) / parseInt(seclist[s]["sale"]);
                                }
                        }
                        else {
                                if (dd.a3月1日销售额 == "") {
                                }
                                else {
                                        seclist[s][te] += parseInt(dd.三级销售额) / parseInt(seclist[s]["sale"]);
                                }
                        }
                }

                var te = '3.1日sum'
                for (i in newdata) {
                        var s = ""
                        var dd = newdata[i];
                        var name = dd.三级类别
                        var id = namelist[name] + "";
                        s = id[0] + id[1] + id[2];
                        var tt = seclist[s];
                        if (name == "三级类别") {
                                var str = dd.a3月1日销售额 + ""
                                te = str[0] + "." + str[2] + str[3] + "sum"
                        }
                        if (tt[te] == null) {
                                seclist[s][te] = (dd.平均价格 / dd.基期价格) * (dd.三级销售额 / seclist[s]["sale"]);
                        }
                        else {
                                seclist[s][te] += (dd.平均价格 / dd.基期价格) * (dd.三级销售额 / seclist[s]["sale"])
                        }
                }

                var te = '3.1'
                var datasec = []
                for (i in seclist) {
                        var h = 0;
                        var xw = []
                        for (j in seclist[i]) {
                                var ss = j + "";
                                var sjj = ss[0] + "." + ss[2] + ss[3] + "sum";
                                if (ss[1] == "月") {
                                        var xww = []
                                        xww[0] = date[h];
                                        h++;
                                        te = ss[0] + "." + ss[2] + ss[3] + "index"
                                        seclist[i][te] = seclist[i][sjj] / seclist[i][ss];
                                        xww[1] = seclist[i][te]
                                        xww[2] = i;
                                        if (seclist[i][ss] != 0) {
                                                xw.push(xww);
                                        }
                                }
                        }
                        if (xw.length > 1) {
                                datasec.push(xw);
                        }

                }
                datasec.pop()


                var firlist = {}
                var te = 'sale'
                for (i in seclist) {
                        var s = ""
                        var tt = seclist[i];
                        var id = i;
                        s = id[0];
                        if (firlist[s] == null) {
                                firlist[s] = {};
                        }
                        if (firlist[s][te] == null) {
                                firlist[s][te] = seclist[i]["sale"];

                        }
                        else {

                                firlist[s][te] += seclist[i]["sale"];

                        }
                }

                for (i in seclist) {
                        var h = 0;
                        var xw = []
                        for (j in seclist[i]) {
                                var ss = j + "";
                                var sjj = ss[0] + "月" + ss[2] + ss[3] + "changes";
                                var ind = ss[0] + "." + ss[2] + ss[3] + "index"
                                if (ss[1] == "月") {
                                        if (isNaN(seclist[i][ind]) == false) {
                                                if (firlist[i[0]][sjj] == null) {
                                                        firlist[i[0]][sjj] = seclist[i]["sale"] / firlist[i[0]]["sale"]
                                                }
                                                else {
                                                        firlist[i[0]][sjj] += seclist[i]["sale"] / firlist[i[0]]["sale"]
                                                }
                                        }
                                }

                        }
                }
                for (i in seclist) {
                        var h = 0;
                        var xw = []
                        for (j in seclist[i]) {
                                var ss = j + "";
                                var sjj = ss[0] + "." + ss[2] + ss[3] + "sum";
                                var ind = ss[0] + "." + ss[2] + ss[3] + "index"
                                if (ss[1] == "月") {
                                        if (isNaN(seclist[i][ind]) == false) {
                                                if (firlist[i[0]][sjj] == null) {
                                                        firlist[i[0]][sjj] = seclist[i][ind] * (seclist[i]["sale"] / firlist[i[0]]["sale"]);
                                                }
                                                else {
                                                        firlist[i[0]][sjj] += seclist[i][ind] * (seclist[i]["sale"] / firlist[i[0]]["sale"])
                                                }
                                        }
                                }

                        }
                }
                var te = '3.1'
                var datafir = []
                var totallist = {}
                totallist["sale"] = 0;
                for (i in firlist) {
                        if (isNaN(firlist[i]["sale"]) == false) { totallist["sale"] += firlist[i]["sale"] }
                        var h = 0;
                        var xw = []
                        for (j in firlist[i]) {
                                var ss = j + "";
                                var sjj = ss[0] + "." + ss[2] + ss[3] + "sum";
                                if (ss[1] == "月") {
                                        var xww = []
                                        xww[0] = date[h];
                                        h++;
                                        te = ss[0] + "." + ss[2] + ss[3] + "index"
                                        firlist[i][te] = firlist[i][sjj] / firlist[i][ss];
                                        xww[1] = firlist[i][te]
                                        xww[2] = i;
                                        if (firlist[i][ss] != 0) {
                                                xw.push(xww);
                                        }
                                }
                        }
                        if (xw.length > 1) {
                                datafir.push(xw);
                        }

                }
                for (i in firlist) {
                        var h = 0;
                        var xw = []
                        for (j in firlist[i]) {
                                var ss = j + "";
                                var sjj = ss[0] + "月" + ss[2] + ss[3] + "changes";
                                var ind = ss[0] + "." + ss[2] + ss[3] + "index"
                                if (ss[1] == "月") {
                                        if (isNaN(firlist[i][ind]) == false) {
                                                if (totallist[sjj] == null) {
                                                        totallist[sjj] = firlist[i]["sale"] / totallist["sale"]
                                                }
                                                else {
                                                        totallist[sjj] += firlist[i]["sale"] / totallist["sale"]
                                                }
                                        }
                                }

                        }
                }

                for (i in firlist) {
                        var h = 0;
                        var xw = []
                        for (j in firlist[i]) {
                                var ss = j + "";
                                var sjj = ss[0] + "." + ss[2] + ss[3] + "sum";
                                var ind = ss[0] + "." + ss[2] + ss[3] + "index"
                                if (ss[1] == "月") {
                                        if (isNaN(firlist[i][ind]) == false) {
                                                if (totallist[sjj] == null) {
                                                        totallist[sjj] = firlist[i][ind] * (firlist[i]["sale"] / totallist["sale"]);
                                                }
                                                else {
                                                        totallist[sjj] += firlist[i][ind] * (firlist[i]["sale"] / totallist["sale"])
                                                }
                                        }
                                }

                        }
                }
                var te = '3.1'
                var dataall = []
                var h = 0;
                var xw = []
                for (j in totallist) {
                        var ss = j + "";
                        var sjj = ss[0] + "." + ss[2] + ss[3] + "sum";
                        if (ss[1] == "月") {
                                var xww = []
                                xww[0] = date[h];
                                h++;
                                te = ss[0] + "." + ss[2] + ss[3] + "index"
                                totallist[te] = totallist[sjj] / totallist[ss];
                                xww[1] = totallist[te]
                                xww[2] = 0
                                if (totallist[ss] != 0) {
                                        xw.push(xww);
                                }
                        }

                }
                if (xw.length > 0) {
                        dataall = xw;
                }
                DATAALL = JSON.parse(JSON.stringify(dataall))
                DATAFIR = JSON.parse(JSON.stringify(datafir))
                DATASEC = JSON.parse(JSON.stringify(datasec))
                DATATHR = JSON.parse(JSON.stringify(datathr))
                trees('茶', GLOBAL_DATA, '2018-3-1', namelist, idlist);
                drawsun('tea', GLOBAL_DATA, '2018-3-1', namelist, idlist);
                drawstack('茶', GLOBAL_DATA, '2018-3-1', '2018-4-20', namelist, idlist)
                creatTable('茶', '2018-3-1', '指数', false);
                d3.selectAll('a').on('click', function () {

                        TEXT = this.text;
                        creatTable(CURRENT_NAME, CURRENT_DATE, TEXT, false);
                });
                var CH;
                function creatTable(name, day, atext, flag) {
                        var ind, wei, bas, basel, basee, pri, chi = 0, nam;
                        var aa = JSON.parse(JSON.stringify(GLOBAL_DATA))
                        var nn = namelist[name] + "";
                        if (namelist[name] == 0) {
                                var occ = [];
                                for (i = 1; i <= 7; i++) {
                                        var count = aa[day]["children"][i]["children"].length;
                                        var cc;
                                        var ccc;
                                        var oc = [];
                                        for (j = 0; j < count; j++) {
                                                cc = aa[day]["children"][i]
                                                ["children"][j]["children"].length;
                                                ccc = aa[day]["children"][i]
                                                ["children"][j]["children"];
                                                oc = oc.concat(ccc);
                                                chi = chi + cc;
                                        }
                                        occ = occ.concat(oc);
                                }

                        }
                        if (nn.length == 1) {
                                var count = aa[day]["children"].find(function (x) { return x.name == idlist[namelist[name].substring(0, 1)]; })
                                ["children"].length;
                                var cc;
                                var ccc;
                                var oc = [];
                                for (i = 0; i < count; i++) {
                                        cc = aa[day]["children"].find(function (x) { return x.name == idlist[namelist[name].substring(0, 1)]; })
                                        ["children"][i]["children"].length;
                                        ccc = aa[day]["children"].find(function (x) { return x.name == idlist[namelist[name].substring(0, 1)]; })
                                        ["children"][i]["children"];
                                        oc = oc.concat(ccc);
                                        chi = chi + cc;
                                }
                        }
                        if (nn.length == 3) {
                                chi = aa[day]["children"].find(function (x) { return x.name == idlist[namelist[name].substring(0, 1)]; })
                                ["children"].find(function (x) { return x.name == idlist[namelist[name].substring(0, 3)]; })
                                ["children"].length;
                        }
                        if (nn.length == 5) {
                                chi = 1;
                        }
                        CH=chi;
                        var tablehead = '<table border=1>';
                        var head = [];
                        if (flag == false) {
                                if (atext == '指数') {
                                        head = ['名称', '指数/%'];
                                }
                                else if (atext == '权重') {
                                        head = ['名称', '权重/%'];
                                }
                                else if (atext == '基期销售量') {
                                        head = ['名称', '基期销售量/kg'];
                                }
                                else if (atext == '基期销售额') {
                                        head = ['名称', '基期销售额/万元'];
                                }
                                else if (atext == '基期价格') {
                                        head = ['名称', '基期价格/元'];
                                }
                                else if (atext == '当日平均价格') {
                                        head = ['名称', '当日平均价格/元'];
                                }
                        }
                        else {
                                head = ['名称', '指数/%', '权重/%', '基期销售量/kg', '基期销售额/万元', '基期价格/元', '当日平均价格/元'];
                        }
                        tablehead += "<tr>"
                        if (flag == false) {
                                for (i = 0; i <= 1; i++) {
                                        tablehead += "<td style='text-align:center' >" + head[i] + "</td>"
                                }
                        }
                        else {
                                for (i = 0; i <= 6; i++) {
                                        tablehead += "<td style='text-align:center' >" + head[i] + "</td>"
                                }
                        }
                        tablehead += "</tr>"
                        var tableData = '<table border=1>';
                        for (var j = 0; j < chi; j++) {
                                tableData += "<tr>"
                                if (namelist[name] == 0) {
                                        nam = occ[j].name;
                                        ind = occ[j].index
                                        wei = occ[j].weight;
                                        bas = occ[j].base;
                                        basel = occ[j].basesalel;
                                        basee = occ[j].basesalee / 10000;
                                        pri = occ[j].price;
                                        if (ind == null) {
                                                ind = 0;
                                        }
                                        if (pri == null) {
                                                pri = 0;
                                        }
                                }
                                if (nn.length == 1 && namelist[name] != 0) {
                                        nam = oc[j].name;
                                        ind = oc[j].index
                                        wei = oc[j].weight;
                                        bas = oc[j].base;
                                        basel = oc[j].basesalel;
                                        basee = oc[j].basesalee / 10000;
                                        pri = oc[j].price;
                                        if (ind == null) {
                                                ind = 0;
                                        }
                                        if (pri == null) {
                                                pri = 0;
                                        }
                                }
                                if (nn.length == 3) {
                                        nam = aa[day]["children"].find(function (x) { return x.name == idlist[namelist[name].substring(0, 1)]; })
                                        ["children"].find(function (x) { return x.name == idlist[namelist[name].substring(0, 3)]; })
                                        ["children"][j].name;
                                        ind = aa[day]["children"].find(function (x) { return x.name == idlist[namelist[name].substring(0, 1)]; })
                                        ["children"].find(function (x) { return x.name == idlist[namelist[name].substring(0, 3)]; })
                                        ["children"][j].index
                                        wei = aa[day]["children"].find(function (x) { return x.name == idlist[namelist[name].substring(0, 1)]; })
                                        ["children"].find(function (x) { return x.name == idlist[namelist[name].substring(0, 3)]; })
                                        ["children"][j].weight;
                                        bas = aa[day]["children"].find(function (x) { return x.name == idlist[namelist[name].substring(0, 1)]; })
                                        ["children"].find(function (x) { return x.name == idlist[namelist[name].substring(0, 3)]; })
                                        ["children"][j].base;
                                        basel = aa[day]["children"].find(function (x) { return x.name == idlist[namelist[name].substring(0, 1)]; })
                                        ["children"].find(function (x) { return x.name == idlist[namelist[name].substring(0, 3)]; })
                                        ["children"][j].basesalel;
                                        basee = aa[day]["children"].find(function (x) { return x.name == idlist[namelist[name].substring(0, 1)]; })
                                        ["children"].find(function (x) { return x.name == idlist[namelist[name].substring(0, 3)]; })
                                        ["children"][j].basesalee / 10000;
                                        pri = aa[day]["children"].find(function (x) { return x.name == idlist[namelist[name].substring(0, 1)]; })
                                        ["children"].find(function (x) { return x.name == idlist[namelist[name].substring(0, 3)]; })
                                        ["children"][j].price;
                                        if (ind == null) {
                                                ind = 0;
                                        }
                                        if (pri == null) {
                                                pri = 0;
                                        }
                                }
                                if (nn.length == 5) {
                                        nam = aa[day]["children"].find(function (x) { return x.name == idlist[namelist[name].substring(0, 1)]; })
                                        ["children"].find(function (x) { return x.name == idlist[namelist[name].substring(0, 3)]; })
                                        ["children"].find(function (x) { return x.name == name; }).name;
                                        ind = aa[day]["children"].find(function (x) { return x.name == idlist[namelist[name].substring(0, 1)]; })
                                        ["children"].find(function (x) { return x.name == idlist[namelist[name].substring(0, 3)]; })
                                        ["children"].find(function (x) { return x.name == name; }).index;
                                        wei = aa[day]["children"].find(function (x) { return x.name == idlist[namelist[name].substring(0, 1)]; })
                                        ["children"].find(function (x) { return x.name == idlist[namelist[name].substring(0, 3)]; })
                                        ["children"].find(function (x) { return x.name == name; }).weight;
                                        bas = aa[day]["children"].find(function (x) { return x.name == idlist[namelist[name].substring(0, 1)]; })
                                        ["children"].find(function (x) { return x.name == idlist[namelist[name].substring(0, 3)]; })
                                        ["children"].find(function (x) { return x.name == name; }).base;
                                        basel = aa[day]["children"].find(function (x) { return x.name == idlist[namelist[name].substring(0, 1)]; })
                                        ["children"].find(function (x) { return x.name == idlist[namelist[name].substring(0, 3)]; })
                                        ["children"].find(function (x) { return x.name == name; }).basesalel;
                                        basee = (aa[day]["children"].find(function (x) { return x.name == idlist[namelist[name].substring(0, 1)]; })
                                        ["children"].find(function (x) { return x.name == idlist[namelist[name].substring(0, 3)]; })
                                        ["children"].find(function (x) { return x.name == name; }).basesalee) / 10000;
                                        pri = aa[day]["children"].find(function (x) { return x.name == idlist[namelist[name].substring(0, 1)]; })
                                        ["children"].find(function (x) { return x.name == idlist[namelist[name].substring(0, 3)]; })
                                        ["children"].find(function (x) { return x.name == name; }).price;
                                        if (ind == null) {
                                                ind = 0;
                                        }
                                        if (pri == null) {
                                                pri = 0;
                                        }
                                }
                                if (flag == false) {
                                        for (var i = 0; i <= 1; i++) {
                                                var datatable = []
                                                if (atext == '指数') {
                                                        datatable.push(nam, ind);
                                                }
                                                else if (atext == '权重') {
                                                        datatable.push(nam, wei)
                                                }
                                                else if (atext == '基期销售量') {
                                                        datatable.push(nam, basel)
                                                }
                                                else if (atext == '基期销售额') {
                                                        datatable.push(nam, basee)
                                                }
                                                else if (atext == '基期价格') {
                                                        datatable.push(nam, bas)
                                                }
                                                else if (atext == '当日平均价格') {
                                                        datatable.push(nam, pri)
                                                }

                                        }
                                }
                                else {
                                        for (var i = 0; i <= 6; i++) {
                                                var datatable = []
                                                datatable.push(nam, ind, wei, basel, basee, bas, pri);


                                        }
                                }
                                //动态增加5个td,并且把data数组的五个值赋给每个td
                                if (flag == false) {
                                        for (var i = 0; i <= 1; i++) {
                                                if (atext == '指数' || atext == '权重' || atext == '基期价格') {
                                                        tableData += "<td style='text-align:center' contentEditable='false'>" + datatable[i] + "</td>"
                                                }
                                                else {
                                                        tableData += "<td style='text-align:center' contentEditable='true'>" + datatable[i] + "</td>"
                                                }
                                        }
                                }
                                else {
                                        for (var i = 0; i <= 6; i++) {
                                                if (atext == '指数' || atext == '权重' || atext == '基期价格') {
                                                        tableData += "<td style='text-align:center;width:100px;' contentEditable='false'>" + datatable[i] + "</td>"
                                                }
                                                else {
                                                        tableData += "<td style='text-align:center;width:100px;' contentEditable='true'>" + datatable[i] + "</td>"
                                                }
                                        }
                                }
                                tableData += "</tr>"
                        }
                       
                        //现在tableData已经生成好了，把他赋值给上面的tbody
                        $("#tbody1").html(tablehead)
                        $("#tbody2").html(tableData)
                        bgcolor(atext);
                }
                function bgcolor(text){
                        var color = d3.interpolate('#ccff90', '#00e676');		//颜色插值函数
                        var linear = d3.scale.linear()
                .domain([0, 1])
                .range([0, 1]);
                var indall=0,weiall=0,baselall=0,baseeall=0,basall=0,priall=0;
                        for(i=0;i<CH;i++){
                                if (text == '指数') {
                                        indall=indall+parseFloat(document.getElementById("tbody2").rows[i].cells[1].innerHTML);
                                }
                                else if (text == '权重') {
                                        weiall=weiall+parseFloat(document.getElementById("tbody2").rows[i].cells[1].innerHTML);
                                }
                                else if (text == '基期销售量') {
                                        baselall=baselall+parseFloat(document.getElementById("tbody2").rows[i].cells[1].innerHTML);
                                }
                                else if (text == '基期销售额') {
                                        baseeall=baseeall+parseFloat(document.getElementById("tbody2").rows[i].cells[1].innerHTML);
                                }
                                else if (text == '基期价格') {
                                        basall=basall+parseFloat(document.getElementById("tbody2").rows[i].cells[1].innerHTML);
                                }
                                else if (text == '当日平均价格') {
                                        priall=priall+parseFloat(document.getElementById("tbody2").rows[i].cells[1].innerHTML);
                                }
                        }
                        var indallp=0,weiallp=0,baselallp=0,baseeallp=0,basallp=0,priallp=0;
                        for(i=0;i<CH;i++){
                                if (text == '指数') {
                                        indallp=(parseFloat(document.getElementById("tbody2").rows[i].cells[1].innerHTML)/indall*100).toFixed(0);
                                        document.getElementById("tbody2").rows[i].cells[1].style.background
                                        =sw(indallp);
                                }
                                else if (text == '权重') {
                                        weiallp=(parseFloat(document.getElementById("tbody2").rows[i].cells[1].innerHTML)/weiall*100).toFixed(0);
                                        document.getElementById("tbody2").rows[i].cells[1].style.background
                                        =sw(weiallp);
                                }
                                else if (text == '基期销售量') {
                                        baselallp=(parseFloat(document.getElementById("tbody2").rows[i].cells[1].innerHTML)/baselall*100).toFixed(0);
                                        document.getElementById("tbody2").rows[i].cells[1].style.background
                                        =sw(baselallp);
                                }
                                else if (text == '基期销售额') {
                                        baseeallp=(parseFloat(document.getElementById("tbody2").rows[i].cells[1].innerHTML)/baseeall*100).toFixed(0);
                                        document.getElementById("tbody2").rows[i].cells[1].style.background
                                        =sw(baseeallp);
                                }
                                else if (text == '基期价格') {
                                        basallp=(parseFloat(document.getElementById("tbody2").rows[i].cells[1].innerHTML)/basall*100).toFixed(0);
                                        document.getElementById("tbody2").rows[i].cells[1].style.background
                                        =sw(basallp);
                                }
                                else if (text == '当日平均价格') {
                                        priallp=(parseFloat(document.getElementById("tbody2").rows[i].cells[1].innerHTML)/priall*100).toFixed(0);
                                        document.getElementById("tbody2").rows[i].cells[1].style.background
                                        =sw(priallp);
                                }
                        }
                }
                var rowIdx, temm;
                document.onclick = function (e) {
                        var e = e || window.event;
                        var target = e.target || e.srcElement;
                        if (target.tagName.toLowerCase() === "td") {
                                rowIdx = target.parentNode.rowIndex - 1;
                                temm = document.getElementById("tbody2").rows[rowIdx].cells[1].innerHTML;
                        }
                };
                d3.select('.app').on('click', function () {
                        var edit = document.getElementById("tbody2").rows[rowIdx].cells[1].innerHTML;
                        var na = document.getElementById("tbody2").rows[rowIdx].cells[0].innerHTML;
                        pro(newdata, date1, CURRENT_DATE, na, TEXT, edit);
                        drawsun(CURRENT_NAME, GLOBAL_DATA, CURRENT_DATE, namelist, idlist)
                        trees(CURRENT_NAME, GLOBAL_DATA, CURRENT_DATE, namelist, idlist)
                        drawstack(CURRENT_NAME, GLOBAL_DATA, '2018-3-1', '2018-4-20', namelist, idlist)
                })
                d3.select('.can').on('click', function () {
                        document.getElementById("tbody2").rows[rowIdx].cells[1].innerHTML = temm;
                })
                d3.select('.download').on('click', function () {
                        creatTable(CURRENT_NAME, CURRENT_DATE, TEXT, true);
                        Export();
                        creatTable(CURRENT_NAME, CURRENT_DATE, TEXT, false);
                })
                function Export() {
                        $("table").table2excel({            //exceltable为存放数据的table
                                exclude: ".noExl",
                                name: "Excel Document Name",
                                filename: CURRENT_DATE + '日茶叶数据',
                                exclude_img: true,
                                exclude_links: true,
                                exclude_inputs: true
                        });
                }
                document.querySelector('.ud').addEventListener('change', e => {
                        for (let entry of e.target.files) {
                        }
                });


                $(function () {
                        // $('.item-1').click(function(){
                        //         $(this).parent().find(".nav-second").slideToggle(500);
                        //         $(this).children('i').toggleClass('fold');
                        // });
                        // $('.item-2').click(function(){
                        //         $(this).parent().find(".nav-three").slideToggle(500);
                        //         $(this).children('i').toggleClass('fold');
                        // });
                        // $('.item-3').click(function(){
                        //         $(this).parent().find(".nav-four").slideToggle(500);
                        //         $(this).children('i').toggleClass('fold');
                        // });

                        var setting = {
                                callback: {
                                        onClick: zTreeOnClick
                                }
                        };
                        var zTreeNodes = [
                                {
                                        name: "茶", children: [
                                                {
                                                        name: "绿茶", children: [
                                                                {
                                                                        name: "名优绿茶", children: [
                                                                                { name: "巴山雀舌" },
                                                                                { name: "邓村绿茶" },
                                                                                { name: "峨眉山茶" },
                                                                                { name: "贵州针" },
                                                                                { name: "汉中仙毫" },
                                                                                { name: "黄山毛峰" },
                                                                                { name: "金坛雀舌" },
                                                                                { name: "卷曲形茶" },
                                                                                { name: "六安瓜片" },
                                                                                { name: "马边绿茶" },
                                                                                { name: "茅山青锋" },
                                                                                { name: "湄潭翠芽" },
                                                                                { name: "湄潭毛峰" },
                                                                                { name: "蒙顶甘露" },
                                                                                { name: "蒙顶山茶" },
                                                                                { name: "蒲江雀舌" },
                                                                                { name: "钱塘龙井" },
                                                                                { name: "四川扁形茶" },
                                                                                { name: "松阳扁茶" },
                                                                                { name: "松阳香茶" },
                                                                                { name: "条形茶" },
                                                                                { name: "五峰绿茶" },
                                                                                { name: "信阳毛尖" },
                                                                                { name: "宜宾早茶" },
                                                                                { name: "永川秀芽" },
                                                                                { name: "越州龙井" }
                                                                        ]
                                                                },
                                                                {
                                                                        name: "大宗绿茶", children: [
                                                                                { name: "炒青绿茶" },
                                                                                { name: "烘青绿茶" },
                                                                                { name: "蒸青绿茶" }
                                                                        ]
                                                                }
                                                        ]
                                                },
                                                {
                                                        name: "红茶", children: [
                                                                {
                                                                        name: "工夫红茶", children: [
                                                                                { name: "川红工夫" },
                                                                                { name: "滇红工夫" },
                                                                                { name: "宜红工夫" },
                                                                                { name: "昭平红" },
                                                                                { name: "遵义红" }
                                                                        ]
                                                                },
                                                                {
                                                                        name: "小种红茶", children: [
                                                                                { name: "松阳红茶" }
                                                                        ]
                                                                },
                                                                {
                                                                        name: "红碎茶", children: [
                                                                                { name: "南川红碎茶" }
                                                                        ]
                                                                }
                                                        ]
                                                },
                                                {
                                                        name: "乌龙茶", children: [
                                                                {
                                                                        name: "闽南乌龙", children: [
                                                                                { name: "安溪铁观音" },
                                                                                { name: "黄金桂" }
                                                                        ]
                                                                }
                                                        ]
                                                },
                                                {
                                                        name: "黑茶", children: [
                                                                {
                                                                        name: "安化黑茶", children: [
                                                                                { name: "茯砖" },
                                                                                { name: "黑砖" },
                                                                                { name: "千两" },
                                                                                { name: "三尖" }
                                                                        ]
                                                                },
                                                                {
                                                                        name: "四川黑茶", children: [
                                                                                { name: "康砖" }
                                                                        ]
                                                                }
                                                        ]
                                                },
                                                {
                                                        name: "白茶", children: [
                                                                {
                                                                        name: "白毫银针", children: [
                                                                                { name: "白毫银针" }
                                                                        ]
                                                                },
                                                                {
                                                                        name: "新工艺白茶", children: [
                                                                                { name: "新工艺白茶" }
                                                                        ]
                                                                }
                                                        ]
                                                },
                                                {
                                                        name: "黄茶", children: [
                                                                {
                                                                        name: "黄芽茶", children: [
                                                                                { name: "蒙顶黄芽" }
                                                                        ]
                                                                }
                                                        ]
                                                },
                                                {
                                                        name: "花茶", children: [
                                                                {
                                                                        name: "茉莉花茶", children: [
                                                                                { name: "四川茉莉花茶" }
                                                                        ]
                                                                }
                                                        ]
                                                }
                                        ]
                                }
                        ];
                        $("#slider").slider({
                                value: 0,
                                min: 0,
                                max: 50
                        })
                        $("#slider").on("slidechange", function (event, ui) {
                                var selection = $("#slider").slider("value");

                                CURRENT_DATE = date[selection];
                                d3.select("#uprighta").style('left', function () {
                                        return (22.3 + selection * 100 / 68.2) + '%';
                                })

                                if (CURRENT_NAME == 'tea') {
                                        dr = '茶';
                                }
                                else {
                                        dr = CURRENT_NAME
                                }
                                creatTable(CURRENT_NAME, CURRENT_DATE, TEXT, false);
                                drawsun(CURRENT_NAME, GLOBAL_DATA, CURRENT_DATE, namelist, idlist)
                                trees(CURRENT_NAME, GLOBAL_DATA, CURRENT_DATE, namelist, idlist)
                                d3.select('#cd').text(function (d) {
                                        return 'Current Date : ' + CURRENT_DATE;
                                })
                                d3.select('#cn').text(function (d) {
                                        return 'Current Name : ' + dr;
                                })


                        })

                        $.fn.zTree.init($("#tree"), setting, zTreeNodes);
                        var tree = document.getElementById("tree");
                        tree.style.overflow = "visible";
                        function zTreeOnClick(event, treeId, treeNode) {
                                d3.select("#upmiddlebody").select("svg").remove();

                                dr = treeNode.name;
                                if (dr == '茶') {
                                        CURRENT_NAME = 'tea';
                                }
                                else {
                                        CURRENT_NAME = dr
                                }

                                d3.select('#cd').text(function (d) {
                                        return 'Current Date : ' + CURRENT_DATE;
                                })
                                d3.select('#cn').text(function (d) {
                                        return 'Current Name : ' + dr;
                                })
                                creatTable(CURRENT_NAME, CURRENT_DATE, TEXT, false);
                                drawsun(CURRENT_NAME, GLOBAL_DATA, CURRENT_DATE, namelist, idlist)
                                // drawbasetree(CURRENT_NAME,GLOBAL_DATA,CURRENT_DATE,namelist,idlist)
                                trees(CURRENT_NAME, GLOBAL_DATA, CURRENT_DATE, namelist, idlist)
                                // drawsun(dr,GLOBAL_DATA,CURRENT_DATE,namelist,idlist)
                                drawstack(CURRENT_NAME, GLOBAL_DATA, '2018-3-1', '2018-4-20', namelist, idlist)
                                // if(FLAG==1){
                                // pack(CURRENT_NAME,GLOBAL_DATA,CURRENT_DATE,namelist,idlist)
                                // }
                                // drawindextree(dr,GLOBAL_DATA,CURRENT_DATE, namelist,idlist)
                                // drawbasetree(dr,GLOBAL_DATA,CURRENT_DATE, namelist,idlist)
                                // trees(dr,GLOBAL_DATA,CURRENT_DATE, namelist,idlist)
                                // $('#upleftupbody').text("名称: "+CURRENT_NAME+' '+"日期: "+CURRENT_DATE);
                                var b = namelist[dr] + "";
                                var dd = []
                                var aa = []
                                var i, j;

                        };
                });
                function datapro(namelist, idlist) {
                        // var 
                        var dd = []
                        var aa = []
                        var i, j;

                        if (CURRENT_NAME == 'tea') {
                                dd = DATAALL;
                                aa = NEW_DATAALL;
                                CURRENT_NAME = 'tea';
                                drawsun(CURRENT_NAME, aa, CURRENT_DATE, namelist, idlist)
                                if (FLAG == 0) {
                                        // drawbasetree(CURRENT_NAME,aa,CURRENT_DATE,namelist,idlist)
                                        trees(CURRENT_NAME, aa, CURRENT_DATE, namelist, idlist)
                                        // drawsun("tea",aa,CURRENT_DATE,namelist,idlist)
                                }
                                // if(FLAG==1){
                                // pack(CURRENT_NAME,aa,CURRENT_DATE,namelist,idlist)
                                // }
                        }
                        else {
                                var b = namelist[CURRENT_NAME];
                                if (b.length == 1) {
                                        for (i in DATAFIR) {
                                                for (j in DATAFIR[i]) {
                                                        if (b == DATAFIR[i][j][2]) {
                                                                dd = DATAFIR[i];
                                                                break;
                                                        }
                                                }

                                        }
                                        for (i in NEW_DATAFIR) {
                                                for (j in NEW_DATAFIR[i]) {
                                                        if (b == NEW_DATAFIR[i][j][2]) {
                                                                aa = NEW_DATAFIR[i];
                                                                break;
                                                        }
                                                }

                                        }
                                }
                                if (b.length == 3) {
                                        for (i in DATASEC) {
                                                for (j in DATASEC[i]) {
                                                        if (b == DATASEC[i][j][2]) {
                                                                dd = DATASEC[i];
                                                                break;
                                                        }
                                                }
                                        }
                                        for (i in NEW_DATASEC) {
                                                for (j in NEW_DATASEC[i]) {
                                                        if (b == NEW_DATASEC[i][j][2]) {
                                                                aa = NEW_DATASEC[i];
                                                                break;
                                                        }
                                                }

                                        }
                                }
                                if (b.length == 5) {
                                        for (i in DATATHR) {
                                                for (j in DATATHR[i]) {
                                                        if (b == DATATHR[i][j][2]) {
                                                                dd = DATATHR[i];
                                                                break;
                                                        }
                                                }
                                        }
                                        for (i in NEW_DATATHR) {
                                                for (j in NEW_DATATHR[i]) {
                                                        if (b == NEW_DATATHR[i][j][2]) {
                                                                aa = NEW_DATATHR[i];
                                                                break;
                                                        }
                                                }

                                        }
                                }
                        }


                        // draw(dd,aa);
                }
        });
});
var GLOBAL_DATA
var CURRENT_DATE = "2018-3-1"
var CURRENT_NAME = "tea"
var DATAALL
var DATAFIR
var DATASEC
var DATATHR
var clicktime = 0;
var NEW_GLOBAL_DATA
var NEW_DATAALL
var NEW_DATAFIR
var NEW_DATASEC
var NEW_DATATHR
var NEWDATA
var NEW_NEWDATA
var IND
var WEI
var BAS
var FLAG = 0;
var IDLIST
var NAMELIST
var NODE;
var TEXT = '指数';
/*使用栈stack类的实现stack*/
function STACK() {
    this.dataStore = [];//保存栈内元素，初始化为一个空数组
    this.top = 0;//栈顶位置，初始化为0
    this.push = push;//入栈
    this.pop = pop;//出栈
    this.peek = peek;//查看栈顶元素
    this.clear = clear;//清空栈
    this.length = length;//栈内存放元素的个数
}

function push(element) {
    this.dataStore[this.top++] = element;
}

function pop() {
    return this.dataStore[--this.top];
}

function peek() {
    return this.dataStore[this.top - 1];
}
function clear() {
    this.top = 0;
}

function length() {
    return this.top;
}
var OPERATING_HISTORY = new STACK();
var OPERATING_REDO = new STACK();
var CLICK_NAM
var startDelay = 10000;
var processDelay = 5000;
var showDelay = 2000;
var sortDelay = 3000;

var displayType = '';

var totalRows = 32;
var currentRow = totalRows;
var procRow = -1;

var dashProblems = 6;
var currentDash = 0;

var resultM = [
  ['Psyho', 784452.82, 756503.96],
  ['ainu7', 763020.53, 770777.63],
  ['wleite', 694660.27, 689466.75],
  ['chokudai', 670719.32, 672242.48],
  ['hirosegolf', 655122.94, 628612.87],
  ['tomerun', 649408.54, 629330.41],
  ['wata', 592028.62, 611741.43],
  ['Mojito1', 553509.95, 551956.59],
  ['ACRush', 551870.46, 531080.31],
  ['blackmath', 405075.70, 411152.37],
  ['nhzp339', 394879.84, 388210.92],
  ['colun', 352542.54, 358789.88],
];

var resultA = [
["dzhulgakov",  213.09,  604.21, "", 817.30,  213.09, "Fail", "",   213.09],
["jpaulson",  230.42,  497.38, "", 752.80,  230.42,  497.38, "",   752.80],
["theycallhimtom",  238.20,  499.46, "", 737.66,  238.20,  499.46, "",   737.66],
["RalphFurmaniak",  215.10,  517.26, "", 732.36,  215.10,  517.26, "",   732.36],
["dreamoon",  221.49,  471.66, "", 693.15,  221.49,  471.66, "",   693.15],
["icanadi",  233.57,  375.21, "", 608.78,  233.57,  375.21, "",   608.78],
["sohelH",  212.88,  316.91, "", 529.79,  212.88,  316.91, "",   529.79],
["turuthok",  162.85,  266.47, "", 429.32,  162.85,  266.47, "",   429.32],
["mikhailOK",  241.05, "Chal", "", 266.05,  241.05, "Chal", "",   266.05],
["ManS",  207.22, "", "", 257.22,  207.22, "", "",   257.22],
["jdmetz",  240.65, "Chal", "", 240.65,  240.65, "Chal", "",   240.65],
["Sumudu",  228.75, "Chal", "", 228.75,  228.75, "Chal", "",   228.75],
["Nickolas",  216.26, "", "", 216.26,  216.26, "", "",   216.26],
["alazyrabbit",  215.22, "", "", 215.22,  215.22, "", "",   215.22],
["yedtoss",  202.58, "", "", 202.58,  202.58, "", "",   202.58],
["v1vec",  146.58, "", "", 196.58,  146.58, "", "",   196.58],
["Zhiren",  191.01, "", "", 191.01,  191.01, "", "",   191.01],
["dwoolley3",  182.40, "", "", 182.40,  182.40, "", "",   182.40],
["dinix",  179.03, "", "", 179.03,  179.03, "", "",   179.03],
["_neo",  171.97, "", "", 171.97,  171.97, "", "",   171.97],
["graco",  163.25, "", "", 163.25,  163.25, "", "",   163.25],
["charredlot",  158.91, "", "", 158.91,  158.91, "", "",   158.91],
["LucyMagic",  149.84, "", "", 149.84,  149.84, "", "",   149.84],
["MiG-29",  112.63, "", "", 112.63,  112.63, "", "",   112.63],
["gingsum",  112.56, "", "", 112.56,  112.56, "", "",   112.56],
["evil_ginto",  100.83, "", "", 100.83,  100.83, "", "",   100.83],
["cindykrafft",   99.69, "", "", 99.69,   99.69, "", "",    99.69],
["degupta",   97.69, "Chal", "", 97.69,   97.69, "Chal", "",    97.69],
["d_jash",   95.65, "", "", 95.65,   95.65, "", "",    95.65],
["lperovskaya",   95.39, "", "", 95.39,   95.39, "", "",    95.39],
["jthatjd03",   93.01, "", "", 93.01,   93.01, "", "",    93.01],
["janindu",   75.00, "", "", 75.00,   75.00, "", "",    75.00]
];

var resultD = [
['hohosky',2,1,6,2,11,10,0,20,0,-10,0,0,260,],
['flexme',7,5,'',8,6,3,0,0,'',0,0,0,250,],
['Zulander',3,3,8,1,4,9,0,-10,0,60,0,0,100,],
['Yeung',4,2,4,9,9,7,0,-10,0,-10,0,0,90,],
['notpad',9,4,'',3,2,1,0,-10,'',-10,0,0,80,],
['supercharger',1,10,5,7,3,6,0,-10,0,0,0,0,40,],
['Fanazhe',8,8,3,10,8,8,0,-10,0,0,0,0,0,],
['FireIce',10,6,'',5,1,4,0,-10,'',0,100,0,0,],
['izhari',11,12,2,6,5,11,0,0,0,0,0,0,0,],
['LieutenantRoger',12,9,1,'',7,'',0,-10,0,'',0,'',0,],
['PE',6,7,7,4,10,2,0,0,0,-10,0,100,0,],
['wz12',5,1,'','','',5,0,-10,'','','',0,0,]
];

var curResults = [];

ranks = [
  '',
  '<strong class="first">1st</strong>',
  '<strong class="second">2nd</strong>',
  '<strong class="third">3rd</strong>',
  '<strong class="fourth">4th</strong>',
  '5th',
  '6th',
  '7th',
  '8th',
  '9th',
  '10th',
  '11th',
  '12th'
]

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function spanClass(text, className) {
  return '<strong class="' + className + '">' + text + '</strong>';
}

function spanAlgo(text) {
  if (text == '')
    return '';
  if (text == 'Fail')
    return spanClass('Fail', 'fail');
  return spanClass(text, 'pass');
}

function spanDash(text) {
  if (text === '')
    return '';
  if (text === 0)
    return spanClass('0', 'fail');
  if (text == '-10')
    return spanClass('-10', 'final');
  return spanClass(text, 'pass');
}

function fillM() {
  for (var i = 0; i < curResults.length; i++) {
    setText('h' + i, curResults[i][0]);
	setText('t' + i, curResults[i][1]);
  }
}

function fillA() {
  for (var i = 0; i < curResults.length; i++) {
    setText('h' + i, curResults[i][0]);
    setText('p1c' + i, curResults[i][1]);
    setText('p2c' + i, curResults[i][2]);
    setText('p3c' + i, curResults[i][3]);
	setText('t' + i, curResults[i][4]);
  }
}

function fillD() {
  for (var i = 0; i < curResults.length; i++) {
    setText('h' + i, curResults[i][0]);
    setText('p1c' + i, curResults[i][1]);
    setText('p2c' + i, curResults[i][2]);
    setText('p3c' + i, curResults[i][3]);
    setText('p4c' + i, curResults[i][4]);
    setText('p5c' + i, curResults[i][5]);
    setText('p6c' + i, curResults[i][6]);
	setText('t' + i, curResults[i][13]);
  }
}

function sortM() {
  for (var i = 0; i < curResults.length - 1; i++)
    for (var j = 0; j < curResults.length - 1; j++)
	  if (curResults[j][2] < curResults[j + 1][2]) {
	    tmp = curResults[j];
		curResults[j] = curResults[j + 1];
		curResults[j + 1] = tmp;
	  }
}

function sortD() {
  for (var i = 0; i < curResults.length - 1; i++)
    for (var j = 0; j < curResults.length - 1; j++)
	  if (curResults[j][13] < curResults[j + 1][13]) {
	    tmp = curResults[j];
		curResults[j] = curResults[j + 1];
		curResults[j + 1] = tmp;
	  }
}

function sortA() {
  for (var i = 0; i < curResults.length - 1; i++)
    for (var j = 0; j < curResults.length - 1; j++)
	  if (curResults[j][5] < curResults[j + 1][5]) {
	    tmp = curResults[j];
		curResults[j] = curResults[j + 1];
		curResults[j + 1] = tmp;
	  }
}

function initM() {
  for (var i = 0; i < resultM.length; i++) {
	curResults[i] = [resultM[i][0], resultM[i][1].toFixed(2), resultM[i][1]];
  }
  fillM();
  setTimeout('processNextM()', startDelay);
}

function initA() {
  for (var i = 0; i < resultA.length; i++) {
	curResults[i] = [resultA[i][0], resultA[i][1], resultA[i][2],
	    resultA[i][3], resultA[i][4].toFixed(2), resultA[i][4]];
  }
  fillA();
  setTimeout('processNextA()', startDelay);
}

function initD() {
  for (var i = 0; i < resultD.length; i++) {
    curResults[i] = resultD[i];
	for (var j = 1; j <= 6; j++) {
	  if (curResults[i][j] != '')
	    curResults[i][j] = ranks[curResults[i][j]];
	}
  }
  fillD();
  setTimeout('processNextD()', startDelay);
}

function findProcRow(handle) {
  for (var i = 0; i < curResults.length; i++)
    if (curResults[i][0] == handle)
	  return i;
  return -1;
}

function scaledDelay(normalDelay) {
  if (currentRow <= 12) return normalDelay;
  //if (currentRow <= 20) return normalDelay / 2;
  return 500;
}

function processNextM() {
  if (currentRow == 0) return;
  currentRow--;
  procRow = findProcRow(resultM[currentRow][0]);
  setClass('t' + procRow, 'total processing');  
  setTimeout('showNextM()', scaledDelay(processDelay));
}

function processNextA() {
  if (currentRow == 0) return;
  currentRow--;
  procRow = findProcRow(resultA[currentRow][0]);
  if (curResults[procRow][1] > '')
    setClass('p1c' + procRow, 'p1 processing');  
  if (curResults[procRow][2] > '')
    setClass('p2c' + procRow, 'p2 processing');  
  if (curResults[procRow][3] > '')
    setClass('p3c' + procRow, 'p3 processing');  
  setTimeout('showNextA()', scaledDelay(processDelay));
}

function processNextD() {
  if (currentDash == dashProblems) return;
  currentDash++;
  for (var i = 0; i < curResults.length; i++) {
    if (curResults[i][currentDash] > '')
      setClass('p' + currentDash + 'c' + i, 'mdr processing');
  }
  setTimeout('showNextD()', scaledDelay(processDelay));
}

function showNextM() {
  curResults[procRow][1] = spanClass(resultM[currentRow][2].toFixed(2), 'final');
  curResults[procRow][2] = resultM[currentRow][2];
  setClass('t' + procRow, 'total');
  fillM();
  setTimeout('showSortedM()', scaledDelay(showDelay));
}

function showNextA() {
  curResults[procRow][1] = spanAlgo(resultA[currentRow][5]);
  curResults[procRow][2] = spanAlgo(resultA[currentRow][6]);
  curResults[procRow][3] = spanAlgo(resultA[currentRow][7]);
  curResults[procRow][4] = spanClass(resultA[currentRow][8].toFixed(2), 'final');
  curResults[procRow][5] = resultA[currentRow][8];
  setClass('p1c' + procRow, 'p1');  
  setClass('p2c' + procRow, 'p2');  
  setClass('p3c' + procRow, 'p3');  
  fillA();
  setTimeout('showSortedA()', scaledDelay(showDelay));
}

function showNextD() {
  for (var i = 0; i < curResults.length; i++) {
    thisResult = curResults[i][currentDash + 6];
    curResults[i][currentDash] = spanDash(thisResult);
	if (thisResult > '' && isNumber(thisResult) && Number(thisResult) > 0)
	  curResults[i][13] += Number(thisResult);
	setClass('p' + currentDash + 'c' + i, 'mdr');
  }
  fillD();
  setTimeout('showSortedD()', scaledDelay(showDelay));
}

function showSortedM() {
  sortM();
  fillM();
  setTimeout('processNextM()', scaledDelay(sortDelay));
}

function showSortedA() {
  sortA();
  fillA();
  setTimeout('processNextA()', scaledDelay(sortDelay));
}

function showSortedD() {
  sortD();
  fillD();
  setTimeout('processNextD()', scaledDelay(sortDelay));
}

/**
 * Create a new DOM element
 * @param {string} tag The tag to create
 * @param {object} attributes The attributes { attr: value, ...}
 * @param {string} innerHTML The content of the tag
 * @return The newly created DOM element
 */
function createElement(tag, attributes, innerHTML) {
  var ret = document.createElement(tag);
  if (attributes) {
    for (var attr in attributes) {
      ret.setAttribute(attr, attributes[attr]);
    }
  }
  if (innerHTML)
    ret.innerHTML = innerHTML;
  return ret;
}

function setText(id, text) {
  var obj = document.getElementById(id);
  if (obj) obj.innerHTML = text;
}

function setClass(id, className) {
  var obj = document.getElementById(id);
  if (obj) obj.className = className;
}

function createRows(type) {
  var allRows = document.getElementById("allRows");
  for (var i = -1; i < totalRows; i++) {
    var row = null;
    if (type == 'm') row = createRowM(i);
    if (type == 'a') row = createRowA(i);
    if (type == 'd') row = createRowD(i);
	if (i == -1) row.className = "row header";
	if (row) allRows.appendChild(row);
	if (i == 3) {
	  allRows.appendChild(createRow(-2));
	}
  }
  setText("h-1", 'Handle');
  setText("t-1", 'Points');
  if (type == 'a') {
    setText("p1c-1", "250");
    setText("p2c-1", "750");
    setText("p3c-1", "");
  }
  if (type == 'd') {
    setText("p1c-1", "#1");
    setText("p2c-1", "#2");
    setText("p3c-1", "#3");
    setText("p4c-1", "#4");
    setText("p5c-1", "#5");
    setText("p6c-1", "#6");
  }
  setText("chs-1", "Total");
}

function createRow(number) {
  var ret = createElement("div", { 
    class: ((number % 2) == 0 ? "row alt" : "row"), 
	id: "row" + number
  });
  return ret;
}

function createRowM(number) {
  var ret = createRow(number);
  ret.appendChild(createElement("span", { style: "width:20%;" }, ""));
  ret.appendChild(createElement("span", { class: "handle", id: "h" + number }));
  ret.appendChild(createElement("span", { class: "total", id: "t" + number }, number > -1 ? "-" : ""));
  return ret;
}

function createRowA(number) {
  var ret = createRow(number);
  ret.appendChild(createElement("span", { class: "handle", id: "h" + number }));
  ret.appendChild(createElement("span", { class: "p1", id: "p1c" + number }));
  ret.appendChild(createElement("span", { class: "spacer" }));
  ret.appendChild(createElement("span", { class: "p2", id: "p2c" + number }));
  ret.appendChild(createElement("span", { class: "p3", id: "p3c" + number }));
  ret.appendChild(createElement("span", { class: "total", id: "t" + number }, number > -1 ? "-" : ""));
  return ret;
}

function createRowD(number) {
  var ret = createRow(number);
  ret.appendChild(createElement("span", { class: "handleShort", id: "h" + number }));
  ret.appendChild(createElement("span", { class: "mdr", id: "p1c" + number }));
  ret.appendChild(createElement("span", { class: "mdr", id: "p2c" + number }));
  ret.appendChild(createElement("span", { class: "mdr", id: "p3c" + number }));
  ret.appendChild(createElement("span", { class: "mdr", id: "p4c" + number }));
  ret.appendChild(createElement("span", { class: "mdr", id: "p5c" + number }));
  ret.appendChild(createElement("span", { class: "mdr", id: "p6c" + number }));
  ret.appendChild(createElement("span", { class: "total", id: "t" + number }, number > -1 ? "-" : ""));
  return ret;
}

function onLoad(type) {
  createRows(type);
  displayType = type;
  if (type == 'm') {
    initM();
  }
  if (type == 'a') {
    initA();
  }
  if (type == 'd') {
    initD();
  }
}

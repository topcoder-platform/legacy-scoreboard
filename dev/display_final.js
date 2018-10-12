var startDelay = 20000;
var processDelay = 5000;
var showDelay = 2000;
var sortDelay = 3000;

var displayType = '';

var totalRows = 11;
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
['RAVEman', 'Chal', 261.86, '', 311.86, 'Chal', 'Fail', '', 50.00],
['andrewzta', 'Chal', 264.99, '', 264.99, 'Chal', 'Fail', '', 0.00],
['Egor', 190.94, '', '', 215.94, 190.94, '', '', 215.94],
['meret', 157.50, '', '', 157.50, 157.50, '', '', 157.50],
['ACRush', 114.02, '', '', 64.02, 'Fail', '', '', -50.00],
['marek.cygan', 'Chal', '', '', 0.00, 'Chal', '', '', 0.00],
['shangjingbo', '', '', '', 0.00, '', '', '', 0.00],
['[[iwi]]', '', 'Chal', '', 0.00, '', 'Chal', '', 0.00]
];

var resultD = [
['Zulander',7,5,'',3,'','',0,10,'',0,'','',200],
['MonicaMuranyi',6,'',1,9,7,'',' 0','',0,10,0,'',190],
['akinwale',9,6,4,1,3,'',' 0',10,80,80,10,'',110],
['gfhuertac',3,'',5,'',2,2,10,'',10,'',10,100,110],
['selvaa89',11,2,3,7,'','',' 0',10,0,0,'','',60],
['Yeung',8,1,7,2,5,4,' 0',60,10,10,10,0,10],
['bohuss',5,'','',8,8,1,10,'','',0,0,0,10],
['supercharger',4,7,'',5,6,5,10,0,'',0,0,0,10],
['FireIce',2,'',8,4,4,'',10,'',0,0,10,'',0],
['LieutenantRoger',10,4,6,'','','',' 0',0,0,'','','',0],
['TrePe',1,3,2,6,1,3,60,10,0,0,60,0,0]
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
  if (text == '10')
    return spanClass('10', 'final');
  return spanClass(text, 'final');
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
	setText('d' + i, curResults[i][14]);
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
	  if (curResults[j][14] < curResults[j + 1][14]) {
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
	curResults[i][14] = curResults[i][13];
	curResults[i][13] = 0;
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

function processNextM() {
  if (currentRow == 0) return;
  currentRow--;
  procRow = findProcRow(resultM[currentRow][0]);
  setClass('t' + procRow, 'total processing');  
  setTimeout('showNextM()', processDelay);
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
  setTimeout('showNextA()', processDelay);
}

function processNextD() {
  if (currentDash == dashProblems) return;
  currentDash++;
  for (var i = 0; i < curResults.length; i++) {
    if (curResults[i][currentDash] > '')
      setClass('p' + currentDash + 'c' + i, 'mdr processing');
  }
  setTimeout('showNextD()', processDelay);
}

function showNextM() {
  curResults[procRow][1] = spanClass(resultM[currentRow][2].toFixed(2), 'final');
  curResults[procRow][2] = resultM[currentRow][2];
  setClass('t' + procRow, 'total');
  fillM();
  setTimeout('showSortedM()', showDelay);
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
  setTimeout('showSortedA()', showDelay);
}

function showNextD() {
  for (var i = 0; i < curResults.length; i++) {
    thisResult = curResults[i][currentDash + 6];
    curResults[i][currentDash] = spanDash(thisResult);
	if (thisResult > '' && isNumber(thisResult) && Number(thisResult) > 0) {
	  curResults[i][13] += Number(thisResult);
	  curResults[i][14] += Number(thisResult);
	}
	setClass('p' + currentDash + 'c' + i, 'mdr');
  }
  fillD();
  setTimeout('showSortedD()', showDelay);
}

function showSortedM() {
  sortM();
  fillM();
  setTimeout('processNextM()', sortDelay);
}

function showSortedA() {
  sortA();
  fillA();
  setTimeout('processNextA()', sortDelay);
}

function showSortedD() {
  sortD();
  fillD();
  setTimeout('processNextD()', sortDelay);
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
    setText("p2c-1", "500");
    setText("p3c-1", "1000");
  }
  if (type == 'd') {
    setText("p1c-1", "#1");
    setText("p2c-1", "#2");
    setText("p3c-1", "#3");
    setText("p4c-1", "#4");
    setText("p5c-1", "#5");
    setText("p6c-1", "#6");
    setText("d-1", "Total");
	setText("t-1", "Round");
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
  ret.appendChild(createElement("span", { class: "total", id: "d" + number }, number > -1 ? "-" : ""));
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

// Adjust these values as necessary

var totalRows = 6;

var roundMinutes = 85;

var algoRound = 17017;
var codingStart =    new Date(2017,  9, 23,   13, 30, 0, 0);
var codingEnd =      new Date(2017,  9, 23,   14, 55, 0, 0);
var challengeStart = new Date(2017,  9, 23,   15,  0, 0, 0);
var challengeEnd =   new Date(2017,  9, 23,   15, 10, 0, 0);
var components = [57869, 58023, 58028];
var problemPoints = [250, 500, 1000];

var dashTimes = [
  new Date(2016, 10, 3, 11,  0, 0, 0),
  new Date(2016, 10, 3, 11, 10, 0, 0),
  new Date(2016, 10, 3, 11, 20, 0, 0),
  new Date(2016, 10, 3, 11, 30, 0, 0),
  new Date(2016, 10, 3, 11, 40, 0, 0),
  new Date(2016, 10, 3, 11, 50, 0, 0),
  new Date(2016, 10, 3, 12,  0, 0, 0)
]

var marathonRound = 17015;
var marathonStart = new Date(2017,  9, 22,  9, 0, 0, 0);
var marathonEnd =   new Date(2017,  9, 22, 19, 0, 0, 0);

//var webserviceUrl = "http://192.168.12.145/TCO11Scoreboard.php";
var webserviceUrl = "http://gibbon/service.asp";

/*
// Algo Semi 1
var algoRound = 17016;
var codingStart =    new Date(2017,  9, 22,   18,  0, 0, 0);
var codingEnd =      new Date(2017,  9, 22,   19, 25, 0, 0);
var challengeStart = new Date(2017,  9, 22,   19, 30, 0, 0);
var challengeEnd =   new Date(2017,  9, 22,   19, 40, 0, 0);
var components = [57871, 57609, 57606];
var problemPoints = [250, 500, 1000];

// Algo Semi 2
var algoRound = 17017;
var codingStart =    new Date(2017,  9, 23,   13, 30, 0, 0);
var codingEnd =      new Date(2017,  9, 23,   14, 55, 0, 0);
var challengeStart = new Date(2017,  9, 23,   15,  0, 0, 0);
var challengeEnd =   new Date(2017,  9, 23,   15, 10, 0, 0);
var components = [57869, 58023, 58028];
var problemPoints = [250, 500, 1000];

// Algo Final
var algoRound = 17018;
var codingStart =    new Date(2017,  9, 24,   13, 30, 0, 0);
var codingEnd =      new Date(2017,  9, 24,   14, 55, 0, 0);
var challengeStart = new Date(2017,  9, 24,   15,  0, 0, 0);
var challengeEnd =   new Date(2017,  9, 24,   15, 10, 0, 0);
var components = [56696, 58024, 55525];
var problemPoints = [300, 450, 1000];

// Algo Backup
var algoRound = 17019;
var codingStart =    new Date(2017,  9, 25,   13, 30, 0, 0);
var codingEnd =      new Date(2017,  9, 25,   14, 55, 0, 0);
var challengeStart = new Date(2017,  9, 25,   15,  0, 0, 0);
var challengeEnd =   new Date(2017,  9, 25,   15, 10, 0, 0);
var components = [57870, 58022, 57608];
var problemPoints = [250, 500, 1000];

*/

var roundLength = roundMinutes * 60;

var queryStringList = {};

var testMode = false;

var intervalHandle = null;

var displayType = '';

var standings = [];
var maxSt = 0;

var processingLoad = false;
var lastLoadTime = new Date();

var reloadTime = 3500;
var countdownTime = 1000;

var exampleCount = 10;
var systemCount = 50;

var effectsDelay = 4;
var effectsRemain = 0;
var initialLoadDone = false;

var allSubs = [];

var dashers = [
  'hohosky',
  'flexme',
  'Zulander',
  'Yeung', 
  'notpad',
  'supercharger', 
  'Fanazhe',
  'FireIce',
  'izhari',
  'LieutenantRoger', 
  'PE',
  'wz12',
];

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

// Day 1
//var projects = [30030390, 30030391, 30030392, 30030393, 30030394, 30030395];

// Day 2
//var projects = [30030396, 30030397, 30030398, 30030399, 30030400, 30030401];

// Day 3
var projects = [30030402, 30030403, 30030404, 30030405, 30030406, 30030407];

function findDasher(handle) {
  for (var i = 0; i < dashers.length; i++)
    if (dashers[i] == handle)
	  return i;
  return -1;
}

function findProject(project) {
  for (var i = 0; i < projects.length; i++)
    if (projects[i] == project)
	  return i;
  return -1;
}

function isNewSub(userId, componentNumber) {
  for (var i = 0; i < allSubs.length; i++)
    if (allSubs[i][0] == userId && allSubs[i][1] == componentNumber)
	  return false;
  allSubs.push([userId, componentNumber]);
  return true;
}

function calculateScore(maxPoints, elapsedTime) {
  var tt2 = roundLength * roundLength;
  var et2 = elapsedTime * elapsedTime;
  var score = maxPoints * (.3 + .7 * tt2 / (10 * et2 + tt2));
  return score.toFixed(2);
}

function getComponentNumber(componentId) {
  for (var i = 0; i < components.length; i++)
    if (components[i] == componentId)
	  return i;
  components[components.length] = componentId;
  return components.length - 1;
}

function getStandingNumber(handle, user_id) {
  for (var i = 0; i < standings.length; i++)
    if (standings[i][0] == handle)
	  return i;
  newStanding = [];
  standings[standings.length] = [handle]
  standings[standings.length - 1][8] = 0;
  standings[standings.length - 1][10] = 0;
  standings[standings.length - 1][9] = user_id;
  return standings.length - 1;
}

function getStandingByUserId(user_id) {
  for (var i = 0; i < standings.length; i++)
    if (standings[i][9] == user_id)
	  return i;
  return -1;
}

function getHandleByUserId(user_id) {
  for (var i = 0; i < standings.length; i++)
    if (standings[i][9] == user_id)
	  return standings[i][0];
  return "";
}

function sortStandings() {
  for (var i = 0; i < standings.length - 1; i++)
    for (var j = 0; j < standings.length - 1; j++)
	  if (standings[j][8] < standings[j + 1][8]) {
        var temp = standings[j];
		standings[j] = standings[j + 1];
		standings[j + 1] = temp;
	  }
}

/**
 * Load a url, and send its contents to a |callback| function.
 * Warning: Callback may be called before returning.
 * @param {string} file URL to load.
 * @param {function} callback Function to call after loading.
 */
function loadUrl(file, callback) {
  var request = new XMLHttpRequest;
  var useAsyncXHR = true;

  // To be called when loading has finished.
  function onFinished() {
    var res = request.responseText;
    var xml = request.responseXML;
    request = undefined;
    callback(res, xml);
  }

  setTimeout(function() {
    request.onreadystatechange = function() {
      if (request.readyState == 4) {
        if (request.status == 200) {
          onFinished();
        }
      }
    };
	//request._timeout = setTimeout(request.abort, 9500);
    request.open('GET', file, useAsyncXHR);
    request.send('');
  }, 50);
}

function loadM() {
  var url = webserviceUrl + "?c=dd_score_mm_coding&dsid=30&rd=" + marathonRound;
  if (testMode) url = "mm.xml";
  loadUrl(url, onLoadM);
}

function loadD() {
  var rd = projects.join();
  var url = webserviceUrl + "?c=dd_mod_dash&dsid=30&rd=" + rd;
  //if (testMode) url = "mm.xml";
  loadUrl(url, onLoadD);
}

function loadR() {
  var rd = algoRound;
  var url = webserviceUrl + "?c=dd_score_algo_coding&dsid=30&rd=" + rd;
  if (testMode) url = "room.xml";
  loadUrl(url, onLoadR);
}

function loadC() {
  var rd = algoRound;
  var url = webserviceUrl + "?c=dd_score_algo_chal&dsid=30&rd=" + rd + "&st=" + maxSt;
  if (testMode) url = "chal.xml";
  loadUrl(url, onLoadC);
}

function getChildText(element, s) {
  var list = element.getElementsByTagName(s);
  return list.length > 0 ? list[0].textContent : "";
}

function setText(id, text) {
  var obj = document.getElementById(id);
  if (obj) obj.innerHTML = text;
}

function setClass(id, className) {
  var obj = document.getElementById(id);
  if (obj) obj.className = className;
}

function onLoadM(text, xml) {
  var rows = xml.documentElement.getElementsByTagName("row");
  for (var i = 0; i < Math.min(rows.length, totalRows); i++) {
    var row = rows[i];
	var exNum = getChildText(row, "example_submission_number");
	var sNum = getChildText(row, "submission_number");
    setText("h" + i, getChildText(row, "handle"));
    setText("ex" + i, exNum);
    setText("full" + i, sNum);
    setText("t" + i, Number(getChildText(row, "points")).toFixed(2));
	var exCount = getChildText(row, "ex_count");
	var fullCount = getChildText(row, "full_count");
	var exSpinner = (Number(exCount) == exampleCount) || exNum == "0";
	var fullSpinner = (Number(fullCount) == systemCount) || sNum == "0";
	if (exSpinner) {
	  setClass("ex" + i, "ex");
	} else {
	  setClass("ex" + i, "ex spinner");
	}
	if (fullSpinner) {
	  setClass("full" + i, "full");
	} else {
	  setClass("full" + i, "full spinner");
	}
  }
}

function onLoadD(text, xml) {
  processingLoad = true;
  var rows = xml.documentElement.getElementsByTagName("row");
  var curProject = "0";
  var curRank = 1;
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
	var project = getChildText(row, "project_id");
	var handle = getChildText(row, "handle");
	var dashid = findDasher(handle);
	var projid = findProject(project);
	if (dashid < 0 || projid < 0)
	  continue;
	if (project == curProject) {
	  curRank++;
	} else {
	  curProject = project;
	  curRank = 1;
	}
	cell = "p" + (projid + 1) + "c" + dashid;
	setText(cell, ranks[curRank]);
  }
  processingLoad = false;
}

function clearHandle() {
  if (intervalHandle) {
    clearInterval(intervalHandle);
    intervalHandle = null;
  }
}

function convertToTime(millis) {
  var seconds = Math.floor(millis / 1000);
  var minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  var hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  if (hours > 0) {
    return hours + ":" + String(minutes + 100).substr(1) + ":" + String(seconds + 100).substr(1);
  }
  return minutes + ":" + String(seconds + 100).substr(1);
}

function updateCountdown() {
  if (processingLoad) return;
  var timeDelta = (new Date().getTime() - lastLoadTime) / 1000;
  for (var i = 0; i < Math.min(standings.length, totalRows); i++) {
	if ((standings[i][4] == 120 || standings[i][4] == 121) && standings[i][14]) setText("p1c" + i, calculateScore(problemPoints[0], timeDelta + standings[i][14]));	
	if ((standings[i][5] == 120 || standings[i][5] == 121) && standings[i][15]) setText("p2c" + i, calculateScore(problemPoints[1], timeDelta + standings[i][15]));	
	if ((standings[i][6] == 120 || standings[i][6] == 121) && standings[i][16]) setText("p3c" + i, calculateScore(problemPoints[2], timeDelta + standings[i][16]));	
  }
  var now = new Date();
  //now.setMinutes(now.getMinutes() - 1);
  if (now.getTime() < codingStart.getTime()) {
    setText("countdown1", "Coding Begins In");
	setText("countdown2", convertToTime(codingStart.getTime() - now.getTime()));
  } else if (now.getTime() < codingEnd.getTime()) {
    setText("countdown1", "Coding Ends In");
	setText("countdown2", convertToTime(codingEnd.getTime() - now.getTime()));
  } else {
    window.location.href = "displayC.html?rd=" + algoRound;
  }
}

function updateDashCountdown() {
  if (processingLoad) return;
  var nowTime = new Date().getTime();
  var i = 0;
  while (i < dashTimes.length && nowTime > dashTimes[i].getTime())
    i++;
  if (i == 0) {
    setText("countdown1", "Mod Dash Begins In");
	setText("countdown2", convertToTime(dashTimes[0].getTime() - nowTime));
  } else if (i == dashTimes.length) {
    setText("countdown1", "Competition Complete");
	setText("countdown2", "");
  } else {
    setText("countdown1", "Dash #" + i);
	setText("countdown2", convertToTime(dashTimes[i].getTime() - nowTime));
  }
}

function updateMarathonCountdown() {
  if (processingLoad) return;
  var nowTime = new Date().getTime();
  if (nowTime < marathonStart.getTime()) {
    setText("countdown1", "Marathon Begins In");
	setText("countdown2", convertToTime(marathonStart.getTime() - nowTime));
  } else if (nowTime > marathonEnd.getTime()) {
    setText("countdown1", "Competition Complete");
	setText("countdown2", "");
  } else {
    setText("countdown1", "Time Remaining");
	setText("countdown2", convertToTime(marathonEnd.getTime() - nowTime));
  }
}

function updateChallengeTime() {
  var now = new Date();
  //now.setMinutes(now.getMinutes() - 1);
  if (now.getTime() < codingEnd.getTime()) {
    window.location.href = "displayA.html?rd=" + queryStringList["rd"];
  } else if (now.getTime() < challengeStart.getTime()) {
    setText("countdown1", "Challenge Begins In");
	setText("countdown2", convertToTime(challengeStart.getTime() - now.getTime()));
  } else if (now.getTime() < challengeEnd.getTime()) {
    setText("countdown1", "Challenge Ends In");
	setText("countdown2", convertToTime(challengeEnd.getTime() - now.getTime()));
  } else {
    setText("countdown1", "Round Completed");
	setText("countdown2", "");
  }
}

function onLoadR(text, xml) {
  if (effectsRemain > 0) {
    effectsRemain--;
	return;
  }
  processingLoad = true;
  lastLoadTime = new Date().getTime();
  clearHandle();
  standings = [];
  newSubmissions = [];
  var rows = xml.documentElement.getElementsByTagName("row");
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var handle = getChildText(row, "handle");
	var userId = getChildText(row, "user_id");
	var componentId = getChildText(row, "component_id");
    var points = getChildText(row, "points");
    var statusId = getChildText(row, "status_id");
	var openTime = getChildText(row, "open_time");
	var currentTime = getChildText(row, "current_time");
	var elapsedTime = (new Date(currentTime).getTime() - Number(openTime)) / 1000;
    var componentNumber = getComponentNumber(componentId);
	var standingsId = getStandingNumber(handle, userId);
	if (displayType != 'c' || (statusId != "120" && statusId != "121")) {
	  standings[standingsId][componentNumber + 1] = Number(points);
	  if (statusId == "130" && isNewSub(userId, componentNumber) && initialLoadDone) {
		effectsRemain = effectsDelay;
		newSubmissions.push([userId, componentNumber]);
		//alert(handle + " " + componentNumber + " " + statusId + " " + points);
	  }
	  standings[standingsId][componentNumber + 4] = statusId;
	  standings[standingsId][componentNumber + 14] = elapsedTime;
	  standings[standingsId][8] += Number(points);
	}
  }
  sortStandings();
  if (displayType == 'c') {
    loadC();
    intervalHandle = setInterval(loadC, reloadTime);
    processingLoad = false;
	return;
  }
  for (var i = 0; i < Math.min(standings.length, totalRows); i++) {
    setText("h" + i, standings[i][0]);
    var timeDelta = (new Date().getTime() - lastLoadTime) / 1000;
	if (standings[i][1] != undefined && standings[i][4] != 120 && standings[i][4] != 121) {
	  setText("p1c" + i, Number(standings[i][1]).toFixed(2));
	} else if ((standings[i][4] == 120 || standings[i][4] == 121) && standings[i][14]) {
	  //setText("p1c" + i, calculateScore(problemPoints[0], timeDelta + standings[i][14]));	
	} else {
	  setText("p1c" + i, "");
	}
	if (standings[i][2] != undefined && standings[i][5] != 120 && standings[i][5] != 121) {
	  setText("p2c" + i, Number(standings[i][2]).toFixed(2));
	} else if ((standings[i][5] == 120 || standings[i][5] == 121) && standings[i][15]) {
	  //setText("p2c" + i, calculateScore(problemPoints[1], timeDelta + standings[i][15]));	
	} else {
	  setText("p2c" + i, "");
	}
	if (standings[i][3] != undefined && standings[i][6] != 120 && standings[i][6] != 121) {
	  setText("p3c" + i, Number(standings[i][3]).toFixed(2));
	} else if ((standings[i][6] == 120 || standings[i][6] == 121) && standings[i][16]) {
	  //setText("p3c" + i, calculateScore(problemPoints[2], timeDelta + standings[i][16]));	
	} else {
	  setText("p3c" + i, "");
	}
	if (displayType != 'c') {
	  setClass("p1c" + i, "p1 status" + standings[i][4]);
	  setClass("p2c" + i, "p2 status" + standings[i][5]);
	  setClass("p3c" + i, "p3 status" + standings[i][6]);
	}
	setText("t" + i, Number(standings[i][8]).toFixed(2));
  }
  for (var i = 0; i < newSubmissions.length; i++) {
	var sId = getStandingByUserId(newSubmissions[i][0]);
	var cId = newSubmissions[i][1];
	setClass("p" + (cId + 1) + "c" + sId, "p" + (cId + 1) + " status" + standings[sId][cId + 4] + " newSub");
    //alert("p" + (cId + 1) + "c" + sId + ": p" + (cId + 1) + " status" + standings[sId][cId + 4] + " newSub");
  }
  intervalHandle = setInterval(loadR, reloadTime);
  processingLoad = false;
  initialLoadDone = true;
}

function onLoadC(text, xml) {
  if (effectsRemain > 0) {
    effectsRemain--;
	return;
  }
  clearHandle();
  var newChallenge = [];
  var newDefend = [];
  var rows = xml.documentElement.getElementsByTagName("row");
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
	var defendantId = getChildText(row, "defendant_id");
	var componentId = getChildText(row, "component_id");
	var succeeded = getChildText(row, "succeeded");
	var challengerId = getChildText(row, "challenger_id");
	var challengerPoints = getChildText(row, "challenger_points");
	var defendantPoints = getChildText(row, "defendant_points");
	var submittedTime = getChildText(row, "submit_time");
    var challengerNum = getStandingByUserId(challengerId);
	var defendantNum = getStandingByUserId(defendantId);
	var componentNum = getComponentNumber(componentId);
	if (succeeded == "1" && defendantNum > -1) {
	  standings[defendantNum][componentNum + 4] = 140;
	  standings[defendantNum][componentNum + 1] = 0;
	  standings[defendantNum][componentNum + 11] = getHandleByUserId(challengerId);
	  if (initialLoadDone) {
	    newChallenge.push([defendantId, componentNum]);
		effectsRemain = effectsDelay;
	  }
	}
	if (succeeded == "0" && defendantNum > -1 && initialLoadDone) {
      newDefend.push([defendantId, componentNum]);
      effectsRemain = effectsDelay;
	}
	if (challengerNum > -1) {
	  standings[challengerNum][10] += Number(challengerPoints);
	}
	maxSt = Math.max(maxSt, Number(submittedTime));
  }
  for (var i = 0; i < Math.min(standings.length, totalRows); i++) {
	standings[i][8] = standings[i][1] ? Number(standings[i][1]) : 0;
	standings[i][8] += standings[i][2] ? Number(standings[i][2]) : 0;
	standings[i][8] += standings[i][3] ? Number(standings[i][3]) : 0;
	standings[i][8] += standings[i][10] ? Number(standings[i][10]) : 0;
  }
  sortStandings();
  
  for (var i = 0; i < Math.min(standings.length, totalRows); i++) {
    setClass("p1cx" + i, "p1cx");
    setClass("p2cx" + i, "p2cx");
    setClass("p3cx" + i, "p3cx");
    setText("h" + i, standings[i][0]);
	if (standings[i][4] == 140) {
	  setText("p1c" + i, Number(standings[i][1]).toFixed(2));	
	  setClass("p1c" + i, "p1c status140");
	} else if (standings[i][1] != undefined) {
	  setText("p1c" + i, Number(standings[i][1]).toFixed(2));	
	  setClass("p1c" + i, "p1c");
	} else {
	  setText("p1c" + i, "");
	}
	if (standings[i][5] == 140) {
	  setText("p2c" + i, Number(standings[i][2]).toFixed(2));	
	  setClass("p2c" + i, "p2c status140");
	} else if (standings[i][2] != undefined) {
	  setText("p2c" + i, Number(standings[i][2]).toFixed(2));
	  setClass("p2c" + i, "p2c");
	} else {
	  setText("p2c" + i, "");
	}
	if (standings[i][6] == 140) {
	  setText("p3c" + i, Number(standings[i][3]).toFixed(2));	
	  setClass("p3c" + i, "p3c status140");
	} else if (standings[i][3] != undefined) {
	  setText("p3c" + i, Number(standings[i][3]).toFixed(2));
	  setClass("p3c" + i, "p3c");
	} else {
	  setText("p3c" + i, "");
	}
	//setClass("p1c" + i, "p1 status" + standings[i][4]);
	//setClass("p2c" + i, "p2 status" + standings[i][5]);
	//setClass("p3c" + i, "p3 status" + standings[i][6]);
	setText("c1c" + i, standings[i][4] == 140 && standings[i][11] ? standings[i][11] : "");
	setText("c2c" + i, standings[i][5] == 140 && standings[i][12] ? standings[i][12] : "");
	setText("c3c" + i, standings[i][6] == 140 && standings[i][13] ? standings[i][13] : "");
	setText("chs" + i, standings[i][10].toFixed(2));
	setText("t" + i, standings[i][8].toFixed(2));
  }
  for (var i = 0; i < newChallenge.length; i++) {
    var sId = getStandingByUserId(newChallenge[i][0]);
	var cId = newChallenge[i][1];
    setClass("p" + (cId + 1) + "cx" + sId, "p" + (cId + 1) + "cx flame");
  }
  for (var i = 0; i < newDefend.length; i++) {
    var sId = getStandingByUserId(newDefend[i][0]);
	var cId = newDefend[i][1];
    setClass("p" + (cId + 1) + "cx" + sId, "p" + (cId + 1) + "cx shield");
  }
  initialLoadDone = true;
  intervalHandle = setInterval(loadC, reloadTime);
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

/**
 * Parse the query string into it's parameters
 * Stores the results in (global) variable queryStringList
 */
function parseQueryString() {
  var url = window.location.toString();
  url.match(/\?(.+)$/);
  var params = RegExp.$1;
  var params = params.split('&');
  for (var i = 0; i < params.length; i++) {
    var tmp = params[i].split('=');
    queryStringList[tmp[0]] = unescape(tmp[1]);
  }
}

function createRow(number) {
  var ret = createElement("div", { 
    class: ((number % 2) == 0 ? "row alt" : "row"), 
	id: "row" + number
  });
  ret.appendChild(createElement("span", { class: "handle", id: "h" + number }));
  ret.appendChild(createElement("span", { class: "total", id: "t" + number }, number > -1 ? "-" : ""));
  return ret;
}

function createRowD(number) {
  var ret = createElement("div", { 
    class: ((number % 2) == 0 ? "row alt" : "row"), 
	id: "row" + number
  });
  ret.appendChild(createElement("span", { class: "handle", id: "h" + number }, number >= 0 ? dashers[number] : ""));
  ret.appendChild(createElement("span", { class: "mdr", id: "p1c" + number }));
  ret.appendChild(createElement("span", { class: "spacer" }));
  ret.appendChild(createElement("span", { class: "mdr", id: "p2c" + number }));
  ret.appendChild(createElement("span", { class: "mdr", id: "p3c" + number }));
  ret.appendChild(createElement("span", { class: "mdr", id: "p4c" + number }));
  ret.appendChild(createElement("span", { class: "mdr", id: "p5c" + number }));
  ret.appendChild(createElement("span", { class: "mdr", id: "p6c" + number }));
  return ret;
}

function createRowM(number) {
  var ret = createRow(number);
  ret.appendChild(createElement("span", { class: "ex", id: "ex" + number }));
  ret.appendChild(createElement("span", { class: "full", id: "full" + number }));
  return ret;
}

function createRowA(number) {
  var ret = createRow(number);
  ret.appendChild(createElement("span", { class: "p1", id: "p1c" + number }));
  ret.appendChild(createElement("span", { class: "p2", id: "p2c" + number }));
  ret.appendChild(createElement("span", { class: "p3", id: "p3c" + number }));
  return ret;
}

function createRowC(number) {
  var ret = createRow(number);
  var p1 = createElement("div", { class: "p1cx", id: "p1cx" + number });
  p1.appendChild(createElement("div", { class: "p1c", id: "p1c" + number }));
  p1.appendChild(createElement("div", { class: "c1c", id: "c1c" + number }));
  ret.appendChild(p1);
  var p2 = createElement("div", { class: "p2cx", id: "p2cx" + number });
  p2.appendChild(createElement("div", { class: "p2c", id: "p2c" + number }));
  p2.appendChild(createElement("div", { class: "c2c", id: "c2c" + number }));
  ret.appendChild(p2);
  var p3 = createElement("div", { class: "p3cx", id: "p3cx" + number });
  p3.appendChild(createElement("div", { class: "p3c", id: "p3c" + number }));
  p3.appendChild(createElement("div", { class: "c3c", id: "c3c" + number }));
  ret.appendChild(p3);
  ret.appendChild(createElement("span", { class: "chs", id: "chs" + number }));
  return ret;
}

function createRows(type) {
  var allRows = document.getElementById("allRows");
  for (var i = -1; i < totalRows; i++) {
    var row = null;
    if (type == 'm') row = createRowM(i);
    if (type == 'a') row = createRowA(i);
    if (type == 'c') row = createRowC(i);
    if (type == 'd') row = createRowD(i);
	if (i == -1) row.className = "row header";
	if (row) allRows.appendChild(row);
	if (i == 3) {
	  allRows.appendChild(createRow(-2));
	}
  }
  setText("h-1", 'Handle');
  setText("t-1", 'Points');
  setText("ex-1", '# Example');
  setText("full-1", '# Full');
  if (type == 'a') {
    setText("p1c-1", problemPoints[0]);
    setText("p2c-1", problemPoints[1]);
    setText("p3c-1", problemPoints[2]);
  }
  if (type == 'd') {
    setText("p1c-1", "#1");
    setText("p2c-1", "#2");
    setText("p3c-1", "#3");
    setText("p4c-1", "#4");
    setText("p5c-1", "#5");
    setText("p6c-1", "#6");
  }
  setText("chs-1", "Challenge");
}

/**
 * Called when the page is first loaded.  Creates style elements, pulls
 * query string parameters, and kicks off the load of the output file to
 * be displayed.
 */
function onLoad(type) {
  parseQueryString();
  createRows(type);
  displayType = type;
  if (type == 'm') {
    loadM();
    intervalHandle = setInterval(loadM, reloadTime);
	setInterval(updateMarathonCountdown, countdownTime);
  }
  if (type == 'd') {
    loadD();
	intervalHandle = setInterval(loadD, reloadTime);
	setInterval(updateDashCountdown, countdownTime);
  }
  if (type == 'a') {
    loadR();
    intervalHandle = setInterval(loadR, reloadTime);
	setInterval(updateCountdown, countdownTime);
  }
  if (type == 'c') {
    loadR();
	setInterval(updateChallengeTime, 1000);
	effectsDelay = 6;
    //intervalHandle = setInterval(loadR, reloadTime);
  }
}




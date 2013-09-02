// JavaScript Document
var windowLoaded = false;
var comicDataLoaded = false;

window.onload = init;

function init() {
	if(!window.console){ window.console = {log: function(){} }; } 
	console.log("windowLoaded");
	windowLoaded = true;
	if (comicDataLoaded) continueInit();
};

function continueInit() {
//	var c = comics.comicsList[0];
//	document.getElementById("comics").innerHTML = c.title;		
	showComics();
}

function showComics() {
	var cList = "";
	var itemCode1 = "<div class='adListBoxAreaStyle'>";
	var itemCode2 = "</div><div class='clearFloatStyle'></div>";	
	var imgCode1 = "<img  class='adIconStyle' src='";
	var imgCode2 = "'>";
	var titleCode1 = "<div class='adTitleStyle'><a onclick='openComic(";
	var titleCode3 = "</a></div>";
	var panelCode1 = "<div class='adTextStyle'>";
	var panelCode2 = "</div>";
	var descCode1 = "<div class='adTextStyle'>";
	var descCode2 = "</div>";
	console.log(comics.comicsList.length);
	for (var i=0;i<comics.comicsList.length;i++) {
		var c = comics.comicsList[i];
		var panelsLeft = c.panelCount-readPanels(i);
		cList+=itemCode1+imgCode1+c.folderUrl+c.icon+imgCode2+titleCode1+i+");'>"+c.title+titleCode3+panelCode1+panelsLeft+" unread panels"+panelCode2+descCode1+c.description+descCode2+itemCode2;
		}
	console.log(cList);
	document.getElementById("comics").innerHTML = cList;		
//	$("#comics").html(cList);		
	}

function openComic(index) {
	window.location = "reader/viewer.html?comic="+index;
	}

function loadScript(){
	if(!window.console){ window.console = {log: function(){} }; } 
    var script = document.createElement("script")
    script.type = "text/javascript";
    script.onload = function(){
		console.log("comicDataLoaded");
		comicDataLoaded = true;
		if (windowLoaded) continueInit();
    };
    script.src = comics.comicsList[0].folderUrl+""+comics.comicsList[0].dataFile;
    document.getElementsByTagName("head")[0].appendChild(script);
}

function readPanels(currentComic) {
	if (sessionStorage.currentPanel2 == undefined) {
		return 0;
	}
	var panelPointer = [];
	console.log(sessionStorage.currentPanel2);
	panelPointer = JSON.parse(sessionStorage.currentPanel2);
	if (panelPointer[currentComic] == null) return 0;
	return panelPointer[currentComic];
}

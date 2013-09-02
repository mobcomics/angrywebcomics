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
	showComics2();
}


function showComics2() {
	var cList = "";
//	cList = "<li><a href='#'><img src='../../_assets/img/album-bb.jpg'><h2>Broken Bells</h2><p>Broken Bells</p></a></li>";
	for (var i=0;i<comics.comicsList.length;i++) {
		var c = comics.comicsList[i];
		var panelsLeft = c.panelCount-readPanels(i);
		cList+="<li><a rel='external' href='reader/viewer.html?comic="+i+"'><img src='"+c.folderUrl+c.icon+"'><h2>"+c.title+"</h2><p>"+c.description+"</p></a></li>";
	}
	$("#comics2").html(cList);
	$('#comics2').listview('refresh');
}

/*
<ul data-role="listview" data-inset="true">
    <li><a href="#">
        <img src="../../_assets/img/album-bb.jpg">
        <h2>Broken Bells</h2>
        <p>Broken Bells</p></a>
    </li>
    <li><a href="#">
        <img src="../../_assets/img/album-hc.jpg">
        <h2>Warning</h2>
        <p>Hot Chip</p></a>
    </li>
    <li><a href="#">
        <img src="../../_assets/img/album-p.jpg">
        <h2>Wolfgang Amadeus Phoenix</h2>
        <p>Phoenix</p></a>
    </li>
</ul>
*/

function showComics() {
	var cList = "";
	var itemCode1 = "<div>";
	var itemCode2 = "</div><div></div>";	
	var imgCode1 = "<img src='";
	var imgCode2 = "'>";
	var titleCode1 = "<div><a onclick='openComic(";
	var titleCode3 = "</a></div>";
	var panelCode1 = "<div>";
	var panelCode2 = "</div>";
	var descCode1 = "<div>";
	var descCode2 = "</div>";
	var artistCode1 = "<div><a href=\"javascript:openBrowser('";
	var artistCode2 = "</div>";	
	console.log(comics.comicsList.length);
	for (var i=0;i<comics.comicsList.length;i++) {
		var c = comics.comicsList[i];
		var panelsLeft = c.panelCount-readPanels(i);
		cList+=itemCode1+imgCode1+c.folderUrl+c.icon+imgCode2+titleCode1+i+");'>"+c.title+titleCode3+panelCode1+panelsLeft+" unread panels"+panelCode2+descCode1+c.description+descCode2+artistCode1+c.creatorUrl+"')\">by "+c.creatorNames+"</a>"+artistCode2+itemCode2;
		}
	console.log(cList);
	document.getElementById("comics").innerHTML = cList;		
//	$("#comics").html(cList);		
	}

function openComic(index) {
	window.location = "reader/viewer.html?comic="+index;
	}

function openBrowser(url) {
	window.location = url;
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
	if (localStorage.currentPanel2 == undefined) {
		return 0;
	}
	var panelPointer = [];
	console.log(localStorage.currentPanel2);
	panelPointer = JSON.parse(localStorage.currentPanel2);
	if (panelPointer[currentComic] == null) return 0;
	return panelPointer[currentComic];
}
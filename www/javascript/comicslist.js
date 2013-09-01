// JavaScript Document
var windowLoaded = false;
var comicDataLoaded = false;

window.onload = init;

function init() {
	console.log("windowLoaded");
	windowLoaded = true;
	if (comicDataLoaded) continueInit();
};

function continueInit() {
	$("#comics").html("juu");
	showComics();
}

function showComics() {
	var cList = "";
	var itemCode1 = "<div class='adListBoxAreaStyle'>";
	var itemCode2 = "</div><div class='clearFloatStyle'></div>";	
	var imgCode1 = "<img  class='adIconStyle' src='";
	var imgCode2 = "'>";
	var titleCode1 = "<div class='adTitleStyle'><a onclick='window.location.href = &quot;reader/cover.html?comic=1&quot;'>";
	var titleCode3 = "</a></div>";
	var descCode1 = "<div class='adTextStyle'>";
	var descCode2 = "</div>";
	console.log(comics.comicsList.length);
	for (var i=0;i<comics.comicsList.length;i++) {
		var c = comics.comicsList[i];
		cList+=itemCode1+imgCode1+c.folderUrl+c.icon+imgCode2+titleCode1+c.title+titleCode3+descCode1+c.description+descCode2+itemCode2;
		console.log(cList);
		}
	$("#comics").html(cList);		
	}

function loadScript(){
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

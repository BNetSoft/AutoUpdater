async function getHTML(url) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        // xhr.responseType = 'document';
        xhr.onload = function() {
            var status = xhr.status;
            if (status == 200) {
                resolve(xhr.responseText);
            } else {
                reject(status);
            }
        };
        xhr.send();
    });
}

var url = chrome.extension.getURL('pop.css');


/*  New njection method  */
//let targetPart = document.getElementsByClassName("container mx-auto")[0];

document.body.innerHTML= '<link rel= "stylesheet" href="' + url + '" type="text/css"><div id="simplePopup1" class="simplePopup"><div class="simplePopup-content"><p>Some text in the Modal..</p></div></div>' + document.body.innerHTML;

//document.body.innerHTML += '<link rel= "stylesheet" href="' + url + '" type="text/css"><div id="simplePopup1" class="simplePopup"><div class="simplePopup-content"><p>Some text in the Modal..</p></div></div>';
/*
<div class="popup"><span class="popuptext" id="myPopup">Hi from popup!</span></div>
<div id="myModal" class="modal"><div class="modal-content"><span class="close">&times;</span><p>Some text in the Modal..</p></div></div>

*/

var verContent = "";
function showPopup(content, timeout) {
	var shown = false;
	var popup = document.getElementById("simplePopup1");
	verContent = content;
	
			var popup_content = document.getElementsByClassName("simplePopup-content")[0];
			
			popup_content.innerHTML = "<p>" + content + "</p>";
			popup.style.display = "block";
			shown = true;

	var currentJob = setInterval(function() {
		//var list = document.getElementsByClassName("widget widget_archive")[0];
		
		//console.log(list.classList);
		if (!shown) {
			var popup_content = document.getElementsByClassName("simplePopup-content")[0];
			
			popup_content.innerHTML = "<p>" + content + "</p>";
			popup.style.display = "block";
			st = true;
		} else {

			popup.style.display = "none";
			shown = false;
			clearInterval(currentJob);
		}

		//list.classList.add("top");
		//list.classList.add("btooltip-show");

	}, timeout);

}

var upToDate =false;
var manifestData = chrome.runtime.getManifest();
var manifestVersion = manifestData.version_name;
function checkForUpdate(){
       getHTML("https://raw.githubusercontent.com/devsecdan/The-Siemplify-Extension/master/manifest.json").then(
           function(value){
              // const dialogBox = document.getElementById('dialog-box');
             
                var remoteVersion = JSON.parse(value).version_name;

               if(manifestVersion != remoteVersion)
               {
                    //dialogBox.innerHTML=  "New version : " + remoteVersion + " available!";
                    showPopup("New version : " + remoteVersion + " available!",5000);
               } else {
                  //dialogBox.innerHTML=  "Up to date : " + manifestVersion;
					if(!upToDate){
                    	showPopup("Up to date : " + manifestVersion,5000);
                    	upToDate = true;
                    }

               }
           },
           function(error){
               showPopup("Error fetching update!");
           });	
}
function checkForUpdateLoop(){
	var currentJob = setInterval(function() {

		checkForUpdate();

	}, 10000);
}
checkForUpdateLoop();
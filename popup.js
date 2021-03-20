
document.addEventListener('DOMContentLoaded', () => {
    

       getHTML("https://raw.githubusercontent.com/devsecdan/The-Siemplify-Extension/master/manifest.json").then(
           function(value){
               const dialogBox = document.getElementById('dialog-box');
               var manifestData = chrome.runtime.getManifest();
               var manifestVersion = manifestData.version_name;
                var remoteVersion = JSON.parse(value).version_name;
               if(manifestVersion != remoteVersion)
               {
                    dialogBox.innerHTML=  "New version : " + remoteVersion + " available!";
               } else {
                  dialogBox.innerHTML=  "Up to date : " + manifestVersion;
               }
           },
           function(error){
               dialogBox.innerHTML=  "Error fetching update!";
           });
        
    
    /*
    const dialogBox = document.getElementById('dialog-box');

// https://raw.githubusercontent.com/devsecdan/The-Siemplify-Extension/master/manifest.json
    //var value = loadFile("https://raw.githubusercontent.com/BNetSoft/TSE-Testing/main/version");
    var result = loadFile("https://raw.githubusercontent.com/devsecdan/The-Siemplify-Extension/master/manifest.json");
    var remoteVersion = JSON.parse(result).version_name;


    var manifestData = chrome.runtime.getManifest();
    var manifestVersion = manifestData.version_name;



    if (manifestVersion != remoteVersion) {
        dialogBox.innerHTML = "New version : " + remoteVersion + " available!";
        
        //console.log(oot);
       // console.log(oot.version_name);
    } else {
        dialogBox.innerHTML = "Up to date : " + manifestVersion;
    }
  */

});


function loadFile(filePath) {
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
       xmlhttp.overrideMimeType("application/json");
    xmlhttp.send();

    if (xmlhttp.status == 200) {
        result = xmlhttp.responseText;
    }
    return result;
}

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
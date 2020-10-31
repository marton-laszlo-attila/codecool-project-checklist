$(document).ready(function() {

    window.onpopstate = function(event) {
        alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
      };
    if (checkUrl('journey.code.cool') === 2 && checkUrl('project') === 6) {
        var checkExist = setInterval(function() {
            if ($('.curriculum-project-content h1').ready) {
                clearInterval(checkExist);
                console.log("Running Codecool checklist process");
                changeList();      
            }
        }, 2000); // ha itt kissebb érték van, akkor a "[Violation] 'load' handler took" később fut le, akkor hibaüzenet jön
    };    
 });

function changeList() {
    var list = document.getElementsByClassName('task-criteria');
    for (i = 0; i < list.length; i++) {                
        elementLi = list[i].getElementsByTagName("LI");            
        for (e = 0; e < elementLi.length; e++) {
            inputElement = $("<input>").attr({
                id:    'checkbox-' + i + '-' + e,
                type:  'checkbox',
                class: 'chechbox-check',
            });                
            $(inputElement).on("click",
                function (event) {
                    console.log("change");
                    var urlList = checkUrlSplit();                        
                    var cookieNameElements = ["CC-check", urlList[checkUrl('project')+1], event.target.id];
                    var cookieName = cookieNameElements.join('|'); 
                    if (event.target.checked === true) $.cookie(cookieName, event.target.checked, { path: '/', domain: 'journey.code.cool' });
                    else $.removeCookie(cookieName);
                }    
            );
            $(elementLi[e]).prepend(inputElement);
        }
    }
    var cookieAll = $.cookie();
    for (const [key, value] of Object.entries(cookieAll)) {
        if (key.substring(0,8) === 'CC-check') {
            if (value === 'true') {
                var cookieSplit = key.split("|");
                var urlList = checkUrlSplit();
                var cookieName = cookieSplit[1];
                var urlName = urlList[checkUrl('project')+1];
                if (cookieName === urlName) {
                    var checkboxID = "#" + cookieSplit[2];
                    $(checkboxID).attr("checked", "checked");
                }
            }
        }
      }
    $('.curriculum-project-content').on('DOMSubtreeModified', function() {
        changeEvent();    
    });   
}

function changeEvent() {
    var contentLength = $('.curriculum-project-content').html().length;
    if (contentLength > 0) {
        $('.curriculum-project-content').off("DOMSubtreeModified");
        changeList()
    }
 }

function checkUrl(name) {
    var urlSplit = checkUrlSplit();
    return urlSplit.lastIndexOf(name);
}

function checkUrlSplit () {
    //return $(location).attr('href').split("/");
    var url = document.location.href;
    //onsole.log (url.split("/"));
    return url.split("/");
}


var storageList = loadStorage();
console.log("Start Codecool checklist...");

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.greeting == "CodeCool check") checkCurriculum();
      if (request.greeting == "yesAll") {
            window.localStorage.setItem('CodeCool-checklist', '');
          clearCheklist();
      }
      if (request.greeting == "yesCurrent") {
        storageList = loadStorage();
        urlList = checkUrlSplit();  
        storageListIndex = urlList[checkUrl('project')+1]; 
        delete storageList[storageListIndex];
        saveStorage(storageList); 
        clearCheklist();
        //changeList();       
      }
      sendResponse({farewell: "goodbye"});
    });

function checkCurriculum() {
    var checkExist = setInterval(function() {
        var content = document.getElementsByClassName("curriculum-project-content");
        if (content.length) {
            clearInterval(checkExist);
            changeList();      
        }
    }, 500); // ha itt kissebb érték van, akkor a "[Violation] 'load' handler took" később fut le, akkor hibaüzenet jön
}

function changeList() {
    var list = document.getElementsByClassName('task-criteria');
    for (i = 0; i < list.length; i++) {                       
        elementLi = list[i].querySelectorAll("li");            
        for (e = 0; e < elementLi.length; e++) {
            inputElement = document.createElement("input");
            inputElement.setAttribute('id', 'checkbox-' + i + '-' + e);
            inputElement.setAttribute('type', 'checkbox');
            inputElement.setAttribute('class', 'chechbox-check');
            inputElement.addEventListener("click",
                function (event) {
                    var urlList = checkUrlSplit();  
                    var storageListIndex = urlList[checkUrl('project')+1];    // onboarding-frontend
                    var storageListId = event.target.id;                      // checkbox-8-0
                    var storageListIndexData = storageList[storageListIndex]; // van-e onboarding-frontend
                    
                    if (event.target.checked === true) {
                        if (typeof storageListIndexData === 'undefined') {
                            storageList[storageListIndex] = {[storageListId]: true};         // ha még nincs, akkor létrehozza
                        }
                        else {
                            storageList[storageListIndex][storageListId] = true;
                        }
                        saveStorage(storageList);    
                    }
                    else {
                        var oldListId = storageList[storageListIndex];
                        delete oldListId[storageListId];
                        storageList[storageListIndex] = oldListId;
                        saveStorage(storageList); 
                    }             
                }    
            );
            elementLi[e].prepend(inputElement);
        }
    }
    if (storageList !== null) {
        for (const [storageListIndex, storageListIds] of Object.entries(storageList)) {
            var urlList = checkUrlSplit(); 
            if (storageListIndex === urlList[checkUrl('project')+1]) {
                for (const [key, value] of Object.entries(storageListIds)) {
                    document.getElementById(key).checked = true;
                }
            }
        }
    }
    else storageList = loadStorage();
}

 function checkUrl(name) {
    var urlSplit = checkUrlSplit();
    return urlSplit.lastIndexOf(name);
}

function checkUrlSplit () {
    var url = document.location.href;
    return url.split("/");
}

function loadStorage() {
    var text = window.localStorage.getItem('CodeCool-checklist');
    var list = null;
    if (text !== '') {
        list = JSON.parse(text);
    }
    else {
        window.localStorage.setItem('CodeCool-checklist', '');
        var list = Object();
    }
    return list;
}

function  saveStorage(storageList) {
    var list = JSON.stringify(storageList);
    window.localStorage.setItem('CodeCool-checklist', list);
}

function clearCheklist() {
    chechboxAll = document.getElementsByClassName('chechbox-check');
    for (i = 0; i < chechboxAll.length; i++) {        
        chechboxId = chechboxAll[i].getAttribute("id");
        document.getElementById(chechboxId).checked = false;
    }
}
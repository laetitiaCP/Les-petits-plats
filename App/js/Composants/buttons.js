function buttonOnclickListOpened(parElementToListen, parElementIcon, parElementToDisplay, parIndex) {

    parElementToListen.addEventListener("click", function () {
        let locElementToDisplayChild = searchBrotherDom(parElementToDisplay)
        let locParentParElementToListen = parElementToListen.parentElement;

        if (parElementToDisplay.style.display !== "flex") {
            parElementToListen.style.display = "none";
            parElementToDisplay.style.display = "flex";
            parElementIcon.style.display = "inline-block";
            locElementToDisplayChild.style.width = "617px";
            locParentParElementToListen.style.borderBottomRightRadius = "0";
            locElementToDisplayChild.style.borderBottomLeftRadius = "0";
        }
        for (let i= 0; i < listElements.length; i++) {
            if (i !== parIndex) {
                closeLists(chevronUpButtons[i], chevronDownButtons[i], listElements[i])
            }
        }
    });
}

function buttonOnclickListClosed(parElementToClose, parElementIcon, parElementToDisplay){
    parElementToClose.addEventListener("click", function() {
        closeLists(parElementToClose, parElementIcon, parElementToDisplay)
    });
}

function closeLists(parElementToClose, parElementIcon, parElementToDisplay) {
    let locElementToDisplayChild = searchBrotherDom(parElementToDisplay)
    let locParentParElementToClose = parElementIcon.parentElement;
    if (parElementToDisplay.style.display === "flex") {
        parElementToClose.style.display = "none";
        parElementToDisplay.style.display = "none";
        parElementIcon.style.display = "inline-block";
        locElementToDisplayChild.style.width = "170px";
        locElementToDisplayChild.style.borderBottomLeftRadius = "0.375rem";
        locParentParElementToClose.style.borderBottomRightRadius = "0.375rem";
    }
}



function buttonOnclickListOpened(parElementToListen, parElementIcon, parElementToDisplay, parIndex) {
    const locElementToDisplayParent = parElementToListen.parentElement;

    parElementToListen.addEventListener("click", function () {
        if (parElementToDisplay.style.display !== "flex") {
            parElementToListen.style.display = "none";
            parElementToDisplay.style.display = "flex";
            parElementIcon.style.display = "inline-block";
            locElementToDisplayParent.style.width = "667px";
            locElementToDisplayParent.style.borderBottomRightRadius = "0";
            locElementToDisplayParent.style.borderBottomLeftRadius = "0";
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
    const locElementToDisplayParent = parElementToClose.parentElement;
    if (parElementToDisplay.style.display === "flex") {
        parElementToClose.style.display = "none";
        parElementToDisplay.style.display = "none";
        parElementIcon.style.display = "inline-block";
        locElementToDisplayParent.style.width = "170px";
        locElementToDisplayParent.style.borderBottomRightRadius = "5%";
        locElementToDisplayParent.style.borderBottomLeftRadius = "5%";
    }
}



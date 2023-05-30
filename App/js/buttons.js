
const chevronDown = document.getElementsByClassName("bi-chevron-down");
const chevronUp = document.getElementsByClassName("bi-chevron-up");
function buttonOnclickListOpened(parElementToListen, parElementIcon, parElementToDisplay) {
    const locElementToDisplayParent = parElementToListen.parentElement;
    parElementToListen.addEventListener("click", function () {
        if(parElementToDisplay.style.display !== "flex") {
            parElementToListen.style.display = "none";
            parElementToDisplay.style.display = "flex";
            parElementIcon.style.display = "inline-block";
            locElementToDisplayParent.style.width = "667px";
            locElementToDisplayParent.style.borderBottomRightRadius = "0";
            locElementToDisplayParent.style.borderBottomLeftRadius = "0";
        }
    });
}

function buttonOnclickListClosed(parElementToListen, parElementIcon, parElementToDisplay){
    const locElementToDisplayParent = parElementToListen.parentElement;
    parElementToListen.addEventListener("click", function () {
        if(parElementToDisplay.style.display === "flex") {
            parElementToListen.style.display = "none";
            parElementToDisplay.style.display = "none";
            parElementIcon.style.display = "inline-block";
            locElementToDisplayParent.style.width = "170px";
            locElementToDisplayParent.style.borderBottomRightRadius = "5%";
            locElementToDisplayParent.style.borderBottomLeftRadius = "5%";
        }
    });
}



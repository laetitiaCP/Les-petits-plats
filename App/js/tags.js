const _filterTags = document.getElementById("filter__tags");
function addFilterTags(parElement){
    let locSplitClassNameElement = String(parElement.className).split("-")
    let locTag = document.createElement("span");
    let locClassName = "tags-" + locSplitClassNameElement[2];
    locTag.setAttribute("class", locClassName);
    locTag.textContent = parElement.textContent;

    let locCrossIcon = document.createElement("i");
    locCrossIcon.setAttribute("class", "bi bi-x-circle");
    locCrossIcon.onclick = () => {
        locTag.remove();
    }

    locTag.appendChild(locCrossIcon);

    _filterTags.appendChild(locTag)
}
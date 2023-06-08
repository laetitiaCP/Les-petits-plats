const _filterTags = document.getElementById("filter__tags");
const inputIngredients = document.getElementById("input-ingredients");
const inputAppliances = document.getElementById("input-appliances");
const inputUstensils = document.getElementById("input-ustensils");
const tagsSetForSearch = new Set();

/**
 * Appelée par locElementList dans la liste des ingrédients, appareils et ustensiles
 * @param parElement
 */

function addFilterTags(parElement){
    let locNameElement = parElement.textContent;
    let locSplitClassNameElement = String(parElement.className).split("-")
    let locTag = document.createElement("span");
    let locClassName = "tags-" + locSplitClassNameElement[2];
    locTag.setAttribute("class", locClassName);
    locTag.textContent = locNameElement;

    let locCrossIcon = document.createElement("i");
    locCrossIcon.setAttribute("class", "bi bi-x-circle");
    locCrossIcon.onclick = () => {
        locTag.remove();
        deleteTag();
    }

    locTag.appendChild(locCrossIcon);

    _filterTags.appendChild(locTag);

    justSearchWithTags(parElement, locSplitClassNameElement[2]);

}

/**
 * Recherche seulement les recettes qui contiennent le ou les tags avec ou sans la barre de recherche principale
 * @param parTextElement
 */
function justSearchWithTags(parElement, parType) {
    let parTextElement = parElement.textContent.toLowerCase();
    let valueInputPrincipal = document.getElementById("search-input").value;
    removeAllSectionsResearch(recipeSection, ingredientElement, applianceElement, ustensilElement);
    if(valueInputPrincipal === "") {
        researchOnlyWithTags(parElement, parType);
    } else {
        researchToClickTags(parTextElement);
    }
    updateAllInputs(ingredientsSet, ingredientElement, appliancesSet, applianceElement, ustensilsSet, ustensilElement);
}

/**
 * Recherche avec les tags sans la barre de recherche principale
 * @param parTextElement
 */
function researchOnlyWithTags(parElement, parType) {
    tagsSetForSearch.clear();

    let listTags = _filterTags.children;
    let isContained = false;
    let areAllWordsContained = false;

    /*for(let element of recipes) {
        if(parType === "ingredients") {
            for (let i = 0; i < element.ingredients.length; i++) {
                if ((element.ingredients[i].ingredient).toLowerCase().includes(parElement.textContent.toLowerCase())) {
                    isContained = true;
                    tagsSetForSearch.add(element);
                    break;
                }
            }
        }
        if(parType === "appliance") {
            console.log((element.appliance).toLowerCase())
            console.log(parElement.textContent)
            if ((element.appliance).toLowerCase().includes(parElement.textContent.toLowerCase())){
                isContained = true;
                tagsSetForSearch.add(element);
                continue;
            }
        }
        if(parType === "ustensils") {
            for (let i = 0; i < element.ustensils.length; i++) {
                if ((element.ustensils[i]).toLowerCase().includes(parElement.textContent.toLowerCase())) {
                    isContained = true;
                    tagsSetForSearch.add(element);
                    break;
                }
            }
        }
    }*/

    for(let element of recipes) {
        isContained = false;
        areAllWordsContained = true;

        for(let i=0; i<listTags.length; i++) {
            isContained = false;
            let locClass = listTags[i].className.split("-");
            let locType = locClass[1];
            let locTextTag = listTags[i].textContent.toLowerCase();

            if(locType === "ingredients") {
                for (let i = 0; i < element.ingredients.length; i++) {
                    if ((element.ingredients[i].ingredient).toLowerCase().includes(locTextTag)) {
                        isContained = true;
                        areAllWordsContained &= true;
                        break;
                    }
                }
                continue;
            }
            if (locType === "appliance") {
                if (element.appliance.toLowerCase().includes(locTextTag)) {
                    isContained = true;
                    areAllWordsContained &= true;
                    continue;
                }
            }
            if(locType === "ustensils") {
                for (let i = 0; i < element.ustensils.length; i++) {
                    if (element.ustensils[i].toLowerCase().includes(locTextTag)) {
                        isContained = true;
                        areAllWordsContained &= true;
                        break;
                    }
                }
                continue;
            } else {
                if (false === isContained) {
                    isContained = false;
                    areAllWordsContained = false;
                    break;
                }
            }
        }
        if(areAllWordsContained) {
            tagsSetForSearch.add(element);
        }
    }
    return displayRecipesDetails(tagsSetForSearch);
}

function researchInTags(parInput, parSet, parElementHtml) {
    const updatedSet = new Set();
    parInput.addEventListener("input", e => {
        updatedSet.clear();
       let locIngredientEntered = e.target.value.toLowerCase();
       for(let item of parSet) {
           if(String(item).toLowerCase().includes(locIngredientEntered)) {
               updatedSet.add(item);
           }
       }
       removeAllChildNodes(parElementHtml);
       displayListFilters(updatedSet, parElementHtml);
    });
}

function researchToClickTags(parString) {
    let tagsSet = new Set();
    for(let element of recipesSorted) {
        let isContained = false;
        if ((element.name).toLowerCase().includes(parString)) {
            tagsSet.add(element);
            continue;
        } else {
            for (let i = 0; i < element.ingredients.length; i++) {
                if ((element.ingredients[i].ingredient).toLowerCase().includes(parString)) {
                    isContained = true;
                    tagsSet.add(element);
                    break;
                }
            }
            if ((element.appliance).toLowerCase().includes(parString)) {
                isContained = true;
                tagsSet.add(element);
                continue;
            }

            for (let i = 0; i < element.ustensils.length; i++) {
                if ((element.ustensils[i]).toLowerCase().includes(parString)) {
                    isContained = true;
                    tagsSet.add(element);
                    break;
                }
            }
        }
        if (false == isContained) {
            if ((element.description).toLowerCase().includes(parString)) {
                isContained = true;
                tagsSet.add(element)
            }
        }
    }
    return displayRecipesDetails(tagsSet);
}

function deleteTag() {
    let valueInputPrincipal = document.getElementById("search-input").value;
    let listTags = document.getElementById("filter__tags").children;
    if(listTags.length === 0) {
        removeAllSectionsResearch(recipeSection, ingredientElement, applianceElement, ustensilElement);
        research(valueInputPrincipal);
        updateAllInputs(ingredientsSet, ingredientElement, appliancesSet, applianceElement, ustensilsSet, ustensilElement);
    } else {
        removeAllSectionsResearch(recipeSection, ingredientElement, applianceElement, ustensilElement);
        for(let i=0; i<listTags.length; i++) {
            researchToClickTags(listTags[i].outerText.toLowerCase());
        }
        updateAllInputs(ingredientsSet, ingredientElement, appliancesSet, applianceElement, ustensilsSet, ustensilElement);
    }
}


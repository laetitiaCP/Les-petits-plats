const _filterTags = document.getElementById("filter__tags");
const inputIngredients = document.getElementById("input-ingredients");
const inputAppliances = document.getElementById("input-appliances");
const inputUstensils = document.getElementById("input-ustensils");

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
    let valueInputPrincipal = document.getElementById("search-input").value;
console.log(valueInputPrincipal)
    if(valueInputPrincipal === "") {
        removeAllSectionsResearch(recipeSection, ingredientElement, applianceElement, ustensilElement);
        research(locNameElement.toLowerCase());
        updateAllInputs(ingredientsSet, ingredientElement, appliancesSet, applianceElement, ustensilsSet, ustensilElement);
    } else {
        removeAllSectionsResearch(recipeSection, ingredientElement, applianceElement, ustensilElement);
        researchToClickTags(parElement.textContent.toLowerCase());
        updateAllInputs(ingredientsSet, ingredientElement, appliancesSet, applianceElement, ustensilsSet, ustensilElement);
    }
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
       console.log(updatedSet)
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
        }
        if (false == isContained) {
            if ((element.description).toLowerCase().includes(parString)) {
                isContained = true;
                tagsSet.add(element)
            }
        }
    }
    console.log(tagsSet)
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


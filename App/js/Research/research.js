
const recipesSorted = new Set();
function research(parEntry) {
    recipesSorted.clear();
    let locWordsToSearch = parEntry.split(" ");

    const recipes = getData();
    let isContained = false;
    let areAllWordsContained = false;

    for(let i=0; i<recipes.length; i++) {
        isContained = false;
        areAllWordsContained = true;

        for (let j=0; j<locWordsToSearch.length; j++) {
            isContained = false;
            if (locWordsToSearch[j] === "") {
                continue;
            }

            if ((recipes[i].name).toLowerCase().includes(locWordsToSearch[j])) {
                isContained = true;
                areAllWordsContained &= true;
                continue;
            } else {
                for (let k = 0; k < recipes[i].ingredients.length; k++) {
                    if ((recipes[i].ingredients[k].ingredient).toLowerCase().includes(locWordsToSearch[j])) {
                        isContained = true;
                        areAllWordsContained &= true;
                        break;
                    }
                }
                if (false == isContained) {
                    if ((recipes[i].description).toLowerCase().includes(locWordsToSearch[j])) {
                        isContained = true;
                        areAllWordsContained &= true;
                    } else {
                        isContained = false;
                        areAllWordsContained = false;
                        break;
                    }
                }
            }
        }
        if(areAllWordsContained) {
            recipesSorted.add(recipes[i]);
        }
    }
    console.log(recipesSorted.size)
    if(recipesSorted.size === 0) {
        return noResult();
    } else {
        return displayRecipesDetails(recipesSorted);
    }
}

function removeAllSectionsResearch(parPrincipalResearch, parIngredientsResearch, parApplianceResearch, parUstensilsResearch) {
    removeAllChildNodes(parPrincipalResearch);
    removeAllChildNodes(parIngredientsResearch);
    removeAllChildNodes(parApplianceResearch);
    removeAllChildNodes(parUstensilsResearch);
    ingredientsSet.clear();
    appliancesSet.clear();
    ustensilsSet.clear();
}

function updateAllInputs(parFirstSet, parFirstElement, parSecondSet, parSecondElement, parThirdSet, parThirdElement) {
    displayListFilters(parFirstSet, parFirstElement);
    displayListFilters(parSecondSet, parSecondElement);
    displayListFilters(parThirdSet, parThirdElement);
}

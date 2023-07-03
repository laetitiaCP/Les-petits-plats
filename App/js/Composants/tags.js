const _filterTags = document.getElementById("filter__tags");
const inputIngredients = document.getElementById("input-ingredients");
const inputAppliances = document.getElementById("input-appliances");
const inputUstensils = document.getElementById("input-ustensils");

/**
 * Appelée par locElementList dans la liste des ingrédients, appareils et ustensiles
 * @param parElement
 */
function addFilterTags(parElement){
    let locSplitClassNameElement = String(parElement.className).split("-")
    let locTag = document.createElement("span");
    let locClassName = "tags-" + locSplitClassNameElement[2];
    locTag.setAttribute("class", locClassName);
    locTag.textContent = parElement.textContent;

    let locCrossIcon = document.createElement("img");
    locCrossIcon.setAttribute("id", "x-circle");
    locCrossIcon.setAttribute("src", "App/Images/x-circle.svg");
    locCrossIcon.onclick = () => {
        locTag.remove();
        deleteTag();
    }

    locTag.appendChild(locCrossIcon);

    _filterTags.appendChild(locTag);

    searchWithAddedTags();
}

function researchInTags(parInput, parSet, parElementHtml) {
    const updatedSet = new Set();
    parInput.addEventListener("input", e => {
        updatedSet.clear();
        let locIngredientEntered = e.target.value.toLowerCase();
        parSet.forEach(function (value) {
            if(value.toLowerCase().includes(locIngredientEntered)) {
                updatedSet.add(value);
            }
        });
        removeAllChildNodes(parElementHtml);
        displayListFilters(updatedSet, parElementHtml);
    });
}

/**
 * Recherche les recettes qui contiennent le ou les tags avec ou sans la barre de recherche principale
 * @param parElement
 */
function searchWithAddedTags() {
    let locValuePrincipalInput = document.getElementById("search-input").value;
    removeAllSectionsResearch(recipeSection, ingredientElement, applianceElement, ustensilElement);
    researchWithTags(locValuePrincipalInput);
    updateAllInputs(ingredientsSet, ingredientElement, appliancesSet, applianceElement, ustensilsSet, ustensilElement);
}

/**
 * Recherche avec les tags
 * @param parElement
 * @param parType
 */
function researchWithTags(parPrincipalInput) {
    let listTags = Array.from(_filterTags.children);
    let listRecipesWithIngredients = [];
    let listRecipesWithAppliances = [];
    let listRecipesWithUstensils = [];
    let hasTagIngredients = false;
    let hasTagAppliances = false;
    let hasTagUstensils = false;
    let recipesListFilteredTags = null;

    listTags.forEach( tag => {
        let locClass = tag.className.split("-");
        let locType = locClass[1];
        let locTextTag = tag.textContent.toLowerCase();


        if(locType === "ingredients") {
            if(mapByIngredients.get(locTextTag)) {
                listRecipesWithIngredients = [...mapByIngredients.get(locTextTag)];
                hasTagIngredients = true;
                return;
            }
        }
        if(locType === "appliances") {
            if(mapByAppliances.get(locTextTag)) {
                listRecipesWithAppliances = [...mapByAppliances.get(locTextTag)];
                hasTagAppliances = true;
                return;
            }
        }
        if(locType === "ustensils") {
            if(mapByUstensils.get(locTextTag)) {
                listRecipesWithUstensils = [...mapByUstensils.get(locTextTag)];
                hasTagUstensils = true;
                return;
            }
        }
    });

    if (hasTagIngredients) {
        recipesListFilteredTags = [...listRecipesWithIngredients];
    }

    if (hasTagAppliances) {
        if(recipesListFilteredTags === null) {
            recipesListFilteredTags = [...listRecipesWithAppliances];
        } else {
            recipesListFilteredTags = recipesListFilteredTags.filter(value => {
                return listRecipesWithAppliances.includes(value);
            });
        }
    }
    if (hasTagUstensils) {
        if(recipesListFilteredTags === null) {
            recipesListFilteredTags = [...listRecipesWithUstensils];
        } else {
            recipesListFilteredTags = recipesListFilteredTags.filter(value => {
                return listRecipesWithUstensils.includes(value);
            });
        }
    }

    if(parPrincipalInput !== "") {
        recipesListFilteredTags = recipesListFilteredTags.filter(value => {
            if (recipedSorted.includes(value)) {
                return true;
            }
        });
    }
    return displayRecipesDetails(recipesListFilteredTags);
}

function deleteTag() {
    let valueInputPrincipal = document.getElementById("search-input").value;
    let listTags = document.getElementById("filter__tags").children;

    removeAllSectionsResearch(recipeSection, ingredientElement, applianceElement, ustensilElement);

    if(listTags.length === 0) {
        research(valueInputPrincipal);
    } else {
        researchWithTags(valueInputPrincipal);
    }

    updateAllInputs(ingredientsSet, ingredientElement, appliancesSet, applianceElement, ustensilsSet, ustensilElement);
}

const recipes = getData();
const ingredientsSet = new Set();
const appliancesSet = new Set();
const ustensilsSet = new Set();
const ingredientElement = document.getElementById("ingredients-list");
const applianceElement = document.getElementById("appliance-list");
const ustensilElement = document.getElementById("ustensils-list");
const chevronDownButtons = document.getElementsByClassName("bi-chevron-down");
const chevronUpButtons = document.getElementsByClassName("bi-chevron-up")
const listElements = [ingredientElement, applianceElement, ustensilElement];
const searchRecipe = document.getElementById("search-input");
const recipeSection = document.getElementById("recipe-section");

function displayRecipesDetails(recipes){
    const recipeSection = document.getElementById("recipe-section");
    recipes.forEach( (recipe) => {
        const recipesModel = recipesFactory(recipe);
        const recipeCard = recipesModel.getRecipeCard();
        recipeSection.appendChild(recipeCard);
    });
}

function displayListFilters(parSet, parIdHTML) {
    let locStringElement = String(parIdHTML.id).split("-");
    parSet.forEach(element => {
        let locElementList = document.createElement("li");
        locElementList.setAttribute("role", "option");
        locElementList.setAttribute("class", "list-options-" + locStringElement[0]);
        locElementList.setAttribute("onclick" , "addFilterTags(this)");
        locElementList.textContent = element;
        parIdHTML.appendChild(locElementList);
    })
}

function initListener() {
    let locItemEntered;
    searchRecipe.addEventListener("input", e => {
        locItemEntered = e.target.value.toLowerCase();
        if(locItemEntered.length >= 3) {
            removeAllSectionsResearch(recipeSection, ingredientElement, applianceElement, ustensilElement);
            research(locItemEntered);
            updateAllInputs(ingredientsSet, ingredientElement, appliancesSet, applianceElement, ustensilsSet, ustensilElement);
        } else {
            if(_filterTags.children.length === 0 ) {
                removeAllSectionsResearch(recipeSection, ingredientElement, applianceElement, ustensilElement);
                displayRecipesDetails(recipes);
                updateAllInputs(ingredientsSet, ingredientElement, appliancesSet, applianceElement, ustensilsSet, ustensilElement);
            } else {
                for(let i=0; i<_filterTags.children.length; i++) {
                    justSearchWithTags(_filterTags.children[i].textContent);
                }
            }

        }
    });
    researchInTags(inputIngredients, ingredientsSet, ingredientElement);
    researchInTags(inputAppliances, appliancesSet, applianceElement);
    researchInTags(inputUstensils, ustensilsSet, ustensilElement);

    document.body.addEventListener("click", closeListsInputs);
}

function closeListsInputs(e) {
    e.target.classList.forEach(element => {
        if (element !== "form-control" && element !== "bi" && element !== "bi-chevron-down"){
            for (let i=0; i<listElements.length; i++) {
                closeLists(chevronUpButtons[i], chevronDownButtons[i], listElements[i]);
            }
        }
    })
}

function init() {

    removeAllSectionsResearch(recipeSection, ingredientElement, applianceElement, ustensilElement);
    displayRecipesDetails(recipes);
    updateAllInputs(ingredientsSet, ingredientElement, appliancesSet, applianceElement, ustensilsSet, ustensilElement);

    for (let i=0; i < listElements.length; i++) {
        buttonOnclickListOpened(chevronDownButtons[i], chevronUpButtons[i], listElements[i], i);
        buttonOnclickListClosed(chevronUpButtons[i], chevronDownButtons[i], listElements[i]);
    }

    initListener();

}

init();
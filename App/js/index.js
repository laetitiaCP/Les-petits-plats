const ingredientsSet = new Set();
const appliancesSet = new Set();
const ustensilsSet = new Set();
const ingredientElement = document.getElementById("ingredients-list");
const applianceElement = document.getElementById("appliances-list");
const ustensilElement = document.getElementById("ustensils-list");
const chevronDownButtons = document.getElementsByClassName("bi-chevron-down");
const chevronUpButtons = document.getElementsByClassName("bi-chevron-up")
const listElements = [ingredientElement, applianceElement, ustensilElement];
const searchRecipe = document.getElementById("search-input");
const recipeSection = document.getElementById("recipe-section");
let mapRecettes;
let mapByIngredients;
let mapByAppliances;
let mapByUstensils;
let recipes = [];

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

function initMaps() {
    recipes = getData();

    mapRecettes = new Map(
        recipes.map(recipe => {
            return [recipe.name, recipe];
        })
    );

    mapByIngredients = new Map();
    mapByAppliances = new Map();
    mapByUstensils = new Map();
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => {
            let locList = mapByIngredients.get(ingredient.ingredient.toLowerCase());
            if (!locList || locList === undefined) {
                locList = [];
                mapByIngredients.set(ingredient.ingredient.toLowerCase(), locList);
            }
            locList.push(recipe);
        });

        let locListForAppliance = mapByAppliances.get(recipe.appliance.toLowerCase());
        if (!locListForAppliance || locListForAppliance === undefined) {
            locListForAppliance = [];
            mapByAppliances.set(recipe.appliance.toLowerCase(), locListForAppliance);
        }
        locListForAppliance.push(recipe);

        recipe.ustensils.forEach(ustensil => {
            let locListForUstensils = mapByUstensils.get(ustensil.toLowerCase());
            if (!locListForUstensils || locListForUstensils === undefined) {
                locListForUstensils = [];
                mapByUstensils.set(ustensil.toLowerCase(), locListForUstensils);
            }
            locListForUstensils.push(recipe);
        });
    });
}



function initListeners() {
    let locItemEntered;
    searchRecipe.addEventListener("input", e => {
        locItemEntered = e.target.value.toLowerCase();
        removeAllSectionsResearch(recipeSection, ingredientElement, applianceElement, ustensilElement);
        if (locItemEntered.length >= 3) {
            research(locItemEntered);
        } else {
            if (_filterTags.children.length === 0) {
                displayRecipesDetails(recipes);
            } else {
                researchWithTags(locItemEntered);
            }
        }
        updateAllInputs(ingredientsSet, ingredientElement, appliancesSet, applianceElement, ustensilsSet, ustensilElement);
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
    initMaps();
    initListeners();
    removeAllSectionsResearch(recipeSection, ingredientElement, applianceElement, ustensilElement);
    displayRecipesDetails(recipes);
    updateAllInputs(ingredientsSet, ingredientElement, appliancesSet, applianceElement, ustensilsSet, ustensilElement);

    for (let i=0; i < listElements.length; i++) {
        buttonOnclickListOpened(chevronDownButtons[i], chevronUpButtons[i], listElements[i], i);
        buttonOnclickListClosed(chevronUpButtons[i], chevronDownButtons[i], listElements[i]);
    }
}

init();
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

function init() {
    let recipes = getData();
    let locItemEntered;
    searchRecipe.addEventListener("input", e => {
        locItemEntered = e.target.value.toLowerCase();
        if(locItemEntered.length >= 3) {
            console.log(locItemEntered.length);
            recipeSection.remove();
            displayRecipesDetails(research(locItemEntered));
        }
    })

    displayRecipesDetails(recipes);
    displayListFilters(ingredientsSet, ingredientElement);
    displayListFilters(appliancesSet, applianceElement);
    displayListFilters(ustensilsSet, ustensilElement);
    for (let i=0; i < listElements.length; i++) {
        buttonOnclickListOpened(chevronDownButtons[i], chevronUpButtons[i], listElements[i]);
        buttonOnclickListClosed(chevronUpButtons[i], chevronDownButtons[i], listElements[i]);
    }
}

init();
function displayRecipesDetails(recipes){
    const recipeSection = document.getElementById("recipe-section");
    recipes.forEach( (recipe) => {
        const recipesModel = recipesFactory(recipe);
        const recipeCard = recipesModel.getRecipeCard();
        recipeSection.appendChild(recipeCard);
    });
}
function init() {
    const recipes = getData();
    displayRecipesDetails(recipes);
}

init();
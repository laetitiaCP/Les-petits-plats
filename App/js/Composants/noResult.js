function noResult() {
    const spanNoResult = document.createElement("span");
    spanNoResult.setAttribute("class", "span-noResult");
    spanNoResult.textContent = "Aucune recette ne correspond à votre critère... vous pouvez chercher \"tarte aux pommes\", \"poisson\", etc.";
    recipeSection.appendChild(spanNoResult);
}
function recipesFactory(data) {
    const { id, name, servings, time, description, appliance, ingredients, ustensils } = data;

    function getRecipeCard() {
        const locDivCol = document.createElement("div");
        locDivCol.setAttribute("class", "col")
        const locCard = document.createElement("div");
        locCard.setAttribute("class","card h-100");
        const locCardImage = document.createElement("img");
        locCardImage.setAttribute("class", "card-img-top");
        locCardImage.setAttribute("src","App/Images/rectangle.png");
        locCardImage.setAttribute("alt", "image représentant la recette");
        const locCardBody = document.createElement("div");
        locCardBody.setAttribute("class","card-body");

        const locCardTitle = document.createElement("h3");
        locCardTitle.setAttribute("class","card-title");
        locCardTitle.textContent = name;

        const locCardHeader = document.createElement("div");
        locCardHeader.setAttribute("class", "card-head");
        const locCardTimeIcon = document.createElement("img");
        locCardTimeIcon.setAttribute("src", "App/Images/clock.svg");
        const locCardTimeNumber = document.createElement("span");
        locCardTimeNumber.textContent = time + " min";

        const locCardDescription = document.createElement("div");
        locCardDescription.setAttribute("class", "card-description");
        const locCardListIngredients = document.createElement("ul");
        locCardListIngredients.setAttribute("id", "card-list-ingredients");
        ingredients.forEach( locIngredient => {
            const { ingredient, quantity, unit } = locIngredient;
            ingredientsSet.add(ingredient);
            const locCardIngredient = document.createElement("li");
            if (unit && quantity) {
                locCardIngredient.textContent = ingredient + ": " + quantity + " " + unit;
            } else if (quantity) {
                locCardIngredient.textContent = ingredient + ": " + quantity;
            } else {
                locCardIngredient.textContent = ingredient + "";
            }

            locCardListIngredients.appendChild(locCardIngredient);
        })
        appliancesSet.add(appliance);
        ustensils.forEach(ustensil => {
            ustensilsSet.add(ustensil);
        });
        const locCardText = document.createElement("p");
        locCardText.setAttribute("class", "card-text");
        locCardText.textContent = description;

        locCardHeader.appendChild((locCardTitle))
        locCardHeader.appendChild(locCardTimeIcon);
        locCardHeader.appendChild(locCardTimeNumber);

        locCardDescription.appendChild(locCardListIngredients);
        locCardDescription.appendChild(locCardText);

        locCardBody.appendChild(locCardHeader);
        locCardBody.appendChild(locCardDescription);

        locCard.appendChild(locCardImage);
        locCard.appendChild(locCardBody);

        locDivCol.appendChild(locCard);

        return locDivCol;

    }
    return {getRecipeCard};
}
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
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
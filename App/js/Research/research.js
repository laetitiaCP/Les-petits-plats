let recipedSorted = [];
function research(parEntry) {
    let locWordsToSearch = parEntry.split(" ");
    locWordsToSearch = locWordsToSearch.filter( word => {
        if (word === "") {
            return false;
        }
        return true;
    });
    recipedSorted = recipes.filter( value => {
        let locRemainingWords = locWordsToSearch.filter( word => {

            if(value.name.toLowerCase().includes(String(word))){
                return true;
            } else {
                value.ingredients.forEach(ingredient => {
                    if(String(ingredient).toLowerCase().includes(String(word))) {
                        return true;
                    }
                })
                if(value.description.toLowerCase().includes(String(word))){
                     return true;
                }

                return false;
            }
        });
        return locRemainingWords.length === locWordsToSearch.length;

    });

    if(recipedSorted.length === 0) {
        return noResult();
    } else {
        return displayRecipesDetails(recipedSorted);
    }
}

const recipedSorted = new Set();
function research(parEntry) {
    recipedSorted.clear();
    let locWordsToSearch = parEntry.split(" ");

    let isContained = false;
    let areAllWordsContained = false;

    mapRecettes.forEach( (value, key, map) => {
        isContained = false;
        areAllWordsContained = true;

        locWordsToSearch.forEach( word => {
            isContained = false;
            if(word === ""){
                return;
            }
            if(key.toLowerCase().includes(word)){
                isContained = true;
                areAllWordsContained &= true;
                return;
            } else {
                value.ingredients.forEach(ingredient => {
                    if(String(ingredient).toLowerCase().includes(word)) {
                        isContained = true;
                        areAllWordsContained &= true;
                        return;
                    }
                })
                if(false === isContained) {
                    if(value.description.toLowerCase().includes(word)){
                        isContained = true;
                        areAllWordsContained &= true;
                    } else {
                        isContained = false;
                        areAllWordsContained = false;
                        return;
                    }
                }
            }

        });
        if(areAllWordsContained) {
            recipedSorted.add(value);
        }
    });

    if(recipedSorted.size === 0) {
        return noResult();
    } else {
        return displayRecipesDetails(recipedSorted);
    }
}

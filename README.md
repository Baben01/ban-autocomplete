BAN-Autocomplete
=============

Une librairie Javascript permettant de générer une autocompletion à partir de la [Base Adresse Nationale](https://www.data.gouv.fr/fr/datasets/base-adresse-nationale/).

Gère l'autocompletion des adresses à l'aide de la librairie Javascript [autoComplete.js](https://tarekraafat.github.io/autoComplete.js/#/).

CommonJS
--------
### Installation

```
npm install ban-autocomplete
```

### Utilisation

#### Utilisation simple

```javascript
//                                       (name,              placeholder,       selector)
let banAutoComplete = new BANAutocomplete("BANAutoComplete", "Localisation..." ,"#inputID")

banAutoComplete.init();
```
La recherche s'appliquera à l'élément concernant le selector. 

#### Changement des templates

Les templates de rendu peuvent être modifié à l'aide des fonctions `changeTemplateResultItem(resultItem)` et `changeTemplateResultList(resultsList)`.

`changeTemplateResultItem(resultItem)`permet de modifier le rendu des éléments dans la liste de résultat. Voir [ResultItem](https://tarekraafat.github.io/autoComplete.js/#/configuration?id=resultitem-optional). Par default :

```javascript
resultItem: {
    element: (item, data) => {
        item.style = "";
        item.innerHTML = `
            <span style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden; width: 100%;">
                ${data.match}
            </span>
            <span style="display: flex; justify-content: flex-end; font-size: 13px; font-weight: 100; text-transform: uppercase; color: rgba(0,0,0,.7);  width: 100%;">
                ${data.value.context}
            </span>`;
    },
    highlight: true
},
```

`changeTemplateResultList(resultsList)`permet de modifier le rendu des de la liste de résultat. Voir [ResultsList](https://tarekraafat.github.io/autoComplete.js/#/configuration?id=resultslist-optional). Par default :

```javascript
resultsList: {
    element: (list, data) => {
        const info = document.createElement("p");
        if (data.results.length <= 0) {
            info.innerHTML = `Recherche en cours ...`;
        }
        list.prepend(info);
    },
    noResults: true,
    maxResults: 15,
    tabSelect: true
},
```

#### Changement de l'API

Le nombre de requête est limité sur l'[API Adresse](https://geo.api.gouv.fr/adresse) à 50 requête par secondes. 
Néanmoins il est possible d'héberger localement l'API. [https://github.com/etalab/addok-docker](https://github.com/etalab/addok-docker).
Le changement de l'url s'effectue à l'aide de la function `changeBanAPIEndpoint(url)`. Par défaut la valeur est `https://api-adresse.data.gouv.fr/`.

Liens utiles
-----------------

* [Base Adresse Nationale](https://www.data.gouv.fr/fr/datasets/base-adresse-nationale/)
* [API Adresse](https://geo.api.gouv.fr/adresse)
* [autoComplete.js](https://tarekraafat.github.io/autoComplete.js/#/)


import autoComplete from "@tarekraafat/autocomplete.js";

export function initBANAutocomplete(selector, placeholder) {

  const autoCompleteJS = new autoComplete({
    selector: selector,
    threshold: 3,
    searchEngine: "strict",
    data: {
      src: async (query) => {
        try {
          const source = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${query}&type=housenumber&autocomplete=1&limit=50`);
          const data = await source.json();
          return data.features.map(el => el.properties);
        } catch (error) {
          return error;
        }
      },
      keys: ["label"],
    },
    placeHolder: placeholder,
    resultsList: {
      element: (list, data) => {
        const info = document.createElement("p");
        if (data.results.length <= 0) {
          info.innerHTML = `Searching...`;
        }
        list.prepend(info);
      },
      noResults: true,
      maxResults: 15,
      tabSelect: true
    },
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
    events: {
      input: {
        input: () => {
          if (autoCompleteJS.input.value.length && autoCompleteJS.input.value.length > autoCompleteJS.threshold) {
            autoCompleteJS.start(autoCompleteJS.input.value);
          } 
        },
        focus:  () => {
          if (autoCompleteJS.input.value.length && autoCompleteJS.input.value.length > autoCompleteJS.threshold) {
            autoCompleteJS.start(autoCompleteJS.input.value);
          } 
        }
      }
    }
  });
}
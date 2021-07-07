
import autoComplete from "@tarekraafat/autocomplete.js";

export function initBANAutocomplete(selector, placeholder) {
	let config = {
		name: "ban-address",
		selector: selector,
		wrapper: false,
		placeholder: "Locate...",
		treshold: 3,
		searchEngine: "strict",
		data: {
			src: async (query) => {
				try {
					// Fetch Data from external Source
					const source = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${query}&type=housenumber&autocomplete=1`);
					// Data is array of `Objects` | `Strings`
					const data = await source.json();
					return data;
				} catch (error) {
					return error;
				}
			},
			// Data 'Object' key to be searched
			keys: ["label"]
		},
		resultsList: {
			element: (list, data) => {
					if (!data.results.length) {
							// Create "No Results" message element
							const message = document.createElement("div");
							// Add class to the created element
							message.setAttribute("class", "no_result");
							// Add message text content
							message.innerHTML = `<span>Found No Results for "${data.query}"</span>`;
							// Append message element to the results list
							list.prepend(message);
					}
			},
			noResults: true,
		},
		resultItem: {
				highlight: {
						render: true
				}
		},
		events: {
			input: {
				focus: () => {
					if (autoCompleteJS.input.value.length) autoCompleteJS.start();
				}
			}
		}
	}
	// create autocomplete structure for input id
	const autoCompleteJS = new autoComplete({ config });
}
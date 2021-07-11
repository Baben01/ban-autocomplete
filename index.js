
import autoComplete from "@tarekraafat/autocomplete.js";
function BANAutocomplete(autoCompleteName = "autoComplete", placeholder = "Localisation...", selector = "#autoComplete")
{
	var autoCompleteJS = {};
	var banApiEndpoint = "https://api-adresse.data.gouv.fr/"
	autoCompleteConfig = {
		name: autoCompleteName,
		placeholder: placeholder,
		selector: selector,
		threshold: 3,
		searchEngine: "strict",
		data: {
		  src: async (query) => {
			try {
			  const source = await fetch(`${banApiEndpoint}search/?type=housenumber&autocomplete=1&limit=50&q=${query}`);
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
			  info.innerHTML = `Recherche en cours ...`;
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
	}
	
	this.init = function () {
		if(banApiEndpoint && banApiEndpoint != "")
			autoCompleteJS = new autoComplete(config);
		else
			return "Error : BAN API not defined."
	}

	/*
	 * Change BAN API Endpoint for custom one. 
	 * Default : "https://api-adresse.data.gouv.fr/"
	 */
	this.changeBanAPIEndpoint = function (url) {
		banApiEndpoint = url;
	}

	/*
	 * Change the default template for rendering default result Item. 
	 * resultItem must be an object. 
	 */
	this.changeTemplateResultItem = function (resultItem) {
		if(typeof resultItem === "object")
			autoCompleteConfig.resultItem = resultItem;
		else
			return "Error : Must be a Object."
	}

	/*
	 * Change the default template for rendering result list. 
	 * resultsList must be a object. 
	 */
	this.changeTemplateResultList = function (resultsList) {
		if(typeof resultsList === "object")
			autoCompleteConfig.resultsList = resultsList;
		else
			return "Error : Must be a Object."
	}
}
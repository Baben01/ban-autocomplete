
import autoComplete from "@tarekraafat/autocomplete.js";
function BANAutocomplete()
{
	"use strict";
	var autoCompleteJS = {};
	var banApiEndpoint = "https://api-adresse.data.gouv.fr/"
	autoCompleteConfig = {
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
	}
	
	this.init = function () {
		autoCompleteJS = new autoComplete(config);
	}

	this.setName = function(value) {
		autoCompleteConfig.name = value;
	}
	
	this.setSelector = function(value) {
		autoCompleteConfig.selector = value;
	}
	
	this.setPlaceholder = function(value) {
		autoCompleteConfig.placeholder = value;
	}

	this.setUrl = function (url) {
		banApiEndpoint = url;
	}
}
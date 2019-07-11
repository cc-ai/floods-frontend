import React from 'react';

export const AppContext = React.createContext({
	pageLoader: () => {
	},
	google: null,
	geocoder: null,
	autocomplete: null
});

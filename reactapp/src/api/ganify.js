import axios from "axios";

export function ganify(address, onresult, onerror) {
	// const addressForUrl = stringToBase64(address);
	const addressForUrl = address;

	// Remote end point.
	const endPoint = 'https://api.climatechangeai.org/address/version';

	// Local end point.
	// const endPoint = 'http://localhost:5000/address/01';

	// Add a random string at the end to prevent browser for using the cache.
	const apiCall = `${endPoint}/${addressForUrl}?${Math.random()}`;
	console.log(`Calling: ${apiCall}`);
	axios({
		method: 'get',
		url: apiCall,
		responseType: 'blob'
	})
		.then(reponse => {
			// Is this possible?
			if (!reponse)
				throw new Error(`No image available for address ${address}`);
			const reader = new FileReader();
			reader.readAsDataURL(reponse.data);
			reader.onloadend = function () {
				console.log(`Image loaded for ${address}`);
				onresult(reader.result);
			};
		})
		.catch(error => {
			if (onerror)
				onerror(error);
		});
}

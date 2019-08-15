import axios from "axios";

export function ganify(address, onresult, onerror) {
	// const addressForUrl = stringToBase64(address);
	const addressForUrl = encodeURI(address);

	// Remote end point.
	// const endPoint = 'https://api.climatechangeai.org/address/munit';
	const endPoint = 'https://api.climatechangeai.org/flood/munit';

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
				throw new Error(`No images for address ${address}`);
			const reader = new FileReader();
			reader.readAsDataURL(reponse.data);
			reader.onloadend = function () {
				console.log(`Images loaded for ${address}`);
				onresult(reader.result);
			};
		})
		.catch(error => {
			if (onerror)
				onerror(error);
		});
}

export function promiseGanify(address) {
	return new Promise((resolve, reject) => {
		if (address)
			ganify(address, resolve, reject);
		else
			resolve(null);
	})
}

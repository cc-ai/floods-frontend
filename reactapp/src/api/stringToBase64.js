export function stringToBase64(str) {
	return btoa(encodeURIComponent(str));
}

export function stringToBase64(str) {
	return btoa(encodeURIComponent(str));
}

export function getPageName(component) {
	return component.pageName;
}

export function getPageLink(component) {
	if (component.pageLink !== undefined) {
		return component.pageLink;
	}
	let pageName = getPageName(component);
	let link = pageName.replace(/[A-Z]{2,}/g, (value) => `${value.charAt(0)}-${value.charAt(1)}`);
	link = link.replace(/([a-z0-9])([A-Z])/g, '$1-$2');
	return '/' + link.toLocaleLowerCase();
}

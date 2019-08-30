// Inspired from: https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html

export class CancelablePromise {
	constructor(promise) {
		this.isCanceled = false;
		this.promise = new Promise((resolve, reject) => {
			promise.then(
				val => this.isCanceled ? reject({isCanceled: true}) : resolve(val),
				error => this.isCanceled ? reject({isCanceled: true}) : reject(error)
			);
		});
		this.cancel = this.cancel.bind(this);
	}

	cancel() {
		this.isCanceled = true;
	}
}

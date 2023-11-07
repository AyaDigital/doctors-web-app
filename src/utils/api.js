import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getData = (token, url) => {
	var requestOptions = {
		method: 'GET',
		url: `${BASE_URL}/${url}`,
		headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'GET',
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
				"Accept": "*/*"
		}
	};

    return new Promise((resolve, reject) => {
		if (!token) {
			reject('No token passed');
		} else {
			axios(requestOptions)
				.then(data => {
					resolve(data.data)
				})
				.catch(error => reject(error))
		}
	}).then(
		result => {
			return result;
		}
	);
}

export const postData = (token, url, data, params, headers) => {
	var requestOptions = {
		method: 'POST',
		url: `${BASE_URL}/${url}`,
		headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'POST',
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
				"Accept": "*/*",
				...headers
		},
		data,
		...params
	};

    return new Promise((resolve, reject) => {
		if (!token) {
			reject('No token passed');
		} else {
			axios(requestOptions)
				.then(data => {
					resolve(data.data)
				})
				.catch(error => reject(error))
		}
	}).then(
		result => {
			return result;
		}
	);
}

export const patchData = (token, url, data) => {
	var requestOptions = {
		method: 'PATCH',
		url: `${BASE_URL}/${url}`,
		headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'PATCH',
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
				"Accept": "*/*"
		},
		data
	};

    return new Promise((resolve, reject) => {
		if (!token) {
			reject('No token passed');
		} else {
			axios(requestOptions)
				.then(data => {
					resolve(data.data)
				})
				.catch(error => reject(error))
		}
	}).then(
		result => {
			return result;
		}
	);
}

export const putData = (token, url, data) => {
	var requestOptions = {
		method: 'PUT',
		url: `${BASE_URL}/${url}`,
		headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'PUT',
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
				"Accept": "*/*"
		},
		data
	};

    return new Promise((resolve, reject) => {
		if (!token) {
			reject('No token passed');
		} else {
			axios(requestOptions)
				.then(data => {
					resolve(data.data)
				})
				.catch(error => reject(error))
		}
	}).then(
		result => {
			return result;
		}
	);
}

export const deleteData = (token, url, data) => {
	var requestOptions = {
		method: 'DELETE',
		url: `${BASE_URL}/${url}`,
		headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': 'PUT',
				'Authorization': `Bearer ${token}`,
				'Content-Type': 'application/json',
				"Accept": "*/*"
		},
		data
	};

    return new Promise((resolve, reject) => {
		if (!token) {
			reject('No token passed');
		} else {
			axios(requestOptions)
				.then(data => {
					resolve(data.data)
				})
				.catch(error => reject(error))
		}
	}).then(
		result => {
			return result;
		}
	);
}

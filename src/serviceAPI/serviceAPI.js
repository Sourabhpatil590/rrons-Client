import axios from 'axios';

const baseURL = 'http://localhost:4001';

// Service API
const axiosService = axios.create({
	// baseURL: 'https://rrons-server.onrender.com',
	baseURL: 'http://localhost:4001',
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${localStorage.getItem('token')}`,
	},
});

const getService = async (endpoint) => {
	try {
		const response = await axios.get(baseURL + endpoint, {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			},
		});
		return response;
	} catch (error) {
		console.error('Error fetching data:', error);
		throw error;
	}
};

const postService = async (endpoint, data, formData = false) => {
	try {
		let response;
		if (formData) {
			response = await axiosService.postForm(endpoint, data);
		} else {
			response = await axiosService.post(endpoint, data);
		}
		return response;
	} catch (error) {
		// console.error('Error posting data:', error);
		throw error;
	}
};

const putService = async (endpoint, data, form) => {
	// data['_method'] = 'PUT';
	try {
		if (form) {
			console.log('inside form');
			const formData = new FormData();
			for (const key in data) {
				formData.append(key, data[key]);
			}
			data = formData;
			const response = await axiosService.putForm(endpoint, data, {
				contentType: 'multipart/form-data',
			});
			return response;
		}

		const response = await axiosService.put(endpoint, data, {
			contentType: 'multipart/form-data',
		});
		return response;
	} catch (error) {
		console.error('Error updating data:', error);
		throw error;
	}
};

const deleteService = async (endpoint) => {
	try {
		const response = await axiosService.delete(endpoint);
		return response;
	} catch (error) {
		console.error('Error deleting data:', error);
		throw error;
	}
};

export { getService, postService, putService, deleteService };

import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import {
	getService,
	postService,
	putService,
	deleteService,
} from './serviceAPI';

const checkIfUserExists = async (email) => {
	let res;
	try {
		res = await postService('/api/users/check', {
			email: email,
		});
		return res;
	} catch (err) {
		throw err;
	}
};

const login = async (data) => {
	let res;
	try {
		res = await postService('/api/users/login', data);
		return res;
	} catch (err) {
		throw err;
	}
};

const register = async (data) => {
	let res;
	try {
		res = await postService('/api/users/register', data);
		return res;
	} catch (err) {
		throw err;
	}
};

const useToken = () => {
	let token = localStorage.getItem('token');

	if (token) {
		return jwtDecode(token);
	} else {
		return null;
	}
};

const generateToken = (data) => {
	let res;
	try {
		res = postService('/api/users/generate-token', data);
		return res;
	} catch (err) {
		throw err;
	}
};

export { checkIfUserExists, login, register, useToken, generateToken };

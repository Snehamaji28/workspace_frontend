import axios from "axios";
import Cookies from 'js-cookie';

const token = Cookies.get("token");
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Configure axios with headers
const config = {
    headers: {
        'Authorization': `Bearer ${token}` // Standard bearer token format
        // or just 'Authorization': token  // if your backend expects it this way
    }
};

// Employee APIs
export const getEmployee = async () => {
    return axios.get(`${API_BASE_URL}/emp`, config);
};

export const doLogin = async (details) => {
    return axios.post(`${API_BASE_URL}/emp/login`, details, config);
};

// Attendance APIs
export const markAttendance = async () => {
    return axios.post(`${API_BASE_URL}/emp/attendance`, {}, config);
};
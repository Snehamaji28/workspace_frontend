import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Employee APIs
export const getEmployee = async () => {
    return axios.get(`${API_BASE_URL}/emp`, {
        withCredentials: true, 
    });
};

export const doLogin = async (details) => {
    return axios.post(`${API_BASE_URL}/emp/login`, details);
};

// Attendance APIs
export const markAttendance = async () => {
    return axios.post(`${API_BASE_URL}/emp/attendance`, {}, {
        withCredentials: true, 
    });
};
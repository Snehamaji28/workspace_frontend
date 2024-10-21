import axios from "axios";

// Employee APIs
export const getEmployee = async () => {
    return axios.get('/api/emp', {
        withCredentials: true, 
    });
};

export const doLogin = async (details) => {
    return axios.post('/api/emp/login', details);
};

// Attendance APIs
export const markAttendance = async () => {
    return axios.post('/api/emp/attendance', {}, {
        withCredentials: true, 
    });
};
import axios from "axios";

const Axios = axios.create({
  baseURL: 'https://nest-postgres-dogs.onrender.com/',
});


export const setAuthHeader = (token) => {
   Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const getAllUserDogs = async () => {
     try {
        const response = await Axios.get('/dogs');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch user dogs:', error);
        throw error;
    }
}

export const getAllDogs = async () => {
     try {
        const response = await Axios.get('/dogs/alldogs');
        return response.data;
    } catch (error) {
        console.error('Failed to fetch user dogs:', error);
        throw error;
    }
}
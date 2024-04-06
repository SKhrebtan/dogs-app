import axios from "axios";

export const Axios = axios.create({
  baseURL: "https://nest-postgres-dogs.onrender.com/",
});

export const setAuthHeader = (token) => {
  Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// export const getAllUserDogs = async () => {
//   try {
//     const response = await Axios.get("/dogs");
//     return response.data;
//   } catch (error) {
//     console.error("Failed to fetch user dogs:", error);
//     throw error;
//   }
// };

export const getAllDogs = async () => {
  try {
    const response = await Axios.get("/alldogs/alldogs");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user dogs:", error);
    throw error;
  }
};

export const deleteMyDog = async (token, id) => {
  try {
    //  setAuthHeader(token);
    const response = await Axios.delete(`/dogs/dog/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to delet user dog:", error);
    throw error;
  }
};

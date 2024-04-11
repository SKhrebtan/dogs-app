import axios from "axios";

export const Axios = axios.create({
  baseURL: "https://nest-postgres-dogs.onrender.com/",
});

export const setAuthHeader = (token) => {
  Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// export const getAllDogs = async () => {
//   try {
//     const response = await Axios.get("/alldogs/alldogs");
//     return response.data;
//   } catch (error) {
//     console.error("Failed to fetch user dogs:", error);
//     throw error;
//   }
// };

export const deleteDogFromAdminList = async (token, id) => {
  try {
    const response = await Axios.delete(`/alldogs/${id}`, {
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

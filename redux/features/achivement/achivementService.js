import axios from "axios"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
export const API_URL = `${BACKEND_URL}/api/achivement/`

// Get Achivements
export const getAchivements = async () => {
    const response = await axios.get(API_URL + "getAchivements")
    return response.data
};

// Add Achivements
export const addAchivement = async (achivementData) => {
    const response = await axios.post(API_URL + "addAchivement", achivementData)
    return response.data.message
};

const authService = {
    getAchivements,
    addAchivement
}

export default authService
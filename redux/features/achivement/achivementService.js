import axios from "axios"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
export const API_URL = `${BACKEND_URL}/api/achivement/`

// Get Achivements
export const getAchivements = async () => {
    const response = await axios.get(API_URL + "getAchivements")
    return response.data
};

const authService = {
    getAchivements
}

export default authService
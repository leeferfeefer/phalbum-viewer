import axios from "axios";

const instance = axios.create({
    timeout: 5000,
    baseURL: `http://${process.env.REACT_APP_HOST}:3000/api`
});


const getImages = async (index, chunkSize) => {
    const defaultImageResponse = {
        images: [],
        total: 0
    };
    try {
        const response = await instance.get(`images?index=${index}&chunkSize=${chunkSize}`);
        console.log("response", response)
        const data = response?.data;
        return data ?? defaultImageResponse;;
    } catch (error) {
        console.log("Error getting images! ", error.message);
    }
    return defaultImageResponse;
};

export default {
    getImages
}
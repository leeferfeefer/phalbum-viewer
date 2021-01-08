import axios from "axios";

const instance = axios.create({
    timeout: 5000,
    baseURL: `http://${process.env.REACT_APP_HOST}:3001/api`
});


const getImages = async () => {
    let response;
    try {
        response = await instance.get('images');
    } catch (error) {
        console.log("Error getting images! ", error.message);
    }
    return response?.data?.images;
};

export default {
    getImages
}
import axios from "axios";

const instance = axios.create({
    timeout: 60000,
    baseURL: `http://${process.env.REACT_APP_HOST}:3000/api`
});


const getImages = async (index, chunkSize) => {
    const response = await instance.get(`images?index=${index}&chunkSize=${chunkSize}`);
    return response?.data;        
};

export default {
    getImages
}
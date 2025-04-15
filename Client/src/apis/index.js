import axios from 'axios';
const apiRequest = async ({ method, endPoint, payload, queryString }) => {
    try {
        const response = await axios({
            method,
            url: endPoint,
            data: payload,
            params: queryString,
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return response.data;
    } catch (error) {
        //error specific handling
        throw new Error(
            error.response.data.message || error.message || 'Something went wrong',
        );
    }
};

export default apiRequest;

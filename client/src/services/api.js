import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api/v1`,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})


export const markPaid = async (orderId) => {
    try {
        const resp = await api.post('/order/mark-paid', { orderId });
        return resp.data;
    } catch (error) {
        console.error("Error marking order paid:", error);
        throw error;
    }
}


export default api;
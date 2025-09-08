import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api/v1`,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})


export const capturePayment = async (orderId) => {
    try {
        const resp = await api.post('/order/capture-payment', { orderId });
        return resp.data;
    } catch (error) {
        console.error("Error marking order paid:", error);
        throw error;
    }
}

export const getAllOrdersByUser = async (userId) => {
    try {
        const resp = await api.get('/order/list/' + userId);
        return resp.data;
    } catch (error) {
        console.error("Error marking order paid:", error);
        throw error;
    }
}

export const getOrderDetails = async (id) => {
    try {
        const resp = await api.get(`/order/details/${id}`);
        return resp.data;
    } catch (error) {
        console.error("Error marking order paid:", error);
        throw error;
    }
}

export const fetchAllOrdersByAdmin = async () => {
    try {
        const resp = await api.get(`/admin/order/fetch-all-orders`, { withCredentials: true });
        return resp.data;
    } catch (error) {
        console.error("Error marking order paid:", error);
        throw error;
    }
}

export const fetchOrderDetailsByAdmin = async (id) => {
    try {
        const resp = await api.get(`/admin/order/fetch/${id}`, { withCredentials: true });
        return resp.data;
    } catch (error) {
        console.error("Error marking order paid:", error);
        throw error;
    }
}


export default api;
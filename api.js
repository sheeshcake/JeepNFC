import axios from 'axios';
const BASE_API_URL = 'https://iliganjeepmodernizing.000webhostapp.com/api';
// const BASE_API_URL = 'http://10.0.2.2/jeepney/api';

let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
        }
    };
export default {
    loginDriver : (data) => {
        let res = axios.post(`${BASE_API_URL}/loginDriver.php`, data,axiosConfig)
        return res;
    },
    loginMarshal : (data) => {
        let res = axios.post(`${BASE_API_URL}/loginMarshal.php`, data,axiosConfig)
        return res;
    },
    getBusses : () => {
        let res = axios.post(`${BASE_API_URL}/busses.php`)
        return res;
    },
    getBusData : (data) => {
        let res = axios.post(`${BASE_API_URL}/busses.php`, data,axiosConfig)
        return res;
    },
    getMarshalls : () => {
        let res = axios.post(`${BASE_API_URL}/marshals.php`)
        return res;
    },
    aquireBus : (data) => {
        let res = axios.post(`${BASE_API_URL}/aquire_bus.php`, data,axiosConfig)
        return res;
    },
    leaveBus : (data) => {
        let res = axios.post(`${BASE_API_URL}/leave_bus.php`, data,axiosConfig)
        return res;
    },
    pay : (data) => {
        let res = axios.post(`${BASE_API_URL}/pay.php`, data,axiosConfig)
        return res;
    },
    payOld : (data) => {
        let res = axios.post(`${BASE_API_URL}/pay.php`, data,axiosConfig)
        return res;
    },
    getRoutes : () => {
        let res = axios.post(`${BASE_API_URL}/get_routes.php`)
        return res;
    },
    payStart : (data) => {
        let res = axios.post(`${BASE_API_URL}/set_start_location.php`, data,axiosConfig)
        return res;
    },
    payEnd : (data) => {
        let res = axios.post(`${BASE_API_URL}/set_end_location.php`, data,axiosConfig)
        return res;
    },
    loadCard : (data) => {
        let res = axios.post(`${BASE_API_URL}/load_card.php`, data,axiosConfig)
        return res;
    }
}
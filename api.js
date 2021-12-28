import axios from 'axios';
// const BASE_API_URL = 'https://iliganjeepmodernizing.000webhostapp.com/api';
const BASE_API_URL = 'http://10.0.2.2/jeepney/api';
export default {
    loginDriver : (data) => {
        let res = axios.post(`${BASE_API_URL}/loginDriver.php`, data,{
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        })
        return res;
    },
    loginMarshal : (data) => {
        let res = axios.post(`${BASE_API_URL}/loginMarshal.php`, data,{
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        })
        return res;
    },
    getBusses : () => {
        let res = axios.post(`${BASE_API_URL}/busses.php`)
        return res;
    },
    getBusData : (data) => {
        let res = axios.post(`${BASE_API_URL}/busses.php`, data,{
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        })
        return res;
    },
    getMarshalls : () => {
        let res = axios.post(`${BASE_API_URL}/marshals.php`)
        return res;
    },
    aquireBus : (data) => {
        let res = axios.post(`${BASE_API_URL}/aquire_bus.php`, data,{
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        })
        return res;
    },
    leaveBus : (data) => {
        let res = axios.post(`${BASE_API_URL}/leave_bus.php`, data,{
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        })
        return res;
    },
    pay : (data) => {
        let res = axios.post(`${BASE_API_URL}/pay.php`, data,{
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        })
        return res;
    },
    payOld : (data) => {
        let res = axios.post(`${BASE_API_URL}/pay.php`, data,{
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        })
        return res;
    },
    getRoutes : () => {
        let res = axios.post(`${BASE_API_URL}/get_routes.php`)
        return res;
    },
    payStart : (data) => {
        let res = axios.post(`${BASE_API_URL}/set_start_location.php`, data,{
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        })
        return res;
    },
    payEnd : (data) => {
        let res = axios.post(`${BASE_API_URL}/set_end_location.php`, data,{
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        })
        return res;
    },
}
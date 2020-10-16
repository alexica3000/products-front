import Axios from "axios";

export default Axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        // 'X-Requested-With': 'XMLHttpRequest'
    }
});

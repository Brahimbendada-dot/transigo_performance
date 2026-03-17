import http from "k6/http";
import { check } from "k6";




const baseURL=__ENV.baseURL

export const  APIs={
    login:`${baseURL}/api/v1/authentification/login`,    
}



export let options = {
    vus: 15,
    duration: '2m',
};



export default function () {
    const body = JSON.stringify({
        phone: "+213699938225",
        password: "123456789",
        phoneToken: "smoke_test_token"
    });

    const headers = {
        "Content-Type": "application/json"
    };

    const response = http.post(APIs.login, body, { headers });

    check(response, {
        "validate status code": (r) => r.status === 200,
        "validate response body": (r) => r.json("status") === "success"
    });
}

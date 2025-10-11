import http from "k6/http";
import { check } from "k6";




const baseURL=__ENV.baseURL

export const  APIs={
    login:`${baseURL}/api/v1/authentification/login`,    
}

export let options = {
   stages: [
        { duration: '5m', target: 50 },   // Warm-up
        { duration: '10m', target: 200 },  // Moderate load
        { duration: '20m', target: 500 },   // Heavy load
        { duration: '30m', target: 1000 }, // Peak stress
        { duration: '2m', target: 0 },    // Cooldown
      ],
};



export default function () {
    const body = JSON.stringify({
        email: "ivanovab0824@gmail.com",
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

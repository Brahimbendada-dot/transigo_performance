import http from "k6/http";
import { check } from "k6";


export let options = {
   stages: [
        { duration: '5m', target: 400 },   // Warm-up
        { duration: '10m', target: 1000 },  // Moderate load
        { duration: '20m', target: 5000 },  // Heavy load
        { duration: '30m', target: 10000 }, // Peak stress
        { duration: '2m', target: 0 },    // Cooldown
      ],
};


const baseURL = __ENV.baseURL

export const APIs = {
    signup: `${baseURL}/api/v1/authentification/signup`,
}

export default function () {
    const random = Math.floor(Math.random() * 1000000);
    const body = JSON.stringify({
        firstname: "grafana",
        lastname: "k6",
        email: `${random}user@k6.com`,
        phone: `${random}055000`,
        password: "123456789",
        address: "setif",
        roleId: "2"
    });

    const headers = {
        "Content-Type": "application/json"
    };

    const response = http.post(APIs.signup, body, { headers });

    check(response, {
        "validate status code": (r) => r.status === 201,
        "validate response body": (r) => r.json("status") === "success"
    });
}

import http from "k6/http";
import { check } from "k6";



export let options = {
    stages: [
        { duration: '2m', target: 100 }, // traffic ramp-up from 1 to 100 users over 5 minutes.
        { duration: '10m', target: 100 }, // stay at 100 users for 30 minutes
        { duration: '1m', target: 0 }, // ramp-down to 0 users
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
        email: `${random}user@example.com`,
        phone: `055000${random}`,
        password: "123456789",
        address: "setif",
        roleId: "2"
    });

    const headers = {
        "Content-Type": "application/json"
    };

    const response = http.post(APIs.signup, body, { headers });

    check(response, {
        "validate status code": (r) => r.status === 200,
        "validate response body": (r) => r.json("status") === "success"
    });
}

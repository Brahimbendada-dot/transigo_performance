import http from "k6/http";
import { check } from "k6";

const baseURL=__ENV.baseURL

export const  APIs={
    category:`${baseURL}/api/v1/category`,    
}

export let options = {
    vus: 15,
    duration: '2m',
};

export default function () {
    const response = http.get(APIs.category);
    check(response, {
        "validate status code": (r) => r.status === 200,
        "validate response body": (r) => r.json("status") === "success"
    });
}

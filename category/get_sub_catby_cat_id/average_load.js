import http from "k6/http";
import { check } from "k6";



const baseURL=__ENV.baseURL

export let options = {
   stages: [
    { duration: '2m', target: 100 }, // traffic ramp-up from 1 to 100 users over 5 minutes.
    { duration: '10m', target: 100 }, // stay at 100 users for 30 minutes
    { duration: '1m', target: 0 }, // ramp-down to 0 users
  ],
};

export const  APIs={
    category:`${baseURL}/api/v1/subcategory/categoryId/4`,    
}


export default function () {
    const response = http.get(APIs.category);
    check(response, {
        "validate status code": (r) => r.status === 200,
        "validate response body": (r) => r.json("status") === "success"
    });
}

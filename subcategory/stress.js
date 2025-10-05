import http from "k6/http";
import { check } from "k6";

const baseURL=__ENV.baseURL

export let options = {
   stages: [
        { duration: '5m', target: 50 },   // Warm-up
        { duration: '8m', target: 200 },  // Moderate load
        { duration: '12m', target: 500 },  // Heavy load
        { duration: '15m', target: 1000 }, // Peak stress
        { duration: '4m', target: 0 },    // Cooldown
      ],
};


export const  APIs={
    subCat:`${baseURL}/api/v1/subcategory/categoryId/2`,    
}


export default function () {
    const response = http.get(APIs.subCat);
    check(response, {
        "validate status code": (r) => r.status === 200,
        "validate response body": (r) => r.json("status") === "success"
    });
}

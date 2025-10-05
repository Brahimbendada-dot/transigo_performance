import http from "k6/http";
import { check } from "k6";

const baseURL=__ENV.baseURL

export let options = {
    vus: 15,
    duration: '2m',
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

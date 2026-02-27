
import http from "k6/http";
import { check } from "k6";




const baseURL=__ENV.baseURL

export const  APIs={
    photon:`${baseURL}/api/?limit=5&q=setif`,    
}




export let options = {
    vus: 15,
    duration: '2m',
};




export default function () {
    const response = http.get(APIs.photon);
    check(response, {
        "validate status code": (r) =>r.status === 200,
        "validate response body": (r) => r.json("type") === "FeatureCollection"
    });
}


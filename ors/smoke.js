



import http from "k6/http";
import { check } from "k6";




const baseURL=__ENV.baseURL

export const  APIs={
    ors:`${baseURL}/ors/v2/directions/driving-car?start=5.408680,36.185360&end=-0.630799,35.697071`,    
}



export let options = {
    vus: 15,
    duration: '2m',
};





export default function () {
    const response = http.get(APIs.ors);
    check(response, {
        "validate status code": (r) =>r.status === 200,
        "validate response body": (r) => r.json("type") === "FeatureCollection"
    });
}

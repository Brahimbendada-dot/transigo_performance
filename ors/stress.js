

import http from "k6/http";
import { check } from "k6";




const baseURL=__ENV.baseURL

export const  APIs={
    ors:`${baseURL}/ors/v2/directions/driving-car?start=5.408680,36.185360&end=-0.630799,35.697071`,    
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
    const response = http.get(APIs.ors);
    check(response, {
        "validate status code": (r) =>r.status === 200,
        "validate response body": (r) => r.json("type") === "FeatureCollection"
    });
}

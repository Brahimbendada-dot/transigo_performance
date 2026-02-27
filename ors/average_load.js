import http from "k6/http";
import { check } from "k6";




const baseURL=__ENV.baseURL

export const  APIs={
    ors:`${baseURL}/ors/v2/directions/driving-car?start=5.408680,36.185360&end=-0.630799,35.697071`,    
}



export let options = {
   stages: [
    { duration: '2m', target: 100 }, // traffic ramp-up from 1 to 100 users over 5 minutes.
    { duration: '10m', target: 100 }, // stay at 100 users for 30 minutes
    { duration: '1m', target: 0 }, // ramp-down to 0 users
  ],
};



export default function () {
    const response = http.get(APIs.ors);
    check(response, {
        "validate status code": (r) =>r.status === 200,
        "validate response body": (r) => r.json("type") === "FeatureCollection"
    });
}

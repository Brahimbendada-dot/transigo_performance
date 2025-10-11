import http from "k6/http";
import { check } from "k6";

const baseURL=__ENV.baseURL

export const  APIs={
    category:`${baseURL}/ors/v2/directions/driving-car?start=5.4046876,36.1893494&end=-0.628061580628374,35.19405138280957`,    
}

export let options = {
   stages: [
    { duration: '2m', target: 100 }, // traffic ramp-up from 1 to 100 users over 5 minutes.
    { duration: '10m', target: 100 }, // stay at 100 users for 30 minutes
    { duration: '1m', target: 0 }, // ramp-down to 0 users
  ],
};

export default function () {
    http.get(APIs.category);
}

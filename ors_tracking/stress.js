import http from "k6/http";
import { check } from "k6";

const baseURL=__ENV.baseURL

export const  APIs={
    category:`${baseURL}//ors/v2/directions/driving-car?start=5.4046876,36.1893494&end=-0.628061580628374,35.19405138280957`,    
}

export let options = {
   stages: [
        { duration: '5m', target: 50 },   // Warm-up
        { duration: '8m', target: 200 },  // Moderate load
        { duration: '10m', target: 500 },  // Heavy load
        { duration: '15m', target: 1000 }, // Peak stress
        { duration: '4m', target: 0 },    // Cooldown
      ],
};

export default function () {
    http.get(APIs.category);
}

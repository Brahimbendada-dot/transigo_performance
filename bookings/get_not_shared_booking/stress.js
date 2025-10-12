import http from "k6/http";
import { check } from "k6";




const baseURL=__ENV.baseURL

export const  APIs={
    booking:`${baseURL}/api/v1/nonSharedTrip`,    
}


export let options = {
   stages: [
        { duration: '5m', target: 50 },   // Warm-up
        { duration: '5m', target: 200 },  // Moderate load
        { duration: '20m', target: 500 },  // Heavy load
        { duration: '28m', target: 1000 }, // Peak stress
        { duration: '2m', target: 0 },    // Cooldown
      ],
};


export default function () {
  // Send as multipart/form-data
  const body ={
  "driverId": 5,
  "maxDriveDistance": 550,
  "rayon": 60
};

  const headers = {
        "Content-Type": "application/json"
    };
  // No need to manually set Content-Type — k6 handles it automatically
  const response = http.post(APIs.booking, JSON.stringify(body), { headers });

  check(response, {
    "status is 200": (r) => r.status === 200,
    "response status is success": (r) => r.json("status") === "success",
  });
}


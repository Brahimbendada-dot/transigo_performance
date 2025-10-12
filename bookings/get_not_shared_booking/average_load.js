
import http from "k6/http";
import { check } from "k6";

const baseURL = __ENV.baseURL;

export const APIs = {
  booking: `${baseURL}/api/v1/nonSharedTrip`,
};


export let options = {
   stages: [
    { duration: '2m', target: 100 }, // traffic ramp-up from 1 to 100 users over 5 minutes.
    { duration: '10m', target: 100 }, // stay at 100 users for 30 minutes
    { duration: '1m', target: 0 }, // ramp-down to 0 users
  ],
};

export default function () {
  // Send as multipart/form-data
  const body ={
  "driverId": 5,
  "maxDriveDistance": 1500,
  "rayon": 150
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


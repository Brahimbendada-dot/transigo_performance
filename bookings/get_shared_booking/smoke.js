import http from "k6/http";
import { check } from "k6";

const baseURL = __ENV.baseURL;

export const APIs = {
  booking: `${baseURL}/api/v1/driverhome/`,
};

export let options = {
  vus: 15,
  duration: "3m",
};


export default function () {
  // Send as multipart/form-data
  // const body ={
  //   "driverId": 5,
  //   "maxDistanceStart": 500,
  //   "rayon": 500,
  //   "finalSimilarity": 0.0
  // };

    const body ={
  "driverId": 1,
  "maxDriveDistance": 1000,
  "rayon": 400
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


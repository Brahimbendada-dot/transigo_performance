// import http from 'k6/http';


// const url = 'http://api-transigo.transigodz.com/api/v1/category';

// export const options = {
//   stages: [
//     { duration: '1m', target: 300 },   // ramp up to 20 users
//     { duration: '1m30s', target: 600 },    // hold for 1 minute
//     { duration: '2m', target: 600 },    // hold for 1 minute
//     { duration: '2m30s', target: 1000 },    // hold for 1 minute
//     { duration: '3m', target: 1000 },    // hold for 1 minute
//     { duration: '30s', target: 100 },    // ramp down
//   ],
// }


// export default function () {
//   http.get(url);
// }



import http from 'k6/http';

const url = 'http://model.univ-setif.dz/api/v1/sharedTrip';

export const options = {
  stages: [
    { duration: '1m', target: 300 },   // ramp up to 20 users
    { duration: '1m30s', target: 600 },    // hold for 1 minute
    { duration: '2m', target: 600 },    // hold for 1 minute
    { duration: '30s', target: 0 },    // ramp down
  ],
};


export default function () {
    let data = {
    "driverId": 5,
    "maxDistanceStart": 400,
    "rayon": 1500,
    "finalSimilarity": 0.0
  };
  // Using a JSON string as body
  let res = http.post(url, JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}

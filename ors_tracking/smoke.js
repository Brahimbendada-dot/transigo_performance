import http from "k6/http";
import { check } from "k6";

const baseURL=__ENV.baseURL

export const  APIs={
    category:`${baseURL}/ors/v2/directions/driving-car?start=5.4046876,36.1893494&end=-0.628061580628374,35.19405138280957`,    
}

export let options = {
    vus: 15,
    duration: '2m',
};

export default function () {
    http.get(APIs.category);
}

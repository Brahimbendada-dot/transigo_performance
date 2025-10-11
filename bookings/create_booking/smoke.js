import http from "k6/http";
import { check } from "k6";

const baseURL = __ENV.baseURL;

export const APIs = {
  booking: `${baseURL}/api/v1/booking`,
};

export let options = {
  vus: 15,
  duration: "2m",
};

// Load files (binary mode)
const invoice = open("./invoice.PNG", "b");
const shipment = open("./shipment.PNG", "b");

export default function () {
  // Send as multipart/form-data
  const formData = {
    clientId: "2",
    date: "2025-10-07 10:30:00",
    distance: "125.6",
    locationStartName: "Algiers Central Warehouse",
    locationDestinationName: "Oran Industrial Zone",
    locationStartLat: "36.7538",
    locationStartLong: "3.0588",
    locationDestinationLat: "35.6971",
    locationDestinationLong: "-0.6308",
    description: "Shipment of electronic equipment to Oran branch",
    capacity: "4.5",
    invoice: "No, I don’t have.",
    methodepayment: "edahabia",
    category: "truck",
    subCategory: "medium truck",
    shipmentCapacity: "2.5",
    timepayment: "Departure",
    isSharesTrip: 0,
    
    // ✅ Attach files using http.file()
    pictureShipment: http.file(shipment, "shipment.PNG","image/png"),
    pictureInvoice: http.file(invoice, "invoice.PNG","image/png"),
  };

  // No need to manually set Content-Type — k6 handles it automatically
  const response = http.post(APIs.booking, formData);

  check(response, {
    "status is 201": (r) => r.status === 201,
    "response status is success": (r) => r.json("status") === "success",
  });
}


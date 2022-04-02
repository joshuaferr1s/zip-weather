import fetch from "node-fetch";

export default async function handler (request, response) {
  const { zipcode="45056" } = request.query;
  
  try {
    const res = await fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${zipcode}&aqi=no`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    return response.status(200).json({ error: false, data });
  } catch (error) {
    return response.status(500).json({ error: true, msg: error.message });
  }
};

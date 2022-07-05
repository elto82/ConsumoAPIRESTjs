/*--------------------------------------------- endpoint
const API_URL = "https://api.thecatapi.com/v1/images/search"; */
/* --------------------------------------------------------query parameters */
const API_URL = "https://api.thecatapi.com/v1/images/search?limit=3";

async function reload() {
  const res = await fetch(API_URL);
  const data = await res.json();
  console.log(data);
  const img = document.querySelector("img");
  img.src = data[0].url;
}
reload();

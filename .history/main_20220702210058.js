/*--------------------------------------------- endpoint
const API_URL = "https://api.thecatapi.com/v1/images/search"; */
/* --------------------------------------------------------query parameters */
const API_URL = "https://api.thecatapi.com/v1/images/search?limit=2&api_key=11fb4c78-96c8-403c-b282-b8c4d38b4b60";

async function loadRandomMichis() {
  const res = await fetch(API_URL);
  const data = await res.json();

  console.log(data);
  const img1 = document.getElementById("img1");
  const img2 = document.getElementById("img2");
 

  img1.src = data[0].url;
  img2.src = data[1].url;
  
}
loadRandomMichis();

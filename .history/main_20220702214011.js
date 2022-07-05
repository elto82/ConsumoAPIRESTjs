/*--------------------------------------------- endpoint
const API_URL = "https://api.thecatapi.com/v1/images/search"; */
/* --------------------------------------------------------query parameters */
const API_URL_random =
  "https://api.thecatapi.com/v1/images/search?limit=2&api_key=11fb4c78-96c8-403c-b282-b8c4d38b4b60";

const API_URL_favorites =
  "https://api.thecatapi.com/v1/favourites?limit=2&api_key=11fb4c78-96c8-403c-b282-b8c4d38b4b60";

const spanError = document.getElementById("error");

async function loadRandomMichis() {
  const res = await fetch(API_URL_random);
  const data = await res.json();

  console.log(data);
  console.log("loadRandomMichis");

  if (res.status !== 200) {
    spanError.innerHTML = `hubo un error: ${res.status}`;
  } else {
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");

    img1.src = data[0].url;
    img2.src = data[1].url;
  }
}

async function loadFavoritesMichis() {
  const res = await fetch(API_URL_favorites);
  const data = await res.json();

  console.log(data);
  console.log("loadFavoritesMichis");

  
}

loadRandomMichis();
loadFavoritesMichis();

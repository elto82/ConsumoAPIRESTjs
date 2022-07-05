/*--------------------------------------------- endpoint
const API_URL = "https://api.thecatapi.com/v1/images/search"; */
/* --------------------------------------------------------query parameters */
const API_URL_random = "https://api.thecatapi.com/v1/images/search?limit=2";

const API_URL_favorites = "https://api.thecatapi.com/v1/favourites";

const API_URL_favorites_delete = (id) =>
  `https://api.thecatapi.com/v1/favourites/${id}`;

const spanError = document.getElementById("error");

async function loadRandomMichis() {
  const res = await fetch(API_URL_random);
  const data = await res.json();

  console.log(data);
  console.log("loadRandomMichis");

  if (res.status !== 200) {
    spanError.innerHTML = `hubo un error: ${res.status} ${data.message}`;
  } else {
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");

    img1.src = data[0].url;
    img2.src = data[1].url;
    btn1.onclick = () => saveFavoriteMichi(data[0].id);
    btn2.onclick = () => saveFavoriteMichi(data[1].id);
  }
}

async function loadFavoriteMichis() {
  const res = await fetch(API_URL_favorites, {
    method: "GET",
    headers: {
      "X-API-KEY": "11fb4c78-96c8-403c-b282-b8c4d38b4b60",
    },
  });
  const data = await res.json();

  console.log(data);
  console.log("loadFavoriteMichis");

  if (res.status !== 200) {
    spanError.innerHTML = `Hubo un error: ${res.status} ${data.message}`;
  } else {
    const section = document.getElementById("favoriteMichis");
    section.innerHTML = "";
    const h2 = document.createElement("h2");
    const h2Text = document.createTextNode("Michis Favorites");
    h2.appendChild(h2Text);
    section.appendChild(h2);

    data.forEach((michi) => {
      const article = document.createElement("article");
      const img = document.createElement("img");
      const btn = document.createElement("button");
      const btnText = document.createTextNode("remove michi");

      btn.appendChild(btnText);
      btn.onclick = () => deleteFavoriteMichi(michi.id);
      img.src = michi.image.url;
      img.width = 150;
      article.appendChild(img);
      article.appendChild(btn);
      section.appendChild(article);
    });
  }
}

async function saveFavoriteMichi(id) {
  const res = await fetch(API_URL_favorites, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": "11fb4c78-96c8-403c-b282-b8c4d38b4b60",
    },
    body: JSON.stringify({
      image_id: id,
    }),
  });
  const data = await res.json();

  console.log("save");
  console.log(res);

  if (res.status !== 200) {
    spanError.innerHTML = `Hubo un error: ${res.status} ${data.message}`;
  } else {
    console.log("michi guardado en favoritos");
    loadFavoriteMichis();
  }
}

async function deleteFavoriteMichi(id) {
  const res = await fetch(API_URL_favorites_delete(id), {
    method: "DELETE",
    headers:{
      "X-API-KEY": "11fb4c78-96c8-403c-b282-b8c4d38b4b60",
    }
  });
  const data = await res.json();

  if (res.status !== 200) {
    spanError.innerHTML = `Hubo un error: ${res.status} ${data.message}`;
  } else {
    console.log("michi eliminado de favoritos");
    loadFavoriteMichis();
  }
}

async function uploadMichiPhoto (){
  const form = document.getElementById('uploadMichiPhoto');
  const formData = new FormData(form);

  console.log(formData.get('file'));
}

loadRandomMichis();
loadFavoriteMichis();

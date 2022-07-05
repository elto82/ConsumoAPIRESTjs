const api = axios.create({
  baseURL: 'https://api.thecatapi.com/v1'
});
api.defaults.headers.common['X-API-KEY'] = '11fb4c78-96c8-403c-b282-b8c4d38b4b60';


/*--------------------------------------------- endpoint
const API_URL = "https://api.thecatapi.com/v1/images/search"; */
/* --------------------------------------------------------query parameters */
const API_URL_random = "https://api.thecatapi.com/v1/images/search?limit=2";
const API_URL_favorites = "https://api.thecatapi.com/v1/favourites";
const API_URL_upload = "https://api.thecatapi.com/v1/images/upload";

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
  const { data, status } = await api.post('/favourites', {
    image_id: id,
  });
  /* const res = await fetch(API_URL_favorites, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": "11fb4c78-96c8-403c-b282-b8c4d38b4b60",
    },
    body: JSON.stringify({
      image_id: id,
    }),
  });
  const data = await res.json(); */

  console.log("save");
  //console.log(res);

  if (status !== 200) {
    spanError.innerHTML = `Hubo un error: ${status} ${data.message}`;
  } else {
    console.log("michi guardado en favoritos");
    loadFavoriteMichis();
  }
}

async function deleteFavoriteMichi(id) {
  const res = await fetch(API_URL_favorites_delete(id), {
    method: "DELETE",
    headers: {
      "X-API-KEY": "11fb4c78-96c8-403c-b282-b8c4d38b4b60",
    },
  });
  const data = await res.json();

  if (res.status !== 200) {
    spanError.innerHTML = `Hubo un error: ${res.status} ${data.message}`;
  } else {
    console.log("michi eliminado de favoritos");
    loadFavoriteMichis();
  }
}

async function uploadMichiPhoto() {
  const form = document.getElementById("uploadingForm");
  const formData = new FormData(form);

  console.log(formData.get("file"));

  const res = await fetch(API_URL_upload, {
    method: "POST",
    headers: {
      //"Content-Type": "multipart/form-data",
      "X-API-KEY": "11fb4c78-96c8-403c-b282-b8c4d38b4b60",
    },
    body: formData,
  });
  const data = await res.json();

  if (res.status !== 201) {
    spanError.innerText = "Hubo un error: " + res.status + " " + data.message;
  } else {
    console.log("Michi cargado correctamente");
    console.log({ data });
    console.log(data.url);
    saveFavoriteMichi(data.id);
  }
}

/* const previewImage = () => {
  const file = document.getElementById("file").files;
  console.log(file);
  if (file.length > 0) {
    const fileReader = new FileReader();

    fileReader.onload = function(e) {
      document.getElementById("preview").setAttribute("src", e.target.result);
    };
    fileReader.readAsDataURL(file[0]);
  }
} */

/* function readFile(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var filePreview = document.createElement("img");
      filePreview.id = "file-preview";
      //Aca se guarda la imagen en base 64
      filePreview.src = e.target.result;
      console.log(e.target.result);

      var previewZone = document.getElementById("preview-zone");
      previewZone.appendChild(filePreview);
    };

    reader.readAsDataURL(input.files[0]);
  }
}
var fileUpload = document.getElementById("fileSelector");
fileUpload.onchange = function (e) {
  readFile(e.srcElement);
}; */

function previewFile() {
  console.log("entra a imagen")
  const preview = document.getElementById('img-view');
  const file = document.getElementById('file-up').files[0];
  const reader = new FileReader();

  reader.addEventListener("load", function () {
    // convierte la imagen a una cadena en base64
    preview.src = reader.result;
  }, false);

  if (file) {
    reader.readAsDataURL(file);
  }
}

loadRandomMichis();
loadFavoriteMichis();

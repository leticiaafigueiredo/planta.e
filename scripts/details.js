const urlBase = "https://trabalho-pratico-2-diw.leticiafigueir5.repl.co";
let idDestaque = null;

async function fetchProductDetails(productId) {
  try {
    const response = await fetch(`https://trabalho-pratico-2-diw.leticiafigueir5.repl.co/albums/${productId}`);
    const product = await response.json();
    console.log(productId);
    return product;
  } catch (error) {
    console.error('Erro ao buscar os dados: ', error);
  }
}

async function fetchFotos(productId) {
  try {
    const response = await fetch(`https://trabalho-pratico-2-diw.leticiafigueir5.repl.co/fotos?id-album=${productId}`);
    const product = await response.json();
    return product;
  } catch (error) {
    console.error('Erro ao buscar os dados: ', error);
  }

}


function updateProductDetails(product) {
  if (product) {
    document.getElementById('nameAlbum').textContent = product.name;
    document.getElementById('imgAlbum').src = product.cover;
    document.getElementById('descripitionAlbum').textContent = product.description;
    document.getElementById('latAlbum').textContent = product.location_coordinates[0];
    document.getElementById('longAlbum').textContent = product.location_coordinates[1];
    document.getElementById('dateAlbum').textContent = product.date;


  } else {
    alert('Produto nao encontrado');
  }
console.log(product.destaques.length)
  if(product.destaques.length>0){
    setDestaques(product.destaques);
  }
}

async function fetchAlbumDetails(productId){
  try {
    const response = await fetch(`${urlBase}/albums/${productId}?_embed=destaques`);
    const data = await response.json();
    return data;
  } catch(error) {
    console.error('Error ao buscar dados: ', error);
  }
}

function renderFotos(fotos) {
  const fotosDiv = document.createElement("div");
  fotosDiv.className = "col-md-4 col-sm-12";

  fotosDiv.innerHTML = `
  <div class="card mb-3">
            <img
              src="${fotos.src}"
              class="card-img-top object-fit-cover" alt="..." height="300px">
            <div class="card-body">
              <p class="card-text">${fotos.texto}</p>
              <button type="button" class="btn btn-success" data-bs-toggle="modal"
                  data-bs-target="#exampleModal">detalhes
              </button>
            </div>
          </div>`
  return fotosDiv;

}

function renderModal(fotos) {
  const modalDiv = document.createElement("div");
  modalDiv.className = "carousel-item active";

  modalDiv.innerHTML = `
  <img src="${fotos.src}"
  class="d-block w-100 object-fit-cover " height="500px" alt="...">
  <div class="carousel-caption d-none d-md-block ">
              <p class="carousel-textModal">${fotos.texto}</p>
            </div>`

  return modalDiv;

}



//funcao para inicializar a pagina e buscar detalhes do produto
async function renderDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  const product = await fetchProductDetails(productId);
  

  const fotosJSON = await fetchFotos(productId);
  console.log(fotosJSON[0])

  const album = await fetchAlbumDetails(productId);
  updateProductDetails(album);

  const fotosSection = document.getElementById('fotosSection');
  const modalSection = document.getElementById('carousel-inner');

  //cards de fotos
  for (let i = 0; i < fotosJSON.length; i++) {
  const fotos = renderFotos(fotosJSON[i]);
  fotosSection.appendChild(fotos);
  }

  //modal de fotos
  for (let i = 0; i < fotosJSON.length; i++) {
  const fotos = renderModal(fotosJSON[i]);
  modalSection.appendChild(fotos);
  }

}

function setDestaques(destaques){
  const elem = document.getElementById("destaques");
  if(destaques && destaques[0]) {
    elem.checked = true;
    idDestaque = destaques[0].id;
    console.log(idDestaque);
  }
}

function addDestaques(){
  const urlParams = new URLSearchParams(window.location.search);
  const albumId = urlParams.get('id');

  const url = `${urlBase}/destaques`;
  const data = { albumId: parseInt(albumId) };
  const request = {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(data),
  };
  fetch(url, request).then((response) => {
    console.log(response);
  });
  return true;
}

function removeDestaques() {
  const url = `${urlBase}/destaques/${idDestaque}`;
  const request = {method: "DELETE"};
  fetch(url, request).then((response) => {
    console.log(response);
  });
  return true;
}

function udpdateDestaques(elem){
  let resp = false;
  if(elem.checked) {
    resp = add_destaque();
  } else if(idDestaque) {
    resp = remove_destaque();
  }
  if(!resp) elem.checked = !elem.checked;
}

function initiateCheckbox(){
  //obter elemento do checkbox pelo id
  const checkbox = document.getElementById('destaques');

  //eventlistener no evento change
  checkbox.addEventListener('change', function (event){
    if(event.target.checked) {
      addDestaques()
      console.log('checkbox esta marcado!');
    } else {
      removeDestaques()
      console.log('checkbox nao esta marcado!');
    }
  });
}

renderDetails();
initiateCheckbox();










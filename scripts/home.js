const api_url = "https://trabalho-pratico-2-diw.leticiafigueir5.repl.co"; //api

function get_map() {
  const centralLatLong = [34.617003772997926,
    -6.650696422013718];

  mapboxgl.accessToken = 'pk.eyJ1IjoibGV0Y2lhczIiLCJhIjoiY2xwY29oNjNyMDB5ZDJwb2h1ZHY5d3MzbiJ9.mW5JLAvqi2OVlTAhnXp-gw';


  let map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: centralLatLong,
    zoom: 2
  });
  return map;

}

function get_card_marker(album) {
  return `
    <a class="popUp text-decoration-none text-reset" href="./details.html?id=${album.id}" target="_blank">
        <img src="${album.cover}" class="card-img-top" alt="${album.name}" height="150px">
        <div class="card-boy">
          <h5 class="card-title text-truncate mt-2">${album.name}</h5>
          <p class"card-text">LONG: ${album.location_coordinates[0]}</p>
          <p class"card-text">LAT: ${album.location_coordinates[1]}</p>
        </div>
    </a>`;
}



function get_locations(maps) {
  const url = `${api_url}/albums` //api
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((array_data) => {
      array_data.forEach((item) => {
        let popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          get_card_marker(item)
        );
        const marker = new mapboxgl.Marker({ color: "blue" })
          .setLngLat(item.location_coordinates)
          .setPopup(popup)
          .addTo(maps);
      })
    });
}



/*function getDestaques() {
  const url = `${api_url}/destaques` //api
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((array_data) => {
      //renderCarousel(array_data);
      console.log(array_data);
    });
}*/

function getAlbuns() {
  const url = `${api_url}/albums` //api
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((array_data) => {
      renderPage(array_data);
      console.log(array_data)
    });
}

/*function renderCarousel(destaques) {
  const carouselInner = document.getElementById('carousel-inner');
  console.log(destaques[0])

  carouselInner.innerHTML = `
          <!--PRIMEIRA IMG-->
          <div class="carousel-item active">
            <img
              src="${destaques[0].src}"
              class="d-block object-fit-cover " height="500px" alt="..." width="400px">
            <div class="carousel-caption d-none d-md-block ">
              <h5>${destaques[0].title}</h5>
              <p class="carousel-text">${destaques[0].texto}</p>
            </div>
          </div>
          <!--FIM DA PRIMEIRA IMG-->
          <!--SEGUNDA IMG-->
          <div class="carousel-item">
            <img
              src="${destaques[1].src}"
              class="d-block w-100 object-fit-cover " height="500px" alt="..." width="400px">
            <div class="carousel-caption d-none d-md-block ">
              <h5>${destaques[1].title}</h5>
              <p class="carousel-text">${destaques[1].texto}</p>
            </div>
          </div>
          <!--FIM DA SEGUNDA IMG-->
          <!--TERCEIRA IMG-->
          <div class="carousel-item">
            <img
              src="${destaques[2].src}"
              class="d-block w-100 object-fit-cover " height="500px" alt="..." width="400px">
            <div class="carousel-caption d-none d-md-block ">
              <h5>${destaques[2].title}</h5>
              <p class="carousel-text">${destaques[2].texto}</p>
            </div>
          </div>
          <!--FIM DA TERCEIRA IMG-->`;
  return carouselInner;
}*/

function renderCard(albuns) {

  const cardDiv = document.createElement("div");
  cardDiv.className = "col-md-3 col-sm-6";

  cardDiv.innerHTML = `
  <div class="card mb-3">
            <img
              src="${albuns.cover}"
              class="card-img-top object-fit-cover" alt="..." height="300px">
            <div class="card-body">
              <h5 class="card-title">${albuns.name}</h5>
              <p class="card-text">${albuns.description}</p>
              <a href="./details.html?id=${albuns.id}" class="btn btn-success">ver mais</a>
            </div>
          </div>`
  return cardDiv;
}



async function renderPage(data) {
  console.log(data);
  const cardSection = document.getElementById('cardSection')

  for (let i = 0; i < data.length; i++) {
    const card = renderCard(data[i]);
    cardSection.appendChild(card);
  }
}




const maps = get_map();
get_locations(maps);
//getDestaques();
getAlbuns();
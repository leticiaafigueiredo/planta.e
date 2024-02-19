function loadCarrossel(){
    fetch('https://trabalho-pratico-2-diw.leticiafigueir5.repl.co/destaques/?_expand=album')
        //https://trabalho-pratico-2-diw.leticiafigueir5.repl.co/destaques/?_expand=album
    .then(response => response.json())
    .then(data => {
        const carouselIndicators = document.getElementById('carousel-indicators');
        const carouselInner = document.getElementById('carousel-inner');
        console.log(data)
        
        //cria um banner e indicador para cada item
        data.forEach((item, index) => {
            //cria indicador
            const indicator = document.createElement('button');
            indicator.setAttribute('type', 'button');
            indicator.setAttribute('data-bs-target', '#carouselExampleIndicators');
            indicator.setAttribute('data-bs-slide-to', index.toString());
            if (index === 0) {
                indicator.classList.add('active');
            }
            carouselIndicators.appendChild(indicator);
            console.log(item)
            
            //cria banner
            const carouselItem = document.createElement('div');
            carouselItem.classList.add('carousel-item');
            if(index === 0) {
                carouselItem.classList.add('active');
            }
            const banner = `
            <a href="./details.html?id=${item.album.id}">    
                <img src="${item.album.cover}" class="d-block object-fit-cover " height="500px" alt="${item.album.name}" width="700px">
                <div class="carousel-caption d-none d-md-block ">
                    <h5 class="carousel-title">${item.album.name}</h5>
                    <p class="carousel-text">${item.album.description}</p>
                </div>
            </a>`;
            carouselItem.innerHTML = banner;
            carouselInner.appendChild(carouselItem);
        });
    })

}

loadCarrossel();
let productsEl = document.getElementById('cardsProducts');
fetch('/assets/data/products.json')
.then((response) => response.json()) 
.then((displayCards) => {
    displayCards.results.forEach((element) => {
    productsEl.innerHTML += `<div class="col-4 card" style="width: 25rem;height:42rem;"><div class="">
    <img src="${element.poster_path}" class="card-img-top "></div>
    <div class="card-body color">
      <h5 class="card-title">${element.original_title}</h5>
      <p class="card-text">${element.overview}</p>
      <button class="">ajouter au panier</button>
    </div>
  </div>`;
   });
})
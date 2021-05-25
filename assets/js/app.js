let productsEl = document.getElementById('cardsProducts');
fetch('/assets/data/products.json')
.then((response) => response.json()) 
.then((displayCards) => {
    displayCards.products.forEach((element) => {
    productsEl.innerHTML += `<div class="col-4 card mt-4 mb-4" style="width: 20rem;height:32rem;"><div class="">
    <img src="${element.img_src}" class="card-img-top "></div>
    <div class="card-body color">
      <h5 class="card-title">${element.title}</h5>
      <p class="card-text ">${element.desc}</p>
      <button class="btnColor" >ajouter au panier</button>
    </div>
  </div>`;
   });
})

// function addToCart (ajouter au panier)
let cart = [];

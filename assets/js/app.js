let productsEl = document.getElementById('cardsProducts');
let btnBeef = document.getElementById('beef');
let btnPoultry = document.getElementById('poultry');
let btnPork = document.getElementById('pork');
let btnHorse = document.getElementById('horse');


btnBeef.addEventListener('click',function(){
  productsEl.innerHTML = "";
  fetch('/assets/data/products.json')
    .then((response) => response.json()) 
    .then((displayCards) => {
      displayCards.products.forEach((element) => { 
        if(element.type == "boeuf") {
          productsEl.innerHTML += displayCard(element);
          }
        });
      });
    })

btnPoultry.addEventListener('click',function(){
  productsEl.innerHTML = "";
    fetch('/assets/data/products.json')
      .then((response) => response.json()) 
      .then((displayCards) => {
        displayCards.products.forEach((element) => { 
          if(element.type == "volaille") {
            productsEl.innerHTML += displayCard(element);
              }
            });
          });
})

btnPork.addEventListener('click',function(){
  productsEl.innerHTML = "";
    fetch('/assets/data/products.json')
      .then((response) => response.json()) 
        .then((displayCards) => {
          displayCards.products.forEach((element) => { 
            if(element.type == "porc") {
              productsEl.innerHTML += displayCard(element);
            }
          });
        });
}) 

btnHorse.addEventListener('click',function(){
  productsEl.innerHTML = "";
    fetch('/assets/data/products.json')
      .then((response) => response.json()) 
        .then((displayCards) => {
          displayCards.products.forEach((element) => { 
            if(element.type == "cheval") {
              productsEl.innerHTML += displayCard(element);
            }
          });
        });
}) 

const displayCard = (element)=>{
  let card = `<div class="col-4 card mt-4 mb-4" style="width: 20rem;height:32rem;"><div class="">
    <img src="${element.img_src}" class="card-img-top "></div>
    <div class="card-body color">
      <h5 class="card-title">${element.title}</h5>
      <p class="card-text ">${element.desc}</p>
      <button class="btnColor" >ajouter au panier</button>
    </div>
  </div>`;
  return (card);
}

 
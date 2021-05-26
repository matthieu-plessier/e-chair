// Fonction affichage

let productsEl = document.getElementById('cardsProducts');
var collectionCart = []
var nullCart = true;
let btnBeef = document.getElementById('beef');
let btnPoultry = document.getElementById('poultry');
let btnPork = document.getElementById('pork');
let btnHorse = document.getElementById('horse');
var totalCart = 0;

// bouton menu boeuf
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
        addToCart();
    });
      
})
// bouton menu volaille

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
            addToCart();
          });
          
})
// bouton menu porc

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
          addToCart();
        });
        
}) 
// bouton menu cheval

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
          addToCart();
        });
        
}) 
// fonction affichage d'une carte

const displayCard = (element)=>{
  let card = `<div class="col-4 card ml-2 mt-4 mb-4" style="width: 20rem;height:32rem;"><div class="">
    <img src="${element.img_src}" class="card-img-top "></div>
    <div class="card-body color">
      <h5 class="card-title">${element.title}</h5>
      <p class="card-text ">${element.desc}</p>
      <button class="btnColor" data-ref="${element.ref}" >ajouter au panier</button>
    </div>
  </div>`;
  return (card);
}
// fin fonction affichage

// function addToCart (ajouter au panier)
const addToCart = () => {

  let modalEl = document.getElementById("cart");
  let btnList = Array.from(document.getElementsByClassName("btnColor"));

  btnList.forEach(element => {
    element.addEventListener("click", function (e) {
      let nbrArticle = document.getElementById("nbrTotal")
      let datatest = e.target.dataset.ref;
      let testCart = false;
      fetch('/assets/data/products.json')
        .then((response) => response.json())
        .then((displayCards) => {
          displayCards.products.forEach((element, index) => {
            if (datatest == element.ref) {
              
              collectionCart.forEach(verif => {
                if (verif == element.ref) {
                  testCart = true;
                }
              });
              if (testCart) {
                
                let quantityTest = document.getElementById(element.ref)
                quantityTest.innerHTML++;
                nbrArticle.innerHTML++;
              }else {
                
                nbrArticle.innerHTML++;
                if (nullCart) {
                  modalEl.innerHTML = "";
                  nullCart = false;
                }
                modalEl.innerHTML += `
                <div class="d-flex cartElement w-100" data-ref="${element.ref}">
                  <img src="${element.img_src}" width="50px">
                  <p class="mr-5"> ${element.title} <br> ${element.price} € / KG - <br> poids: ${element.weight}Gr </p>
                  <div class="d-flex ms-5">
                    
                    <p class="me-5">quantité : <br>
                      <button class="minus" id="btnMinus${index}" data-ref="${element.ref}"> - </button>
                      <span id="${element.ref}">1</span>
                      <button class="plus" id="btnPlus${index}" data-ref="${element.ref}"> + </button>
                     </p>
                    
                  </div>
                  <p class="total">Prix :</p>
                </div>
                `;
                collectionCart.push(element.ref);
                // collectionCart.push(1);
                
                unitPrice(element, index);
                
                final(element, 1)
              }
            }
          });
        })
    });
  });
}

//TOTAL
const unitPrice = (jsonEl) => {
  let priceText = Array.from(document.getElementsByClassName("total"))
  priceText.forEach(element => {
    let stockResult = price(jsonEl);
    jsonEl.innerHTML = `Prix : ${stockResult} €`
  });
}

//AJOUT DE QUANTITE
document.addEventListener("click", function(event){
  if(event.target.classList.contains("plus")){
    console.log(event.target.dataset.ref)
    console.log("click")
    let nbrArticle = document.getElementById("nbrTotal")
    let quantityNbr = document.getElementById(event.target.dataset.ref)

    quantityNbr.innerHTML++;
    nbrArticle.innerHTML++;
    
  }
});

// SUPPRESSION QUANTITE
document.addEventListener("click", function(event){
  if(event.target.classList.contains("minus")){
    let nbrArticle = document.getElementById("nbrTotal")
    let quantityVerif = document.getElementById(event.target.dataset.ref)

    quantityVerif.innerHTML--;
    nbrArticle.innerHTML--;

    if(quantityVerif.innerHTML<=0){
      quantityVerif.innerHTML = 0;
      nbrArticle.innerHTML = 0;
    }
  }
  
});
// fonction pricePerPiece
const calcPricePerPiece = (weight, price) =>  {
  let total = (weight /1000 )* price;
  return Math.round(total);
}

function price(element){
  for(let count = 0; count<=collectionCart.length; count++){
    
    if(collectionCart[count]==element.ref){
      let result = calcPricePerPiece(element.weight, element.price)
      
      return result
    }
  }
}

const final = (element, nbrQuantity) =>{
  allPriceUnit = document.getElementsByClassName("total")
  let stockResult = price(element);
  totalCart += Math.round(stockResult*nbrQuantity);
  let final = document.getElementById("finalPrice")
  final.innerHTML = `Total : ${totalCart} €`
}
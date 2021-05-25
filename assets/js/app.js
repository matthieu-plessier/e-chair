// Fonction affichage

let productsEl = document.getElementById('cardsProducts');
var collectionCart = [];
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
          displayCards.products.forEach((element) => {
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
                  <p class="mr-5"> ${element.title} <br> ${element.price} € / KG </p>
                  <div class="d-flex ms-5">
                    
                    <p>quantité : <button class="btnMinus" data-ref="${element.ref}"> - </button> <span id="${element.ref}">1 </span><button class="btnPlus" data-ref="${element.ref}"> + </button></p>
                    
                  </div>
                  <p id="total">Prix :</p>
                </div>
                `;
                collectionCart.push(element.ref);
                addQuantity(element);
                let stockResult = price(element);
                let quantity = document.getElementById(element.ref)
                let nbrQuantity = quantity.innerHTML
                console.log(nbrQuantity)
                totalCart += stockResult*nbrQuantity;
                let final = document.getElementById("finalPrice")
                final.innerHTML = `Total : ${totalCart} €`

                let priceText = document.getElementById("total")
                priceText.innerHTML = `Prix : ${stockResult} €`
              }
            }
          });
        })
    });
  });
}


//AJOUT DE QUANTITE
const addQuantity = (element) => {
  let btnPlus = document.querySelector(".btnPlus");


  btnPlus.addEventListener("click", function(){
    let nbrArticle = document.getElementById("nbrTotal")

    let quantityTest = document.getElementById(element.ref)
    quantityTest.innerHTML++;
    nbrArticle.innerHTML++;
  });
}
// fonction pricePerPiece
const calcPricePerPiece = (weight, price) =>  {
  let total = (weight /1000 )* price
  return total;
}

function price(element){
  
  console.log(collectionCart)
  for(let count = 0; count<=collectionCart.length; count++){
    
    if(collectionCart[count]==element.ref){
      let result = calcPricePerPiece(element.weight, element.price)
      
      return result
    }
  }
}
// SUPPRESSION QUANTITE

 const removeQuantity = (element) =>{
  let btnMinus = document.querySelector(".btnMinus");

  btnMinus.addEventListener("click", function(){
    let modalEl = document.getElementById("cart");
   let quantityVerif = document.getElementById(element.ref);
   console.log(quantityVerif);
   quantityVerif.innerHTML--;
     if(quantityVerif==0){
      
     }
  });
}
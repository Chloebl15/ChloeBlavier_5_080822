let productInLocalStorage = JSON.parse(localStorage.getItem("localStorageProduct")) // récuperer les données du localstorage

console.log(productInLocalStorage)

let completeProductTable = [];

const getArticles = async () => {
  for (productLS of productInLocalStorage) {
    await fetch(`http://localhost:3000/api/products/${productLS.id}`)
      .then((res) => res.json())
      .then((data) => {

        completeProductTable.push({
          id: data._id,
          name: data.name,
          img: data.imageUrl,
          price: data.price,
          quantity: productLS.quantity,
          color: productLS.color
        })
        console.log(completeProductTable)
      })

      .catch((data) => {
        return error;
      })

  }

}

const affichagePanier = async () => {
  await getArticles();
  calculTotal();
  for (let product of completeProductTable) {
    document.getElementById("cart__items").innerHTML += `
  <article class="cart__item" data-id="${product.id}" data-color="${product.color}">
  <div class="cart__item__img">
    <img src="${product.img}" alt="${product.alt}"> 
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>${product.name}</h2>
      <p>${product.color}</p>
      <p>${product.price}€</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
      </div>
    </div>
  </div>
  </article>`


  }

  removeProduct();
  modifyQuantity();
}

affichagePanier();



const calculTotal = () => {
  let total = 0;
  let quantity = 0;
  for (product of completeProductTable) {
    total += parseInt(product.price) * parseInt(product.quantity)
    quantity += parseInt(product.quantity)
  }

  console.log(total);
  document.getElementById("totalPrice").innerHTML = total
  document.getElementById("totalQuantity").innerHTML = quantity
}



//supprimer produit
const removeProduct = () => {
  let supprimer = document.querySelectorAll(".deleteItem")   //on sélectionne le bouton supprimer

  supprimer.forEach((product) => {
    product.addEventListener("click", (e) => {   //au click on écoute > 
      e.preventDefault() //bloquer le comportement du bouton
      console.log("event e", e);
      let deleteId = e.target.closest('article').getAttribute("data-id");  //Rechercher l'id du produit qu'on veut supprimer
      console.log(deleteId)
      let deleteColor = e.target.closest('article').getAttribute("data-color") //Rechercher la couleur du produit qu'on veut supprimer
      console.log(deleteColor)

      let searchDeleteProduct = productInLocalStorage.find(element => element.id == deleteId && element.color == deleteColor); //On recherche le produit dans producTable. element.id = à l'id récupéré (idem pour la couleur)
      productInLocalStorage = productInLocalStorage.filter(element => element != searchDeleteProduct); //filter renvoie tous les produits qui sont dans ma condition. //supprime 
      completeProductTable = completeProductTable.filter(element => element != searchDeleteProduct); // faire la même chose pour mettre à jour l'autre tableau
      localStorage.setItem("localStorageProduct", JSON.stringify(productInLocalStorage)); //????????

      const deleteProduct = e.target.closest("article");   //Cibler le bloc HTML  
      deleteProduct.remove();  //supprimer le bloc HTML ciblé 


      calculTotal();
    })
  })
}


//modifier la quantité

const modifyQuantity = () => {
  let inputQuantity = document.querySelectorAll('.itemQuantity');

  inputQuantity.forEach((quantity) => {
    quantity.addEventListener("change", (e) => {
      e.preventDefault()

      let deleteId = e.target.closest('article').getAttribute("data-id");  //Rechercher l'id du produit qu'on veut supprimer
      console.log(deleteId)
      let deleteColor = e.target.closest('article').getAttribute("data-color") //Rechercher la couleur du produit qu'on veut supprimer
      console.log(deleteColor)

      let index = productInLocalStorage.findIndex(element => element.id == deleteId && element.color == deleteColor); 
      console.log(index)

      productInLocalStorage[index].quantity = e.target.value  //cibler l'index(la position)
      
      completeProductTable[index].quantity = e.target.value  // faire la même chose pour mettre à jour l'autre tableau
      

      localStorage.setItem("localStorageProduct", JSON.stringify(productInLocalStorage));

      calculTotal();

    })
  })
}


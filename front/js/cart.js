let productTable = JSON.parse(localStorage.getItem("localStorageProduct")) // récuperer les données du localstorage

console.log(productTable)

const completeProductTable = [];

const getArticles = async () => {

  for (productLS of productTable) {
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
  for (let products of completeProductTable) {
    document.getElementById("cart__items").innerHTML += `
  <article class="cart__item" data-id="${products._id}" data-color="{product-color}">
  <div class="cart__item__img">
    <img src="${products.img}" alt="${products.alt}"> 
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>${products.name}</h2>
      <p>${products.color}</p>
      <p>${products.price}€</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${products.quantity}">
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
      </div>
    </div>
  </div>
  </article>`
  }
}

affichagePanier();
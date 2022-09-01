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
  calculTotal();
  for (let product of completeProductTable) {
    document.getElementById("cart__items").innerHTML += `
  <article class="cart__item" data-id="${product._id}" data-color="{product-color}">
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
}

affichagePanier();


const calculTotal = () => {
  let total = 0;
  let quantity = 0;
  for (product of completeProductTable) {
    total += parseInt(product.price)*parseInt(product.quantity)
    quantity += parseInt(product.quantity)
  }
  
  console.log(total);
  document.getElementById("totalPrice").innerHTML = total
  document.getElementById("totalQuantity").innerHTML = quantity
}

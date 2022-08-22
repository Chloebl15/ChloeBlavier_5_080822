let addProduct = JSON.parse(localStorage.getItem("localStorageProduct"));       //récupérer le tableau qui est dans le localstorage

console.log(addProduct)

const basketDisplay = async () => {
    if(addProduct){
        await addProduct;
       
    cart__items.innerHTML = addProduct.map((localStorageProduct) => `
        <!--  <article class="cart__item" data-id="${localStorageProduct._id}}" data-color="${localStorageProduct._color}">
                <div class="cart__item__img">
                  <img src="${localStorageProduct.imageUrl}" alt="${localStorageProduct.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${localStorageProduct.name}</h2>
                    <p>${localStorageProduct.colors}</p>
                    <p>${localStorageProduct.price}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article> -->
        `)
    }
}

basketDisplay();
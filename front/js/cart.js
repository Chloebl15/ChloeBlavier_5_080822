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
      localStorage.setItem("localStorageProduct", JSON.stringify(productInLocalStorage));

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

///////////////////////////////// Formulaire ////////////////////////////////////


function validFirstName() {
  let firstName = document.getElementById("firstName").value;
  let text = document.getElementById("firstNameErrorMsg");
  let pattern = /^(?=.{2,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/;

  if (firstName.match(pattern)) {
    console.log("Prénom valide!")
    return true;
  } else {
    text.innerHTML = "Merci de rentrer un prénom valide";
    return false;
  }
}

function validLastName() {
  let lastName = document.getElementById("lastName").value;
  let text = document.getElementById("lastNameErrorMsg");
  let pattern = /^(?=.{2,40}$)[a-zA-Z]+(?:[-'\s][a-zA-Z]+)*$/;

  if (lastName.match(pattern)) {
    console.log("Nom valide!")
    return true;
  } else {
    text.innerHTML = "Merci de rentrer un nom valide";
    return false;
  }
}

function validAddress() {
  let address = document.getElementById("address").value;
  let text = document.getElementById("addressErrorMsg");
  let pattern = ("^[A-zÀ-ú0-9 ,.'\-]+$");

  if (address.match(pattern)) {
    console.log("Adresse valide!")
    return true;
  } else {
    text.innerHTML = "Merci de rentrer une adresse valide";
    return false;
  }
}

function validCity() {
  let city = document.getElementById("city").value;
  let text = document.getElementById("cityErrorMsg");
  let pattern = ("^[A-zÀ-ú0-9 ,.'\-]+$");

  if (city.match(pattern)) {
    console.log("Ville valide!")
    return true;
  } else {
    text.innerHTML = "Merci de rentrer une ville valide";
    return false;
  }
}

function validEmail() {
  let email = document.getElementById("email").value;
  let text = document.getElementById("emailErrorMsg");
  let pattern = ("^[a-zA-Z0-9_. -]+@[a-zA-Z.-]+[.]{1}[a-z]{2,10}$");

  if (email.match(pattern)) {
    console.log("Email valide!")
    return true;
  } else {
    text.innerHTML = "Merci de rentrer un email valide";
    return false;
  }
}





const messagesFormulaire = () => {

  order.addEventListener("click", (e) => {
    e.preventDefault(); //stopper le click
    validFirstName()
    validLastName()
    validAddress()
    validCity()
    validEmail()

  

    if (validFirstName() && validLastName() && validAddress() && validCity() && validEmail()) {  //tout est retourné en true on envoie
      console.log("envoyé")
      sendorder()

    }
  
  })

  
}


messagesFormulaire()


const sendorder = async () => {
  const finalOrder = JSON.parse(localStorage.getItem("localStorageProduct")); //récupérer les produits dans le localstorage
  let orderId = [];   //créer un tableau vide
  console.log(finalOrder);
  console.log(orderId);

  finalOrder.forEach((order) => {
    orderId.push(order.id);                 //push dans le tableau
  });


    const order = fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contact : {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value
      },
      products : orderId
    })
  })

  .then((res) => {
    return res.json()
  })
  .then ((data) => {
    console.log(data)
    window.location.href = `confirmation.html?commande=${data.orderId}`;
  })

 .catch((error) => {
            // Si erreur dans URL, retourner l'erreur
            console.log(error);
            //afficher l'erreur 
        })
}

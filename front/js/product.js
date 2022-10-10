let params = new URLSearchParams(window.location.search);
let productId = params.get("id");  //récuperer l'id
console.log(productId);


let firstDiv = document.createElement("div");
firstDiv.classList.add("productAdded", "missingColorAndQuantity", "missingQuantity");
let currentDiv = document.querySelector(`.item__content__settings__quantity`);
let parentDiv = currentDiv.parentNode
parentDiv.insertBefore(firstDiv, currentDiv.nextSibling)

let secondDiv = document.createElement("div2");
secondDiv.classList.add("missingColor");
let currentDiv2 = document.querySelector(`.item__content__settings__quantity`);
let parentDiv2 = currentDiv2.parentNode
parentDiv.insertBefore(secondDiv, currentDiv2)

function messageError(classe, message, couleur) {
    document.querySelector(classe).textContent = message;
    firstDiv.style.color = couleur;
    secondDiv.style.color = couleur;
}

let articles = [];

const getProducts = async () => {
    await fetch(`http://localhost:3000/api/products/${productId}`)
        .then((res) => res.json())
        .then((data) => {
            products = data
            console.log(products)
            //Ajout de la promesse dans le tableau products
        })
        .catch((error) => {
            // Si erreur dans URL, retourner l'erreur
            console.log(error);
            //afficher l'erreur 
        })
}


const productDisplay = async () => {
    await getProducts();
    document.querySelector(`.item__img`).innerHTML = ` <img src="${products.imageUrl}" alt="${products.altTxt}">`
    document.getElementById("title").innerHTML = ` <h1 id="title">${products.name}</h1>`
    document.getElementById("price").innerHTML = `<span id="price">${products.price}</span>`
    document.getElementById("description").innerHTML = `<p id="description">${products.description}</p>`
    //ajout des couleurs

    //création balise select + récupérer l'id
    let select = document.getElementById("colors")
    console.log(products.colors)

    //faire une boucle dans le tableau avec forEach
    products.colors.forEach((couleurs) => {
        //a chaque fois qu'il fait un tour on lui demande de créer un élément
        let tagOption = document.createElement("option");

        //injecter du texte dans l'élement qu'on a créé
        tagOption.innerHTML = `${couleurs}`;
        tagOption.value = `${couleurs}`;     // donner une value à l'option

        select.appendChild(tagOption) //tagOption est devenu l'enfant de select


    });
    addBasket()  // on appelle la fonction dans productDisplay
};


productDisplay();

// Création du produit à ajouter
let productTable = JSON.parse(localStorage.getItem("localStorageProduct")) // Variable pour vérifier ce qu'il y a dans le local storage
        let select = document.getElementById("colors")
        let quantity = document.getElementById("quantity")

        const newProduct = {
            color: select.value,
            quantity: quantity.value,
            id: productId
        }

const addBasket = () => {

    let button = document.getElementById("addToCart")
    console.log(button)
    button.addEventListener("click", () => {
        console.log(select.value);
        console.log(productTable) //null     

        //popup
        if (select.value == '') {
            messageError(".missingColor", "Veuillez choisir une couleur", "rgb(240, 54, 54)")
             return(
                quantity.value == NaN
            )
        }

       if (quantity.value < 1 || quantity.value > 100) {
            messageError(".missingQuantity", "Veuillez choisir une quantité entre 1 et 100", "rgb(240, 54, 54")
           
            return(
                quantity.value == NaN
            )
        }
        // Sinon, si tout est bon

        if (quantity.value > 0 && quantity.value < 100 && select.value != '') {
            messageError(".productAdded", "Le produit a bien été ajouté au panier", "green")
            // Je fais la suite
            // vérification du LS
            //ajout dans le LS
    
            // SI aucun produit dans le LS
    
            if (productTable == null) {    //si le produit tableau est null 
                productTable = []
    
                console.log(newProduct)
                productTable.push(newProduct)
                //Envoyer dans le local storage avec .setItem .   On transforme le tableau (ProductTable) en string pour le stocker dans le localstorage.
                localStorage.setItem("localStorageProduct", JSON.stringify(productTable));
    
            }}
            verifyBasket()
    })
}

const verifyBasket = () => {


        // Si le LocalStorage tableau n'est pas null
       if (productTable !== null) {
            console.log("le local storage n'est pas vide")
            console.log("Mon localstorage", productTable)


            // Vérification si on trouve le même produit dans le LS, si oui, findIndex va retourner l'index du produit dans le LS
            let findIndexObject = productTable.findIndex(
                (element) =>
                    element.id === productId && element.color === select.value
            );
            console.log("index du produit si trouvé", findIndexObject);

            if (findIndexObject > -1) {
                // On ajuste la quantité
                productTable[findIndexObject].quantity = parseInt(productTable[findIndexObject].quantity) + parseInt(newProduct.quantity);
                console.log("LS avec quantité ajustée", productTable[findIndexObject])
                // On met à jour le LS
                localStorage.setItem("localStorageProduct", JSON.stringify(productTable));

            }
            
            // Si le produit n'existe pas dans le LS
            else {
                // On a juste à pousser le nouveau produit dans le LS
                productTable.push(newProduct)
                localStorage.setItem("localStorageProduct", JSON.stringify(productTable));
            }
        }
 
    }

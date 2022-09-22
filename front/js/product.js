let params = new URLSearchParams(window.location.search);
let productId = params.get("id");  //récuperer l'id
console.log(productId);


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


const addBasket = () => {

    let button = document.getElementById("addToCart")
    console.log(button)
    button.addEventListener("click", () => {
        let productTable = JSON.parse(localStorage.getItem("localStorageProduct")) // Variable pour vérifier ce qu'il y a dans le local storage
        let select = document.getElementById("colors")
        let quantity = document.getElementById("quantity")
        console.log(select.value);
        console.log(productTable) //null 





        // Si color non sélectionnée : afficher message d'erreur en face de l'input
        // Si qté n'est pas bonne : afficher message d'erreur en face de l'input
        // Si tout va bien, tout est rempli, on peut passer à la suite

        // Création du produit à ajouter
        const newProduct = {
            color: select.value,
            quantity: quantity.value,
            id: productId
        }

        //popup
        let newDiv = document.createElement("div");
        newDiv.classList.add("missingColor", "missingQuantity", "productAdded");
        let currentDiv = document.querySelector(`.item__content__settings__quantity`);
        let parentDiv = currentDiv.parentNode

        parentDiv.insertBefore(newDiv, currentDiv.nextSibling)

        function styleError(){
            newDiv.style.color = "rgb(240, 54, 54)";
        }

        function style(){
            newDiv.style.color = "green";
        }

        function colorMissing(){
            document.querySelector(".missingColor").textContent = "Veuillez choisir une couleur"
            styleError();
        } 

        function quantityMissing(){
            document.querySelector(".missingQuantity").textContent ="Veuillez choisir une quantité entre 1 et 100";
            styleError()
        }

        function productAdded(){
            document.querySelector(".productAdded").textContent ="Le produit a bien été ajouté au panier";
            style();
        }

        const popupAlert = () => {

        }

        if (select.value == '') {
            colorMissing();
             return(
                quantity.value == NaN
            )
        }

        else if (quantity.value < 1 || quantity.value > 100) {
            quantityMissing()

            quantity.value = 1;
            return(
                quantity.value == NaN
            )
        }
        else {
            productAdded()
        }
        popupAlert();


        // SI aucun produit dans le LS
        if (productTable == null) {    //si le produit tableau est null 
            productTable = []

            console.log(newProduct)
            productTable.push(newProduct)
            //Envoyer dans le local storage avec .setItem .   On transforme le tableau (ProductTable) en string pour le stocker dans le localstorage.
            localStorage.setItem("localStorageProduct", JSON.stringify(productTable));

        }



        // Si le LocalStorage tableau n'est pas null
        else if (productTable !== null) {
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

    })


}

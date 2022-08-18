let params = new URLSearchParams(window.location.search);
//peut-on utiliser (document.location.search) ?
let productId = params.get("id");
console.log(productId);
 
//récuperer l'id


let products = [];

const getProducts = async () => {
    await fetch (`http://localhost:3000/api/products/${productId}`)
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
    await getProducts ();
    document.querySelector(`.item__img`).innerHTML = ` <img src="${products.imageUrl}" alt="${products.altTxt}">`
    document.getElementById("title").innerHTML = ` <h1 id="title">${products.name}</h1>`
    document.getElementById("price").innerHTML = `<span id="price">${products.price}</span>`
    document.getElementById("description").innerHTML = `<p id="description">${products.description}</p>`
};


productDisplay ();


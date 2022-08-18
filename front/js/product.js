let params = new URLSearchParams(window.location.search);
//peut-on utiliser (document.location.search) ?
let productId = params.get("id");  //récuperer l'id
console.log(productId);
 


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


    })
};


productDisplay ();


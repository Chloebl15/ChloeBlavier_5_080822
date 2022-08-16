let articles = [];
//Création tableau 

const getArticles = async () => {
    await fetch("http://localhost:3000/api/products")
        .then((res) => res.json())
        .then((data) => {
            articles = data
            console.log(articles)
            //Ajout de la promesse dans le tableau articles
        })
        .catch((error) => {
            // Si erreur dans URL, retourner l'erreur
            console.log(error);
            //afficher l'erreur 
        })
};

const creationArticles = async () => {
    await getArticles();
    for (let article of articles) {
        document.getElementById("items").innerHTML += ` <a href="./product.html?id=${article._id}">
    <article>
      <img src="${articles.imageUrl}" alt="${articles.altTxt}">
      <h3 class="productName">${articles.name}</h3>
      <p class="productDescription">${articles.description}</p>
    </article>
  </a> `
    }
}


creationArticles();

let _id = [];

for (let i = 0; i< articles.length; i++) {
    articles.forEach((articles,i) =>
    _id[i] = articles._id)
}

console.log(_id)

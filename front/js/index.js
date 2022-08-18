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
      <img src="${article.imageUrl}" alt="${article.altTxt}">
      <h3 class="productName">${article.name}</h3>
      <p class="productDescription">${article.description}</p>
    </article>
  </a> `
    }
}


creationArticles();



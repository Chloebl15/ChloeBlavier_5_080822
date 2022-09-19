let params = new URLSearchParams(window.location.search);      //récupération du numéro de commande dans l'url pour ensuite l'afficher
const orderId = params.get("commande");
console.log("orderId",orderId)
document.getElementById("orderId").innerHTML += `${orderId}`;
/* ---- test if local storage exist ----- */
if(localStorage.getItem("panierOrinoco")){
    
// Lecture du Local Storage
var panier_json = localStorage.getItem("panierOrinoco");
var panier = JSON.parse(panier_json);
console.log("le panier existe");
    
//first ligne table
let monPanier = document.getElementById("monPanier");    
monPanier.innerHTML="<tr> <td>Appareil</td> <td>optique</td> <td>prix</td><td>Quantité</td></tr>"
        

//article ligne table
const tdAppareil = document.createElement("td");
tdAppareil.textContent = panier.name;
monPanier.appendChild(tdAppareil);

const tdOptique = document.createElement("td");
tdOptique.textContent = panier.lens;
monPanier.appendChild(tdOptique);

const tdPrice = document.createElement("td");
tdPrice.textContent = panier.price/100;
monPanier.appendChild(tdPrice);

const tdQuantity = document.createElement("td");
tdQuantity.textContent = 1;
monPanier.appendChild(tdQuantity);    
    
//to do: calculate total
}

/* ----- if local storage don't exist ----- */
else{
console.log("Il n'ya pas d'article dans le panier");
} 

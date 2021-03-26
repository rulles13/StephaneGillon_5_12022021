let paramsConf = new URLSearchParams(window.location.search);

let elt = document.getElementById("confirmation");
const myPara = document.createElement("p");

myPara.textContent ="Cher " + paramsConf.get("name") +", votre commande n°: " + paramsConf.get("id") + " pour un total de " + paramsConf.get("prix") + " euros"
+ " vous sera livrée sous peu.";

elt.appendChild(myPara);
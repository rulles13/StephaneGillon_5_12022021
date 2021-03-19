let totalPanier = 0;
let products = [];

const commande = {
    contact: {},
    products: [],
}

/* ---- test if local storage exist ----- */
if(localStorage.getItem("panierOrinoco")){
    
    // Reading Local Storage
    var panier_json = localStorage.getItem("panierOrinoco");
    var panier = JSON.parse(panier_json);
    console.log("le panier existe");
        
    //first line table
    let monPanier = document.getElementById("monPanier");    
    monPanier.innerHTML="<thead> <tr> <th>Appareil</th> <th>optique</th> <th>prix</th><th>Quantité</th></tr> </thead>"
            

    //article line table
    for (let i in panier){
        const tr = document.createElement("tr");
        monPanier.appendChild(tr);

        const tdAppareil = document.createElement("td");
        tdAppareil.textContent = panier[i].name;
        tr.appendChild(tdAppareil);

        const tdOptique = document.createElement("td");
        tdOptique.textContent = panier[i].lens;
        tr.appendChild(tdOptique);

        const tdPrice = document.createElement("td");
        tdPrice.textContent = panier[i].price/100;
        tr.appendChild(tdPrice);

        const tdQuantity = document.createElement("td");
        tdQuantity.textContent = 1;
        tr.appendChild(tdQuantity); 
    }  
    console.log(panier);

//make a simpli array for POST
    commande.products = panier.map(camera => camera.id)
    console.log(commande.products);
//total price
    for (let i in panier){
        totalPanier += panier[i].price/100;

        console.log(panier[i].price/100);
    }
    const total = document.getElementById("totalPanier");
    total.textContent ="Le total de votre panier est: " + totalPanier + " euros";

}

/* ----- if local storage don't exist ----- */
else{
console.log("Il n'ya pas d'article dans le panier");
} 

/***********************************/
/*              Form               */
/***********************************/

// objet : form + Array

document.getElementById("formulaire").addEventListener("submit", function (envoi){
    envoi.preventDefault();

    //chek if basket is not empty
    if (panier.length == 0){
        alert("Attention, votre panier est vide.");
    }
    else {
        //get datas
        let nomForm = document.getElementById("Nomform").value;
        let prenomForm = document.getElementById("Prénom").value;
        let emailForm = document.getElementById("Email").value;
        let adresseForm = document.getElementById("Adresse").value;
        let villeForm = document.getElementById("Ville").value;
        let codePostalForm = document.getElementById("Codepostal").value;

        //make contact
        commande.contact = {
            firstName: prenomForm,
            lastName: nomForm,  
            address: adresseForm,
            city: villeForm,
            code: codePostalForm,
            email: emailForm,
        }    
        /* fetch(url + "/" + camId)
    .then(response => response.json())
    .then(json => {
        console.log(json)
        renderCamera(json)   
    })*/
        //send data (POST)
        const optionsFetch = {
            headers:{
                'Content-Type': 'application/json',
            },
            method:"POST",
            body: JSON.stringify(commande),         
        }     

console.log(commande);

        fetch('http://localhost:3000/api/cameras/order', optionsFetch)
            .then(response => response.json())
            .then(json => {
                console.log(json);
                window.location = `./confirmation.html?id=${json.orderId}&name=${prenomForm}&prix=${totalPanier}`
            });

        localStorage.clear()       
    }
})
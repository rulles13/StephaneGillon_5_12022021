let totalPanier = 0;
let products = [];

const total = document.getElementById("totalPanier");
let monPanier = document.getElementById("monPanier");
document.getElementById("clearButton").addEventListener("click", cleaning); // clear button

const commande = {
    contact: {},
    products: [],
}
/* ***************** function ***************** */
function cleaning() {
    localStorage.clear();
    console.log("Il n'ya pas d'article dans le panier");    
    monPanier.innerHTML = "Malheureusement vous n'avez pas encore sélectionné d'article.";
    total.textContent = "";
    let btn = document.getElementById("clearButton");
    btn.style.display = "none"; //hide clear button
    document.getElementById("formulaire").style.display = "none"; //hide formulaire
    document.getElementById("Numberarticle").textContent = 0;
}

function makeBill() {   
    var panier_json = localStorage.getItem("panierOrinoco"); // Reading Local Storage
    var panier = JSON.parse(panier_json);
    //first line table  
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

//make a simply array for POST
    commande.products = panier.map(camera => camera.id)
    console.log(commande.products);
//total price
    for (let i in panier){
        totalPanier += panier[i].price/100;
    }
    
    total.textContent ="Le total de votre panier est: " + totalPanier + " euros";
} 

function createClient(){
    document.getElementById("formulaire").addEventListener("submit", function (envoi){
        envoi.preventDefault();
    
        {
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
            //send data (POST)
            const optionsFetch = {
                headers:{
                    'Content-Type': 'application/json',
                },
                method:"POST",
                body: JSON.stringify(commande),         
            }     
    
            fetch('http://localhost:3000/api/cameras/order', optionsFetch)
                .then(response => response.json())
                .then(json => {
                    console.log(json);
                    window.location = `./confirmation.html?id=${json.orderId}&name=${prenomForm}&prix=${totalPanier}`
                });
    
            cleaning();       
        }
    })
}
/* ---- MAIN ----- */
if(localStorage.getItem("panierOrinoco")){
    makeBill();
    createClient();
}
else{
    cleaning();;   
} 

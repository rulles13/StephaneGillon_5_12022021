const params = new URLSearchParams(window.location.search);
let camId = params.get("id");
let url ="http://localhost:3000/api/cameras";
let panier = JSON.parse(localStorage.getItem("panierOrinoco"));
if(panier === null){panier = [];}

class cameraToAdd {
    constructor(price, name, lens, quantity, id) {
        this.price = price;
        this.name = name;
        this.lens = lens;
        this.quantity = quantity;
        this.id = id;
    }
}

function renderCamera(cameraData) {
        
    /* --- lens chose --- */        
    let lensChose= document.getElementById("lens")
    for (let i in cameraData.lenses){
        const myLens = document.createElement("option")
        myLens.textContent = cameraData.lenses[i]
        lensChose.appendChild(myLens)
    }    
        
    /* --- create HTML elements --- */    
    let eltPhoto = document.getElementById("produitPhoto");
    let eltInfo = document.getElementById("produitInfo");
    const myName = document.createElement("h2");
    const myPict = document.createElement("img");
    const myDescription = document.createElement("p"); 
    const orderButton = document.createElement("button");
    
    /* --- assign values --- */
    myName.textContent = cameraData.name;
    myPict.setAttribute("class","imgBig");
    myPict.setAttribute("src", cameraData.imageUrl);
    myDescription.textContent = cameraData.description; 
    orderButton.textContent ="commander";
            
    /* --- send elements to HTML --- */
    
    eltInfo.appendChild(myName);
    eltInfo.appendChild(myDescription);
    eltInfo.appendChild(orderButton);

    eltPhoto.appendChild(myPict);

    orderButton.addEventListener("click", function(){
        setLocalStorage (cameraData);
        //console.log(cameraData);
    });
}
/* -------------------- Storage -------------------- */
function setLocalStorage(camera) {
        let theLens = document.getElementById("lens");

        let price = camera.price;
        let name = camera.name;
        let lens = theLens.options[theLens.selectedIndex].text; //return of selected lens
        let qty = 1;
        let id = camera._id;
                
        let plusCamera = new cameraToAdd(price,name,lens,qty,id);
        panier.push(plusCamera); 
        
        //console.log(caddy);
        const panier_json = JSON.stringify(panier);
         
        // write caddy in localStorage
        localStorage.setItem("panierOrinoco", panier_json);
}

/* -------------------- get 1 camera -------------------- */

fetch(url + "/" + camId)
    .then(response => response.json())
    .then(json => {
        console.log(json)
        renderCamera(json)   
    })
        
    .catch(console.error);

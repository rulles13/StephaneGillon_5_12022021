const params = new URLSearchParams(window.location.search);
let camId = params.get("id");
let url ="http://localhost:3000/api/cameras"

function renderCamera(cameraData) {
        
    /* --- lens chose --- */        
    let lensChose= document.getElementById("lens")
    for (let i in cameraData.lenses){
        const myLens = document.createElement("option")
        myLens.textContent = cameraData.lenses[i]
        lensChose.appendChild(myLens)
    }    
        
    /* --- create HTML elements --- */    
    let elt = document.getElementById("produit");
    const myDiv = document.createElement("div");
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
    elt.appendChild(myDiv);
    myDiv.appendChild(myName);
    myDiv.appendChild(myPict);
    myDiv.appendChild(orderButton);
    myDiv.appendChild(myDescription);

    orderButton.addEventListener("click", function(){
        setLocalStorage (cameraData);
        //console.log(cameraData);
    });
}
/* -------------------- Storage -------------------- */
function setLocalStorage(camera) {
        let theLens = document.getElementById("lens");

        const cameraAdded = {
            price: camera.price,
            name: camera.name,
            lens: theLens.options[theLens.selectedIndex].text, //récupération de l'optique sélectionnée
            qty: 1,    
        }
         
        //console.log(caddy);
        const panier_json = JSON.stringify(cameraAdded);
        
        
        
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

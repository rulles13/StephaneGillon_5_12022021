// affichage du catalogue

fetch('http://localhost:3000/api/cameras')
    .then(response => response.json())
    .then(json => {
        console.log(json)
        const magasin = json;
        renderCameras(magasin);
    })
    .catch (error => {
    
        alert("Il s'est produit une erreur de connection avec le serveur", error);
    });
    

function renderCameras(magasin) {
    for (let i in magasin) {

        let elt = document.getElementById("appareils");
        const myDiv = document.createElement("div");
        const myName = document.createElement("h2");
        const myPict = document.createElement("img");
        const myPrice = document.createElement("p");

        const myLink = document.createElement("a");

        myDiv.setAttribute("class", "smallCard")
        myName.textContent = magasin[i].name;
        myPict.setAttribute("class", "imgSmall");
        myPict.setAttribute("src", magasin[i].imageUrl);
        myPrice.textContent = magasin[i].price / 100 + " euro";

        myLink.setAttribute("href", "produit.html?id=" + magasin[i]._id);
        myLink.textContent = "voir le produit";

        elt.appendChild(myDiv);
        myDiv.appendChild(myName);
        myDiv.appendChild(myPict);
        myDiv.appendChild(myPrice);
        myDiv.appendChild(myLink);
    }
}

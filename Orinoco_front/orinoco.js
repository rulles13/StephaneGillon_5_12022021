
const request = new XMLHttpRequest();

request.open('GET', 'http://localhost:3000/api/cameras');
request.send();
request.addEventListener('readystatechange', () => {
    if(request.readyState === 4){
        const magasin = JSON.parse(request.responseText);
        //console.log(magasin.length);
        console.log(magasin);
        for (let i in magasin){
            
            
            let elt = document.getElementById("appareils");
            const myDiv = document.createElement("div");
            const myName = document.createElement("h2");
            const myPict = document.createElement("img");
            const myDescription = document.createElement("p");

            myName.textContent = magasin[i].name;
            myPict.setAttribute("src", magasin[i].imageUrl);
            console.log("image",magasin[i].imageUrl);
            myDescription.textContent = magasin[i].description;
            elt.appendChild(myDiv);
            myDiv.appendChild(myName);
            myDiv.appendChild(myPict);
            myDiv.appendChild(myDescription);
        }
        
    }
    else(console.error);
}

)
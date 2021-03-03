fetch('http://localhost:3000/api/cameras')
    .then(response => response.json())
    .then(json => {console.log(json)
        const magasin = json;
        for (let i in magasin){
            
            
            let elt = document.getElementById("appareils");
            const myDiv = document.createElement("div");
            const myName = document.createElement("h2");
            const myPict = document.createElement("img");
            const myDescription = document.createElement("p");
            
            const myLink = document.createElement("a");

            myName.textContent = magasin[i].name;
            myPict.setAttribute("src", magasin[i].imageUrl);
            myDescription.textContent = magasin[i].description;
            
            myLink.setAttribute ("href","article.html?id=" + magasin[i]._id);
            myLink.textContent ="cliquez-ici";
            
            elt.appendChild(myDiv);
            myDiv.appendChild(myName);
            myDiv.appendChild(myPict);
            myDiv.appendChild(myLink);
            myDiv.appendChild(myDescription);

        }
    })
        
    .catch(console.error);



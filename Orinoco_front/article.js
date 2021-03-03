let elt = document.getElementById("produit");
            const myDiv = document.createElement("div");
            const myName = document.createElement("h2");
            const myPict = document.createElement("img");
            const myDescription = document.createElement("p");
            

            myName.textContent = magasin.name;
            myPict.setAttribute("src", magasin.imageUrl);
            myDescription.textContent = magasin.description;
            

            
            elt.appendChild(myDiv);
            myDiv.appendChild(myName);
            myDiv.appendChild(myPict);
            myDiv.appendChild(myDescription);
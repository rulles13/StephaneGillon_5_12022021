let quantity = 0;

function countArticle(){
  let numberArticle = document.getElementById("Numberarticle");
  quantity = JSON.parse(localStorage.getItem("panierOrinoco"));
  if(localStorage.getItem("panierOrinoco")){
    numberArticle.textContent = quantity.length;
  }
  else{
    numberArticle.textContent = 0;
  }
}

countArticle();
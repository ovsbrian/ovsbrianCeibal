const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";


document.addEventListener("DOMContentLoaded", function() {
    
      if (localStorage.getItem("perfil")){
        document.getElementById("user").innerHTML =  
        `
        <div class="btn-group">
         
        <a href="my-profile.html"><button  type="button"class="btn cntr">${localStorage.getItem("perfil")}</button></a>
          <button type="button" class="btn cntr dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="sr-only" ></span>
          </button> 
        
          <div class="dropdown-menu esp">
            <a class="dropdown-item" href="cart.html">Mi carrito</a>
            <a class="dropdown-item" href="my-profile.html">Mi perfil</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item salir" onclick="salir()">Salir</a>
          </div>
        
        </div>`

      }else{
        window.location.href = "index.html"
      }  
} )


let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}


 

 function salir(){
      localStorage.clear("perfil") 
      window.location.href = "index.html"
 }
let array = [];
let mini;
let maxi;  
const precio_ascendente = "mas"
const precio_descendente = "menos"
const relev  = "art"

function ordenarTodo(criteria, array){
    let result = [];
     if (criteria === precio_ascendente){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( b.cost < b.cost ){ return 1; }
            return 0;
        });
    } if (criteria === precio_descendente){
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( b.cost > b.cost ){ return 1; }
            return 0;
        });
    } if (criteria === relev){
        result = array.sort(function(a,b){
            if (a.soldCount > b.soldCount){return -1}
            return 0;
        })
    }

    return result;
} 


//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function listaDeProductos(){
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){ 
        let category = array [i];
        
         if (((!mini  && !maxi ) || (!mini && category.cost <= maxi))||((!maxi && category.cost >= mini)) ||(category.cost <= maxi && category.cost >= mini)){
        
        htmlContentToAppend += `
 
        <div class="list-group-item list-group-item-action buscadorElement " onclick="info_Pro(${category.id})" role="button" >
            <div class="row ">
                <div class="col-3 ">
                    <img src ="${category.image} " alt="product image" class="img-thumbnail">
                </div>
                <div class="col ">
                    <div class="d-flex w-100 justify-content-between  " >
                        <div class="mb-1">
                            <h4 class="nombreProducto"> ${category.name}</h4>  <label class="h5">${category.currency} ${category.cost}</label> 
                            <p class="descripcionProducto"> ${category.description} </p> 
                            
                        </div>
                        <small class="text-muted m-0"> ${category.soldCount} vendidos</small> 
                    </div>
               
                </div>
            </div>  
        </div>
        `
        }
    }
        document.getElementById("cat-list-cars").innerHTML  = htmlContentToAppend; 
           
}
// orden
 
function ordenarMostrarProd(sortCriteria, productArray){
 

 
    array = ordenarTodo(sortCriteria, array);

    //Muestro las categorías ordenadas
    listaDeProductos();
}

// petición web
document.addEventListener("DOMContentLoaded", function(){
     
    getJSONData(`${PRODUCTS_URL}${localStorage.getItem("catID")}${EXT_TYPE}`).then(function(resultObj){
        if (resultObj.status === "ok")
        { 
             let array1 = resultObj.data  // Constante para ingresar al array
             let productoZ = array1.catName
             document.getElementById("cat_name").innerHTML = productoZ.toLowerCase()
             array = array1.products  
             listaDeProductos(array)
        }
    });
   
    document.getElementById("rangoFiltrar").addEventListener("click", function (){
        
        if (document.getElementById("minimo").value  != ""){
          mini = parseInt(document.getElementById("minimo").value);
        }else{
        mini = undefined
        }
        if (document.getElementById("maximo").value  != ""){
        maxi = parseInt(document.getElementById("maximo").value);
        }else{
        maxi = undefined
        }
        
        listaDeProductos()
        
        
    })
   
    document.getElementById("limpiarFiltro").addEventListener("click", function (){
      document.getElementById("minimo").value = "";
      document.getElementById("maximo").value = "";

      mini= undefined;
      maxi = undefined;

      listaDeProductos();
    } )

    document.getElementById("descendente").addEventListener("click", function(){
        ordenarMostrarProd(precio_descendente)
   
    })

    document.getElementById("ascendente").addEventListener("click", function(){
        ordenarMostrarProd(precio_ascendente)
    
     })
     document.getElementById("relev").addEventListener("click", function(){
        ordenarMostrarProd(relev)
    
     })

})

/* Modifica products.html para que cada vez que el usuario seleccione un producto, su identificador se guarde en el almacenamiento local y se redirija a product-info.html */ 



function info_Pro(id){
    localStorage.setItem("identi", id);
    window.location.href = "product-info.html"
}

///
 

let buscadorInput = document.getElementById("buscador")

buscadorInput.addEventListener("keyup", e => {
    
    if (e.target.matches("#buscador")){
       document.querySelectorAll(".buscadorElement").forEach(articulos => {
        articulos.textContent.toLowerCase().includes(e.target.value)
        ? articulos.classList.remove ("filtro"): articulos.classList.add("filtro")
       })
    }
} )
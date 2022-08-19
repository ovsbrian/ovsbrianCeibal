 

//función que recibe un array con los datos, y los muestra en pantalla a través el uso del DOM
function showCategoriesList(data){
    const array = data.products    // Constante para ingresar al array
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){ 
        let category = array [i];
        
        htmlContentToAppend += `
       
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src ="` + category.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h4>`+ category.name + " - " + category.currency +" "+category.cost + `</h4> 
                        <p> `+ category.description +`</p> 
                        </div>
                        <small class="text-muted">` + category.soldCount + ` artículos</small> 
                    </div>
        
                </div>
            </div>
        </div>
        `
    }
        
        document.getElementById("cat-list-cars").innerHTML  = htmlContentToAppend; 
        document.getElementById("cat_name").innerHTML = data.catName
}
 

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(`${PRODUCTS_URL}${localStorage.getItem("catID")}.json`).then(function(resultObj){
        if (resultObj.status === "ok")
        {
             showCategoriesList(resultObj.data)
        }
    });
});

 
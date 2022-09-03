document.addEventListener("DOMContentLoaded", function(){
     
    getJSONData(`${PRODUCT_INFO_URL}${localStorage.getItem("identi")}${EXT_TYPE}`).then(function(resultObj){
        if (resultObj.status === "ok")
        { 
          let array_data = resultObj.data
          let info_de = array_data.name
          
          infoDeProducts(array_data)
        }
    });
})

function infoDeProducts(a){
    let array = a
    let contenido = "";
    let htmlContentToAppend = "";
    contenido += ` 
    <div class="div_infos">
        <h2 class="nombre_del"> ${array.name} </h2>
        <h3 class="precio_del"> ${array.currency} <b> ${array.cost}</b>  </h3>
        <p> ${array.description} </p>
        <h6> Este articulo pertenece a la categoria de  ${array.category.toLowerCase()} </h6>
    </div> `
    
    

   
  
        htmlContentToAppend += 
        `
        <div id="carouselExampleControls" class="carousel slide  coso_q_gira" >
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img  src="img/prod50921_1.jpg" alt="First slide">
          </div>
          <div class="carousel-item">
            <img   src="img/prod50921_2.jpg" alt="Second slide">
          </div>
          <div class="carousel-item"">
            <img  src="img/prod50921_3.jpg" alt="Third slide">
          </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
       `


    document.getElementById("xdxdxd").innerHTML  += contenido; 
    document.getElementById("xdxdxd").innerHTML  += htmlContentToAppend; 
       
           
}



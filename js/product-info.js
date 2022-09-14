document.addEventListener("DOMContentLoaded", function(){
     
    getJSONData(`${PRODUCT_INFO_URL}${localStorage.getItem("identi")}${EXT_TYPE}`).then(function(resultObj){
        if (resultObj.status === "ok")
        { 
          let  data = resultObj.data
          infoDeProducts( data)
        }
    });
    getJSONData(`${PRODUCT_INFO_COMMENTS_URL}${localStorage.getItem("identi")}${EXT_TYPE}`).then(function(resultObj){
      if (resultObj.status === "ok")
      { 
        let array_comentario_data = resultObj.data
        comentarios(array_comentario_data)
        
      }
  });
})

function infoDeProducts(a){
    
    let contenido = "";
    let htmlContentToAppend = "";
    contenido += ` 
    <div class="div_infos">
        <h2 class="nombre_del"> ${a.name} </h2>
        <h3 class="precio_del"> ${a.currency} <b> ${a.cost}</b>  </h3>
        <p> ${a.description} </p>
        <h6> Este articulo pertenece a la categoria de <b>${a.category.toLowerCase()}</b></h6>
    </div> `

       
    
        htmlContentToAppend += 
        `
        <div id="carouselExampleControls" class="carousel slide  coso_q_gira" >
        <div class="carousel-inner">     
          
        <div class="carousel-item active"><img  src=" ${a.images[0]} " alt="First slide"></img></div>
        <div class="carousel-item "><img  src=" ${a.images[1]} " alt="First slide"></img></div>
        <div class="carousel-item  "><img  src=" ${a.images[2]} " alt="First slide"></img></div>
        <div class="carousel-item  "><img  src=" ${a.images[3]} " alt="First slide"></img></div>
            
             
          
        </div>
        <a class="carousel-control-prev " href="#carouselExampleControls" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon  " style="color:red; fill:red;"aria-hidden="true"></span>
          <span class="sr-only ">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
       `


    
    document.getElementById("xdxdxd").innerHTML  += htmlContentToAppend; 
    document.getElementById("xdxdxd").innerHTML  += contenido; 
           
}

function no_ref (e){
  e.preventDefault() 
} 

function comentarios (a){
   
  let oa = ""
  oa +=  ` <h2 class="h2_com">Comentarios de la comunidad: </h2>`
  for(i=0; i < a.length ; i++){
     score = a[i].score 
     oa +=
     `
      <div class="comentarios_comunidad"><b>${a[i].user}</b> - ${a[i].dateTime} - 
      <span class="stars fa fa-star checked"></span>  
        <br> ${a[i].description} 
      </div> 
     
     `  
  }
    
  
  document.getElementById("xdxdxdc").innerHTML  += oa; 
  } 

  
  document.getElementById("xaaaaa").addEventListener('click', function(e){
    e.preventDefault()
  
    document.getElementById("ax").value = "";
    document.getElementById( "opc" ).value = 1;


    
  }) 
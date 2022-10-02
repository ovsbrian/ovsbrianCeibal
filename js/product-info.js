document.addEventListener("DOMContentLoaded", function(){
    getJSONData(`${PRODUCT_INFO_URL}${localStorage.getItem("identi")}${EXT_TYPE}`).then(function(resultObj){
        if (resultObj.status === "ok")
        { 
          let  data = resultObj.data
          infoDeProducts( data)
          relacionadas (data) 
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
  console.log(a.relatedProducts) 
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
        <div id="carouselExampleControls" class="carousel slide  crsel" data-bs-ride="carousel" >
          <div class="carousel-inner">     
            <div class="carousel-item active">
              <img src=" ${a.images[0]} " class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item "><img  class="d-block w-100"  src=" ${a.images[1]} " alt="First slide"></img></div>
            <div class="carousel-item  "><img  class="d-block w-100"  src=" ${a.images[2]} " alt="First slide"></img></div>
            <div class="carousel-item  "><img  class="d-block w-100"  src=" ${a.images[3]} " alt="First slide"></img></div>
          </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
       `

      document.getElementById("container_prod_inf").innerHTML  += htmlContentToAppend; 
      document.getElementById("container_prod_inf").innerHTML  += contenido;        
}
 

function comentarios (a){
  let html = ""
  html +=  ` <h2 class="h2_com">Comentarios de la comunidad: </h2>`
  for(i=0; i < a.length ; i++){
     html +=
     `
      <div  class="comentarios_comunidad"><b>${a[i].user}</b> - ${a[i].dateTime} - <div class="estrella_div">${estrellas(a[i].score)}</div> 
        <br> ${a[i].description} 
      </div>  
     `     
  }
  document.getElementById(" comentarios_info_com").innerHTML  += html; 
 
  } 

  
  document.getElementById("enviar_info_coment_com").addEventListener('click', function(e){
    e.preventDefault()
    document.getElementById("text_area_comen").value = "";
    document.getElementById("select_numb").value = 1;
  }) 

  function estrellas (puntaje){
    let estrellas_c = ""
    for (let i = 1; i <= puntaje; i++){estrellas_c +=`<span class="stars fa fa-star checked"></span>`}
    for(puntaje;puntaje<5;puntaje++){estrellas_c +=`<span class="stars fa fa-star"></span>`}
    return estrellas_c; 
  }


  function relacionadas (a){
    let art = "";
    art +=  `
    <div class="card card_relacionada caja_rel"  >
        <div class="card-body" onclick="ir_a_relacionada(${a.relatedProducts[0].id})" >
          <img src=" ${a.relatedProducts[0].image}" class="card-img-top" type="button">
          <h5 class="card-title"><b>${a.relatedProducts[0].name}</b></h5>
        </div>
      </div>
      <div class="card card_relacionada caja_rel"  >
        <div class="card-body" onclick="ir_a_relacionada(${a.relatedProducts[1].id})" >
          <img src="${a.relatedProducts[1].image} " class="card-img-top" type="button" >
          <h5  class="card-title"><b>${a.relatedProducts[1].name}</b></h5>
        </div>
      </div>
      `
    document.getElementById("art_relacion").innerHTML += art
}

function ir_a_relacionada(id){

  localStorage.setItem("identi", id);
  window.location.href = "product-info.html"

}
 
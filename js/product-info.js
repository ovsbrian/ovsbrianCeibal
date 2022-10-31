let data
document.addEventListener("DOMContentLoaded", function () {
  getJSONData(`${PRODUCT_INFO_URL}${localStorage.getItem("identi")}${EXT_TYPE}`).then(function (resultObj) {
    if (resultObj.status === "ok") {
      data = resultObj.data
      infoDeProducts(data)

      relacionadas(data)
    }
  });
  getJSONData(`${PRODUCT_INFO_COMMENTS_URL}${localStorage.getItem("identi")}${EXT_TYPE}`).then(function (resultObj) {
    if (resultObj.status === "ok") {
      let array_comentario_data = resultObj.data
      comentarios(array_comentario_data)
    }
  });

})

function infoDeProducts(a) {

  let contenido = "";
  let htmlContentToAppend = "";
  contenido += ` 
        <div class="div_infos">
            <h5 class="ventas"> Vendidos ${a.soldCount} </h5>
            <h5 class="categorias"> Categoría: ${a.category} </h5>
            <h2 class="nombre_del"> ${a.name} </h2>
            <h3 class="precio_del"> ${a.currency} <b> ${a.cost}</b>  </h3>
            <p> ${a.description} </p>
            <input type="number" id="count" value=1 min="1"  ></input>
            <br>
            <button type="button" class="btn btn-secondary mt-1" onclick="colocarEnCarrito()"  >Agregar al carrito</button>
          
        </div> `

  htmlContentToAppend +=
    `
        <div id="carouselExampleCaptions" class="carousel slide crsel" data-bs-ride="carousel">
        
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="${a.images[0]}" class="d-block w-100" alt="...">
            
          </div>
          <div class="carousel-item">
            <img src="${a.images[1]}" class="d-block w-100" alt="...">
             
          </div>
          <div class="carousel-item">
            <img src="${a.images[2]}" class="d-block w-100" alt="...">
            
          </div>
          <div class="carousel-item">
          <img src="${a.images[3]}" class="d-block w-100" alt="...">
          
        </div>
        </div>
      
        <div class="as">
          <img src="${a.images[0]}" class="active img_crsel_as" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" role="button">
          <img src="${a.images[1]}" class="active img_crsel_as" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" role="button">
          <img src="${a.images[2]}" class="active img_crsel_as" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"  role="button">
          <img src="${a.images[3]}" class="active img_crsel_as" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" role="button">
        </div>
      </div>

       `




  document.getElementById("container_prod_inf").innerHTML += htmlContentToAppend;
  document.getElementById("container_prod_inf").innerHTML += contenido;
}




function comentarios(a) {
  let html = ""
  html += ` <h2 class="h2_coment_">Comentarios de la comunidad: </h2>`
  for (i = 0; i < a.length; i++) {
    html +=
      `
      <div  class="comentarios_comunidad"><b>${a[i].user}</b> - ${a[i].dateTime} - <div class="estrella_div">${estrellas(a[i].score)}</div> 
        <br> ${a[i].description} 
      </div>  
     `
  }
  document.getElementById(" comentarios_info_com").innerHTML += html;

}


document.getElementById("enviar_info_coment_com").addEventListener('click', function (e) {
  e.preventDefault()
  document.getElementById("text_area_comen").value = "";
  document.getElementById("select_numb").value = 1;
})

function estrellas(puntaje) {
  let estrellas_c = ""
  for (let i = 1; i <= puntaje; i++) { estrellas_c += `<span class="stars fa fa-star checked"></span>` }
  for (puntaje; puntaje < 5; puntaje++) { estrellas_c += `<span class="stars fa fa-star"></span>` }
  return estrellas_c;
}


function relacionadas(a) {
  let art = "";



  art += `
    
    <div class="card card_relacionada caja_rel"  >
        <div onclick="ir_a_relacionada(${a.relatedProducts[0].id})" >
          <img src=" ${a.relatedProducts[0].image}" class=" exp_img" type="button">
          <h5 class="card-title text-center"><b>${a.relatedProducts[0].name}</b></h5>
        </div>
      </div>
      <div class="card card_relacionada caja_rel"  >
        <div onclick="ir_a_relacionada(${a.relatedProducts[1].id})" >
          <img src="${a.relatedProducts[1].image} " class=" exp_img " type="button" >
          <h5  class="card-title text-center "><b>${a.relatedProducts[1].name}</b></h5>
        </div>
      </div>
      `
  document.getElementById("art_relacion").innerHTML += art
}

function ir_a_relacionada(id) {

  localStorage.setItem("identi", id);
  window.location.href = "product-info.html"

}




function colocarEnCarrito() {

  let count = parseInt(document.getElementById("count").value)
  let nv = {
    soldCount: data.soldCount,
    name: data.name,
    currency: data.currency,
    cost: data.cost,
    id: data.id,
    count: count,
    image: data.images[0]
  }


  if (JSON.parse(localStorage.getItem("arrayCarrito"))) {

    let listaDeDeseados = JSON.parse(localStorage.getItem("arrayCarrito"))

    let nuevo = listaDeDeseados.find(({ id }) => id === data.id)

    if (nuevo !== undefined) {
      nuevo.count += nv.count
    } else {
      listaDeDeseados.push(nv)
    }
    localStorage.setItem("arrayCarrito", JSON.stringify(listaDeDeseados))
  } else {
    let listaDeDeseados = [];
    listaDeDeseados.push(nv)
    localStorage.setItem("arrayCarrito", JSON.stringify(listaDeDeseados))
  }
}


document.addEventListener("DOMContentLoaded", function () {



  carrito_de_compra()
  subtotaldetodo()
})


let nuevosProductos = JSON.parse(localStorage.getItem("arrayCarrito"))

function carrito_de_compra(a) {
  if (nuevosProductos.length === 0) {
    let html = ""

    html += ` 
      <div class="vh-100 m-0  row justify-content-center align-items-center">
        <div class="col-auto bg-danger p-5 text-center rounded">
            <p class="h2 fw-bold">Por favor ingrese un producto a su carrito <i class="bi bi-cart"></i></p>
            <a class="h3 fw-bold link_carrito_vacio" href="categories.html"><i class="bi bi-arrow-right-circle"></i> Visita nuestro catalogo de productos <i class="bi bi-arrow-left-circle"></i></a>
        </div>
      </div>
      `
    document.getElementById("container_cart").innerHTML = html
  } else {
    let html = ""
    for (var i = 0; i < nuevosProductos.length; i++) {
      html += `
              <tr>
                <th scope="row "  style="margin:0;width:100px; padding-right:20px"> <img class="h-25 rounded" style="width:100px;"src="${nuevosProductos[i].image}"> </th>
                <td class="text-center">${nuevosProductos[i].name}</td>
                <td style="width:300px" class="text-center"  id="costoProduct-${nuevosProductos[i].id}">${nuevosProductos[i].currency}  ${nuevosProductos[i].cost}</td>
                <td>
               
                <input style="width:100px" type="number" min="1"  id="cantidad${nuevosProductos[i].id}" placeholder="1" value="1" onclick="subtotaldetodo()">
               
                
                
                </td>
                <td id="subtotalProd-${nuevosProductos[i].id}" style="width:200px" class="text-center" > </td>
                <td><button class="btn btn-outline-danger my-auto   " onclick="remove(${nuevosProductos[i].id})" > Eliminar</button></td>
              </tr> 
                  `
             
    }
    document.getElementById("listaProductosCompra").innerHTML = html
  }





  const formEnvio = document.getElementById("formulario");
  const formPago = document.getElementById("form-pago")
  const radioBanco = document.getElementById("radioBanco")
  const credito = document.getElementById("credito")


  document.getElementById("boton-pago").addEventListener('click', function (event) {

    if (!formEnvio.checkValidity() || !checked()) {

    } else {
      document.getElementById("alertaCompra").classList.remove("d-none")
      setTimeout(() => {
        terminarcompra()
      }, 2000);
    }
    formEnvio.classList.add('was-validated')

  })



  function checked() {
    let cred = credito
    let bank = radioBanco
    if (!cred.checked && !bank.checked) {
      document.getElementById("metodoPago").classList.add("text-danger")
      document.getElementById("errorCheck").classList.remove("invalid-feedback")
      return false
    } else {
      document.getElementById("metodoPago").classList.remove("text-danger")
      document.getElementById("errorCheck").classList.add("invalid-feedback")
      return true
    }
  }


  document.getElementById("boton-metodoPago").addEventListener('click', function (event) {


    if (!formPago.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      document.getElementById("boton-metodoPago").setAttribute("data-bs-dismiss", "modal")
    }

    formPago.classList.add('was-validated');
  })



  radioBanco.addEventListener("input", function () {
    checked()

    let numTargeta = document.getElementById("numTargeta")
    let codSeg = document.getElementById("codSeg")
    let venc = document.getElementById("venc")
    numTargeta.setAttribute("disabled", "true")
    codSeg.setAttribute("disabled", "true")
    venc.setAttribute("disabled", "true")
    let numBanc = document.getElementById("bancaria")
    numBanc.removeAttribute("disabled")
  })

  credito.addEventListener("input", function () {
    checked()
    let numBanc = document.getElementById("bancaria")
    numBanc.setAttribute("disabled", "true")
    let numTargeta = document.getElementById("numTargeta")
    let codSeg = document.getElementById("codSeg")
    let venc = document.getElementById("venc")
    numTargeta.removeAttribute("disabled")
    codSeg.removeAttribute("disabled")
    venc.removeAttribute("disabled")
  })


}







function terminarcompra() {
  localStorage.removeItem("arrayCarrito")
  window.location.href = "cart.html"
}




function soloNumeros(e) {
  let key = window.Event ? e.which : e.keyCode
  return (key >= 48 && key <= 57)
}
 


function subtotaldetodo(){
  let check1 = document.getElementById("premium")
  let check2 =  document.getElementById("express")
  let check3 =  document.getElementById("standar")
  let val = document.getElementById("costoEnvio")
  let total = 0;
  let envio = 0;
  let precioFinal = document.getElementById("precioFinal")
  let mostrarTotal = document.getElementById("subTotalFinal")
 
  for(productos of nuevosProductos){
    let costoProductos = productos.cost 
     
    if (productos.currency === "UYU"){
      costoProductos = costoProductos/40  
    } 
    let totalProd = costoProductos* document.getElementById(`cantidad${productos.id}`).value
    
    total = total + totalProd
    document.getElementById(`subtotalProd-${productos.id}`).innerHTML = `USD ${Math.round(totalProd)}  `
  }

  if (check1.checked){
    envio =  total*(15/100)
  }if(check2.checked){
    envio =  total*(7/100)
  }if(check3.checked){
    envio =  total*(5/100)
  }
  mostrarTotal.innerHTML = Math.round(total)
  val.innerHTML = Math.round(envio)
  precioFinal.innerHTML = Math.round(total+envio)

  
}
 
 function remove(id){
  const foundId = nuevosProductos.find((element) => element.id === id);
  console.log(nuevosProductos)
  let idssss = nuevosProductos.id
  nuevosProductos = nuevosProductos.filter((idssss) =>  {
    return idssss !== foundId
   
  })
  localStorage.setItem ("arrayCarrito", JSON.stringify(nuevosProductos))
  carrito_de_compra(nuevosProductos)
  console.log(nuevosProductos)
  subtotaldetodo()
 }
 
 
 
document.addEventListener("DOMContentLoaded", function () {



  carrito_de_compra()
  subtotaldetodo()
})


let nuevosProductos = JSON.parse(localStorage.getItem("arrayCarrito"))

function carrito_de_compra() {
  

  if (nuevosProductos === null) {
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

    html += ` 
       
      <div class="row mt-5 rounded" style=" height:100%; background-color:#f1eeee;">
        <div class="col-lg-8 col-md-12 col-sm-12 ">
        <div class="bg-light mt-5 rounded-3 d-flex"  > 
        <table class="table " >
          <thead>
            <tr class="table-dark">
              <th scope="col"> </th>
              <th scope="col" class="text-center">Nombre</th>
              <th scope="col" class="text-center">Costo</th>
              <th scope="col">Cantidad</th>
              <th scope="col" class="text-center">Subtotal</th>
              <th scope="col"> </th>
            </tr>
          </thead>
          <tbody>
            `
    for (var i = 0; i < nuevosProductos.length; i++) {
      console.log(  `cantidad${nuevosProductos[i].id}  `)
      html += `
              <tr>
                <th scope="row "  style="margin:0;width:100px; padding-right:20px"> <img class="h-25 rounded" style="width:100px;"src="${nuevosProductos[i].image}"> </th>
                <td class="text-center">${nuevosProductos[i].name}</td>
                <td style="width:300px" class="text-center"  id="costoProduct-${nuevosProductos[i].id}">${nuevosProductos[i].currency} ${nuevosProductos[i].cost}</td>
                <td>
               
                <input style="width:100px" type="number" min="1"  id="cantidad${nuevosProductos[i].id}" placeholder="1" value="1" onclick="subtotaldetodo()">
               
                
                
                </td>
                <td id="subtotalProd-${nuevosProductos[i].id}" style="width:200px" class="text-center" > ${nuevosProductos[i].currency} 
               ${nuevosProductos[i].count * nuevosProductos[i].cost}   </td>
                <td><button class="btn btn-outline-danger my-auto " onclick="remove(event)" > Eliminar</button></td>
              </tr> 
                  `

    } html += `
          </tbody>
        </table>
      </div>
    </div>

    <div class="col-lg-4 col-md-12 col-sm-12 rounded-end  ">
 
      <div class="bg-light  mt-5 rounded-3 "   >  
       
        <h5 class="text-center p-2 bg-dark text-light"><b>Tipo de envío</b></h5>
   
        <div class="m-1 p-2">

          <div class="form-check">
            <input class="form-check-input" type="radio" name="exampleRadios" id="premium" value="option1"  onclick="subtotaldetodo()">
            <label class="form-check-label" for="premium">
                Premium 2 a 5 días (15%)
            </label>
          </div>

          <div class="form-check">
            <input class="form-check-input" type="radio" name="exampleRadios" id="express" value="option2"  onclick="subtotaldetodo()">
            <label class="form-check-label" for="express">
              Express 5 a 8 días (7%)
            </label>
          </div>

          <div class="form-check">
            <input class="form-check-input" type="radio" name="exampleRadios" id="standar" value="option3" onclick=" subtotaldetodo()" checked>
            <label class="form-check-label" for="standar">
              Standard 12 a 15 días (5%)
            </label>
          </div>
      </div>
  
      <h5 class="text-center p-2"><b>Dirección de envío</b></h5>
      <form class="needs-validation" novalidate id="formulario">
        <div class="m-1 p-2" style=" width: 60%">
          <label class="form-label">Calle</label>
          <input type="text" id="inputCalle" class="form-control"  required>

          <div class="invalid-feedback">
            Debe ingresar un calle.
          </div>

          <label class="form-label pt-2">Número</label>
          <input type="number" id="inputNumero" class="form-control" required >

          <div class="invalid-feedback">
            Debe ingresar un número.
          </div>

          <label class="form-label pt-2">Esquina</label>

          <input type="text" id="inputEsquina" class="form-control" required >
          
          <div class="invalid-feedback">
            Debe ingresar una esquina.
          </div>
        </div>
      </form>

      <ul class="list-group d-flex">
        <li class="list-group-item">SubTotal: <label class="float-end" id="subTotalFinal"></label></li> 
        <li class="list-group-item">Costo de envio<label class="float-end" id="costoEnvio"></label></li>
        <li class="list-group-item">Total ($) <label class="float-end" id="precioFinal"></label></li>
        <li class="list-group-item">
          <b>Forma de Pago</b>
          <a class=" btn-link" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="metodoPago">
            Seleccionar método de pago
          </a>
          <small class="invalid-feedback text-danger" id="errorCheck">
            Debe ingresar un método de pago.
          </small>  
        </li>
      </ul>
          <!-- Modal -->
          <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="staticBackdropLabel" ><b>Forma de pago</b></h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <form class="needs-validation" novalidate id="form-pago">
                  <div class="modal-body">
                    <div class="form-check m-3 ">
                      <input class="form-check-input" type="radio" name="exampleRadios" id="credito" value="option1"required >
                      <label class="form-check-label"  for="credito">
                          Tarjeta de crédito
                      </label>
                      <hr class="me-3">
                      
                        <label label class="p-1" > Número de tarjeta</label>
                        <input  id="numTargeta" maxlength="10" type="text" onKeyPress="return soloNumeros(event)" class="form-control" required>
            
                        
                        <label class="p-1" style="width:35%">Código de seg.</label>
                          <input id="codSeg" maxlength="3" type="text" onKeyPress="return soloNumeros(event)" class="form-control"required>

                      
                        <label class="p-1"  >Vencimiento (MM/AA)</label>
                        <input id="venc" maxlength="4" type="text" onKeyPress="return soloNumeros(event)" class="form-control"required>
                    
                    </div>
                    <div class="m-3 form-check">
                    
                      <input class="form-check-input" type="radio" name="exampleRadios" id="radioBanco" value="option3"  required>
                      <label class=" form-check-label " for="radioBanco">  Transferencia bancaria  </label>
                    
                      <hr class="me-3">
                      <label class="p-1"  >Número de cuenta </label>
                      <input id="bancaria" maxlength="20" minlength="20" type="text" onKeyPress="return soloNumeros(event)" class="form-control" required>

                    </div>
              
                  </div>

                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" id="boton-metodoPago">Siguiente</button>
                    </div>
                </form>
              </div>
            </div>
          </div>
        <button class="btn btn-secondary" id="boton-pago" type="submit"  >  Confirmar compra </button>
       </div>
    </div>

      <div class="alert alert-success d-none" role="alert" id="alertaCompra">
    
        <h4 class="alert-heading">Su compra ha sido realizada con éxito!</h4>
    
      </div>

    </div>
  
    `



    document.getElementById("container_cart").innerHTML = html

    

    

   
    





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
    console.log (productos.currency)
    if (productos.currency === "UYU"){
      costoProductos = costoProductos/40
      
    } 
    let totalProd = costoProductos* document.getElementById(`cantidad${productos.id}`).value
    total = total + totalProd
  }

  if (check1.checked){
    envio =  total*(15/100)
  }if(check2.checked){
    envio =  total*(7/100)
  }if(check3.checked){
    envio =  total*(5/100)
  }
  mostrarTotal.innerHTML = total
  val.innerHTML = Math.round(envio)
  precioFinal.innerHTML = total+envio
}

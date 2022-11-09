let imagen = document.getElementById("imagen-del-usuario")
const impPred = "img/img_perfil.png"
let upload = document.getElementById("upload-img-user")
const form = document.getElementById("form-user")
 

document.getElementById("botonCambiar").addEventListener("click", () =>{
    document.getElementById("validarPrimerNombre").disabled = false;
    document.getElementById("segundoNombre").disabled = false;
    document.getElementById("validarPrimerApellido").disabled = false;
    document.getElementById("segundoApellido").disabled = false;
    document.getElementById("telefonoContacto").disabled = false;
})




document.addEventListener("DOMContentLoaded", () => {

    let emailUserPerfil = localStorage.getItem("perfil")
    document.getElementById("correoPerfilUsuario").innerHTML = emailUserPerfil
    document.getElementById("correoPerfilUsuarioin").value = emailUserPerfil
  
    guardar()
    imgDelUsuario()
 
})

const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
            reject(error);
        };
    });
};
upload.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    imagen.src = base64;
    
})




form.addEventListener('submit', function (event) {
    let primerNombre = document.getElementById("validarPrimerNombre").value 
    let primerApellido = document.getElementById("validarPrimerApellido").value 
    let segundoNombre = document.getElementById("segundoNombre").value 
    let segundoApellido = document.getElementById("segundoApellido").value 
    let numero = document.getElementById("telefonoContacto").value 


    if (!primerApellido || !primerNombre) {
        event.preventDefault()
        event.stopPropagation()
    }else{
        localStorage.setItem ("nombre", primerNombre )
        localStorage.setItem ("apellido",  primerApellido)
        localStorage.setItem("segundoNombre", segundoNombre)
        localStorage.setItem("segundoApellido", segundoApellido)
        localStorage.setItem("numero", numero)
       
    }
    form.classList.add('was-validated')

})


function guardar(){
    let primerNombre =  localStorage.getItem("nombre")
    let primerApellido = localStorage.getItem("apellido")
    let segundoNombre = localStorage.getItem("segundoNombre")
    let segundoApellido = localStorage.getItem("segundoApellido")
    let numero = localStorage.getItem("numero")

    if(primerNombre){
        document.getElementById("usuarioName").innerHTML = ` <p><label>Nombre de usuario: ${primerNombre} ${primerApellido}</label> </p> `
        document.getElementById("validarPrimerNombre").value = primerNombre
        document.getElementById("validarPrimerApellido").value = primerApellido
    }

   if (segundoNombre){
     document.getElementById("segundoNombre").value = segundoNombre
   }
   if (segundoApellido){
    document.getElementById("segundoApellido").value = segundoApellido
  }
  if (numero){
    document.getElementById("telefonoContacto").value = numero
  }







}

function imgDelUsuario(){
    if (!localStorage.getItem("imagen")) {
        imagen.src = impPred
    } else {
        imagen.src = localStorage.getItem("imagen")
    }
}


function perfilGuardado(){
    const perfil = localStorage.getItem("perfil")
    perfil.img = localStorage.getItem("imagen")
    perfil.name = localStorage.get("nombre")
}

 
let imagen = document.getElementById("imagen-del-usuario")
const impPred = "img/img_perfil.png"
let upload = document.getElementById("upload-img-user")
const form = document.getElementById("form-user")

document.addEventListener("DOMContentLoaded", () => {

    let emailUserPerfil = localStorage.getItem("perfil")
    document.getElementById("correoPerfilUsuario").innerHTML = emailUserPerfil
    document.getElementById("correoPerfilUsuarioin").value = emailUserPerfil
  
    nombreDelUsuario()
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

    if (!primerApellido || !primerNombre) {
        event.preventDefault()
        event.stopPropagation()
    }else{
        localStorage.setItem ("nombre", primerNombre + " " +primerApellido)
        localStorage.setItem("imagen", imagen.src)
    }
    form.classList.add('was-validated')

})


function nombreDelUsuario(){
    if(localStorage.getItem("nombre")){
        document.getElementById("usuarioName").innerHTML = ` <p><label>Nombre de usuario: ${localStorage.getItem("nombre")} </label> </p> `
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
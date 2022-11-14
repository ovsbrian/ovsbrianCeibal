let imagen = document.getElementById("imagen-del-usuario")
const impPred = "img/img_perfil.png"
let upload = document.getElementById("upload-img-user")
const form = document.getElementById("form-user")
let habilitarInput = document.querySelectorAll(".habilitar")

document.getElementById("botonCambiar").addEventListener("click", () => {
    for (input of habilitarInput) {
        input.disabled = false
    }
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
    localStorage.setItem("imagen", imagen.src)

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
        form.classList.add('was-validated')
    } else {

        let objeto = {
            nombre: primerNombre,
            apellido: primerApellido,
            segundoNombre: segundoNombre,
            segundoApellido: segundoApellido,
            numero: numero,

        }

        localStorage.setItem("nombre", primerNombre )
        localStorage.setItem("apellido", primerApellido )
        localStorage.setItem("objeto", JSON.stringify(objeto))
    }
})
var usuarioPerfil = JSON.parse(localStorage.getItem("objeto"));

function guardar() {
    if (usuarioPerfil.nombre) {
        document.getElementById("usuarioName").innerHTML = ` <p><label>Nombre de usuario: ${usuarioPerfil.nombre} ${usuarioPerfil.apellido}</label> </p> `
        document.getElementById("validarPrimerNombre").value = usuarioPerfil.nombre
        document.getElementById("validarPrimerApellido").value = usuarioPerfil.apellido
      
    }

    if (usuarioPerfil.segundoNombre) {
        document.getElementById("segundoNombre").value = usuarioPerfil.segundoNombre
    }
    if (usuarioPerfil.segundoApellido) {
        document.getElementById("segundoApellido").value = usuarioPerfil.segundoApellido
    }
    if (usuarioPerfil.numero) {
        document.getElementById("telefonoContacto").value = usuarioPerfil.numero
    }

}

function imgDelUsuario() {
    if (!localStorage.getItem("imagen")) {
        imagen.src = impPred
    } else {
        imagen.src = localStorage.getItem("imagen")
    }
}


function perfilGuardado() {
    const perfil = localStorage.getItem("perfil")
    perfil.img = localStorage.getItem("imagen")
    perfil.name = usuarioPerfil.nombre
}


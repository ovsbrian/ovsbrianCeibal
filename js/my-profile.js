let imagen = document.getElementById("imagen-del-usuario") 
const impPred=  "img/img_perfil.png "

let upload = document.getElementById("upload-img-user")
 

document.addEventListener("DOMContentLoaded", () =>{
    
    let emailUserPerfil = localStorage.getItem("perfil")
    document.getElementById("correoPerfilUsuario").innerHTML = emailUserPerfil
    if  (!localStorage.getItem("imagen")){
        imagen.src =  impPred
    } else{
        imagen.src = localStorage.getItem("imagen")
    }
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
upload.addEventListener("change", async(e) =>{
    
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    imagen.src = base64;
    localStorage.setItem("imagen", imagen.src)
 
     





})
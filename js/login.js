let ver=document.getElementById("ver");
let clave=document.getElementById("clave")
let icono=document.getElementById("icono")
let con=true


// para ver o ocultar contra 

ver.addEventListener("click", function(){
    if (con==true) {
        clave.type="text"
        icono.classList.add("fa-eye-slash")
        con=false
    } else {
        clave.type="password"
        icono.classList.remove("fa-eye-slash")
        con=true
    }
})

function jwtDecode (res){
    console.log("aa")
    let user = decode(res.credential)
    localStorage.setItem ("perfil", user.email)
    window.location.href = "inicio.html"
}
function decode(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
};


// Función para validar la entrada del usuario
 
document.getElementById("boton").addEventListener('click', validarFormulario); 
    
 



function validarFormulario(e) {
    e.preventDefault(); 
    var usuario = document.getElementById('usuario').value.replace(/\s/gi,'');
    var clave = document.getElementById('clave').value.replace(/\s/gi,''); // Elimina los espacios en blanco
    if(usuario.length == 0 && clave.length == 0  ) {
      return false;
    }  else {
        localStorage.setItem("perfil",usuario)
        window.location.href = "inicio.html"
    } 
    
  } 


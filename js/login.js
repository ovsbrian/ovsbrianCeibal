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

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  }




// Función para validar la entrada del usuario
document.addEventListener("DOMContentLoaded", function() {
    
    document.getElementById("form_login").addEventListener('submit', validarFormulario); 
    
  
});



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


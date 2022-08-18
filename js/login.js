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

 
// Función para validar la entrada del usuario
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("form_login").addEventListener('submit', validarFormulario); 
  
  
});


  function validarFormulario(e) {
    e.preventDefault(); 
    var usuario = document.getElementById('usuario').value.replace(/\s/gi,''); // Elimina los espacios en blanco
    var clave = document.getElementById('clave').value.replace(/\s/gi,'');
    if(usuario.length == 0 && clave.length == 0  ) {
      return;
    }  else {
        window.location.href = "inicio.html"    
    } 
    
  }

 
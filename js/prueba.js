document.addEventListener("DOMContentLoaded", init);

let datos = []; 

function init(){

    let visualizar = document.querySelector(".visualizarDatos");
    visualizar.addEventListener("click", mostrarDatosValidados);

    let añadir = document.querySelector('.añadir');
    añadir.addEventListener("click", añadirDatos);

    let eliminar = document.querySelector('.eliminar');
    eliminar.addEventListener("click", borrarDatos);

}

function añadirDatos(){

    //Obtenemos los datos que nos han introducido el usuario
    let nombre = (document.querySelector(".nombre")).value;
    let apellidos = (document.querySelector(".apellidos")).value;
    let correo = (document.querySelector(".correo")).value;
    let generos = document.querySelectorAll(".sexo");
    let informacion = document.querySelectorAll(".informacion");
    let infoUsuario = document.getElementById('infoUsuario');
    let valorSexo = "";
    let valorInfo = [];
    let fuente = (document.querySelector(".options")).value;
    let error = document.querySelector(".error");

   
    generos.forEach(elemento =>{  // Recorremos el nodeList que tenemos con el valor de los sexos 
        if(elemento.checked === true){
           valorSexo = elemento.value;
        }
    })

    informacion.forEach(elemento =>{ // Recorremos el nodeList en el que tenemos el valor de los checkbox
        if(elemento.checked === true){
            valorInfo.push(elemento.value); // Añadimos los elementos con el check al array
        }
    })
    error.innerHTML = ""; // Inicializamos los errores a vacio para que cuando actualice, no muestre los errores anteriores
   
    // Comprobamos vacios sin espaciado.
    if(apellidos.trim() == "" || nombre.trim() == "" || correo =="" || valorSexo == ""){
        error.innerHTML = error.innerHTML + "Por favor, rellene todos los campos";
        return;
    }
    // Una vez que los campos no estén vacios, comprobamos si el correo es correcto

       let elEmailEsValido = validarEmail(correo);
       
       if(elEmailEsValido === false){
           error.innerHTML =  error.innerHTML + "El correo no es válido";
           return;
       }

    // Añadimos la información ,alx

       let persona = {
           nombre : nombre,
           apellidos : apellidos,
           correo : correo,
           sexo : valorSexo,
           fuente : fuente,
           informacion : valorInfo
       }

       let clave = persona.correo;
       let personaExiste = false;

     datos.forEach(elemento =>{
        if(elemento.correo == clave){
            personaExiste = true;
        }
    })

    if(personaExiste){
        alert("La persona introducida ya existe");
        return;
    }else{
        datos.push(persona);
    }
    

       let datosOption = `${persona.nombre} ${persona.apellidos} ${persona.correo}`;

       infoUsuario.innerHTML +=  `<option  class="datosUsuario" value="${persona.correo}">${datosOption}</option>`; 



     
}


function validarEmail(correo){
     const patron = /^([a-zA-Z0-9!#$%&'*_+-]([\.]?[a-zA-Z0-9!#$%&'*_+-])+@[a-zA-Z0-9]([^@&%$\/()=?¿!.,:;]|\d)+[a-zA-Z0-9][\.][a-zA-Z]{2,4}([\.][a-zA-Z]{2})?)+$/;
       if(correo.search(patron) === 0) {
         return true;
        }
    return false;
}

function mostrarDatosValidados(){

    let datosUsuario = document.querySelectorAll(".datosUsuario");
    let clave = "";
    datosUsuario.forEach(elemento =>{
        if(elemento.selected === true){
          clave = elemento.value;
    }})

    if(clave === ""){
        alert("No hay nada seleccionado");
        return;
    }

    datos.forEach(objeto =>{
        if(objeto.correo === clave){
            alert(`
            Nombre: ${objeto.nombre}
            Apellidos: ${objeto.apellidos}
            Correo: ${objeto.correo}
            Sexo: ${objeto.sexo}
            Fuente: ${objeto.fuente}
            Informacion : ${objeto.informacion}
            `
                    )
        }
    })
    
}


function borrarDatos(){
    let datosUsuario = document.querySelectorAll(".datosUsuario");
    let clave = "";
    datosUsuario.forEach(elemento =>{
        if(elemento.selected === true){
            clave = elemento.value;
    }})

    if(clave === ""){
        alert("No hay nada seleccionado");
        return;
    }

    datos.forEach((objeto , indice )=>{
        if(objeto.correo = clave){
            datos.splice(indice)
        }
    })

    
    let option = document.querySelector(`[value='${clave}']`);
    option.remove();


}


// let botonSubmit= document.querySelector('submit');
// botonSubmit.onsubmit= () => {
//     swal({
//         title: "¡Mensaje enviado!",
//         text: `Trataremos de responderte lo antes posible!`,
//         icon: "success",
//         buttons: {
//             cerrar: {
//                 text: "Cerrar",
//                 value: false
//             }
        
//         }
//      } )
// }



// botonSubmit.onsubmit= alert("Holaa");

function muestraMensaje() {
    console.log('Gracias por pinchar');
  }
  document.getElementsByClassName("buttonsubmit").onsubmit = muestraMensaje;
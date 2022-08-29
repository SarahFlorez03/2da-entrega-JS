
class Producto {
    constructor(id, nombre, precio, foto) {
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.foto = foto;
    }
}

class ElementoCarrito {
    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
    }
}

/**
 * Definiciones de constantes
 */
const estandarDolaresAmericanos = Intl.NumberFormat('en-US');

//Arrays donde guardaremos catálogo de productos y elementos en carrito
const productos = [];
const elementosCarrito = [];

const contenedorProductos = document.getElementById('contenedor-productos');

const contenedorCarritoCompras = document.querySelector("#items")

const contenedorFooterCarrito = document.querySelector("#footer");

/**
 * Ejecución de funciones
 */

cargarProductos();
cargarCarrito();
dibujarCarrito();
dibujarCatalogoProductos();

/**
 * Definiciones de funciones
 */

function cargarProductos() {
    productos.push(new Producto(1, 'Hoodie Dragon', 1.99, '../Imgs/img/products/hoodie dragon.jpg'));
        productos.push(new Producto(2, 'Blusa Naranja', 1256.96, '../Imgs/img/products/blusa naranja.jpg'));
        productos.push(new Producto(3, 'Blusa Verde', 4.23, '../Imgs/img/products/blusa verde.jpg'));
        productos.push(new Producto(4, 'Hoodie Marron', 80.98, '../Imgs/img/products/hoodie marron.jpg'));
        productos.push(new Producto(5, 'Hoodie Mostaza', 23.98, '../Imgs/img/products/hoodie mostaza.jpg'));
        productos.push(new Producto(6, 'Hoodie Negra', 23.98, '../Imgs/img/products/hoodie negra.jpg'));
        productos.push(new Producto(7, 'Jumper Gris', 23.98, '../Imgs/img/products/jumper gris.jpg'));
        productos.push(new Producto(8, 'Jumper Marron', 23.98, '../Imgs/img/products/jumper marron.jpg'));
        productos.push(new Producto(8, 'Top Zipper', 23.98, '../Imgs/img/products/top zipper.jpg'));
    }
function cargarCarrito() {
    
}

function dibujarCarrito() {

    let sumaCarrito = 0;
    contenedorCarritoCompras.innerHTML = "";

    elementosCarrito.forEach(
        (elemento) => {
            let renglonesCarrito= document.createElement("tr");
            
            renglonesCarrito.innerHTML = `
                <td>${elemento.producto.id}</td>
                <td>${elemento.producto.nombre}</td>
                <td><input id="cantidad-producto-${elemento.producto.id}" type="number" value="${elemento.cantidad}" min="1" max="1000" step="1" style="width: 50px;"/></td>
                <td>$ ${elemento.producto.precio}</td>
                <td>$ ${estandarDolaresAmericanos.format(elemento.producto.precio*elemento.cantidad)}</td>
                <td><button id="eliminar-producto-${elemento.producto.id}" type="button" class="btn btn-danger"><i class="bi bi-trash-fill"></i></button></td>
            `;

            contenedorCarritoCompras.append(renglonesCarrito);

            sumaCarrito+=elemento.cantidad*elemento.producto.precio;

            //agregamos evento a carrito
            let cantidadProductos = document.getElementById(`cantidad-producto-${elemento.producto.id}`);
            
            cantidadProductos.addEventListener("change", (e) => {
                let nuevaCantidad = e.target.value;
                elemento.cantidad = nuevaCantidad;
                dibujarCarrito();
            });

            let borrarProducto = document.getElementById(`eliminar-producto-${elemento.producto.id}`);

            borrarProducto.addEventListener("click", (e) => {
                removerProductoCarrito(elemento);
                dibujarCarrito();
            });

        }
    );

    
    let finalizar= document.querySelector('#finalizar')
    finalizar.onclick= ()=>{
    Swal.fire({
        title: 'Orden confirmada!',
        text: 'Gracias por su compra!',
        icon: 'success',
        confirmButtonText: 'Cerrar'
      })
    // Swal.fire({
    //     title: 'Orden Confirmada!',
    //     imageUrl: '../Imgs/img/gracias.png',
    //     imageHeight: 200,
    //     imageWidth: 200,
    //     imageAlt: 'A tall image'
    //   })
    }

    // if(elementosCarrito.length == 0) {
    //     contenedorFooterCarrito.innerHTML = `
    //         <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
    //     `;
    // } else {
    //     contenedorFooterCarrito.innerHTML = `
    //         <th scope="row" colspan="5">Total de la compra: $${estandarDolaresAmericanos.format(sumaCarrito)}</th>
    //     `;
    // }

    //Operador ternario 

    elementosCarrito.length == 0 ? contenedorFooterCarrito.innerHTML=`
    //         <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
    //     ` : contenedorFooterCarrito.innerHTML=`
    //       <th scope="row" colspan="5">Total de la compra: $${estandarDolaresAmericanos.format(sumaCarrito)}</th>
    //     `;


}

function removerProductoCarrito(elementoAEliminar) {
    const elementosAMantener = elementosCarrito.filter((elemento) => elementoAEliminar.producto.id != elemento.producto.id);
    elementosCarrito.length = 0;

    elementosAMantener.forEach((elemento) => elementosCarrito.push(elemento));
}


function crearCard(producto) {
    //Botón
    let botonAgregar = document.createElement("button");
    botonAgregar.className = "btn btn-success";
    botonAgregar.innerText = "Agregar";

    //Card body
    let cuerpoCarta = document.createElement("div");
    cuerpoCarta.className = "card-body";
    cuerpoCarta.innerHTML = `
        <h5>${producto.nombre}</h5>
        <p>$ ${producto.precio} USD</p>
    `;
    cuerpoCarta.append(botonAgregar);

    //Imagen
    let imagen = document.createElement("img");
    imagen.src = producto.foto;
    imagen.className = "card-img-top";
    imagen.alt = producto.nombre;

    //Card
    let carta = document.createElement("div");
    carta.className = "card m-2 p-2";
    carta.style = "width: 18rem";
    carta.append(imagen);
    carta.append(cuerpoCarta);

    //Contenedor Card
    //let contenedorCarta = document.createElement("div");
    //contenedorCarta.className = "col-xs-6 col-sm-3 col-md-2";
    //contenedorCarta.append(carta);

    //Agregar algunos eventos
    botonAgregar.onclick = () => {
        //alert("Hiciste click en el producto" + producto.nombre);

        let elementoExistente = elementosCarrito.find((elemento) => elemento.producto.id == producto.id);

        if(elementoExistente) {
            elementoExistente.cantidad+=1;
        } else {
            let elementoCarrito = new ElementoCarrito(producto, 1);
            elementosCarrito.push(elementoCarrito);
        }

        dibujarCarrito();

        swal({
            title: "¡Producto agregado!",
            text: `${producto.nombre} agregado al carrito de compra.`,
            icon: "success",
            buttons: {
                cerrar: {
                    text: "Cerrar",
                    value: false
                },
                carrito: {
                    text: "Ir a carrito",
                    value: true
                }
            }
        }).then((irACarrito) => {

            if(irACarrito) {
                //swal("Vamos al carrito!");
                const myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {keyboard: true});
                const botonModal = document.getElementById('buttonModal'); 
                myModal.show(botonModal);

            }
        });

    } 
    
    return carta;

}

function dibujarCatalogoProductos() {
    contenedorProductos.innerHTML = "";

    productos.forEach(
        (producto) => {
            let contenedorCarta = crearCard(producto);
            contenedorProductos.append(contenedorCarta);
        }
    );

}
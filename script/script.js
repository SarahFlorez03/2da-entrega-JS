class Producto{
    constructor (id, nombre, precio, foto){
        this.id= id;
        this.nombre= nombre;
        this.precio= precio;
        this.foto= foto;
    }
}

class ElementoCarrito{
    constructor (producto, cantidad){
        this.producto= producto;
        this.cantidad=cantidad;
    }
}


const productos=[];
const elementosCarrito=[];
const contenedorProductos= 
document.getElementsByClassName('page-content').getElementsByClassName('product-container');

const rowContenedorProductos= contenedorProductos[0];
const contenedorCarritoCompras= document.querySelector("#items");

//Funciones

cargarProductos();
cargarCarrito();
dibujarCarrito();
dibujarCatalogoProductos();


//pushear al array productos
function cargarProductos() {
    productos.push(new Producto(Shein, 'Blusa Naranja', 1.99, './Imgs/img/products/blusa_naranja.jpg'));
    productos.push(new Producto(Shein, 'Blusa verde', 1256.96, './Imgs/img/products/blusa_verde.jpg'));
    productos.push(new Producto(Zaful, 'Hoddie dragon', 4.23, './Imgs/img/products/hoodie_dragon.jpg'));
    productos.push(new Producto(Zaful, 'Hoodie marrón', 80.98, './Imgs/img/products/hoodie_marron.jpg'));
    productos.push(new Producto(Shein, 'Hoodie mostaza', 23.98, './Imgs/img/products/hoodie_mostaza.jpg'));
    productos.push(new Producto(Zaful, 'Hoodie negra', 23.98, './Imgs/img/products/hoodie_negra'));
    productos.push(new Producto(Shein, 'Jumper Gris', 23.98, './Imgs/img/products/jumper_gris.jpg'));
    productos.push(new Producto(Zaful, 'Jumper marrón', 23.98, './Imgs/img/products/jumper_marron.jpg'));
}

//pushear al array elementos carrito
function cargarCarrito() {
    let elementoCarrito = new ElementoCarrito(
        new Producto(Shein, 'Blusa Naranja', 1.99, './Imgs/img/products/blusa_naranja.jpg'),1);

    elementosCarrito.push(elementoCarrito);
}


function dibujarCarrito() {
    let renglonesCarrito = '';

    elementosCarrito.forEach(
        (elemento) => {
            renglonesCarrito+=`
                <tr>
                    <td>${elemento.producto.marca}</td>
                    <td>${elemento.producto.nombre}</td>
                    <td>${elemento.cantidad}</td>
                    <td>$ ${elemento.producto.precio}</td>
                </tr>
            `;
        }
    );

    contenedorCarritoCompras.innerHTML = renglonesCarrito;

}

function crearCard(producto) {

    //Botón
    let botonAgregar = document.createElement("button");
    botonAgregar.className = "button-add";
    botonAgregar.innerText = "Agregar"

    //Card body
    let precioCarta = document.createElement("h6");
    precioCarta.className = "productPrice";

    precioCarta.innerHTML = `
 
    <h6>${producto.precio}</h6>        
                
    `;
    precioCarta.append(botonAgregar);

    //Imagen
    let imagen = document.createElement("img");
    imagen.src = producto.foto;
    imagen.className = "productImg";
    imagen.alt = producto.nombre;

    
    //Card title

    let nombreProducto= document.createElement("h6");
    nombreProducto.className="productName";
    nombreProducto.innerHTML = `
 
    <h6>${producto.nombre}</h6>        
                
    `;
    nombreProducto.append(imagen);


    //Card
    let container= document.createElement("div");
    container.className = "product-container";
    container.append(nombreProducto);
    container.append(precioCarta);

    

    //Agregar algunos eventos
    botonAgregar.onclick = () => {
        //alert("Hiciste click en el producto" + producto.nombre);

        let elementoCarrito = new ElementoCarrito(producto, 1);
        elementosCarrito.push(elementoCarrito);

        dibujarCarrito();

    } 
    
    return container;

}

function dibujarCatalogoProductos() {
    rowContenedorProductos.innerHTML = "";

    productos.forEach(
        (producto) => {
            let container = crearCard(producto);
            rowContenedorProductos.append(container);
        }
    );

}
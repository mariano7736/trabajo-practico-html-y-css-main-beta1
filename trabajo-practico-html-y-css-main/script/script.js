const file = "../data/productos.json";
const containerProducts = document.getElementById('container-products');
const myNav = document.getElementById('myTopnav');

cargarEventos();

function cargarEventos() {

    document.addEventListener('DOMContentLoaded', () => {
        renderizarProductos();
    });
}



async function realizarPeticion(datos) {
    try {
        const response = await fetch(datos);
        if (!response.ok) {
            throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
      
        console.error(error);
    } 
}

async function renderizarProductos() {
    const productos = await realizarPeticion(file);
    recorrerArray(productos);
}

function recorrerArray(arregloProductos) {
    arregloProductos.forEach((producto) => {
        const divCard = document.createElement('div');
        divCard.classList.add('card');
        divCard.innerHTML += `
			<img src="../img/productos/${producto.img}" alt="${producto.nombre}" />
			<h4>${producto.nombre}</h4>
			<p>$${producto.precio}</p>
			<a id=${producto.id} class="boton agregar-carrito" href="#">Agregar</a>
        `;
        containerProducts.appendChild(divCard);
    });
}

function mostrarMenu() {
    let navbar = document.getElementById('myTopnav');
    navbar.className = navbar.className === 'topnav' ? (navbar.className += ' responsive') : (navbar.className = 'topnav');
}

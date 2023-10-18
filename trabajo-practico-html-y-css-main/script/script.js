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


/* texto animado*/
class TextoAnimado {
    constructor(id) {
        this.texto = document.getElementById(id);
        this.letras = this.texto.innerText.split("");

        this.texto.innerText = '';

        this.letras.forEach((letra) => {
            let caracter = letra === ' ' ? '&nbsp;' : letra;

            this.texto.innerHTML = this.texto.innerHTML + `
                <div>
                    <span>${caracter}</span>
                    <span class="segunda-linea">${caracter}</span>
                </div>
            `;
        });

        this.iniciarAnimacion();
    }

    iniciarAnimacion() {
        const duracionAnimacion = 1000; // Duración de la animación en milisegundos
        let cuenta = 0;

        const animar = () => {
            const intervalo = setInterval(() => {
                if (cuenta < this.texto.children.length) {
                    this.texto.children[cuenta].classList.add('animacion');
                    cuenta += 1;
                } else {
                    clearInterval(intervalo);
                    // Reiniciar la animación después de un breve retraso
                    setTimeout(() => {
                        cuenta = 0;
                        this.texto.innerHTML = ''; // Limpiar el contenido para reiniciar la animación
                        this.letras.forEach((letra) => {
                            let caracter = letra === ' ' ? '&nbsp;' : letra;

                            this.texto.innerHTML = this.texto.innerHTML + `
                                <div>
                                    <span>${caracter}</span>
                                    
                                </div>
                            `;
                        });
                        animar();
                    }, duracionAnimacion);
                }
            }, duracionAnimacion);
        };

        animar();
    }
}

new TextoAnimado('logo');

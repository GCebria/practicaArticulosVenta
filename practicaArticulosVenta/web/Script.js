
var total = 0;

function anadeCarrito(articuloId) {
    /*Falta:
     * - Actualizar cantidades:
     * - Actualizar precio: es necesario que se acceda al precio cada vez que se pulsa y se le sume
     */
    var id = articuloId.id;
    var direccionNodo = "carrito_" + id;


    /*Recoge los valores*/
    var nodo = document.getElementById(id);
    var rutaImagen = nodo.getElementsByTagName("img")[0].src;
    var texto = nodo.getElementsByTagName("p")[0].firstChild.nodeValue;
    var precioTratado = separarPrecio(texto);
    this.total = this.total + parseInt(precioTratado);



    /*Comprueba si existe*/
    if (document.getElementById(direccionNodo) == null) {

        /*Creación de nodo*/

        var newNode = document.createElement("div");
        newNode.setAttribute("id", direccionNodo);
        newNode.setAttribute("class", "claseCarrito");
        newNode.setAttribute("cantidad", "1");

        /*imagen*/
        var imagen = document.createElement("img");
        imagen.setAttribute("src", rutaImagen);
        imagen.setAttribute("width", "75px");
        imagen.setAttribute("height", "37.5px");

        /*precio*/
        newNode.setAttribute("precio", precioTratado)
        var precio = document.createElement("p");
        var textoPrecio = document.createTextNode("Precio: " + precioTratado + "€");
        precio.appendChild(textoPrecio);

        /*botones*/
        var boton1 = document.createElement("button");
        var textoBoton1 = document.createTextNode("+");
        boton1.appendChild(textoBoton1);

        boton1.setAttribute("onclick", "sumarUnidad(this)");

        var boton2 = document.createElement("button");
        var textoBoton2 = document.createTextNode("-");
        boton2.appendChild(textoBoton2);

        boton2.setAttribute("onclick", "restaUnidad(this)");


        /* cantidad*/
        var cant = document.createElement("p");
        cant.setAttribute("id", "cantidad_" + direccionNodo);
        var textoCant = document.createTextNode("Unidades: 1");
        cant.appendChild(textoCant);

        /*Insertar todo*/
        newNode.appendChild(imagen);
        newNode.appendChild(precio);
        newNode.appendChild(boton1);
        newNode.appendChild(boton2);
        newNode.appendChild(cant);

        /*Insertar las compras*/
        document.getElementById("carrito").appendChild(newNode);

        mostrarBorrar();


    } else {
        /*Extraer el valor del atributo cantidad, incrementarlo y redefinirlo*/
        var cant = document.getElementById(direccionNodo).getAttribute("cantidad");
        var cantInt = parseInt(cant);
        cantInt++;
        document.getElementById(direccionNodo).setAttribute("cantidad", cantInt);
        actualizarCantidad(direccionNodo);
        /*Actualizar el valor*/

    }

//  this.total = this.total + (parseInt(precioTratado)*document.getElementById(direccionNodo).getAttribute("cantidad"));
    mostrarTotal(this.total);


}


function sumarUnidad(nodo) {
    var padre = nodo.parentNode.id;


    var cantidad = document.getElementById(padre).getAttribute("cantidad");
    var cantidadInt = parseInt(cantidad);
    cantidadInt++;
    document.getElementById(padre).setAttribute("cantidad", cantidadInt.toString());
    actualizarCantidad(padre);

    /*Actualizar precio*/
    var precio = document.getElementById(padre).getAttribute("precio")
    this.total = this.total + parseInt(precio);
    mostrarTotal(this.total);
}

function restaUnidad(nodo) {
    var padre = nodo.parentNode.id;


    var cantidad = document.getElementById(padre).getAttribute("cantidad");
    var cantidadInt = parseInt(cantidad);
            var precio = document.getElementById(padre).getAttribute("precio")

    if (cantidadInt <= 1) {
        document.getElementById("carrito").removeChild(document.getElementById(padre));

    } else {
        cantidadInt--;
        document.getElementById(padre).setAttribute("cantidad", cantidadInt.toString());
        actualizarCantidad(padre);
}
        /*Actualizar precio*/
        this.total = this.total - parseInt(precio);
        mostrarTotal(this.total);
    
}


function actualizarCantidad(nodo) {
    /*Elimina nodo*/
    var nodoCant = document.getElementById("cantidad_" + nodo);
    nodoCant.removeChild(nodoCant.firstChild);

    /*Inserta uno nuevo actualizado*/
    var cantidad = document.getElementById(nodo).getAttribute("cantidad");
    var textoCant = document.createTextNode("Unidades: " + cantidad);
    var newCantNode = document.createElement("p");
    newCantNode.appendChild(textoCant);
    nodoCant.appendChild(newCantNode);

}

function mostrarBorrar() {
    /*Inserta boton Borrar*/
    var nodo = document.getElementById("borrar");
    if (nodo.hasChildNodes() == true) {
        nodo.removeChild(nodo.firstChild);
    }
    /*Borrar Todo*/
    var botonBorrar = document.createElement("button");
    var textoBorrar = document.createTextNode("Borrar todo");
    botonBorrar.setAttribute("onclick", "borrarTodo()");
    botonBorrar.appendChild(textoBorrar);
    document.getElementById("borrar").appendChild(botonBorrar);
}

function mostrarTotal(total) {

    var nodo = document.getElementById("precioTotal");
    if (nodo.hasChildNodes() == true) {
        nodo.removeChild(nodo.firstChild);
    }
    var parrafo = document.createElement("p");
    var newNodo = document.createTextNode("Precio total: " + total + " €");
    parrafo.appendChild(newNodo);

    nodo.appendChild(parrafo);
}

function borrarTodo() {
    var elementos = document.getElementById("carrito");
    while (elementos.firstChild) {
        elementos.removeChild(elementos.firstChild);
    }
    this.total = 0
    mostrarTotal(this.total);
}

function separarPrecio(precio) {
    var res = precio.split(" ")[1];
    var parte = res.split("€")[0];
    return parte;

}

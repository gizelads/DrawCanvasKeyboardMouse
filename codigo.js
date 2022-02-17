var colorcito = document.getElementById("colorcito");
var tamanito = document.getElementById("tamanito");
var botoncito = document.getElementById("botoncito");
botoncito.addEventListener("click", borrarDibujo);

var cuadrito = document.getElementById("area_de_dibujo");
var papel = cuadrito.getContext("2d");
var x = 150;
var y = 150;

document.addEventListener("keyup", dibujarTeclado);
cuadrito.addEventListener("mousedown", inicioMouse);
document.addEventListener("mouseup", finMouse);

var teclas = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
};

function borrarDibujo() {
    papel.clearRect(2, 2, 296, 296);
    dibujarLinea("black", x - 1, y - 1, x + 1, y + 1, papel);  // punto del ultimo arranque para el teclado
}

function dibujarLinea(color, xi, yi, xf, yf, lienzo) {
    lienzo.beginPath();
    lienzo.strokeStyle = color;
    lienzo.lineWidth = tamanito.value;       // grosor de la linea 1-5px
    lienzo.moveTo(xi, yi);
    lienzo.lineTo(xf, yf);
    lienzo.stroke();
    lienzo.closePath();
}

function dibujarTeclado(evento) {
    var movimiento = 10;
    switch (evento.keyCode) {
        case teclas.DOWN:
            dibujarLinea(colorcito.value, x, y, x, y + movimiento, papel);
            y = y + movimiento;
        break;
        case teclas.UP:
            dibujarLinea(colorcito.value, x, y, x, y - movimiento, papel);
            y = y - movimiento;
        break;
        case teclas.LEFT:
            dibujarLinea(colorcito.value, x, y, x - movimiento, y, papel);
            x = x - movimiento;
        break;
        case teclas.RIGHT:
            dibujarLinea(colorcito.value, x, y, x + movimiento, y, papel);
            x = x + movimiento;
        break;
        default:
            console.log("Otra tecla");
        break;
    }
}

function inicioMouse() {
    cuadrito.addEventListener("mousemove", dibujarMouse);
}

function finMouse() {
    cuadrito.removeEventListener("mousemove", dibujarMouse);
}

function dibujarMouse(evento) {
    dibujarLinea(colorcito.value, evento.layerX, evento.layerY, evento.layerX + evento.movementX, evento.layerY + evento.movementY, papel);
}

dibujarLinea("black", x - 1, y - 1, x + 1, y + 1, papel);  // punto de arranque para el teclado
dibujarLinea("black", 0, 0, 300, 0, papel)                // bordes del liezo o papel
dibujarLinea("black", 300, 0, 300, 300, papel);              
dibujarLinea("black", 300, 300, 0, 300, papel);
dibujarLinea("black", 0, 300, 0, 0, papel);
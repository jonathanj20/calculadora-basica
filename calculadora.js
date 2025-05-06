const botones = [
    { elemento: document.getElementById('btnPunto'), accion: ponerPunto },
    { elemento: document.getElementById('btnMasMenos'), accion: asignarNegativoPositivo },
    { elemento: document.getElementById('btnCE'), accion: reiniciarCalculadora },
    { elemento: document.getElementById("btnC"), accion: borrarOperacion },
    { elemento: document.getElementById("btnResultado"), accion: calcularResultado },
    { elemento: document.getElementById('btnBorrar'), accion: borrarCaracter },
    { elemento: document.getElementById('btnPorcentaje'), accion: calcularPorcentaje }
];

const campoTexto = document.getElementById('campoTexto');
const textoOperacion = document.getElementById('textoOperacion');
const btnNumeros = document.querySelectorAll(".numeros");
const btnOperaciones = document.querySelectorAll(".operaciones");
const operaciones = ['+', '-', '/', '*'];

let textoResultado = '0';
let operacion = '';
let operacionAsignada = false;
let porcentaje = '';
let pusoPunto = false;

/*Se les agrega el evento click a cada botón*/
btnOperaciones.forEach((operacion) => {
    operacion.addEventListener("click", () => {
        textoOperacion.innerHTML = 'ANS= ' + textoResultado;
        escribirOperacion(operacion.value);
    });
});

btnNumeros.forEach(numero => numero.addEventListener("click", () => escribirNumero(numero.value)));
botones.forEach(boton => boton.elemento.addEventListener("click", boton.accion));

function ponerPunto() {
    if (!pusoPunto) {
        campoTexto.value += '.';
        pusoPunto = true;
    }
}

function reiniciarCalculadora() {
    campoTexto.value = '';
    operacionAsignada = false;
    pusoPunto = false;
}

function borrarOperacion() {
    textoResultado = 0;
    campoTexto.value = '';
    textoOperacion.innerHTML = 'ANS= ' + textoResultado;
    operacionAsignada = false;
    pusoPunto = false
}

function calcularResultado() {
    if (!operacionAsignada) {
        textoOperacion.innerHTML = campoTexto.value + ' = ';
        operacion += campoTexto.value;
        campoTexto.value = eval(campoTexto.value);
        textoResultado = campoTexto.value;
        operacionAsignada = false;
        pusoPunto = campoTexto.value.includes(".");
    }
}

function borrarCaracter() {
    if (operaciones.includes(campoTexto.value[campoTexto.value.length - 1])) {
        operacionAsignada = false;
    }

    campoTexto.value = campoTexto.value.substring(0, campoTexto.value.length - 1);
}

function calcularPorcentaje() {
    if (campoTexto.value.length > 0 && operacionAsignada === false) {
        let ultimoNumeroReverseado = obtenerUltimoNumero().split('').reverse().join('');
        porcentaje = ultimoNumeroReverseado + '/100';
        campoTexto.value += eval(porcentaje);
    }
}

function escribirNumero(numero) {
    campoTexto.value += numero
    operacionAsignada = false;
}

function escribirOperacion(operacion) {
    if (operacionAsignada) {
        campoTexto.value = campoTexto.value.substring(0, campoTexto.value.length - 1);
    }

    campoTexto.value += operacion
    operacionAsignada = true;
    pusoPunto = false;
}

function asignarNegativoPositivo() {
    let ultimoNumero = '';
    let tieneOperaciones = false;

    for (let caracter of campoTexto.value) {
        if (operaciones.includes(caracter)) {
            tieneOperaciones = true;
        }
    }

    if (tieneOperaciones) {
        for (let i = campoTexto.value.length - 1; i >= 0; i--) {
            if (operaciones.includes(campoTexto.value[i])) {
                determinarSigno(campoTexto.value[i], ultimoNumero);
                break;
            }

            ultimoNumero += campoTexto.value[i];
            campoTexto.value = campoTexto.value.substring(0, campoTexto.value.length - 1);
        }
    } else {
        campoTexto.value = "-" + campoTexto.value;
    }
}

function obtenerUltimoNumero() {
    let ultimoNumero = '';

    for (let i = campoTexto.value.length - 1; i >= 0; i--) {
        if (operaciones.includes(campoTexto.value[i])) {
            break;
        }

        ultimoNumero += campoTexto.value[i];
        campoTexto.value = campoTexto.value.substring(0, campoTexto.value.length - 1);
    }

    return ultimoNumero;
}


function determinarSigno(signo, ultimoNumero) {
    switch (signo) {
        case "+":
            campoTexto.value = campoTexto.value.substring(0, campoTexto.value.length - 1);
            campoTexto.value += "-" + ultimoNumero.split("").reverse().join("");
            break;
        case "-":
            campoTexto.value = campoTexto.value.substring(0, campoTexto.value.length - 1);
            campoTexto.value += "+" + ultimoNumero.split("").reverse().join("");
            break;
        case "*":
        case "/":
            campoTexto.value += "-" + ultimoNumero.split("").reverse().join("");
            break;
    }
}
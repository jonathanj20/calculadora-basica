const campoTexto = document.getElementById('campoTexto');
const btnResultado = document.getElementById('btnResultado');
const btnCE = document.getElementById('btnCE');
const btnC = document.getElementById('btnC');
const btnBorrar = document.getElementById('btnBorrar');
const btnPunto = document.getElementById('btnPunto');
const btnMasMenos = document.getElementById('btnMasMenos');
const btnPorcentaje = document.getElementById('btnPorcentaje');
const textoOperacion = document.getElementById('textoOperacion');
const btnNumeros = document.querySelectorAll(".numeros");
const btnOperaciones = document.querySelectorAll(".operaciones");
const operaciones = ['+', '-', '/', '*'];

let textoResultado = '0';
let operacion = '';
let operacionAsignada = false;
let porcentaje = '';
let pusoPunto = false;


/*se recorre la colección HTML de los botones, y va detectando que numero se va
presionando*/
btnNumeros.forEach((numero) => {
    numero.addEventListener("click", () => {
        escribirNumero(numero.value);
    });
});

/*se recorre la colección HTML de los botones, y va detectando que operacion se va
presionando*/
btnOperaciones.forEach((operacion) => {
    operacion.addEventListener("click", () => {
        textoOperacion.innerHTML = 'ANS= ' + textoResultado;
        escribirOperacion(operacion.value);
    });
});

btnPunto.addEventListener("click", () => {
    if (!pusoPunto) {
        campoTexto.value += '.';
        pusoPunto = true;
    }
});

btnMasMenos.addEventListener("click", () => {
    asignarNegativoPositivo();
});

btnCE.addEventListener("click", () => {
    campoTexto.value = '';
    operacionAsignada = false;
});

btnC.addEventListener("click", () => {
    textoResultado = 0;
    campoTexto.value = '';
    textoOperacion.innerHTML = 'ANS= ' + textoResultado;
    operacionAsignada = false;
});

btnResultado.addEventListener('click', () => {
    if (!operacionAsignada) {
        textoOperacion.innerHTML = campoTexto.value + ' = ';
        operacion += campoTexto.value;
        campoTexto.value = eval(campoTexto.value);
        textoResultado = campoTexto.value;
        operacionAsignada = false;
        pusoPunto = false;
    }
});

btnBorrar.addEventListener("click", () => {
    /**El método substring sirve para cortar o extraer el fragmento de una
     * cadena. recibe dos parámetros: 
     * - el índice de la cadena desde donde empezerá a cortar.
     * - y el final de donde terminará de extraer.
     */

    if (campoTexto.value[campoTexto.value.length - 1] === '+' || campoTexto.value[campoTexto.value.length - 1] === '-' ||
        campoTexto.value[campoTexto.value.length - 1] === '/' || campoTexto.value[campoTexto.value.length - 1] === '*') {
        operacionAsignada = false;
    }

    campoTexto.value = campoTexto.value.substring(0, campoTexto.value.length - 1);
});


btnPorcentaje.addEventListener("click", () => {
    if (campoTexto.value.length > 0 && operacionAsignada === false) {
        let ultimoNumeroReverseado = obtenerUltimoNumero().split('').reverse().join('');
        porcentaje = ultimoNumeroReverseado + '/100';
        campoTexto.value += eval(porcentaje);
    }
});

function escribirNumero(numero) {
    for (let i = 0; i <= 9; i++) {
        if (numero === i.toString()) {
            campoTexto.value += numero;
        }
    }

    operacionAsignada = false;
}

function escribirOperacion(operacion) {
    if (!operacionAsignada) {
        for (let op of operaciones) {
            if (operacion === op) {
                campoTexto.value += op;
            }
        }

        operacionAsignada = true;
        pusoPunto = false;
    }
}

function asignarNegativoPositivo() {
    //let ultimoNumeroReverseado = obtenerUltimoNumero().split('').reverse().join('');
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
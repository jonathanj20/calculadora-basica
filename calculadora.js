let campoTexto = document.getElementById('campoTexto');
const boton1 = document.getElementById('boton1');
const boton2 = document.getElementById('boton2');
const boton3 = document.getElementById('boton3');
const boton4 = document.getElementById('boton4');
const boton5 = document.getElementById('boton5');
const boton6 = document.getElementById('boton6');
const boton7 = document.getElementById('boton7');
const boton8 = document.getElementById('boton8');
const boton9 = document.getElementById('boton9');
const boton0 = document.getElementById('boton0');
const btnSuma = document.getElementById('btnSuma');
const btnResta = document.getElementById('btnResta');
const btnMultiplicacion = document.getElementById('btnMultiplicacion');
const btnDivision= document.getElementById('btnDivision');
const btnResultado = document.getElementById('btnResultado');
const btnCE = document.getElementById('btnCE');
const textoOperacion = document.getElementById('textoOperacion');
let textoResultado = '0';

boton1.addEventListener("click", (e) => {
    e.preventDefault();
    escribirNumero('1');
});

boton2.addEventListener("click",(e) => {
    e.preventDefault();
    escribirNumero('2');
});

boton3.addEventListener("click",(e) => {
    e.preventDefault();
    escribirNumero('3');
});

boton4.addEventListener("click",(e) => {
    e.preventDefault();
    escribirNumero('4');
});

boton5.addEventListener("click",(e) => {
    e.preventDefault();
    escribirNumero('5');
});

boton6.addEventListener("click",(e) => {
    e.preventDefault();
    escribirNumero('6');
});

boton7.addEventListener("click",(e) => {
    e.preventDefault();
    escribirNumero('7');
});


boton8.addEventListener("click",(e) => {
    e.preventDefault();
    escribirNumero('8');
});

boton9.addEventListener("click",(e) => {
    e.preventDefault();
    escribirNumero('9');
});

boton0.addEventListener("click",(e) => {
    e.preventDefault();
    escribirNumero('0');
});

btnSuma.addEventListener("click", () => {
    textoOperacion.innerHTML = 'ANS= '+textoResultado;
    escribirOperacion('+');
});

btnResta.addEventListener("click", () => {
    textoOperacion.innerHTML = 'ANS= '+textoResultado
    escribirOperacion('-');
});

btnMultiplicacion.addEventListener("click", () => {
    textoOperacion.innerHTML = 'ANS= '+textoResultado;
    escribirOperacion('*');
});

btnDivision.addEventListener("click", () => {
    textoOperacion.innerHTML = 'ANS= '+textoResultado;
    escribirOperacion('/');
});

btnCE.addEventListener("click", () => {
    eliminarNumero();
});

btnResultado.addEventListener('click',() => {
    textoOperacion.innerHTML = campoTexto.value+' = ';
    campoTexto.value = eval(campoTexto.value);
    textoResultado = campoTexto.value;
});

function escribirNumero(numero){
    switch(numero){
        case '0':
            campoTexto.value+='0';
            break;
        case '1':
            campoTexto.value+='1';
            break;
        case '2':
            campoTexto.value+='2';
            break;
        case '3':
            campoTexto.value+='3';
            break;
        case '4':
            campoTexto.value+='4';
            break;
        case '5':
            campoTexto.value+='5';
            break;
        case '6':
            campoTexto.value+='6';
            break;
        case '7':
            campoTexto.value+='7';
            break;
        case '8':
            campoTexto.value+='8';
            break;
        case '9':
            campoTexto.value+='9';
            break;
    }
}

function escribirOperacion(operacion){
    switch(operacion){
        case '+':
            campoTexto.value+='+';
            break;
        case '*':
            campoTexto.value+='*';
            break;
        case '-':
            campoTexto.value+='-';
            break;
        case '/':
            campoTexto.value+='/';
            break;
    }
}

function eliminarNumero(){
    /**El método substring sirve para cortar o extraer el fragmento de una
     * cadena. recibe dos parámetros: 
     * - el índice de la cadena desde donde empezerá a cortar.
     * - y el final de donde terminará de extraer.
     */
    for(let i = campoTexto.value.length-1; i >= 0; i--){
        if(campoTexto.value[i] != '*' && 
        campoTexto.value[i] != '+' && 
        campoTexto.value[i] != '-' && 
        campoTexto.value[i] != '/'){
            campoTexto.value = campoTexto.value.substring(0, campoTexto.value.length - 1);
        } else {
            break;
        }
    }
}



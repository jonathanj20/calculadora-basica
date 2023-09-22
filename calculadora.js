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
        textoOperacion.innerHTML = 'ANS= '+textoResultado;
        escribirOperacion(operacion.value);
    });
});

btnPunto.addEventListener("click", () => {
    if(!pusoPunto){
        campoTexto.value+='.';
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
    textoOperacion.innerHTML = 'ANS= '+textoResultado;
    operacionAsignada = false;
});

btnResultado.addEventListener('click',() => {
    textoOperacion.innerHTML = campoTexto.value+' = ';
    operacion+=campoTexto.value;
    campoTexto.value = eval(campoTexto.value);
    textoResultado = campoTexto.value;
    operacionAsignada = false;
    pusoPunto = false;
});

btnBorrar.addEventListener("click", () => { 
    /**El método substring sirve para cortar o extraer el fragmento de una
     * cadena. recibe dos parámetros: 
     * - el índice de la cadena desde donde empezerá a cortar.
     * - y el final de donde terminará de extraer.
     */
    if(campoTexto.value[campoTexto.value.length-1] === '+' || campoTexto.value[campoTexto.value.length-1] === '-' || 
        campoTexto.value[campoTexto.value.length-1] === '/' ||campoTexto.value[campoTexto.value.length-1] === '*'){
        operacionAsignada = false;
    }

    campoTexto.value = campoTexto.value.substring(0, campoTexto.value.length-1);
});


btnPorcentaje.addEventListener("click", () => {
    //busca el último número ingresado
    // let ultimoNumero = ''
    // for(let i = campoTexto.value.length-1; i >= 0; i--){
    //     if(campoTexto.value[i] != '*' && 
    //     campoTexto.value[i] != '+' && 
    //     campoTexto.value[i] != '-' && 
    //     campoTexto.value[i] != '/'){
    //         ultimoNumero+=campoTexto.value[i];
    //         campoTexto.value = campoTexto.value.substring(0, campoTexto.value.length-1);
    //     } else {
    //         break;
    //     }
    // }

    let ultimoNumeroReverseado = obtenerUltimoNumero().split('').reverse().join('');
    porcentaje = ultimoNumeroReverseado+'/100';
    campoTexto.value += eval(porcentaje);
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
    operacionAsignada = false;
}

function escribirOperacion(operacion){
    if(!operacionAsignada){
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
        operacionAsignada = true;
        pusoPunto = false;
    }
}

function asignarNegativoPositivo(){
    //la variable ultimoNumeroReverseado invierte el número para se guarde el número original y no invertido
    let ultimoNumeroReverseado = obtenerUltimoNumero().split('').reverse().join('');
    let numeroPositivo = '';

    if(parseFloat(ultimoNumeroReverseado) > 0){
        for(let i = campoTexto.value.length-1; i >= 0; i--){
            if(campoTexto.value[i] === '+'){
                campoTexto.value[i].replace('+', '');
            }
        }
        campoTexto.value += `-${ultimoNumeroReverseado.toString()}`;
    } else if(parseFloat(ultimoNumeroReverseado) <= 0){
        console.log('es menor');
        numeroPositivo = eval('ultimoNumeroReverseado * -1');
        console.log(numeroPositivo);
        campoTexto.value+=numeroPositivo;  
    }
}

function obtenerUltimoNumero(){
    //esta variable es para guardar el último número ingresado, pero lo va a almacenando de forma invertida
    let ultimoNumero = '';

    //busca el último número ingresado y va eliminado cada dígito, hasta que se termine y cuentre un signo.
    for(let i = campoTexto.value.length-1; i >= 0; i--){
        if(campoTexto.value[i] != '*' && 
        campoTexto.value[i] != '+' && 
        campoTexto.value[i] != '-' && 
        campoTexto.value[i] != '/'){
            ultimoNumero+=campoTexto.value[i];
            //va eliminando el número
            campoTexto.value = campoTexto.value.substring(0, campoTexto.value.length-1);
        } else {
            //añade el signo negativo también para que lo incluya 
            if(campoTexto.value[i] === '-'){
                ultimoNumero+=campoTexto.value[i];
                campoTexto.value = campoTexto.value.substring(0, campoTexto.value.length-1);
            } 
            break;
        }
    }

    return ultimoNumero;
}
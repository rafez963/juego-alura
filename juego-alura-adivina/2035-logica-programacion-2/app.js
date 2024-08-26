//Declaración de parametros

let numeroSecreto = 0;
let intentos = 0;
let intentosMax = 5; //Numero maximo de intentos
let listaNumerosSorteados = [];
let numeroMaximo = 10;


function asignarTextoElemento(elemento, texto){ // Se agregan los parametros de esta forma para hacer la función lo mas generica posible
    
    let elementoHTML = document.querySelector(elemento); 
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento(){
    
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    console.log(`Vas ${intentos} ${(intentos === 1 ? 'intento' : 'intentos')}`);
    
    if(numeroDeUsuario === numeroSecreto){  

        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1 ? 'intento' : 'intentos')}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else 
        if(intentos === intentosMax){
            //Nueva condición para limitar el numero de intentos
            document.querySelector('#reiniciar').removeAttribute('disabled','true');
            asignarTextoElemento ('p','Alcanzaste el maximo de intentos');
            asignarTextoElemento ('h1','Gracias por jugar');
        
        } else {
            if(numeroDeUsuario > numeroSecreto) {

                asignarTextoElemento('p','El número es menor');
            } else {
                asignarTextoElemento('p','El número es mayor');
            }
            intentos++;
            limpiarCaja();
        }
    return;
}

function limpiarCaja(){
    
    //La siguiente modificación que se mostrara resume las dos líneas de código anteriores*/

    document.querySelector('#valorUsuario').value = ''; 
}

function generarNumeroSecreto(){
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
  
    console.log(`El numero secreto es ${numeroGenerado}`);
    console.log(listaNumerosSorteados);

    //Si ya sorteamos todos los numeros
    if(listaNumerosSorteados.length == numeroMaximo){

        asignarTextoElemento('p','Ya se sortearon todos los numeros posibles');
    //Condición para la lista: Si el numero generado esta incluido en la lista
    } else if(listaNumerosSorteados.includes(numeroGenerado)){ 
        return generarNumeroSecreto();
    } else {
        listaNumerosSorteados.push(numeroGenerado);
        return numeroGenerado;
    }
}

function condicionesIniciales(){
    asignarTextoElemento('h1','Bievenido al juego del numero secreto');
    asignarTextoElemento('p',`Elige un numero del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego(){
    //*******Atributos con los que debe contar la función*******

    //Limpiar caja
    limpiarCaja();
    //Indicar mensaje de intervarlo de números, generar numero secreto aleatorio e intentos iniciales. En resumen, las condiciones iniciales
    condicionesIniciales();
    //Deshabilitar el boton de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');   
}

//Llamado de la función de condiciones iniciales

condicionesIniciales();
// funcion para el nombre de usuario
const user = () => {
    userName = prompt("CONVERSION DE MONEDA\n\nAntes de comenzar por favor escriba su nombre:").toUpperCase();

    while((userName == "")||(!(isNaN(userName)))){
        userName = prompt("Por favor ingrese su nombre:").toUpperCase();
    }
    alert("Bienvendido/a " + userName + " a nuestra casa de cambio local!");
    return userName;
}

// funcion para el tipo de cambio
const userExchange = () => {
    let chooseCurrency = parseInt(prompt(currency));
    
    while(!((chooseCurrency >= 1)&&(chooseCurrency <= 4))){
        alert("Por favor inserte un numero entre 1 y 4");
        chooseCurrency = parseInt(prompt(currency));
    }
    return chooseCurrency;
}

const exchangeType = () => {
    switch(userExchange()){
        case 1:
            par = usdToUy;
            break;
        case 2:
            par = uyToUsd;
            break;
        case 3:
            par = usdToArg;
            break;
        case 4: 
            par = argToUsd;
            break;
        default:
            break;
    }
    alert("Usted eligió el par: " + par);
    return par;
}

// funcion monto para convertir
const userCash = () => {
    
    amount = parseFloat(prompt("Por favor, ingrese el monto para realizar el cambio: ("+par+")"));

    while(!(amount > 0)){
        alert("Ingrese un monto valido");
        amount = parseFloat(prompt("Ingrese el monto para realizar el cambio: "));
    }
    return amount;
}

// funcion calculadora
const userConversion = () => {

    let conversion;
    let sign;

    if(par === usdToUy) {
        conversion = dolarUru * amount;
        sign = "U$";
    }else if(par === uyToUsd){
        conversion = amount / dolarUru;
        sign = "U$D";
    }else if(par === usdToArg){
        conversion = usdToArgen * amount;
        sign = "AR$";
    }else if(par === argToUsd){
        conversion = amount / usdToArgen;
        sign = "U$D";
    }

    alert("Resultado: " + sign + " " + (conversion).toFixed(3));
    return conversion;
}

// salida
const salida = () => {

    user();
    exchangeType();
    userCash();
    userConversion();
    alert("Gracias "+userName+" por confiar en nosotros!");

}
